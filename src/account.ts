/**
 * PowPow 账号解析（顶层单账号模式）
 */

import type { OpenClawConfig } from "openclaw/plugin-sdk/channel-core";
import {
  DEFAULT_ACCOUNT_ID,
  normalizeAccountId,
} from "openclaw/plugin-sdk/account-id";
import type { PowPowAccount, PowPowAccountConfig } from "./types.js";
import { DEFAULT_API_BASE_URL } from "./config-schema.js";

export const POWPOW_WEBHOOK_TOKEN_ENV_VAR = "POWPOW_WEBHOOK_TOKEN";

export function readPowpowSection(
  cfg: OpenClawConfig
): PowPowAccountConfig | undefined {
  const channels = cfg.channels as
    | { powpow?: PowPowAccountConfig }
    | undefined;
  return channels?.powpow;
}

function resolveWebhookToken(section: PowPowAccountConfig | undefined): string {
  const direct = section?.webhookToken?.trim();
  if (direct) {
    return direct;
  }
  return process.env[POWPOW_WEBHOOK_TOKEN_ENV_VAR]?.trim() ?? "";
}

export function resolveDefaultPowpowAccountId(cfg: OpenClawConfig): string {
  const configured = readPowpowSection(cfg)?.defaultAccount?.trim();
  if (configured) {
    return normalizeAccountId(configured);
  }
  return DEFAULT_ACCOUNT_ID;
}

export function resolvePowpowAccount(params: {
  cfg: OpenClawConfig;
  accountId?: string | null;
}): PowPowAccount {
  const section = readPowpowSection(params.cfg);
  const accountId = params.accountId?.trim()
    ? normalizeAccountId(params.accountId)
    : resolveDefaultPowpowAccountId(params.cfg);

  const digitalHumanId = section?.digitalHumanId?.trim() ?? "";
  const webhookToken = resolveWebhookToken(section);
  const configured = Boolean(digitalHumanId && webhookToken);
  const name =
    typeof section?.name === "string" && section.name.trim()
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

export function listPowpowAccountIds(cfg: OpenClawConfig): string[] {
  return resolvePowpowAccount({ cfg }).configured
    ? [resolveDefaultPowpowAccountId(cfg)]
    : [];
}
