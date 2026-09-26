/**
 * chat/history 轮询器
 * 插件的唯一收信链路：定期拉取数字人的会话历史，增量分发新出现的用户消息
 *
 * v1.2.2：
 * - 每次请求携带 X-Webhook-Token（平台 history 接口已鉴权）
 * - 401（token 无效）/ 410（数字人过期）为致命错误：停止轮询并给出明确指引，不再无限退避
 * - since 游标增量轮询：基线 order=desc 单请求取最新一段，此后每轮仅拉新增（旧的 limit=1 探总量 + offset 两步法废弃）
 */

import type { HistoryMessage } from '../types.js';
import { logger } from '../shared/logger.js';

/** 致命原因：凭证/状态级错误，重试无意义，轮询器自行停止 */
export type HistoryFatalReason = 'invalid-token' | 'dh-expired';

export class HistoryFatalError extends Error {
  readonly reason: HistoryFatalReason;

  constructor(reason: HistoryFatalReason, message: string) {
    super(message);
    this.name = 'HistoryFatalError';
    this.reason = reason;
  }
}

export interface HistoryPollerOptions {
  apiBaseUrl: string;
  digitalHumanId: string;
  accountId: string;
  /** 平台签发的 webhook token，以 X-Webhook-Token 头随每个 history 请求发送 */
  webhookToken: string;
  limit: number;
  intervalMs: number;
  requestTimeoutMs: number;
  onUserMessages: (messages: HistoryMessage[]) => void;
  onError?: (error: unknown) => void;
  /** 致命错误回调（token 无效 / 数字人过期）：轮询已停止，仅触发一次 */
  onFatal?: (reason: HistoryFatalReason, message: string) => void;
}

export class HistoryPoller {
  private readonly opts: HistoryPollerOptions;
  private timer: ReturnType<typeof setInterval> | null = null;
  private polling = false;
  private running = false;
  private baselineReady = false;
  /** 增量游标：最新消息时间戳（优先取平台 data.cursor）；基线建立前为 null */
  private cursor: string | null = null;
  private fatalReported = false;

  constructor(options: HistoryPollerOptions) {
    this.opts = options;
  }

  /**
   * 建立基线：拉一次最新历史（order=desc&limit=N，单请求）并把所有消息 ID 标记为已见，
   * 避免插件重启后回复历史消息；基线建立前轮询不分发。
   * 基线失败不阻塞启动，改为异步指数退避重试（封顶 30s），
   * 防止首拉失败时把全部历史消息当新消息分发（迟到回复风暴）。
   * 401/410 致命错误除外：直接停止并上报，不再重试。
   */
  async start(baselineIds: (ids: string[]) => void): Promise<void> {
    if (this.running) {
      return;
    }
    this.running = true;

    void this.establishBaseline(baselineIds, 0);

    this.timer = setInterval(() => {
      void this.poll();
    }, this.opts.intervalMs);
  }

  stop(): void {
    this.running = false;
    this.baselineReady = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  isRunning(): boolean {
    return this.running;
  }

  private reportFatal(error: HistoryFatalError): void {
    this.stop();
    if (this.fatalReported) {
      return;
    }
    this.fatalReported = true;
    logger.error(`账号 ${this.opts.accountId} ${error.message}`);
    this.opts.onFatal?.(error.reason, error.message);
  }

  private async establishBaseline(
    baselineIds: (ids: string[]) => void,
    delayMs: number
  ): Promise<void> {
    if (!this.running) {
      return;
    }
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
    if (!this.running) {
      return;
    }
    try {
      const { messages, cursor } = await this.fetchPage({ order: 'desc' });
      baselineIds(messages.map((m) => m.id));
      this.cursor = cursor ?? this.newestTimestamp(messages);
      this.baselineReady = true;
      logger.debug(
        `账号 ${this.opts.accountId} 轮询基线建立：${messages.length} 条历史消息，游标 ${this.cursor ?? '无'}`
      );
    } catch (error) {
      if (error instanceof HistoryFatalError) {
        this.reportFatal(error);
        return;
      }
      const nextDelay = Math.min((delayMs || 1000) * 2, 30000);
      logger.warn(
        `账号 ${this.opts.accountId} 轮询基线建立失败，${nextDelay}ms 后重试（基线就绪前不分发）:`,
        error
      );
      await this.establishBaseline(baselineIds, nextDelay);
    }
  }

  private async poll(): Promise<void> {
    if (this.polling) {
      return;
    }
    if (!this.baselineReady) {
      return;
    }
    this.polling = true;
    try {
      const { messages, cursor } = await this.fetchPage({ since: this.cursor });
      const userMessages = messages.filter((m) => m.role === 'user');
      if (userMessages.length > 0) {
        this.opts.onUserMessages(userMessages);
      }
      this.cursor = cursor ?? this.newestTimestamp(messages) ?? this.cursor;
    } catch (error) {
      if (error instanceof HistoryFatalError) {
        this.reportFatal(error);
        return;
      }
      logger.debug(`账号 ${this.opts.accountId} 轮询失败:`, error);
      this.opts.onError?.(error);
    } finally {
      this.polling = false;
    }
  }

  /**
   * 基线：order=desc&limit=N 单请求直取最新 N 条。
   * 增量：since=cursor 只拉游标之后的新消息（平台 gt 严格比较）。
   * 兼容性：若平台忽略 since（旧版本），会返回全量消息——
   * 消息 ID 去重（message-dedup）保证不会重复分发，游标仍可正常推进。
   */
  private async fetchPage(params: {
    order?: 'desc';
    since?: string | null;
  }): Promise<{ messages: HistoryMessage[]; cursor: string | null }> {
    const base = this.opts.apiBaseUrl.replace(/\/+$/, '') + '/api/openclaw/chat/history';
    const search = new URLSearchParams({
      digitalHumanId: this.opts.digitalHumanId,
      limit: String(this.opts.limit),
    });
    if (params.order === 'desc') {
      search.set('order', 'desc');
    }
    if (params.since) {
      search.set('since', params.since);
    }
    const url = `${base}?${search.toString()}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.opts.requestTimeoutMs);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-Webhook-Token': this.opts.webhookToken,
        },
        signal: controller.signal,
      });

      const json = (await response.json().catch(() => null)) as HistoryResponse | null;

      if (response.status === 401) {
        throw new HistoryFatalError(
          'invalid-token',
          'chat/history 拒绝访问（HTTP 401）：webhookToken 无效或与数字人不匹配，已停止收信。' +
            '请检查 channels.powpow 配置里的 digitalHumanId / webhookToken，修正后重启 OpenClaw。'
        );
      }
      if (response.status === 410 || json?.code === 'DH_EXPIRED') {
        throw new HistoryFatalError(
          'dh-expired',
          `${json?.error || '数字人已过期'}——已停止收信，续费后重启 OpenClaw 即可恢复。`
        );
      }
      if (!response.ok) {
        throw new Error(json?.error || `chat/history HTTP ${response.status}`);
      }
      if (!json?.success || !json.data?.messages || !Array.isArray(json.data.messages)) {
        throw new Error(json?.error || 'chat/history 响应格式异常');
      }
      return { messages: json.data.messages, cursor: json.data.cursor ?? null };
    } finally {
      clearTimeout(timeout);
    }
  }

  private newestTimestamp(messages: HistoryMessage[]): string | null {
    let newest: string | null = null;
    for (const m of messages) {
      if (!newest || new Date(m.timestamp) > new Date(newest)) {
        newest = m.timestamp;
      }
    }
    return newest;
  }
}

interface HistoryResponse {
  success?: boolean;
  error?: string;
  code?: string;
  data?: {
    messages?: HistoryMessage[];
    cursor?: string | null;
    pagination?: { total?: number };
  };
}
