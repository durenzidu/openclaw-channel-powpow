import { n as meetsIdentifierAuthentication, t as IdentifierAuthentication } from "../identifier-authentication-6OYoykD9.js";
import { $ as ResolvedChannelImplicitMentions, A as ChannelMessageIngressCommandInput, B as ChannelIngressPolicyInput, C as ChannelIngressIdentityDescriptor, D as ChannelIngressResolverMessageParams, E as ChannelIngressResolver, F as StableChannelIngressIdentityParams, H as ChannelIngressStateInput, I as AccessGroupMembershipFact, L as ChannelIngressDecision, M as ResolveChannelMessageIngressParams, N as ResolveStableChannelMessageIngressParams, O as ChannelIngressRouteAccess, P as ResolvedChannelMessageIngress, R as ChannelIngressEventInput, S as ChannelIngressIdentityAlias, T as ChannelIngressIdentitySubjectInput, U as IngressReasonCode, V as ChannelIngressState, b as ChannelIngressContextBinding, et as resolveChannelImplicitMentions, g as ChannelIngressAccessGroupMembershipResolver, j as CreateChannelIngressResolverParams, k as ChannelIngressRouteDescriptor, v as ChannelIngressCommandPresetInput, w as ChannelIngressIdentityField, x as ChannelIngressEventPresetInput, y as ChannelIngressConfigInput, z as ChannelIngressIdentifierKind } from "../ingress-drain-Clu7Iu3e.js";
import { t as PairingChannel } from "../pairing-store.types-UJmymZwR.js";
import { a as ChannelIngressMonitorFacts, c as CreateChannelIngressMonitorOptions, i as ChannelIngressMonitorDrainOptions, o as ChannelIngressMonitorLifecycle, s as ChannelIngressMonitorPayloadCodec } from "../ingress-monitor-BABfG7Eq.js";
//#region src/channels/message-access/runtime.d.ts
/**
 * Create a reusable ingress resolver for one channel account and identity
 * descriptor.
 */
export declare function createChannelIngressResolver(base: CreateChannelIngressResolverParams): ChannelIngressResolver;
/**
 * Resolve one inbound event using a simple stable subject identity descriptor.
 */
export declare function resolveStableChannelMessageIngress(params: ResolveStableChannelMessageIngressParams): Promise<ResolvedChannelMessageIngress>;
/**
 * Collect optional route descriptors while dropping false, null, and undefined
 * entries.
 */
export declare function channelIngressRoutes(...routes: Array<ChannelIngressRouteDescriptor | false | null | undefined>): ChannelIngressRouteDescriptor[];
/**
 * Resolve sender, route, command, event, and activation gates for one inbound
 * channel event.
 */
export declare function resolveChannelMessageIngress(params: ResolveChannelMessageIngressParams): Promise<ResolvedChannelMessageIngress>;
//#endregion
//#region src/channels/message-access/runtime-identity.d.ts
/** Build an identity descriptor for channels with one stable id and optional aliases. */
export declare function defineStableChannelIngressIdentity(params?: StableChannelIngressIdentityParams): ChannelIngressIdentityDescriptor;
/** Classify configured entries without needing a sender or granting admission. */
export declare function identityEntryAuthenticationClassifier(identity: ChannelIngressIdentityDescriptor | StableChannelIngressIdentityParams): (raw: string) => IdentifierAuthentication | undefined;
//#endregion
//#region src/channels/message-access/store-allow-from.d.ts
/**
 * Read pairing-store allowlist entries when a direct-message policy permits
 * store fallback.
 */
export declare function readChannelIngressStoreAllowFromForDmPolicy(params: {
  provider: PairingChannel;
  accountId: string;
  dmPolicy?: string | null;
  shouldRead?: boolean | null;
  readStore?: (provider: PairingChannel, accountId: string) => Promise<string[]>;
}): Promise<string[]>;
//#endregion
//#region src/plugin-sdk/channel-ingress-runtime.d.ts
type ChannelIngressLifecycle = Omit<ChannelIngressMonitorLifecycle, "admission">;
type StandardRawEventPayload = {
  version: 1;
  rawEvent: string;
};
type StandardRawEventAdmission<TInspection> = {
  kind: "invalid";
  message: string;
} | {
  kind: "durable" | (null extends TInspection ? "ignored" : never);
};
type StandardRawEventIngressOptions<TRaw, TMetadata, TInspection> = Omit<CreateChannelIngressMonitorOptions<TRaw, string, StandardRawEventPayload, TMetadata>, "admissionMode" | "drain" | "inspect" | "inspectAsync" | "payload" | "pollIntervalMs" | "retention"> & {
  inspect: (raw: TRaw) => TInspection;
  payload: Omit<ChannelIngressMonitorPayloadCodec<TRaw, string, StandardRawEventPayload, TMetadata>, "storage" | "version">;
  pollIntervalMs?: number;
  drain?: Omit<ChannelIngressMonitorDrainOptions<StandardRawEventPayload, TMetadata>, "startLimit">;
  classifyAdmissionError: (error: unknown) => string | undefined;
};
/** Version-1 raw events, 500 ms polling, eight deliveries, and standard retention. */
export declare function createStandardRawEventIngressMonitor<TRaw, TMetadata, TInspection extends ChannelIngressMonitorFacts | null>(options: StandardRawEventIngressOptions<TRaw, TMetadata, TInspection>): {
  receive: (raw: TRaw) => Promise<StandardRawEventAdmission<TInspection>>;
  start: () => void;
  stop: () => Promise<void>;
  waitForIdle: () => Promise<void>;
};
/** Fan one logical inbound turn's ownership lifecycle across its durable claims. */
export declare function fanInChannelIngressLifecycles(inputs: readonly (ChannelIngressLifecycle | undefined)[]): {
  lifecycle: ChannelIngressLifecycle | undefined;
  settle: () => Promise<void>;
  abandon: (error?: unknown) => Promise<void>;
  cancel: () => Promise<void>;
};
//#endregion
export { type AccessGroupMembershipFact, type ChannelIngressAccessGroupMembershipResolver, type ChannelIngressCommandPresetInput, type ChannelIngressConfigInput, type ChannelIngressContextBinding, type ChannelIngressDecision, type ChannelIngressEventInput, type ChannelIngressEventPresetInput, type ChannelIngressIdentifierKind, type ChannelIngressIdentityAlias, type ChannelIngressIdentityDescriptor, type ChannelIngressIdentityField, type ChannelIngressIdentitySubjectInput, type ChannelIngressPolicyInput, type ChannelIngressResolver, type ChannelIngressResolverMessageParams, type ChannelIngressRouteAccess, type ChannelIngressRouteDescriptor, type ChannelIngressState, type ChannelIngressStateInput, type ChannelMessageIngressCommandInput, type CreateChannelIngressResolverParams, type IdentifierAuthentication, type IngressReasonCode, type ResolveChannelMessageIngressParams, type ResolveStableChannelMessageIngressParams, type ResolvedChannelImplicitMentions, type ResolvedChannelMessageIngress, type StableChannelIngressIdentityParams, meetsIdentifierAuthentication, resolveChannelImplicitMentions };