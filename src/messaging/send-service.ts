/**
 * 出站消息发送服务
 * 通过 PowPow 平台 webhook/receive 接口把 agent 回复写回数字人会话
 * （POST /api/openclaw/webhook/receive，webhook_token 鉴权）
 */

import { logger } from '../shared/logger.js';

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

interface ReceiveResponse {
  success?: boolean;
  error?: string;
  data?: {
    message_id?: string;
    session_id?: string;
    status?: string;
  };
}

export async function sendReply(params: ReplyParams): Promise<ReplyResult> {
  const url = `${params.apiBaseUrl.replace(/\/+$/, '')}/api/openclaw/webhook/receive`;

  const body = {
    digital_human_id: params.digitalHumanId,
    message: params.content,
    webhook_token: params.webhookToken,
    ...(params.sessionId ? { session_id: params.sessionId } : {}),
    ...(params.openclawUserId ? { openclaw_user_id: params.openclawUserId } : {}),
  };

  let lastError = 'unknown error';

  for (let attempt = 1; attempt <= params.maxRetries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), params.requestTimeoutMs);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Token': params.webhookToken,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      const json = (await response.json().catch(() => null)) as ReceiveResponse | null;

      if (response.ok && json?.success && json.data?.message_id) {
        logger.debug(`回复发送成功：message_id=${json.data.message_id}`);
        return {
          messageId: json.data.message_id,
          sessionId: json.data.session_id || params.sessionId || '',
        };
      }

      lastError = json?.error || `HTTP ${response.status}`;

      // 4xx 客户端错误（token 无效、数字人非活跃等）重试无意义，直接抛出
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        throw new Error(`回复被平台拒绝：${lastError}`);
      }
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('回复被平台拒绝')) {
        throw error;
      }
      lastError = error instanceof Error ? error.message : String(error);
    } finally {
      clearTimeout(timeout);
    }

    if (attempt < params.maxRetries) {
      const delay = Math.pow(2, attempt - 1) * 1000;
      logger.debug(`回复发送失败（${lastError}），${delay}ms 后重试 ${attempt + 1}/${params.maxRetries}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error(`回复发送失败（已重试 ${params.maxRetries} 次）：${lastError}`);
}
