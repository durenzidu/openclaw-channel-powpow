/**
 * PowPow 账号解析（顶层单账号模式）
 */
import type { OpenClawConfig } from "openclaw/plugin-sdk/channel-core";
import type { PowPowAccount, PowPowAccountConfig } from "./types.js";
export declare const POWPOW_WEBHOOK_TOKEN_ENV_VAR = "POWPOW_WEBHOOK_TOKEN";
export declare function readPowpowSection(cfg: OpenClawConfig): PowPowAccountConfig | undefined;
export declare function resolveDefaultPowpowAccountId(cfg: OpenClawConfig): string;
export declare function resolvePowpowAccount(params: {
    cfg: OpenClawConfig;
    accountId?: string | null;
}): PowPowAccount;
export declare function listPowpowAccountIds(cfg: OpenClawConfig): string[];
//# sourceMappingURL=account.d.ts.map