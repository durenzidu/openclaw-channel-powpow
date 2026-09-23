import { ci as DurableMessageSendContextParams, oi as DurableMessageBatchSendResult, si as DurableMessageSendContext } from "./agent-harness-runtime-D1Ww9PgY.js";
import { r as OpenClawConfig } from "./types.openclaw-DRlyXvhd.js";
import { A as StreamingMode } from "./types.base-DSGitsUq.js";
import { $ as ChannelProgressLineOptions, Et as ChannelProgressDraftDiffStat, Q as ChannelProgressDraftLineInput, Y as AgentPlanStep, Z as ChannelProgressDraftLine } from "./templating-BzAleqvS.js";
import { f as ReplyPayload } from "./reply-payload-BCm_-KEH.js";
import { t as StreamingCompatEntry } from "./streaming-config-readers-o4peqeUt.js";
import { S as MessageReceipt, T as MessageReceiptSourceResult, _ as DurableFinalDeliveryRequirementMap, a as ChannelMessageLiveCapability, b as LivePreviewFinalizerCapability, c as ChannelMessageSendMediaContext, f as ChannelMessageSendTextContext, g as DurableFinalDeliveryCapability, h as DeriveDurableFinalDeliveryRequirementsParams, i as ChannelMessageLiveAdapterShape, l as ChannelMessageSendPayloadContext, n as ChannelMessageAdapterShape, o as ChannelMessageReceiveAckPolicy, s as ChannelMessageReceiveAdapterShape, t as ChannelMessageAdapter, u as ChannelMessageSendPollContext } from "./types-C5_n_uQW.js";
import { t as ChannelId } from "./channel-id.types-CjcGKHk0.js";
import "./types.core-D41vZ0PO.js";
import "./outbound.types-CeV7-M8Q.js";
import { l as ChannelIngressQueue, p as ChannelIngressQueuePruneOptions } from "./ingress-drain-Clu7Iu3e.js";
import { o as durable_delivery_d_exports } from "./receipt-QpWA1GhI.js";
import "./ingress-monitor-BABfG7Eq.js";
import "./draft-stream-controls-CcdiKWFz.js";
import "./runtime-forwarders-DRsdBI9x.js";
//#region src/channels/message/outbound-echo.d.ts
type OutboundMessageIdentityScope = {
  channel: string;
  accountId?: string;
  conversationId: string;
};
type OutboundMessageIdentity = OutboundMessageIdentityScope & ({
  messageId: string;
  sourceId?: string;
} | {
  messageId?: string;
  sourceId: string;
});
/** Records a platform message id emitted by a channel's own outbound send path. */
declare function recordOutboundMessageIdentity(identity: OutboundMessageIdentity): void;
/** Returns whether an inbound platform message matches a recently emitted outbound id. */
declare function isRecentOutboundMessageIdentity(identity: OutboundMessageIdentity): boolean;
//#endregion
//#region src/channels/message/ingress-errors.d.ts
/** Named ingress error factory shared by channel payload and admission failures. */
type ChannelIngressErrorClass<TError extends Error, TArgs extends unknown[]> = {
  new (...args: TArgs): TError;
  readonly name: string;
  readonly prototype: TError;
};
declare function createChannelIngressError(name: string): ChannelIngressErrorClass<Error, [message: string, options?: ErrorOptions]>;
declare function createChannelIngressError<TReason extends string>(name: string, options: {
  withReason: true;
}): ChannelIngressErrorClass<Error & {
  readonly reason: TReason;
}, [reason: TReason, message: string, errorOptions?: ErrorOptions]>;
//#endregion
//#region src/channels/message/ingress-claim-owner.d.ts
declare const INGRESS_CLAIM_PROCESS_ID: string;
declare function processPidFromOwnerId(ownerId: string): number;
//#endregion
//#region src/channels/typing-lifecycle.d.ts
type AsyncTick = () => Promise<void> | void;
type TypingKeepaliveLoop = {
  tick: () => Promise<void>;
  start: () => void;
  stop: () => void;
  isRunning: () => boolean;
};
/** Creates a cancellable keepalive loop for channel typing indicators. */
declare function createTypingKeepaliveLoop(params: {
  intervalMs: number;
  onTick: AsyncTick;
}): TypingKeepaliveLoop;
//#endregion
//#region src/channels/draft-streaming-chunking.d.ts
type ChannelDraftStreamingChunking = {
  minChars: number;
  maxChars: number;
  breakPreference: "paragraph" | "newline" | "sentence";
};
declare function resolveChannelDraftStreamingChunking(cfg: OpenClawConfig | undefined, channelId: ChannelId, accountId: string | null | undefined, opts: {
  fallbackLimit: number;
}): ChannelDraftStreamingChunking;
//#endregion
//#region src/channels/progress-draft-events.d.ts
type ChannelProgressDraftEventLine = string | ChannelProgressDraftLine;
type ChannelProgressDraftEventLineBuilder = (input: ChannelProgressDraftLineInput, options?: ChannelProgressLineOptions) => ChannelProgressDraftEventLine | undefined;
//#endregion
//#region src/channels/progress-draft-compositor.types.d.ts
type ChannelProgressDraftCompositorLine = string | ChannelProgressDraftLine;
type ChannelProgressDraftCompositorSnapshot = Readonly<{
  lines: readonly ChannelProgressDraftCompositorLine[];
  label?: string;
  statusHeadline?: string;
  statusHeadlineFormat?: "plain";
  plan?: readonly AgentPlanStep[];
  planExplanation?: string;
  planExplanationFormat?: "plain";
  preparedBlocks?: readonly {
    text: string;
    format: "plain" | "markdown";
  }[];
  diffStat?: ChannelProgressDraftDiffStat;
}>;
type ChannelProgressDraftUpdateOptions = {
  flush?: boolean;
  lines: readonly ChannelProgressDraftCompositorLine[];
  snapshot: ChannelProgressDraftCompositorSnapshot;
};
type ChannelProgressDraftCompositorParams = {
  /** @deprecated v2026.9.1 SDK presentation; retain until a breaking SDK release. */
  presentation?: "summary";
  entry: StreamingCompatEntry | null | undefined;
  mode: StreamingMode;
  active: boolean;
  seed: string;
  update: (text: string, options: ChannelProgressDraftUpdateOptions) => Promise<boolean | void> | boolean | void;
  deleteCurrent?: () => Promise<void> | void;
  tryNativeUpdate?: (text: string) => Promise<boolean> | boolean;
  /** Publish when structured lines change even if the rendered text does not. */
  updateOnLineChange?: boolean;
  /**
   * Set when the channel renders `update`'s structured `lines` itself, so the
   * composed text carries only the status block (label, headline, checklist).
   */
  rendersRollingLinesNatively?: boolean;
  formatLine?: (line: string) => string;
  formatPlainText?: (text: string) => string;
  isEmptyLine?: (line: ChannelProgressDraftCompositorLine | undefined) => boolean;
  shouldStartNow?: (line: ChannelProgressDraftCompositorLine | undefined) => boolean;
  reasoningLinePrefix?: string;
  commentaryLinePrefix?: string;
  reasoningGate?: boolean;
  commentaryItalics?: boolean;
  now?: () => number;
  setTimeoutFn?: typeof setTimeout;
  clearTimeoutFn?: typeof clearTimeout;
  /** Channel-specific formatter policy; event/lifecycle ownership remains in the compositor. */
  buildProgressEventLine?: ChannelProgressDraftEventLineBuilder;
};
//#endregion
//#region src/channels/progress-work-counter.d.ts
/**
 * Per-turn work counters for live channel progress surfaces. These describe the
 * turn while it runs; nothing here survives into the finished transcript.
 */
declare function createChannelProgressWorkCounter(params?: {
  now?: () => number;
}): {
  noteToolCall(toolName?: string): void;
  reset(): void;
  readonly toolCalls: number;
  readonly elapsedSeconds: number;
};
//#endregion
//#region src/channels/progress-draft-compositor.d.ts
declare function createChannelProgressDraftCompositor(params: ChannelProgressDraftCompositorParams): {
  pushToolEvent: (payload: {
    itemId?: string | undefined;
    toolCallId?: string | undefined;
    name?: string | undefined;
    phase?: string | undefined;
    args?: Record<string, unknown> | undefined;
  } & {
    detailMode?: "explain" | "raw";
  }) => Promise<boolean>;
  pushItemEvent: (payload: Omit<{
    itemId?: string | undefined;
    toolCallId?: string | undefined;
    itemKind?: string | undefined;
    title?: string | undefined;
    name?: string | undefined;
    phase?: string | undefined;
    status?: string | undefined;
    summary?: string | undefined;
    progressText?: string | undefined;
    meta?: string | undefined;
    commandBearing?: boolean | undefined;
  }, "itemKind"> & {
    kind?: string;
  }) => Promise<boolean>;
  pushCommandOutputEvent: (payload: {
    itemId?: string | undefined;
    toolCallId?: string | undefined;
    phase?: string | undefined;
    title?: string | undefined;
    name?: string | undefined;
    status?: string | undefined;
    exitCode?: number | null | undefined;
  }) => Promise<boolean>;
  pushPatchEvent: (payload: {
    itemId?: string | undefined;
    toolCallId?: string | undefined;
    phase?: string | undefined;
    title?: string | undefined;
    name?: string | undefined;
    added?: string[] | undefined;
    modified?: string[] | undefined;
    deleted?: string[] | undefined;
    summary?: string | undefined;
  }) => Promise<boolean>;
  previewToolProgressEnabled: boolean;
  commentaryProgressEnabled: boolean;
  suppressDefaultToolProgressMessages: boolean;
  hasStarted: boolean;
  isVisible: boolean;
  hasStatusHeadline: boolean;
  hasPlanProgress: boolean;
  getSnapshot: () => ChannelProgressDraftCompositorSnapshot;
  markFinalReplyStarted(): void;
  markFinalReplyDelivered(): void;
  beginNewTurn(options?: {
    force?: boolean;
  }): boolean;
  reset(): void;
  resetActivity(options?: {
    suppressed?: boolean;
  }): void;
  beginAssistantMessage(): void;
  resetReasoningProgress(this: void): void;
  mergeReasoningProgress: (text?: string, options?: {
    snapshot?: boolean;
  }) => string;
  suppress(): void;
  cancel(): void;
  start(): Promise<void>;
  noteActivity(options?: {
    startImmediately?: boolean;
  }): Promise<boolean>;
  pushToolProgress: (line?: ChannelProgressDraftCompositorLine, options?: {
    toolName?: string;
    startImmediately?: boolean;
    flush?: boolean;
  }) => Promise<boolean>;
  pushApprovalEvent(payload: Parameters<(payload: {
    approvalId?: string | undefined;
    phase?: string | undefined;
    title?: string | undefined;
    command?: string | undefined;
    reason?: string | undefined;
    message?: string | undefined;
  }) => Promise<boolean>>[0]): Promise<boolean>;
  pushPlanProgress(steps?: AgentPlanStep[], options?: {
    explanation?: string;
    explanationFormat?: "plain";
  }): Promise<boolean>;
  pushPreambleHeadline(text?: string, options?: {
    itemId?: string;
  }): Promise<boolean>;
  pushNarrationProgress(text?: string): Promise<boolean>;
  pushReasoningProgress(text?: string, options?: {
    snapshot?: boolean;
  }): Promise<boolean>;
  pushCommentaryProgress(text?: string, options?: {
    itemId?: string;
    complete?: boolean;
  }): Promise<boolean>;
};
//#endregion
//#region src/channels/message/capabilities.d.ts
/** Derives the adapter capabilities core needs before it can require durable final delivery. */
declare function deriveDurableFinalDeliveryRequirements(params: DeriveDurableFinalDeliveryRequirementsParams): DurableFinalDeliveryRequirementMap;
//#endregion
//#region src/channels/message/adapter.d.ts
declare const defaultManualReceiveAdapter: {
  readonly defaultAckPolicy: "manual";
  readonly supportedAckPolicies: readonly ["manual"];
};
type ChannelMessageAdapterWithDefaultReceive<TAdapter extends ChannelMessageAdapterShape> = TAdapter & {
  receive: TAdapter["receive"] extends undefined ? typeof defaultManualReceiveAdapter : NonNullable<TAdapter["receive"]>;
};
/** Defines a message adapter while defaulting receive acknowledgement to manual. */
declare function defineChannelMessageAdapter<const TAdapter extends ChannelMessageAdapterShape>(adapter: TAdapter): ChannelMessageAdapter<ChannelMessageAdapterWithDefaultReceive<TAdapter>>;
//#endregion
//#region src/channels/message/outbound-bridge.d.ts
/** Send result accepted from legacy outbound bridge methods before receipt normalization. */
type ChannelMessageOutboundBridgeResult = MessageReceiptSourceResult & {
  receipt?: MessageReceipt;
  messageId?: string;
};
type ChannelMessageOutboundBridgeContext<TContext> = Omit<TContext, "onDeliveryResult"> & {
  onDeliveryResult?: (result: ChannelMessageOutboundBridgeResult) => Promise<void> | void;
};
/** Legacy outbound adapter shape bridged into the channel message adapter contract. */
type ChannelMessageOutboundBridgeAdapter<TConfig = unknown> = {
  deliveryCapabilities?: {
    durableFinal?: DurableFinalDeliveryRequirementMap;
  };
  sendText?: (ctx: ChannelMessageOutboundBridgeContext<ChannelMessageSendTextContext<TConfig>>) => Promise<ChannelMessageOutboundBridgeResult>;
  sendMedia?: (ctx: ChannelMessageOutboundBridgeContext<ChannelMessageSendMediaContext<TConfig>>) => Promise<ChannelMessageOutboundBridgeResult>;
  sendPayload?: (ctx: ChannelMessageOutboundBridgeContext<ChannelMessageSendPayloadContext<TConfig>>) => Promise<ChannelMessageOutboundBridgeResult>;
  sendPoll?: (ctx: ChannelMessageOutboundBridgeContext<ChannelMessageSendPollContext<TConfig>>) => Promise<ChannelMessageOutboundBridgeResult>;
};
/** Options for building a message adapter from legacy outbound send functions. */
type CreateChannelMessageAdapterFromOutboundParams<TConfig = unknown> = {
  id?: string;
  outbound: ChannelMessageOutboundBridgeAdapter<TConfig>;
  capabilities?: DurableFinalDeliveryRequirementMap;
  live?: ChannelMessageLiveAdapterShape;
  receive?: ChannelMessageReceiveAdapterShape;
};
/** Converts legacy outbound send methods into a typed channel message adapter. */
declare function createChannelMessageAdapterFromOutbound<TConfig = unknown>(params: CreateChannelMessageAdapterFromOutboundParams<TConfig>): ChannelMessageAdapterShape<TConfig>;
//#endregion
//#region src/channels/message/durable-receive.d.ts
/** Pending inbound receive record kept until agent dispatch or durable send completes. */
type DurableInboundReceivePendingRecord<TPayload, TMetadata = unknown> = {
  id: string;
  payload: TPayload;
  metadata?: TMetadata;
  receivedAt: number;
  updatedAt: number;
  attempts: number;
  lastAttemptAt?: number;
  lastError?: string;
};
/** Completed inbound receive tombstone used to detect duplicate platform events. */
type DurableInboundReceiveCompletedRecord<TMetadata = unknown> = {
  id: string;
  completedAt: number;
  metadata?: TMetadata;
};
/** Accept result for a new or duplicate inbound platform event. */
type DurableInboundReceiveAcceptResult<TPayload, TMetadata, TCompletedMetadata> = {
  kind: "accepted";
  duplicate: false;
  record: DurableInboundReceivePendingRecord<TPayload, TMetadata>;
} | {
  kind: "pending";
  duplicate: true;
  record: DurableInboundReceivePendingRecord<TPayload, TMetadata>;
} | {
  kind: "completed";
  duplicate: true;
  record: DurableInboundReceiveCompletedRecord<TCompletedMetadata>;
};
/** Options recorded when accepting a pending inbound event. */
type DurableInboundReceiveAcceptOptions<TMetadata> = {
  metadata?: TMetadata;
  receivedAt?: number;
};
/** Options recorded when marking an inbound event complete. */
type DurableInboundReceiveCompleteOptions<TCompletedMetadata> = {
  metadata?: TCompletedMetadata;
  completedAt?: number;
};
/** Options recorded when releasing an inbound event for retry. */
type DurableInboundReceiveReleaseOptions = {
  lastError?: string;
  releasedAt?: number;
};
/** Durable receive journal facade used by channel receive pipelines. */
type DurableInboundReceiveJournal<TPayload, TMetadata, TCompletedMetadata> = {
  accept(id: string, payload: TPayload, options?: DurableInboundReceiveAcceptOptions<TMetadata>): Promise<DurableInboundReceiveAcceptResult<TPayload, TMetadata, TCompletedMetadata>>;
  pending(): Promise<Array<DurableInboundReceivePendingRecord<TPayload, TMetadata>>>;
  complete(id: string, options?: DurableInboundReceiveCompleteOptions<TCompletedMetadata>): Promise<void>;
  release(id: string, options?: DurableInboundReceiveReleaseOptions): Promise<boolean>;
  deletePending(id: string): Promise<boolean>;
};
/** Queue-backed durable receive journal options with optional retention pruning. */
type DurableInboundReceiveQueueJournalOptions<TPayload, TMetadata, TCompletedMetadata> = {
  queue: ChannelIngressQueue<TPayload, TMetadata, TCompletedMetadata>;
  retention?: ChannelIngressQueuePruneOptions;
};
/** Adapts the shared channel ingress queue to the durable receive journal API. */
declare function createDurableInboundReceiveJournalFromQueue<TPayload, TMetadata = unknown, TCompletedMetadata = unknown>(options: DurableInboundReceiveQueueJournalOptions<TPayload, TMetadata, TCompletedMetadata>): DurableInboundReceiveJournal<TPayload, TMetadata, TCompletedMetadata>;
//#endregion
//#region src/channels/message/contracts.d.ts
type DurableFinalCapabilityProof = () => Promise<void> | void;
type DurableFinalCapabilityProofMap = Partial<Record<DurableFinalDeliveryCapability, DurableFinalCapabilityProof>>;
type DurableFinalCapabilityProofResult = {
  capability: DurableFinalDeliveryCapability;
  status: "verified" | "not_declared";
};
type LivePreviewFinalizerCapabilityProof = () => Promise<void> | void;
type ChannelMessageLiveCapabilityProof = () => Promise<void> | void;
type ChannelMessageReceiveAckPolicyProof = () => Promise<void> | void;
type LivePreviewFinalizerCapabilityProofMap = Partial<Record<LivePreviewFinalizerCapability, LivePreviewFinalizerCapabilityProof>>;
type ChannelMessageLiveCapabilityProofMap = Partial<Record<ChannelMessageLiveCapability, ChannelMessageLiveCapabilityProof>>;
type ChannelMessageReceiveAckPolicyProofMap = Partial<Record<ChannelMessageReceiveAckPolicy, ChannelMessageReceiveAckPolicyProof>>;
type LivePreviewFinalizerCapabilityProofResult = {
  capability: LivePreviewFinalizerCapability;
  status: "verified" | "not_declared";
};
type ChannelMessageLiveCapabilityProofResult = {
  capability: ChannelMessageLiveCapability;
  status: "verified" | "not_declared";
};
type ChannelMessageReceiveAckPolicyProofResult = {
  policy: ChannelMessageReceiveAckPolicy;
  status: "verified" | "not_declared";
};
/**
 * Verifies proof callbacks for every declared durable-final delivery capability.
 */
declare function verifyDurableFinalCapabilityProofs(params: {
  adapterName: string;
  capabilities?: DurableFinalDeliveryRequirementMap;
  proofs: DurableFinalCapabilityProofMap;
}): Promise<DurableFinalCapabilityProofResult[]>;
/**
 * Verifies durable-final proofs from a channel message adapter declaration.
 */
declare function verifyChannelMessageAdapterCapabilityProofs(params: {
  adapterName: string;
  adapter: Pick<ChannelMessageAdapterShape, "durableFinal">;
  proofs: DurableFinalCapabilityProofMap;
}): Promise<DurableFinalCapabilityProofResult[]>;
/**
 * Verifies receive acknowledgement proofs from a channel message adapter declaration.
 */
declare function verifyChannelMessageReceiveAckPolicyAdapterProofs(params: {
  adapterName: string;
  adapter: Pick<ChannelMessageAdapterShape, "receive">;
  proofs: ChannelMessageReceiveAckPolicyProofMap;
}): Promise<ChannelMessageReceiveAckPolicyProofResult[]>;
/**
 * Verifies live-preview finalizer proofs from a channel message adapter declaration.
 */
declare function verifyChannelMessageLiveFinalizerProofs(params: {
  adapterName: string;
  adapter: Pick<ChannelMessageAdapterShape, "live">;
  proofs: LivePreviewFinalizerCapabilityProofMap;
}): Promise<LivePreviewFinalizerCapabilityProofResult[]>;
/**
 * Verifies live message capability proofs from a channel message adapter declaration.
 */
declare function verifyChannelMessageLiveCapabilityAdapterProofs(params: {
  adapterName: string;
  adapter: Pick<ChannelMessageAdapterShape, "live">;
  proofs: ChannelMessageLiveCapabilityProofMap;
}): Promise<ChannelMessageLiveCapabilityProofResult[]>;
//#endregion
//#region src/channels/message/receive.d.ts
/** Public alias for channel receive acknowledgement policy names. */
type MessageAckPolicy = ChannelMessageReceiveAckPolicy;
/** Processing stage where a durable inbound message may be acknowledged. */
type MessageAckStage = "receive_record" | "agent_dispatch" | "durable_send" | "manual";
/** Current acknowledgement state for one inbound message context. */
type MessageAckState = "pending" | "acked" | "nacked";
/** Mutable receive context passed through durable inbound message processing. */
type MessageReceiveContext<TMessage = unknown> = {
  id: string;
  channel: string;
  accountId?: string;
  message: TMessage;
  ackPolicy: MessageAckPolicy;
  ackState: MessageAckState;
  ackedAt?: number;
  nackErrorMessage?: string;
  receivedAt: number;
  signal: AbortSignal;
  shouldAckAfter(stage: MessageAckStage): boolean;
  ack(): Promise<void>;
  nack(error: unknown): Promise<void>;
};
/** Creates a receive context with idempotent ack and explicit nack state transitions. */
declare function createMessageReceiveContext<TMessage>(params: {
  id: string;
  channel: string;
  accountId?: string;
  message: TMessage;
  ackPolicy?: MessageAckPolicy;
  receivedAt?: number;
  signal?: AbortSignal;
  onAck?: () => Promise<void> | void;
  onNack?: (error: unknown) => Promise<void> | void;
}): MessageReceiveContext<TMessage>;
//#endregion
//#region src/channels/streaming-final-text.d.ts
declare function isPotentialTruncatedFinal(finalText: string): boolean;
declare function selectLongerFinalText(params: {
  finalText: string;
  candidateTexts: readonly (string | undefined)[];
}): string | undefined;
declare function resolveTranscriptBackedChannelFinalText(params: {
  payload?: ReplyPayload;
  finalText: string;
  resolveCandidateText: () => Promise<string | undefined>;
}): Promise<string>;
//#endregion
//#region src/plugin-sdk/channel-outbound.d.ts
type ChannelDurableDeliveryModule = typeof durable_delivery_d_exports;
/** @deprecated The streaming.progress.render key was retired (#122927). */
type ChannelProgressDraftRenderMode = "rich" | "text";
/**
 * @deprecated Load-only bridge: the published Slack channel package
 * (2026.7.2-beta.7 and earlier) imports this at module top level, so removing
 * it makes the installed plugin fail to load after a core upgrade. The config
 * key it read is retired and doctor strips it, so this resolves the same
 * "text"/"rich" answer pre-doctor configs produced and the default otherwise.
 * Remove once managed releases have replaced the old npm latest/extended-stable
 * packages and their upgrade window has closed.
 */
declare function resolveChannelProgressDraftRender(entry: StreamingCompatEntry | null | undefined, defaultValue?: ChannelProgressDraftRenderMode): ChannelProgressDraftRenderMode;
/** Lazily forwards inbound reply delivery through the channel turn durable-delivery module. */
declare const deliverInboundReplyWithMessageSendContext: ChannelDurableDeliveryModule["deliverInboundReplyWithMessageSendContextCore"];
/** Sends a durable message batch without eager-loading channel message runtime internals. */
declare function sendDurableMessageBatch(
/**
 * Durable send context and outbound batch data forwarded to the channel runtime.
 */
params: DurableMessageSendContextParams): Promise<DurableMessageBatchSendResult>;
/** Runs work inside a durable message send context loaded through the SDK lazy boundary. */
declare function withDurableMessageSendContext<T>(
/**
 * Durable send context used to bind sends, receipts, and lifecycle callbacks.
 */
params: DurableMessageSendContextParams,
/**
 * Callback executed with the loaded durable-send runtime context.
 */
run: (ctx: DurableMessageSendContext) => Promise<T>): Promise<T>;
//#endregion
export { createChannelIngressError as A, ChannelProgressDraftCompositorLine as C, createTypingKeepaliveLoop as D, resolveChannelDraftStreamingChunking as E, isRecentOutboundMessageIdentity as M, recordOutboundMessageIdentity as N, INGRESS_CLAIM_PROCESS_ID as O, createChannelProgressWorkCounter as S, ChannelDraftStreamingChunking as T, createDurableInboundReceiveJournalFromQueue as _, withDurableMessageSendContext as a, deriveDurableFinalDeliveryRequirements as b, selectLongerFinalText as c, createMessageReceiveContext as d, verifyChannelMessageAdapterCapabilityProofs as f, verifyDurableFinalCapabilityProofs as g, verifyChannelMessageReceiveAckPolicyAdapterProofs as h, sendDurableMessageBatch as i, OutboundMessageIdentity as j, processPidFromOwnerId as k, MessageAckPolicy as l, verifyChannelMessageLiveFinalizerProofs as m, deliverInboundReplyWithMessageSendContext as n, isPotentialTruncatedFinal as o, verifyChannelMessageLiveCapabilityAdapterProofs as p, resolveChannelProgressDraftRender as r, resolveTranscriptBackedChannelFinalText as s, ChannelProgressDraftRenderMode as t, MessageReceiveContext as u, createChannelMessageAdapterFromOutbound as v, ChannelProgressDraftCompositorSnapshot as w, createChannelProgressDraftCompositor as x, defineChannelMessageAdapter as y };