/**
 * 入站消息处理器
 * 将 digital_human_dialogues 的行（Realtime snake_case / history camelCase）
 * 标准化为 OpenClaw 入站消息
 */
/**
 * 标准化 chat/history 返回的消息
 */
export function normalizeHistoryMessage(message) {
    if (message.role !== 'user') {
        return null;
    }
    if (!message.content) {
        return null;
    }
    const metadata = message.metadata || {};
    const senderId = readString(metadata.sender_id) || readString(metadata.openclaw_user_id) || 'unknown';
    return {
        messageId: message.id,
        sessionId: message.sessionId,
        digitalHumanId: '',
        senderId,
        senderName: senderId,
        content: message.content,
        contentType: detectContentType(metadata),
        timestamp: new Date(message.timestamp).getTime() || Date.now(),
        raw: message,
    };
}
/**
 * 提取消息文本内容（用于 AI 处理）
 */
export function extractMessageContent(contentType, content, duration) {
    switch (contentType) {
        case 'image':
            return `[图片] ${content}`;
        case 'voice':
            return `[语音 ${duration || 0}秒] ${content}`;
        case 'video':
            return `[视频 ${duration || 0}秒] ${content}`;
        default:
            return content;
    }
}
function readString(value) {
    return typeof value === 'string' && value.length > 0 ? value : null;
}
function detectContentType(metadata) {
    const type = readString(metadata.content_type) || readString(metadata.contentType);
    if (type === 'image' || type === 'voice' || type === 'video') {
        return type;
    }
    return 'text';
}
//# sourceMappingURL=inbound-handler.js.map