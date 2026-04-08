/**
 * PowPow Channel 配置 Schema
 */

import { z } from 'zod';

// 访问策略枚举
const policySchema = z.enum(['open', 'allowlist', 'blocklist']);

// 消息类型枚举
const messageTypeSchema = z.enum(['text', 'markdown']);



// 账号配置 Schema
export const accountSchema = z.object({
  id: z.string().min(1, '账号 ID 不能为空'),
  digitalHumanId: z.string().min(1, '数字人 ID 不能为空'),
  name: z.string().min(1, '名称不能为空'),
  avatar: z.string().url().optional().or(z.literal('')),
  wsUrl: z.string().url().optional().or(z.literal('')),
  dmPolicy: policySchema.default('open'),
  allowFrom: z.array(z.string()).optional(),
  messageType: messageTypeSchema.default('markdown'),
});

// 高级配置 Schema
export const advancedConfigSchema = z.object({
  pollInterval: z.number().int().positive().default(2000),
  autoReconnect: z.boolean().default(true),
  reconnectInterval: z.number().int().positive().default(3000),
  maxReconnectAttempts: z.number().int().positive().default(10),
  maxMessageLength: z.number().int().positive().default(2000),
  enableStreaming: z.boolean().default(true),
  enableCards: z.boolean().default(false),
  debug: z.boolean().default(false),
});

// 主配置 Schema
export const powpowConfigSchema = z.object({
  enabled: z.boolean().default(true),
  accounts: z.array(accountSchema).min(1, '至少配置一个账号'),
  advanced: advancedConfigSchema.optional(),
});

// 配置类型
export type PowPowAccountConfig = z.infer<typeof accountSchema>;
export type PowPowAdvancedConfig = z.infer<typeof advancedConfigSchema>;
export type PowPowConfigSchema = z.infer<typeof powpowConfigSchema>;

// 配置验证函数
export function validatePowPowConfig(config: unknown): PowPowConfigSchema {
  return powpowConfigSchema.parse(config);
}

// 配置解析函数（带默认值）
export function parsePowPowConfig(config: unknown): PowPowConfigSchema {
  try {
    return validatePowPowConfig(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedError = error.format();
      throw new Error(`PowPow 配置验证失败：${JSON.stringify(formattedError, null, 2)}`);
    }
    throw error;
  }
}
