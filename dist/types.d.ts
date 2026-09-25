/**
 * PowPow Channel 类型定义
 */
import type { ChannelDmPolicy } from "openclaw/plugin-sdk/channel-config-helpers";
export type PowPowContentType = "text" | "image" | "voice" | "video";
export interface HistoryMessage {
    id: string;
    sessionId: string;
    role: string;
    content: string;
    metadata: Record<string, unknown> | null;
    timestamp: string;
    direction?: string;
    status?: string;
}
export interface NormalizedInbound {
    messageId: string;
    sessionId: string;
    digitalHumanId: string;
    senderId: string;
    senderName: string;
    content: string;
    contentType: PowPowContentType;
    timestamp: number;
    raw: unknown;
}
export interface PowPowAccountConfig {
    enabled?: boolean;
    name?: string;
    defaultAccount?: string;
    apiBaseUrl?: string;
    digitalHumanId?: string;
    webhookToken?: string;
    dmPolicy?: ChannelDmPolicy;
    allowFrom?: Array<string | number>;
    pollEnabled?: boolean;
    pollIntervalMs?: number;
    historyLimit?: number;
    requestTimeoutMs?: number;
    maxRetries?: number;
    maxMessageLength?: number;
}
export interface PowPowAccount {
    accountId: string;
    name?: string;
    enabled: boolean;
    configured: boolean;
    apiBaseUrl: string;
    digitalHumanId: string;
    webhookToken: string;
    config: PowPowAccountConfig;
}
//# sourceMappingURL=types.d.ts.map