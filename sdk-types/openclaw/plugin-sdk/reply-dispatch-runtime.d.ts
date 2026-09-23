import { Qc as finalizeInboundContextForSdk, el as DispatchReplyWithBufferedBlockDispatcher, tl as DispatchReplyWithDispatcher } from "../agent-harness-runtime-D1Ww9PgY.js";
import { It as CommandTurnContext } from "../templating-BzAleqvS.js";
import { h as resolveChunkMode } from "../outbound.types-CeV7-M8Q.js";
import { i as ReplyPayload } from "../reply-payload-Cr0iJ4Vt.js";
import { n as generateConversationLabel } from "../conversation-label-generator-CUFgwZBz.js";
//#region src/plugin-sdk/reply-dispatch-runtime.d.ts
/** Dispatches a reply with buffered block support after lazy-loading the runtime dispatcher. */
export declare const dispatchReplyWithBufferedBlockDispatcher: DispatchReplyWithBufferedBlockDispatcher;
/** Dispatches a reply through the provider dispatcher after lazy-loading runtime code. */
export declare const dispatchReplyWithDispatcher: DispatchReplyWithDispatcher;
//#endregion
export { type CommandTurnContext, type DispatchReplyWithBufferedBlockDispatcher, type DispatchReplyWithDispatcher, type ReplyPayload, finalizeInboundContextForSdk as finalizeInboundContext, generateConversationLabel, resolveChunkMode };