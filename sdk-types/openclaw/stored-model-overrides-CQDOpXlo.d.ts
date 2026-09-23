import { r as OpenClawConfig } from "./types.openclaw-DRlyXvhd.js";
import { j as SessionEntry, s as MsgContext } from "./templating-BzAleqvS.js";
import { t as ChannelId } from "./channel-id.types-CjcGKHk0.js";
import { b as ChannelMessagingAdapter } from "./types.core-D41vZ0PO.js";
import { g as ModelFallbackRouteResolution } from "./model-selection-CpOQi1Qo.js";
import "./types.public-DyN6AInF.js";
//#region src/channels/native-command-session-targets.d.ts
/**
 * Inputs for resolving where a native channel command should attach session state.
 */
type ResolveNativeCommandSessionTargetsParams = {
  agentId: string;
  sessionPrefix: string;
  userId: string;
  targetSessionKey: string;
  boundSessionKey?: string;
  sessionKeyCase?: NonNullable<ChannelMessagingAdapter["targetIdComparison"]>;
};
/**
 * Resolves the storage session key and command target key for native command events.
 */
declare function resolveNativeCommandSessionTargets(params: ResolveNativeCommandSessionTargetsParams): {
  sessionKey: string;
  commandTargetSessionKey: string;
};
//#endregion
//#region src/auto-reply/command-auth.d.ts
type CommandAuthorization = {
  providerId?: ChannelId;
  ownerList: string[];
  senderId?: string;
  senderIsOwner: boolean;
  isAuthorizedSender: boolean;
  from?: string;
  to?: string;
};
type CommandAuthorizationParams = {
  ctx: MsgContext;
  cfg: OpenClawConfig;
  commandAuthorized: boolean;
};
declare function resolveCommandAuthorization(params: CommandAuthorizationParams): CommandAuthorization;
//#endregion
//#region src/sessions/stored-model-overrides.d.ts
/** Model override loaded from the current session or its parent session. */
type StoredModelOverride = {
  provider?: string;
  model: string;
  source: "session" | "parent";
  routeResolution: ModelFallbackRouteResolution;
};
/** Keep prepared host metadata outside the published command resolver contract. */
declare function resolveStoredModelOverride(params: {
  loadSessionEntry?: (sessionKey: string) => SessionEntry | undefined;
  sessionEntry?: SessionEntry;
  sessionStore?: Record<string, SessionEntry>;
  sessionKey?: string;
  parentSessionKey?: string;
  defaultProvider: string;
  allowPluginNormalization?: boolean;
}): StoredModelOverride | null;
//#endregion
export { ResolveNativeCommandSessionTargetsParams as a, resolveCommandAuthorization as i, resolveStoredModelOverride as n, resolveNativeCommandSessionTargets as o, CommandAuthorization as r, StoredModelOverride as t };