/**
 * channels.powpow 配置 Schema（zod 4）
 * 顶层单账号模式：所有字段平铺在 channels.powpow 之下
 */

import { z } from "zod";
import {
  AllowFromListSchema,
  DmPolicySchema,
} from "openclaw/plugin-sdk/channel-config-schema";

export const DEFAULT_API_BASE_URL = "https://global.powpow.online";

export const PowPowConfigSchema = z.object({
  enabled: z.boolean().optional(),
  name: z.string().optional(),
  defaultAccount: z.string().optional(),
  apiBaseUrl: z.string().trim().optional(),
  digitalHumanId: z.string().trim().optional(),
  webhookToken: z.string().optional(),
  dmPolicy: DmPolicySchema.optional(),
  allowFrom: AllowFromListSchema.optional(),
  pollEnabled: z.boolean().optional(),
  pollIntervalMs: z.number().int().min(1000).optional(),
  historyLimit: z.number().int().min(1).max(200).optional(),
  requestTimeoutMs: z.number().int().min(1000).optional(),
  maxRetries: z.number().int().min(0).max(10).optional(),
  maxMessageLength: z.number().int().min(100).optional(),
});

export type PowPowConfigSection = z.infer<typeof PowPowConfigSchema>;
