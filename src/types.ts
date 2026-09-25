/**
 * PowPow Channel 类型定义
 */

import type { ChannelDmPolicy } from "openclaw/plugin-sdk/channel-config-helpers";

// PowPow 消息内容类型
export type PowPowContentType = "text" | "image" | "voice" | "video";

// chat/history 接口返回的消息（HTTP camelCase）
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

// 标准化后的入站消息
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

// channels.powpow 配置节（顶层单账号模式）
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

// 解析后的 PowPow 账号（resolved account）
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
