import { Ns as ResolveMarkdownTableModeParams } from "./agent-harness-runtime-D1Ww9PgY.js";
import { M as ResolvedTalkConfig, N as TalkConfig, r as OpenClawConfig } from "./types.openclaw-DRlyXvhd.js";
import "./types.secrets-BuGeX7LK.js";
import { S as MarkdownTableMode, f as ContextVisibilityMode } from "./types.base-DSGitsUq.js";
import "./io-BLJj5WUL.js";
import "./types-3IrUshX3.js";
import "./config-CJdvsHqC.js";
import "./templating-BzAleqvS.js";
import "./agent-scope-CeViFjsB.js";
import "./group-policy-Cp195uGx.js";
import "./session-store-runtime-MjLDs-xH.js";
import "./plugin-config-runtime-DhKqAGBZ.js";
import "./shared-TefW54JY.js";
import "./model-overrides-C-KHI5Uu.js";
import "./context-visibility-2jZhFi92.js";
import "./runtime-group-policy-BY4VaAPW.js";
import "./commands-DpAVMaKj.js";
import "./resolve-configured-secret-input-string-DGNGnOxw.js";
//#region src/config/context-visibility.d.ts
type ContextVisibilityDefaultsConfig = {
  channels?: {
    defaults?: {
      /**
       * Global default supplemental context visibility for channels without a local override.
       */
      contextVisibility?: ContextVisibilityMode;
    };
  };
};
/** Reads the global channel default supplemental context visibility mode. */
declare function resolveDefaultContextVisibility(cfg: ContextVisibilityDefaultsConfig): ContextVisibilityMode | undefined;
/** Resolves supplemental context visibility using explicit, account, channel, default precedence. */
declare function resolveChannelContextVisibilityMode(params: {
  /** Full OpenClaw config containing channel defaults and per-channel overrides. */
  cfg: OpenClawConfig;
  /** Channel id whose visibility policy is being resolved. */
  channel: string;
  /** Optional channel account id used for account-specific overrides. */
  accountId?: string | null;
  /** Runtime adapter override that takes precedence over config-backed policy. */
  configuredContextVisibility?: ContextVisibilityMode;
}): ContextVisibilityMode;
//#endregion
//#region src/config/markdown-tables.d.ts
declare function resolveMarkdownTableMode(params: ResolveMarkdownTableModeParams): MarkdownTableMode;
//#endregion
//#region src/config/talk.d.ts
/**
 * Resolve the single active Talk speech provider and its provider-owned config.
 * Ambiguous multi-provider config stays unresolved until `talk.provider` names one.
 */
declare function resolveActiveTalkProviderConfig(talk: TalkConfig | undefined): ResolvedTalkConfig | undefined;
//#endregion
//#region src/config/dangerous-name-matching.d.ts
type DangerousNameMatchingConfig = {
  dangerouslyAllowNameMatching?: boolean;
};
type DangerousNameMatchingResolverInput = {
  providerConfig?: DangerousNameMatchingConfig | null | undefined;
  accountConfig?: DangerousNameMatchingConfig | null | undefined;
};
/** Returns true only for the explicit dangerous name-matching opt-in flag. */
declare function isDangerousNameMatchingEnabled(config: DangerousNameMatchingConfig | null | undefined): boolean;
/** Resolves account-level dangerous name matching, inheriting the provider flag when unset. */
declare function resolveDangerousNameMatchingEnabled(input: DangerousNameMatchingResolverInput): boolean;
//#endregion
export { resolveChannelContextVisibilityMode as a, resolveMarkdownTableMode as i, resolveDangerousNameMatchingEnabled as n, resolveDefaultContextVisibility as o, resolveActiveTalkProviderConfig as r, isDangerousNameMatchingEnabled as t };