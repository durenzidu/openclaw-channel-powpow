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
/** 致命原因：凭证/状态级错误，重试无意义，轮询器自行停止 */
export type HistoryFatalReason = 'invalid-token' | 'dh-expired';
export declare class HistoryFatalError extends Error {
    readonly reason: HistoryFatalReason;
    constructor(reason: HistoryFatalReason, message: string);
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
export declare class HistoryPoller {
    private readonly opts;
    private timer;
    private polling;
    private running;
    private baselineReady;
    /** 增量游标：最新消息时间戳（优先取平台 data.cursor）；基线建立前为 null */
    private cursor;
    private fatalReported;
    constructor(options: HistoryPollerOptions);
    /**
     * 建立基线：拉一次最新历史（order=desc&limit=N，单请求）并把所有消息 ID 标记为已见，
     * 避免插件重启后回复历史消息；基线建立前轮询不分发。
     * 基线失败不阻塞启动，改为异步指数退避重试（封顶 30s），
     * 防止首拉失败时把全部历史消息当新消息分发（迟到回复风暴）。
     * 401/410 致命错误除外：直接停止并上报，不再重试。
     */
    start(baselineIds: (ids: string[]) => void): Promise<void>;
    stop(): void;
    isRunning(): boolean;
    private reportFatal;
    private establishBaseline;
    private poll;
    /**
     * 基线：order=desc&limit=N 单请求直取最新 N 条。
     * 增量：since=cursor 只拉游标之后的新消息（平台 gt 严格比较）。
     * 兼容性：若平台忽略 since（旧版本），会返回全量消息——
     * 消息 ID 去重（message-dedup）保证不会重复分发，游标仍可正常推进。
     */
    private fetchPage;
    private newestTimestamp;
}
//# sourceMappingURL=history-poller.d.ts.map