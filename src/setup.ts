/**
 * PowPow setup 适配器 + setup 契约
 * 提供 `openclaw channel setup powpow --digital-human-id ...` CLI 字段
 */

import type { OpenClawConfig } from "openclaw/plugin-sdk/channel-core";
import { DEFAULT_ACCOUNT_ID } from "openclaw/plugin-sdk/account-id";
import { defineChannelSetupContract } from "openclaw/plugin-sdk/channel-setup";
import { patchTopLevelChannelConfigSection } from "openclaw/plugin-sdk/setup";
import {
  POWPOW_WEBHOOK_TOKEN_ENV_VAR,
  resolvePowpowAccount,
} from "./account.js";

export interface PowpowSetupInput {
  name?: string;
  digitalHumanId?: string;
  webhookToken?: string;
  useEnvToken?: boolean;
  apiBaseUrl?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

function buildPowpowSetupPatch(
  accountId: string,
  patch: Record<string, unknown>
): Record<string, unknown> {
  return {
    ...(accountId !== DEFAULT_ACCOUNT_ID ? { defaultAccount: accountId } : {}),
    ...patch,
  };
}

function validateHttpUrl(raw: string, label: string): string | null {
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return `${label} must use http:// or https:// (${raw})`;
    }
  } catch {
    return `Invalid ${label} URL: ${raw}`;
  }
  return null;
}

export function createPowpowSetupAdapter(params: {
  resolveAccountId: (cfg: OpenClawConfig, accountId?: string) => string;
}) {
  const channel = "powpow";
  return {
    resolveAccountId: (input: {
      cfg: OpenClawConfig;
      accountId?: string;
    }): string => params.resolveAccountId(input.cfg, input.accountId),
    applyAccountName: (input: {
      cfg: OpenClawConfig;
      accountId: string;
      name?: string;
    }): OpenClawConfig =>
      patchTopLevelChannelConfigSection({
        cfg: input.cfg,
        channel,
        patch: buildPowpowSetupPatch(
          input.accountId,
          input.name?.trim() ? { name: input.name.trim() } : {}
        ),
      }),
    validateInput: (input: {
      cfg: OpenClawConfig;
      accountId: string;
      input: PowpowSetupInput;
    }): string | null => {
      const existing = resolvePowpowAccount({
        cfg: input.cfg,
        accountId: input.accountId,
      });
      const digitalHumanId =
        input.input.digitalHumanId?.trim() || existing.digitalHumanId;
      if (!digitalHumanId) {
        return "PowPow requires --digital-human-id (the PowPow digital human UUID).";
      }
      if (
        input.input.digitalHumanId?.trim() &&
        !/^[0-9a-fA-F]{8,64}$/.test(input.input.digitalHumanId.trim())
      ) {
        return "PowPow digital human id must be a UUID.";
      }
      const hasToken =
        Boolean(input.input.webhookToken?.trim()) ||
        input.input.useEnvToken === true ||
        Boolean(process.env[POWPOW_WEBHOOK_TOKEN_ENV_VAR]?.trim()) ||
        Boolean(existing.webhookToken);
      if (!hasToken) {
        return "PowPow requires --webhook-token, --use-env-token, or the POWPOW_WEBHOOK_TOKEN environment variable.";
      }
      if (input.input.apiBaseUrl?.trim()) {
        const error = validateHttpUrl(
          input.input.apiBaseUrl.trim(),
          "PowPow API base URL"
        );
        if (error) return error;
      }
      if (input.input.supabaseUrl?.trim()) {
        const error = validateHttpUrl(
          input.input.supabaseUrl.trim(),
          "Supabase URL"
        );
        if (error) return error;
      }
      return null;
    },
    applyAccountConfig: (input: {
      cfg: OpenClawConfig;
      accountId: string;
      input: PowpowSetupInput;
    }): OpenClawConfig => {
      const digitalHumanId = input.input.digitalHumanId?.trim();
      const apiBaseUrl = input.input.apiBaseUrl?.trim();
      const supabaseUrl = input.input.supabaseUrl?.trim();
      const supabaseAnonKey = input.input.supabaseAnonKey?.trim();
      return patchTopLevelChannelConfigSection({
        cfg: input.cfg,
        channel,
        enabled: true,
        clearFields:
          input.input.useEnvToken === true ? ["webhookToken"] : undefined,
        patch: buildPowpowSetupPatch(input.accountId, {
          ...(digitalHumanId ? { digitalHumanId } : {}),
          ...(input.input.useEnvToken !== true &&
          input.input.webhookToken?.trim()
            ? { webhookToken: input.input.webhookToken.trim() }
            : {}),
          ...(apiBaseUrl ? { apiBaseUrl } : {}),
          ...(supabaseUrl ? { supabaseUrl } : {}),
          ...(supabaseAnonKey ? { supabaseAnonKey } : {}),
        }),
      });
    },
  };
}

export function createPowpowSetupContract(
  adapter: ReturnType<typeof createPowpowSetupAdapter>
) {
  return defineChannelSetupContract({
    fields: {
      digitalHumanId: {
        kind: "string",
        cli: {
          flags: "--digital-human-id <id>",
          description: "PowPow digital human UUID",
        },
      },
      webhookToken: {
        kind: "string",
        sensitive: true,
        cli: {
          flags: "--webhook-token <token>",
          description: "PowPow webhook token",
        },
      },
      useEnvToken: {
        kind: "boolean",
        cli: {
          flags: "--use-env-token",
          description: "Use POWPOW_WEBHOOK_TOKEN",
        },
        envVars: [POWPOW_WEBHOOK_TOKEN_ENV_VAR],
      },
      apiBaseUrl: {
        kind: "string",
        cli: {
          flags: "--api-base-url <url>",
          description: "PowPow API base URL",
        },
      },
      supabaseUrl: {
        kind: "string",
        cli: {
          flags: "--supabase-url <url>",
          description: "Supabase project URL (enables realtime inbound)",
        },
      },
      supabaseAnonKey: {
        kind: "string",
        cli: {
          flags: "--supabase-anon-key <key>",
          description: "Supabase anon key",
        },
      },
    },
    adapter,
  });
}
