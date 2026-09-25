/**
 * PowPow 账号解析（顶层单账号模式）
 */
import { DEFAULT_ACCOUNT_ID, normalizeAccountId, } from "openclaw/plugin-sdk/account-id";
import { DEFAULT_API_BASE_URL } from "./config-schema.js";
export const POWPOW_WEBHOOK_TOKEN_ENV_VAR = "POWPOW_WEBHOOK_TOKEN";
export function readPowpowSection(cfg) {
    const channels = cfg.channels;
    return channels?.powpow;
}
function resolveWebhookToken(section) {
    const direct = section?.webhookToken?.trim();
    if (direct) {
        return direct;
    }
    return process.env[POWPOW_WEBHOOK_TOKEN_ENV_VAR]?.trim() ?? "";
}
export function resolveDefaultPowpowAccountId(cfg) {
    const configured = readPowpowSection(cfg)?.defaultAccount?.trim();
    if (configured) {
        return normalizeAccountId(configured);
    }
    return DEFAULT_ACCOUNT_ID;
}
export function resolvePowpowAccount(params) {
    const section = readPowpowSection(params.cfg);
    const accountId = params.accountId?.trim()
        ? normalizeAccountId(params.accountId)
        : resolveDefaultPowpowAccountId(params.cfg);
    const digitalHumanId = section?.digitalHumanId?.trim() ?? "";
    const webhookToken = resolveWebhookToken(section);
    const configured = Boolean(digitalHumanId && webhookToken);
    const name = typeof section?.name === "string" && section.name.trim()
        ? section.name
        : undefined;
    return {
        accountId,
        name,
        enabled: section?.enabled !== false,
        configured,
        apiBaseUrl: section?.apiBaseUrl?.trim() || DEFAULT_API_BASE_URL,
        digitalHumanId,
        webhookToken,
        config: section ?? {},
    };
}
export function listPowpowAccountIds(cfg) {
    return resolvePowpowAccount({ cfg }).configured
        ? [resolveDefaultPowpowAccountId(cfg)]
        : [];
}
//# sourceMappingURL=account.js.map