/**
 * 入站消息处理器
 * 负责处理从 PowPow 接收到的消息
 */

import type { PowPowWsMessage, PowPowMessage } from '../types.js';
import { logger } from '../shared/logger.js';

/**
 * 将 WebSocket 消息标准化为 OpenClaw 消息格式
 */
export function normalizeIncomingMessage(wsMessage: PowPowWsMessage): PowPowMessage | null {
  try {
    // 忽略心跳消息
    if (wsMessage.type === 'heartbeat') {
      return null;
    }

    // 忽略连接确认消息
    if (wsMessage.type === 'connected' || wsMessage.type === 'disconnected') {
      return null;
    }

    // 只处理聊天消息
    if (wsMessage.type !== 'chat_message') {
      logger.warn('收到未知类型的消息:', wsMessage.type);
      return null;
    }

    // 验证必填字段
    if (!wsMessage.digitalHumanId || !wsMessage.senderId || !wsMessage.content) {
      logger.warn('消息缺少必填字段:', wsMessage);
      return null;
    }

    // 转换为标准消息格式
    const message: PowPowMessage = {
      id: wsMessage.messageId,
      digitalHumanId: wsMessage.digitalHumanId,
      senderType: 'user', // 入站消息来自用户
      senderId: wsMessage.senderId,
      senderName: wsMessage.senderId, // 暂时使用 senderId 作为名称
      content: wsMessage.content,
      contentType: wsMessage.contentType || 'text',
      mediaUrl: wsMessage.mediaUrl,
      duration: wsMessage.duration,
      timestamp: wsMessage.timestamp ? new Date(wsMessage.timestamp).toISOString() : new Date().toISOString(),
      isRead: false,
    };

    logger.debug('消息标准化完成:', message);
    return message;
  } catch (error) {
    logger.error('标准化消息失败:', error);
    return null;
  }
}

/**
 * 提取消息文本内容（用于 AI 处理）
 */
export function extractMessageContent(message: PowPowMessage): string {
  // 对于文本消息，直接返回内容
  if (message.contentType === 'text') {
    return message.content;
  }

  // 对于多媒体消息，添加描述
  switch (message.contentType) {
    case 'image':
      return `[图片] ${message.content}`;
    case 'voice':
      return `[语音 ${message.duration || 0}秒] ${message.content}`;
    case 'video':
      return `[视频 ${message.duration || 0}秒] ${message.content}`;
    default:
      return message.content;
  }
}

/**
 * 验证消息是否应该被处理（访问控制）
 */
export function shouldProcessMessage(
  message: PowPowMessage,
  allowFrom?: string[]
): boolean {
  // 如果没有配置白名单，允许所有消息
  if (!allowFrom || allowFrom.length === 0) {
    return true;
  }

  // 检查发送者是否在白名单中
  return allowFrom.includes(message.senderId);
}
