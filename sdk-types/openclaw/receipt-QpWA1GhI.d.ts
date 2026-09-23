import { Ec as DurableFinalDeliveryRequirements, Tc as DurableFinalDeliveryRequirement, ec as ChannelDeliveryInfo, nc as ChannelDeliveryResult, wc as DeliverOutboundPayloadsParams } from "./agent-harness-runtime-D1Ww9PgY.js";
import { r as OpenClawConfig } from "./types.openclaw-DRlyXvhd.js";
import { kt as ExecutionIdentityAdmissionToken, r as FinalizedMsgContext } from "./templating-BzAleqvS.js";
import { f as ReplyPayload } from "./reply-payload-BCm_-KEH.js";
import { S as MessageReceipt, T as MessageReceiptSourceResult, w as MessageReceiptPartKind } from "./types-C5_n_uQW.js";
declare namespace durable_delivery_d_exports {
  export { DurableInboundReplyDeliveryOptions, DurableInboundReplyDeliveryParams, deliverInboundReplyWithMessageSendContextCore, isDurableInboundReplyDeliveryHandled, throwIfDurableInboundReplyDeliveryFailed };
}
/** Options controlling durable final delivery for inbound channel replies. */
type DurableInboundReplyDeliveryOptions = Pick<DeliverOutboundPayloadsParams, "deps" | "formatting" | "identity" | "mediaAccess" | "replyToMode" | "silent" | "threadId"> & {
  to?: string | null;
  replyToId?: string | null;
  requiredCapabilities?: DurableFinalDeliveryRequirements;
};
/** Full context required to deliver one inbound final reply through durable message sending. */
type DurableInboundReplyDeliveryParams = DurableInboundReplyDeliveryOptions & {
  cfg: OpenClawConfig;
  channel: string;
  accountId?: string;
  agentId: string;
  ctxPayload: FinalizedMsgContext;
  payload: ReplyPayload;
  info: ChannelDeliveryInfo;
  runId?: string;
  executionIdentityToken?: ExecutionIdentityAdmissionToken;
};
/** Outcome of attempting durable final delivery for an inbound reply payload. */
type DurableInboundReplyDeliveryResult = {
  status: "not_applicable";
  reason: "non_final";
} | {
  status: "unsupported";
  reason: "missing_channel" | "missing_target" | "missing_outbound_handler" | "capability_mismatch";
  capability?: DurableFinalDeliveryRequirement;
} | {
  status: "handled_visible";
  delivery: ChannelDeliveryResult;
} | {
  status: "handled_no_send";
  reason: "no_visible_result";
  delivery: ChannelDeliveryResult;
} | {
  status: "failed";
  error: unknown;
  sentBeforeError?: true;
};
/** Narrows durable delivery results that handled the payload without caller fallback. */
declare function isDurableInboundReplyDeliveryHandled(result: DurableInboundReplyDeliveryResult): result is Extract<DurableInboundReplyDeliveryResult, {
  status: "handled_visible" | "handled_no_send";
}>;
/** Throws failed durable delivery results, preserving visible-send metadata when applicable. */
declare function throwIfDurableInboundReplyDeliveryFailed(result: DurableInboundReplyDeliveryResult): void;
/** Delivers final inbound replies through the durable message-send context when supported. */
declare function deliverInboundReplyWithMessageSendContextCore(input: DurableInboundReplyDeliveryParams): Promise<DurableInboundReplyDeliveryResult>;
//#endregion
//#region src/channels/message/receipt.d.ts
type MessageReceiptInputResult = MessageReceiptSourceResult & {
  receipt?: MessageReceipt;
};
/** Builds one normalized receipt from platform send results or nested adapter receipts. */
declare function createMessageReceiptFromOutboundResults(params: {
  results: readonly MessageReceiptInputResult[];
  kind?: MessageReceiptPartKind;
  threadId?: string;
  replyToId?: string;
  sentAt?: number;
}): MessageReceipt;
/** Lists unique platform message ids in receipt order. */
declare function listMessageReceiptPlatformIds(receipt: MessageReceipt): string[];
/** Resolves the explicit primary platform id, falling back to the first unique receipt id. */
declare function resolveMessageReceiptPrimaryId(receipt: MessageReceipt): string | undefined;
//#endregion
export { DurableInboundReplyDeliveryParams as a, DurableInboundReplyDeliveryOptions as i, listMessageReceiptPlatformIds as n, durable_delivery_d_exports as o, resolveMessageReceiptPrimaryId as r, createMessageReceiptFromOutboundResults as t };