/**
 * PowPow Channel 插件组装
 * 对齐 @openclaw/nostr 模式：createChatChannelPlugin + 顶层单账号配置
 */

import {
  buildChannelConfigSchema,
  buildChannelOutboundSessionRoute,
  createChatChannelPlugin,
  stripChannelTargetPrefix,
  type ChannelOutboundSessionRouteParams,
} from "openclaw/plugin-sdk/channel-core";
import {
  createScopedDmSecurityResolver,
  createTopLevelChannelConfigAdapter,
} from "openclaw/plugin-sdk/channel-config-helpers";
import { describeAccountSnapshot } from "openclaw/plugin-sdk/account-helpers";
import { DEFAULT_ACCOUNT_ID } from "openclaw/plugin-sdk/account-id";
import {
  collectStatusIssuesFromLastError,
  createComputedAccountStatusAdapter,
  createDefaultChannelRuntimeState,
} from "openclaw/plugin-sdk/status-helpers";
import {
  buildPassiveChannelStatusSummary,
  buildTrafficStatusSummary,
} from "openclaw/plugin-sdk/extension-shared";
import { createChannelMessageAdapterFromOutbound } from "openclaw/plugin-sdk/channel-outbound";
import {
  attachChannelToResult,
  type ChannelOutboundAdapter,
} from "openclaw/plugin-sdk/channel-send-result";
import { missingTargetError } from "openclaw/plugin-sdk/channel-feedback";
import {
  chunkTextForOutbound,
  sanitizeAssistantVisibleText,
  stripMarkdown,
} from "openclaw/plugin-sdk/text-chunking";
import { formatPairingApproveHint } from "openclaw/plugin-sdk/channel-plugin-common";
import { normalizeStringEntries } from "openclaw/plugin-sdk/string-coerce-runtime";
import { PowPowConfigSchema } from "./config-schema.js";
import {
  listPowpowAccountIds,
  resolveDefaultPowpowAccountId,
  resolvePowpowAccount,
} from "./account.js";
import { createPowpowSetupAdapter, createPowpowSetupContract } from "./setup.js";
import { startPowpowGatewayAccount } from "./gateway/powpow-gateway.js";
import { sendReply } from "./messaging/send-service.js";
import type { PowPowAccount } from "./types.js";

const POWPOW_TARGET_HINT = "<powpow session id | powpow:<session id>>";

function stripPowpowTargetPrefix(target: string): string {
  return target.trim().replace(/^powpow:/i, "").trim();
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const powpowSetupContract = createPowpowSetupContract(
  createPowpowSetupAdapter({
    resolveAccountId: (cfg, accountId) =>
      accountId?.trim() || resolveDefaultPowpowAccountId(cfg),
  })
);

// ---------------------------------------------------------------------------
// Security（DM 策略）
// ---------------------------------------------------------------------------

const resolvePowpowDmPolicy = createScopedDmSecurityResolver<PowPowAccount>({
  channelKey: "powpow",
  resolvePolicy: (account) => account.config.dmPolicy,
  resolveAllowFrom: (account) => account.config.allowFrom,
  policyPathSuffix: "dmPolicy",
  defaultPolicy: "open",
  approveHint: formatPairingApproveHint("powpow"),
  normalizeEntry: (entry) => entry.trim(),
});

// ---------------------------------------------------------------------------
// Config 适配器（顶层单账号）
// ---------------------------------------------------------------------------

const powpowConfigAdapter = createTopLevelChannelConfigAdapter<PowPowAccount>({
  sectionKey: "powpow",
  resolveAccount: (cfg) => resolvePowpowAccount({ cfg }),
  listAccountIds: listPowpowAccountIds,
  defaultAccountId: resolveDefaultPowpowAccountId,
  deleteMode: "clear-fields",
  clearBaseFields: [
    "name",
    "defaultAccount",
    "digitalHumanId",
    "webhookToken",
    "apiBaseUrl",
    "dmPolicy",
    "allowFrom",
  ],
  resolveAllowFrom: (account) => account.config.allowFrom,
  formatAllowFrom: (allowFrom) => normalizeStringEntries(allowFrom),
});

// ---------------------------------------------------------------------------
// Outbound（webhook/receive 回信）
// ---------------------------------------------------------------------------

const powpowOutboundAdapter: ChannelOutboundAdapter = {
  deliveryMode: "direct",
  textChunkLimit: 2000,
  chunker: chunkTextForOutbound,
  sanitizeText: ({ text }) => sanitizeAssistantVisibleText(text),
  deliveryCapabilities: {
    durableFinal: {
      text: true,
      messageSendingHooks: true,
    },
  },
  sendText: async ({ cfg, to, text, accountId }) => {
    const account = resolvePowpowAccount({
      cfg,
      accountId: accountId ?? undefined,
    });
    if (!account.configured) {
      throw new Error(
        `PowPow account ${account.accountId} is not configured (digital human id + webhook token required)`
      );
    }
    const target = stripPowpowTargetPrefix(to ?? "");
    if (!target) {
      throw missingTargetError("PowPow", POWPOW_TARGET_HINT);
    }
    const message = stripMarkdown(text ?? "");
    if (!message) {
      throw new Error(
        "PowPow send requires non-empty text after markdown stripping."
      );
    }
    const result = await sendReply({
      apiBaseUrl: account.apiBaseUrl,
      digitalHumanId: account.digitalHumanId,
      webhookToken: account.webhookToken,
      content: message.slice(0, account.config.maxMessageLength ?? 2000),
      sessionId: target,
      requestTimeoutMs: account.config.requestTimeoutMs ?? 10000,
      maxRetries: account.config.maxRetries ?? 3,
    });
    return attachChannelToResult("powpow", {
      to: target,
      messageId: result.messageId,
    });
  },
};

const powpowPluginOutboundAdapter: ChannelOutboundAdapter = {
  ...powpowOutboundAdapter,
  resolveTarget: ({ to }) => {
    const trimmed = stripPowpowTargetPrefix(to ?? "");
    if (!trimmed) {
      return {
        ok: false as const,
        error: missingTargetError("PowPow", POWPOW_TARGET_HINT),
      };
    }
    return { ok: true as const, to: trimmed };
  },
};

// ---------------------------------------------------------------------------
// Messaging（session 路由）
// ---------------------------------------------------------------------------

function resolvePowpowOutboundSessionRoute(
  params: ChannelOutboundSessionRouteParams
) {
  const rawTarget = stripChannelTargetPrefix(params.target, "powpow");
  const target = stripPowpowTargetPrefix(rawTarget);
  if (!target) {
    return null;
  }
  return buildChannelOutboundSessionRoute({
    cfg: params.cfg,
    agentId: params.agentId,
    channel: "powpow",
    accountId: params.accountId,
    recipientSessionExact: true,
    peer: {
      kind: "direct",
      id: target,
    },
    chatType: "direct",
    from: `powpow:${target}`,
    to: `powpow:${target}`,
  });
}

// ---------------------------------------------------------------------------
// 插件组装
// ---------------------------------------------------------------------------

export const powpowPlugin = createChatChannelPlugin<PowPowAccount>({
  base: {
    id: "powpow",
    meta: {
      id: "powpow",
      label: "PowPow",
      selectionLabel: "PowPow",
      docsPath: "/channels/powpow",
      docsLabel: "powpow",
      blurb:
        "Chat as a PowPow map digital human (polling inbound, webhook reply)",
      order: 100,
    },
    capabilities: {
      chatTypes: ["direct"],
      media: false,
    },
    reload: { configPrefixes: ["channels.powpow"] },
    configSchema: buildChannelConfigSchema(PowPowConfigSchema),
    setupContract: powpowSetupContract,
    config: {
      ...powpowConfigAdapter,
      isConfigured: (account: PowPowAccount) => account.configured,
      describeAccount: (account: PowPowAccount) =>
        describeAccountSnapshot({
          account,
          configured: account.configured,
          extra: { digitalHumanId: account.digitalHumanId },
        }),
    },
    messaging: {
      targetPrefixes: ["powpow"],
      normalizeTarget: (target: string) => stripPowpowTargetPrefix(target),
      inferTargetChatType: () => "direct" as const,
      targetResolver: {
        looksLikeId: (input: string, normalized?: string) =>
          Boolean((normalized ?? "").trim() || stripPowpowTargetPrefix(input)),
        hint: POWPOW_TARGET_HINT,
      },
      resolveOutboundSessionRoute: resolvePowpowOutboundSessionRoute,
    },
    message: createChannelMessageAdapterFromOutbound({
      id: "powpow",
      outbound: powpowOutboundAdapter,
    }),
    status: {
      ...createComputedAccountStatusAdapter<PowPowAccount>({
        defaultRuntime: createDefaultChannelRuntimeState(DEFAULT_ACCOUNT_ID),
        collectStatusIssues: (accounts) =>
          collectStatusIssuesFromLastError("powpow", accounts),
        buildChannelSummary: ({ snapshot }) =>
          buildPassiveChannelStatusSummary(snapshot, {
            digitalHumanId:
              (snapshot as { digitalHumanId?: string }).digitalHumanId ?? null,
          }),
        resolveAccountSnapshot: ({ account, runtime }) => ({
          accountId: account.accountId,
          name: account.name,
          enabled: account.enabled,
          configured: account.configured,
          extra: {
            digitalHumanId: account.digitalHumanId,
            apiBaseUrl: account.apiBaseUrl,
            ...buildTrafficStatusSummary(runtime),
          },
        }),
      }),
    },
    gateway: { startAccount: startPowpowGatewayAccount },
  },
  security: { resolveDmPolicy: resolvePowpowDmPolicy },
  outbound: powpowPluginOutboundAdapter,
});
