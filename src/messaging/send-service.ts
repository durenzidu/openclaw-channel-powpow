/**
 * 出站消息发送服务
 * 负责将消息发送到 PowPow
 */

import type WebSocket from 'ws';
import type { PowPowMessage, PowPowContentType } from '../types.js';
import { logger } from '../shared/logger.js';

/**
 * 发送文本消息
 */
export async function sendTextMessage(
  ws: WebSocket,
  message: PowPowMessage
): Promise<boolean> {
  try {
    const payload = {
      type: 'chat_message',
      digitalHumanId: message.digitalHumanId,
      senderType: 'openclaw' as const,
      senderId: message.digitalHumanId, // 使用数字人 ID 作为发送者
      content: message.content,
      contentType: 'text' as const,
      timestamp: Date.now(),
    };

    ws.send(JSON.stringify(payload));
    logger.debug('发送文本消息:', payload);
    return true;
  } catch (error) {
    logger.error('发送文本消息失败:', error);
    return false;
  }
}

/**
 * 发送媒体消息（图片/语音/视频）
 */
export async function sendMediaMessage(
  ws: WebSocket,
  message: PowPowMessage,
  contentType: PowPowContentType
): Promise<boolean> {
  try {
    if (!message.mediaUrl) {
      logger.error('媒体消息缺少 mediaUrl');
      return false;
    }

    const payload = {
      type: 'chat_message',
      digitalHumanId: message.digitalHumanId,
      senderType: 'openclaw' as const,
      senderId: message.digitalHumanId,
      content: message.content || '',
      contentType: contentType,
      mediaUrl: message.mediaUrl,
      duration: message.duration,
      timestamp: Date.now(),
    };

    ws.send(JSON.stringify(payload));
    logger.debug(`发送${contentType}消息:`, payload);
    return true;
  } catch (error) {
    logger.error(`发送${contentType}消息失败:`, error);
    return false;
  }
}

/**
 * 发送图片消息
 */
export async function sendImageMessage(
  ws: WebSocket,
  message: PowPowMessage
): Promise<boolean> {
  return sendMediaMessage(ws, message, 'image');
}

/**
 * 发送语音消息
 */
export async function sendVoiceMessage(
  ws: WebSocket,
  message: PowPowMessage
): Promise<boolean> {
  return sendMediaMessage(ws, message, 'voice');
}

/**
 * 发送视频消息
 */
export async function sendVideoMessage(
  ws: WebSocket,
  message: PowPowMessage
): Promise<boolean> {
  return sendMediaMessage(ws, message, 'video');
}

/**
 * 统一消息发送入口
 */
export async function sendMessage(
  ws: WebSocket,
  message: PowPowMessage
): Promise<boolean> {
  const contentType = message.contentType || 'text';

  switch (contentType) {
    case 'text':
      return sendTextMessage(ws, message);
    case 'image':
      return sendImageMessage(ws, message);
    case 'voice':
      return sendVoiceMessage(ws, message);
    case 'video':
      return sendVideoMessage(ws, message);
    default:
      logger.warn('不支持的消息类型:', contentType);
      return sendTextMessage(ws, message);
  }
}
