/**
 * 入站消息处理器
 * 将 digital_human_dialogues 的行（Realtime snake_case / history camelCase）
 * 标准化为 OpenClaw 入站消息
 */
import type { HistoryMessage, NormalizedInbound, PowPowContentType } from '../types.js';
/**
 * 标准化 chat/history 返回的消息
 */
export declare function normalizeHistoryMessage(message: HistoryMessage): NormalizedInbound | null;
/**
 * 提取消息文本内容（用于 AI 处理）
 */
export declare function extractMessageContent(contentType: PowPowContentType, content: string, duration?: number): string;
//# sourceMappingURL=inbound-handler.d.ts.map