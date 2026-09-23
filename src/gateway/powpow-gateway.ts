/**
 * PowPow 网关账号生命周期
 * runPassiveAccountLifecycle 包裹：history 轮询 + Supabase Realtime 双链路收信，
 * dispatchInboundDirectDm 分发入站消息，webhook/receive 回信
 */

import type { ChannelPlugin } from "openclaw/plugin-sdk/channel-core";
import { runPassiveAccountLifecycle } from "openclaw/plugin-sdk/channel-outbound";
import {
  resolveStableChannelMessageIngress,
  type ChannelIngressContextBinding,
  type ResolvedChannelMessageIngress,
} from "openclaw/plugin-sdk/channel-ingress-runtime";
import { dispatchInboundDirectDm } from "openclaw/plugin-sdk/channel-inbound";
import { channelReadyPatch } from "openclaw/plugin-sdk/gateway-runtime";
import {
  sanitizeAssistantVisibleText,
  stripMarkdown,
} from "openclaw/plugin-sdk/text-chunking";
import { HistoryPoller } from "./history-poller.js";
import { RealtimeSubscriber } from "./realtime-subscriber.js";
import { MessageDedup } from "./message-dedup.js";
import {
  extractMessageContent,
  normalizeDbRow,
  normalizeHistoryMessage,
} from "../messaging/inbound-handler.js";
import { sendReply } from "../messaging/send-service.js";
import type { NormalizedInbound, PowPowAccount } from "../types.js";

type PowpowGatewayContext = Parameters<
  NonNullable<
    NonNullable<ChannelPlugin<PowPowAccount>["gateway"]>["startAccount"]
  >
>[0];

const powpowIngressIdentity = {
  key: "powpow-user-id",
  normalizeEntry: (entry: string) => entry.trim(),
  normalizeSubject: (id: string) => id.trim(),
  sensitivity: "pii",
  entryIdPrefix: "powpow-entry",
} as const;

export async function startPowpowGatewayAccount(
  ctx: PowpowGatewayContext
): Promise<void> {
  const account: PowPowAccount = ctx.account;

  ctx.setStatus({
    accountId: account.accountId,
    lifecycle: "starting",
  });
  ctx.log?.info?.(
    `[${account.accountId}] starting PowPow channel (digital human: ${account.digitalHumanId})`
  );

  if (!account.configured) {
    throw new Error(
      "PowPow digital human id and webhook token are required"
    );
  }
  const channelRuntime = ctx.channelRuntime as unknown as
    | { inbound?: { buildContext?: unknown } }
    | undefined;
  if (!channelRuntime?.inbound?.buildContext) {
    throw new Error(
      "PowPow requires its registered channel runtime context builder"
    );
  }

  const config = account.config;
  const pollEnabled = config.pollEnabled !== false;
  const realtimeEnabled =
    config.realtimeEnabled !== false &&
    Boolean(account.supabaseUrl && account.supabaseAnonKey);
  const pollIntervalMs = Math.max(1000, config.pollIntervalMs ?? 5000);
  const historyLimit = config.historyLimit ?? 50;
  const requestTimeoutMs = config.requestTimeoutMs ?? 10000;
  const maxRetries = config.maxRetries ?? 3;
  const maxMessageLength = config.maxMessageLength ?? 2000;

  const resolveInboundAccess = async (
    senderId: string,
    sessionId: string,
    contextBinding?: ChannelIngressContextBinding
  ): Promise<ResolvedChannelMessageIngress> =>
    await resolveStableChannelMessageIngress({
      channelId: "powpow",
      accountId: account.accountId,
      identity: powpowIngressIdentity,
      cfg: ctx.cfg,
      useDefaultPairingStore: true,
      subject: { stableId: senderId },
      conversation: {
        kind: "direct",
        id: sessionId,
      },
      contextBinding,
      dmPolicy: config.dmPolicy ?? "open",
      allowFrom: config.allowFrom,
    });

  const dedup = new MessageDedup();

  const dispatchInbound = async (inbound: NormalizedInbound): Promise<void> => {
    const resolvedAccess = await resolveInboundAccess(
      inbound.senderId,
      inbound.sessionId
    );
    if (resolvedAccess.senderAccess.decision !== "allow") {
      ctx.log?.warn?.(
        `[${account.accountId}] dropping PowPow message from ${inbound.senderId} (${resolvedAccess.senderAccess.reasonCode})`
      );
      return;
    }

    const bodyForAgent = extractMessageContent(
      inbound.contentType,
      inbound.content
    );

    await dispatchInboundDirectDm({
      channelRuntime,
      resolveChannelIngress: async (contextBinding) => {
        const exactAccess = await resolveInboundAccess(
          inbound.senderId,
          inbound.sessionId,
          contextBinding
        );
        if (!exactAccess.senderAccess.allowed) {
          throw new Error(
            `PowPow sender authorization changed before dispatch (${inbound.senderId})`
          );
        }
        return exactAccess;
      },
      cfg: ctx.cfg,
      channel: "powpow",
      channelLabel: "PowPow",
      accountId: account.accountId,
      peer: {
        kind: "direct",
        id: inbound.sessionId,
      },
      senderId: inbound.senderId,
      senderAddress: `powpow:${inbound.senderId}`,
      recipientAddress: `powpow:${account.digitalHumanId}`,
      conversationLabel: `PowPow session ${inbound.sessionId}`,
      rawBody: inbound.content,
      bodyForAgent,
      messageId: inbound.messageId,
      timestamp: inbound.timestamp,
      commandAuthorized: resolvedAccess.commandAccess.requested
        ? resolvedAccess.commandAccess.authorized
        : undefined,
      deliver: async (payload) => {
        const outboundText = payload?.text ?? "";
        const sanitizedText = sanitizeAssistantVisibleText(outboundText);
        if (!sanitizedText) return;
        const message = stripMarkdown(sanitizedText);
        if (!message) return;
        await sendReply({
          apiBaseUrl: account.apiBaseUrl,
          digitalHumanId: account.digitalHumanId,
          webhookToken: account.webhookToken,
          content: message.slice(0, maxMessageLength),
          sessionId: inbound.sessionId,
          openclawUserId: inbound.senderId,
          requestTimeoutMs,
          maxRetries,
        });
      },
      onRecordError: (err) => {
        ctx.log?.error?.(
          `[${account.accountId}] failed recording PowPow inbound session: ${String(err)}`
        );
      },
      onDispatchError: (err, info) => {
        ctx.log?.error?.(
          `[${account.accountId}] PowPow ${info.kind} reply failed: ${String(err)}`
        );
      },
    });
  };

  let inboundQueue: NormalizedInbound[] = [];
  let processing = false;
  const processQueue = async (): Promise<void> => {
    if (processing) return;
    processing = true;
    try {
      while (inboundQueue.length > 0) {
        const next = inboundQueue.shift();
        if (!next) break;
        await dispatchInbound(next);
      }
    } finally {
      processing = false;
    }
  };

  const handleInbound = (inbound: NormalizedInbound | null): void => {
    if (!inbound) return;
    if (!dedup.markSeen(inbound.messageId)) return;
    inboundQueue.push(inbound);
    void processQueue().catch((err) => {
      ctx.log?.error?.(
        `[${account.accountId}] PowPow inbound dispatch failed: ${String(err)}`
      );
    });
  };

  await runPassiveAccountLifecycle({
    abortSignal: ctx.abortSignal,
    start: async () => {
      const poller = pollEnabled
        ? new HistoryPoller({
            apiBaseUrl: account.apiBaseUrl,
            digitalHumanId: account.digitalHumanId,
            accountId: account.accountId,
            limit: historyLimit,
            intervalMs: pollIntervalMs,
            requestTimeoutMs,
            onUserMessages: (messages) => {
              for (const message of messages) {
                handleInbound(normalizeHistoryMessage(message));
              }
            },
            onError: (error) => {
              ctx.log?.debug?.(
                `[${account.accountId}] history poll failed: ${String(error)}`
              );
            },
          })
        : null;

      const realtime = realtimeEnabled
        ? new RealtimeSubscriber({
            supabaseUrl: account.supabaseUrl ?? "",
            supabaseAnonKey: account.supabaseAnonKey ?? "",
            digitalHumanId: account.digitalHumanId,
            accountId: account.accountId,
            onUserMessage: (row) => {
              handleInbound(normalizeDbRow(row));
            },
          })
        : null;

      if (poller) {
        await poller.start((ids) => {
          for (const id of ids) {
            dedup.markSeen(id);
          }
        });
      }
      if (realtime) {
        await realtime.start();
      }

      ctx.setStatus(channelReadyPatch({ accountId: account.accountId }));
      ctx.log?.info?.(
        `[${account.accountId}] PowPow channel started (polling: ${pollEnabled ? `on @ ${pollIntervalMs}ms` : "off"}, realtime: ${realtimeEnabled ? "on" : "off"})`
      );

      return {
        stop: async () => {
          inboundQueue = [];
          poller?.stop();
          await realtime?.stop();
          ctx.log?.info?.(`[${account.accountId}] PowPow channel stopped`);
        },
      };
    },
  });
}
