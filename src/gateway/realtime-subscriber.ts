/**
 * Supabase Realtime 订阅器
 * 订阅 digital_human_dialogues 表的 INSERT 事件（role='user'），
 * 实时接收用户发给数字人的消息
 */

import { createClient, type RealtimeChannel, type SupabaseClient } from '@supabase/supabase-js';
import type { DialogueDbRow } from '../types.js';
import { logger } from '../shared/logger.js';

export type RealtimeStatus = 'subscribed' | 'disconnected';

export interface RealtimeSubscriberOptions {
  supabaseUrl: string;
  supabaseAnonKey: string;
  digitalHumanId: string;
  accountId: string;
  onUserMessage: (row: DialogueDbRow) => void;
  onStatusChange?: (status: RealtimeStatus) => void;
  subscribeTimeoutMs?: number;
}

const DEFAULT_SUBSCRIBE_TIMEOUT_MS = 10000;
const RESUBSCRIBE_DELAY_MS = 5000;
const MAX_RESUBSCRIBE_ATTEMPTS = 10;

export class RealtimeSubscriber {
  private readonly opts: RealtimeSubscriberOptions;
  private client: SupabaseClient | null = null;
  private channel: RealtimeChannel | null = null;
  private subscribed = false;
  private stopped = true;
  private resubscribeAttempts = 0;
  private resubscribeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(options: RealtimeSubscriberOptions) {
    this.opts = options;
  }

  isSubscribed(): boolean {
    return this.subscribed;
  }

  async start(): Promise<void> {
    if (!this.stopped) {
      return;
    }
    this.stopped = false;
    this.resubscribeAttempts = 0;

    this.client = createClient(this.opts.supabaseUrl, this.opts.supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });

    await this.subscribe();
  }

  async stop(): Promise<void> {
    this.stopped = true;
    if (this.resubscribeTimer) {
      clearTimeout(this.resubscribeTimer);
      this.resubscribeTimer = null;
    }
    if (this.channel && this.client) {
      try {
        await this.client.removeChannel(this.channel);
      } catch (error) {
        logger.debug(`账号 ${this.opts.accountId} 移除 Realtime channel 失败:`, error);
      }
    }
    this.channel = null;
    const wasSubscribed = this.subscribed;
    this.subscribed = false;
    if (wasSubscribed) {
      this.opts.onStatusChange?.('disconnected');
    }
  }

  private async subscribe(): Promise<void> {
    if (this.stopped || !this.client) {
      return;
    }

    const channelName = `powpow-dh-${this.opts.digitalHumanId}`;
    this.channel = this.client.channel(channelName);

    this.channel.on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'digital_human_dialogues',
        filter: `digital_human_id=eq.${this.opts.digitalHumanId},role=eq.user`,
      },
      (payload) => {
        const row = parseDialogueRow(payload.new);
        if (!row) {
          logger.debug(`账号 ${this.opts.accountId} 收到无法解析的 Realtime 事件:`, payload.new);
          return;
        }
        this.opts.onUserMessage(row);
      }
    );

    await new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        logger.warn(`账号 ${this.opts.accountId} Realtime 订阅超时（${this.opts.subscribeTimeoutMs ?? DEFAULT_SUBSCRIBE_TIMEOUT_MS}ms）`);
        resolve();
      }, this.opts.subscribeTimeoutMs ?? DEFAULT_SUBSCRIBE_TIMEOUT_MS);

      this.channel!.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          clearTimeout(timeout);
          this.subscribed = true;
          this.resubscribeAttempts = 0;
          logger.info(`账号 ${this.opts.accountId} Realtime 订阅成功（${channelName}）`);
          this.opts.onStatusChange?.('subscribed');
          resolve();
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
          clearTimeout(timeout);
          const wasSubscribed = this.subscribed;
          this.subscribed = false;
          if (wasSubscribed) {
            logger.warn(`账号 ${this.opts.accountId} Realtime 连接断开（${status}），将尝试重订阅`);
          } else {
            logger.warn(`账号 ${this.opts.accountId} Realtime 订阅失败（${status}），依赖轮询兜底`);
          }
          this.opts.onStatusChange?.('disconnected');
          this.scheduleResubscribe();
          resolve();
        }
      });
    });
  }

  private scheduleResubscribe(): void {
    if (this.stopped) {
      return;
    }
    if (this.resubscribeAttempts >= MAX_RESUBSCRIBE_ATTEMPTS) {
      logger.warn(
        `账号 ${this.opts.accountId} Realtime 重订阅已达上限（${MAX_RESUBSCRIBE_ATTEMPTS} 次），停止重试，依赖轮询兜底`
      );
      return;
    }
    this.resubscribeAttempts++;
    if (this.resubscribeTimer) {
      clearTimeout(this.resubscribeTimer);
    }
    this.resubscribeTimer = setTimeout(() => {
      this.subscribe().catch((error) => {
        logger.error(`账号 ${this.opts.accountId} 重订阅异常:`, error);
        this.scheduleResubscribe();
      });
    }, RESUBSCRIBE_DELAY_MS);
  }
}

/**
 * 解析 Realtime 事件中的行数据（snake_case 校验）
 */
export function parseDialogueRow(raw: unknown): DialogueDbRow | null {
  if (typeof raw !== 'object' || raw === null) {
    return null;
  }
  const r = raw as Record<string, unknown>;
  const id = typeof r.id === 'string' ? r.id : null;
  const sessionId = typeof r.session_id === 'string' ? r.session_id : null;
  const digitalHumanId = typeof r.digital_human_id === 'string' ? r.digital_human_id : null;
  const userId = typeof r.user_id === 'string' ? r.user_id : null;
  const role = typeof r.role === 'string' ? r.role : null;
  const content = typeof r.content === 'string' ? r.content : null;
  const createdAt = typeof r.created_at === 'string' ? r.created_at : null;

  if (!id || !sessionId || !digitalHumanId || !userId || !role || content === null || !createdAt) {
    return null;
  }

  return {
    id,
    sessionId,
    digitalHumanId,
    userId,
    role,
    content,
    metadata: (r.metadata && typeof r.metadata === 'object' ? (r.metadata as Record<string, unknown>) : null),
    createdAt,
  };
}
