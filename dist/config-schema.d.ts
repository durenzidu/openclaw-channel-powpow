/**
 * channels.powpow 配置 Schema（zod 4）
 * 顶层单账号模式：所有字段平铺在 channels.powpow 之下
 */
import { z } from "zod";
export declare const DEFAULT_API_BASE_URL = "https://global.powpow.online";
export declare const PowPowConfigSchema: z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodOptional<z.ZodString>;
    defaultAccount: z.ZodOptional<z.ZodString>;
    apiBaseUrl: z.ZodOptional<z.ZodString>;
    digitalHumanId: z.ZodOptional<z.ZodString>;
    webhookToken: z.ZodOptional<z.ZodString>;
    supabaseUrl: z.ZodOptional<z.ZodString>;
    supabaseAnonKey: z.ZodOptional<z.ZodString>;
    dmPolicy: z.ZodOptional<z.ZodEnum<{
        allowlist: "allowlist";
        disabled: "disabled";
        open: "open";
        pairing: "pairing";
    }>>;
    allowFrom: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>>;
    realtimeEnabled: z.ZodOptional<z.ZodBoolean>;
    pollEnabled: z.ZodOptional<z.ZodBoolean>;
    pollIntervalMs: z.ZodOptional<z.ZodNumber>;
    historyLimit: z.ZodOptional<z.ZodNumber>;
    requestTimeoutMs: z.ZodOptional<z.ZodNumber>;
    maxRetries: z.ZodOptional<z.ZodNumber>;
    maxMessageLength: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type PowPowConfigSection = z.infer<typeof PowPowConfigSchema>;
//# sourceMappingURL=config-schema.d.ts.map