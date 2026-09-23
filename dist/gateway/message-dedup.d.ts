/**
 * 消息去重器
 * Realtime 与轮询两条链路可能重复投递同一条消息，用消息 ID 去重
 */
export declare class MessageDedup {
    private readonly seen;
    private readonly maxSize;
    constructor(maxSize?: number);
    /**
     * 标记消息为已见。
     * @returns true 表示首次见到（应处理），false 表示重复（应忽略）
     */
    markSeen(id: string): boolean;
    has(id: string): boolean;
    private prune;
    clear(): void;
}
//# sourceMappingURL=message-dedup.d.ts.map