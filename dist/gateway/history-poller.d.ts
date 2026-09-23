/**
 * chat/history 轮询器
 * 作为 Supabase Realtime 的兜底链路：定期拉取数字人的会话历史，
 * 增量分发新出现的用户消息；Realtime 正常时也保持低频兜底
 */
import type { HistoryMessage } from '../types.js';
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
export declare class HistoryPoller {
    private readonly opts;
    private timer;
    private polling;
    private running;
    constructor(options: HistoryPollerOptions);
    /**
     * 建立基线：拉取一次历史并把所有消息 ID 交给回调标记为已见，
     * 避免插件重启后回复历史消息；之后按间隔轮询增量
     */
    start(baselineIds: (ids: string[]) => void): Promise<void>;
    stop(): void;
    isRunning(): boolean;
    private poll;
    /**
     * chat/history 按 asc + limit 排序，直接拉取会得到最旧的 N 条。
     * 两步取最新：先以 limit=1 探总量，再以 offset=max(0, total-limit) 拉最新一段。
     */
    private fetchHistory;
    private fetchTotal;
    private fetchPage;
}
//# sourceMappingURL=history-poller.d.ts.map