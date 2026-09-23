/**
 * 出站消息发送服务
 * 通过 PowPow 平台 webhook/receive 接口把 agent 回复写回数字人会话
 * （POST /api/openclaw/webhook/receive，webhook_token 鉴权）
 */
export interface ReplyParams {
    apiBaseUrl: string;
    digitalHumanId: string;
    webhookToken: string;
    content: string;
    sessionId?: string;
    openclawUserId?: string;
    requestTimeoutMs: number;
    maxRetries: number;
}
export interface ReplyResult {
    messageId: string;
    sessionId: string;
}
export declare function sendReply(params: ReplyParams): Promise<ReplyResult>;
//# sourceMappingURL=send-service.d.ts.map