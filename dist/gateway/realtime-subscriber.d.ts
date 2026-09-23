/**
 * Supabase Realtime 订阅器
 * 订阅 digital_human_dialogues 表的 INSERT 事件（role='user'），
 * 实时接收用户发给数字人的消息
 */
import type { DialogueDbRow } from '../types.js';
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
export declare class RealtimeSubscriber {
    private readonly opts;
    private client;
    private channel;
    private subscribed;
    private stopped;
    private resubscribeAttempts;
    private resubscribeTimer;
    constructor(options: RealtimeSubscriberOptions);
    isSubscribed(): boolean;
    start(): Promise<void>;
    stop(): Promise<void>;
    private subscribe;
    private scheduleResubscribe;
}
/**
 * 解析 Realtime 事件中的行数据（snake_case 校验）
 */
export declare function parseDialogueRow(raw: unknown): DialogueDbRow | null;
//# sourceMappingURL=realtime-subscriber.d.ts.map