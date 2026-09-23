/**
 * chat/history 轮询器
 * 作为 Supabase Realtime 的兜底链路：定期拉取数字人的会话历史，
 * 增量分发新出现的用户消息；Realtime 正常时也保持低频兜底
 */

import type { HistoryMessage } from '../types.js';
import { logger } from '../shared/logger.js';

export interface HistoryPollerOptions {
  apiBaseUrl: string;
  digitalHumanId: string;
  accountId: string;
  limit: number;
  intervalMs: number;
  requestTimeoutMs: number;
  onUserMessages: (messages: HistoryMessage[]) => void;
  onError?: (error: unknown) => void;
}

export class HistoryPoller {
  private readonly opts: HistoryPollerOptions;
  private timer: ReturnType<typeof setInterval> | null = null;
  private polling = false;
  private running = false;

  constructor(options: HistoryPollerOptions) {
    this.opts = options;
  }

  /**
   * 建立基线：拉取一次历史并把所有消息 ID 交给回调标记为已见，
   * 避免插件重启后回复历史消息；之后按间隔轮询增量
   */
  async start(baselineIds: (ids: string[]) => void): Promise<void> {
    if (this.running) {
      return;
    }
    this.running = true;

    try {
      const messages = await this.fetchHistory();
      baselineIds(messages.map((m) => m.id));
      logger.debug(
        `账号 ${this.opts.accountId} 轮询基线建立：${messages.length} 条历史消息`
      );
    } catch (error) {
      logger.warn(`账号 ${this.opts.accountId} 轮询基线建立失败（首次轮询将全量分发）:`, error);
    }

    this.timer = setInterval(() => {
      void this.poll();
    }, this.opts.intervalMs);
  }

  stop(): void {
    this.running = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  isRunning(): boolean {
    return this.running;
  }

  private async poll(): Promise<void> {
    if (this.polling) {
      return;
    }
    this.polling = true;
    try {
      const messages = await this.fetchHistory();
      const userMessages = messages.filter((m) => m.role === 'user');
      if (userMessages.length > 0) {
        this.opts.onUserMessages(userMessages);
      }
    } catch (error) {
      logger.debug(`账号 ${this.opts.accountId} 轮询失败:`, error);
      this.opts.onError?.(error);
    } finally {
      this.polling = false;
    }
  }

  /**
   * chat/history 按 asc + limit 排序，直接拉取会得到最旧的 N 条。
   * 两步取最新：先以 limit=1 探总量，再以 offset=max(0, total-limit) 拉最新一段。
   */
  private async fetchHistory(): Promise<HistoryMessage[]> {
    const base = this.opts.apiBaseUrl.replace(/\/+$/, '') + '/api/openclaw/chat/history';
    const dhParam = `digitalHumanId=${encodeURIComponent(this.opts.digitalHumanId)}`;

    const total = await this.fetchTotal(base, dhParam);
    if (total === 0) {
      return [];
    }

    const limit = Math.min(this.opts.limit, total);
    const offset = Math.max(0, total - limit);
    const json = await this.fetchPage(base, dhParam, limit, offset);

    if (!json.success || !json.data?.messages || !Array.isArray(json.data.messages)) {
      throw new Error(json.error || 'chat/history 响应格式异常');
    }
    return json.data.messages;
  }

  private async fetchTotal(base: string, dhParam: string): Promise<number> {
    const json = await this.fetchPage(base, dhParam, 1, 0);
    if (!json.success || !json.data?.pagination) {
      throw new Error(json.error || 'chat/history 响应格式异常');
    }
    return json.data.pagination.total || 0;
  }

  private async fetchPage(
    base: string,
    dhParam: string,
    limit: number,
    offset: number
  ): Promise<HistoryResponse> {
    const url = `${base}?${dhParam}&limit=${limit}&offset=${offset}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.opts.requestTimeoutMs);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`chat/history HTTP ${response.status}`);
      }
      return (await response.json()) as HistoryResponse;
    } finally {
      clearTimeout(timeout);
    }
  }
}

interface HistoryResponse {
  success?: boolean;
  error?: string;
  data?: {
    messages?: HistoryMessage[];
    pagination?: { total?: number };
  };
}
