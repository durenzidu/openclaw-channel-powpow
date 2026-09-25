/**
 * chat/history 轮询器
 * 插件的唯一收信链路：定期拉取数字人的会话历史，增量分发新出现的用户消息
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
    private baselineReady;
    constructor(options: HistoryPollerOptions);
    /**
     * 建立基线：拉取一次历史并把所有消息 ID 交给回调标记为已见，
     * 避免插件重启后回复历史消息；基线建立前轮询不分发。
     * 基线失败不阻塞启动，改为异步指数退避重试（封顶 30s），
     * 防止首拉失败时把全部历史消息当新消息分发（迟到回复风暴）。
     */
    start(baselineIds: (ids: string[]) => void): Promise<void>;
    stop(): void;
    isRunning(): boolean;
    private establishBaseline;
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