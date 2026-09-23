import { i as ModelCompatConfig, l as ModelApi, o as ModelMediaInputConfig, r as OpenClawConfig, vt as ModelCatalogStatus, x as ThinkingLevelMap } from "./types.openclaw-DRlyXvhd.js";
import { y as PluginMetadataSnapshot } from "./io-BLJj5WUL.js";
import { t as PluginManifestRecord } from "./manifest-registry-REO5D6i-.js";
import { n as ThinkLevel, r as ThinkingCatalogEntry } from "./thinking.shared-DM1X3FC0.js";
//#region packages/model-catalog-core/src/model-catalog-refs.d.ts
type ProviderModelRef = {
  provider: string;
  model: string;
};
//#endregion
//#region src/plugins/provider-thinking.types.d.ts
/**
 * Provider-owned thinking policy input.
 *
 * Used by shared `/think`, ACP controls, and directive parsing to ask a
 * provider whether a model supports special reasoning UX such as adaptive,
 * xhigh, max, or a binary on/off toggle.
 */
type ProviderThinkingPolicyContext = {
  provider: string;
  modelId: string;
};
type ProviderThinkingModelCompat = {
  thinkingFormat?: string;
  supportsReasoningEffort?: boolean;
  supportedReasoningEfforts?: readonly string[] | null;
  reasoningEffortMap?: Record<string, string>;
};
/**
 * Provider-owned default thinking policy input.
 *
 * `reasoning` is the merged catalog hint for the selected model when one is
 * available. Providers can use it to keep "reasoning model => low" behavior
 * without re-reading the catalog themselves.
 *
 * `compat` carries model-level request contract facts for the selected model
 * when available. Providers can use it to expose model-specific thinking
 * profiles only when the configured payload style supports them.
 */
type ProviderDefaultThinkingPolicyContext = ProviderThinkingPolicyContext & {
  /** Effective agent runtime selected for this model, when known. */
  agentRuntime?: string | null;
  /** API adapter id from the selected catalog route, when known. */
  api?: string | null;
  reasoning?: boolean;
  /** Thinking-to-wire mapping from the selected model route. */
  thinkingLevelMap?: ThinkingLevelMap;
  params?: Record<string, unknown>;
  compat?: ProviderThinkingModelCompat | null;
};
type ProviderThinkingLevelId = ThinkLevel;
type ProviderThinkingLevel = {
  id: ProviderThinkingLevelId;
  /**
   * Optional display label. Use this when the stored value differs from the
   * provider-facing UX, for example binary providers storing `low` but showing
   * `on`.
   */
  label?: string;
  /**
   * Relative strength used when downgrading a stored level that the selected
   * model no longer supports.
   */
  rank?: number;
};
type ProviderThinkingProfile = {
  levels: ProviderThinkingLevel[] | ReadonlyArray<ProviderThinkingLevel>;
  defaultLevel?: ProviderThinkingLevelId | null;
  /**
   * Some bundled providers have model-specific thinking contracts that are more
   * current than cached generic catalog metadata. Keep this opt-in so
   * `reasoning: false` remains authoritative for ordinary catalog entries.
   */
  preserveWhenCatalogReasoningFalse?: boolean;
};
/** Prepared provider policy ownership, without the broader Gateway registry contract. */
type ProviderThinkingRegistry = {
  providers: ReadonlyArray<{
    provider: {
      id: string;
      aliases?: string[];
      hookAliases?: string[];
      resolveThinkingProfile?: (context: ProviderDefaultThinkingPolicyContext) => ProviderThinkingProfile | null | undefined;
    };
  }>;
};
type ProviderThinkingPolicySource = "active" | "active-or-bundled" | ProviderThinkingRegistry;
//#endregion
//#region src/auto-reply/thinking.d.ts
type ThinkingCatalogQuery = {
  provider?: string | null;
  model?: string | null;
};
type ThinkingCatalogResolver = (params: ThinkingCatalogQuery) => ThinkingCatalogEntry | undefined;
//#endregion
//#region src/agents/failover/signal.d.ts
/** Persisted and wire-visible failover reason codes. Spellings are frozen. */
declare const FAILOVER_REASONS: readonly ["auth", "auth_permanent", "format", "rate_limit", "overloaded", "billing", "server_error", "timeout", "tls_certificate", "context_overflow", "model_not_found", "session_expired", "empty_response", "no_error_details", "unclassified", "unknown"];
type FailoverReason = (typeof FAILOVER_REASONS)[number];
//#endregion
//#region src/agents/model-fallback.types.d.ts
type ModelFallbackRouteResolution = "raw" | "resolved";
type FallbackAttempt = {
  provider: string;
  model: string;
  error: string;
  reason?: FailoverReason;
  authMode?: string;
  status?: number;
  code?: string;
};
/** Original route plus the outer fallback stage that admitted one real attempt. */
type ModelFallbackAttemptProvenance = {
  requestedProvider: string;
  requestedModel: string;
  stage: "initial" | "fallback";
  fallbackReason?: FailoverReason;
};
//#endregion
//#region src/plugins/manifest-model-id-normalization.d.ts
/** Caller-owned declarations or facts from an already selected metadata snapshot. */
type ManifestModelIdNormalizationSource = readonly Pick<PluginManifestRecord, "modelIdNormalization">[] | {
  owners: Pick<PluginMetadataSnapshot["owners"], "modelIdNormalizationPolicies">;
};
//#endregion
//#region src/agents/model-ref-shared.d.ts
type ModelManifestNormalizationContext = {
  manifestPlugins?: ManifestModelIdNormalizationSource;
};
//#endregion
//#region src/plugins/provider-catalog-outcome.d.ts
type ProviderCatalogOutcome = {
  provider: string;
  /** Auth profile tested by discovery; omission means provider-wide auth. */
  profileId?: string;
  /** Limits an auth rejection to catalog discovery rather than model execution. */
  rejectionScope?: "catalog";
  status: "ready" | "auth-rejected" | "unavailable";
};
//#endregion
//#region src/agents/model-catalog.types.d.ts
/** Input modalities a catalog entry can advertise. */
type ModelInputType = "text" | "image" | "audio" | "video" | "document";
type ModelContextWindowOption = {
  id: string;
  label: string;
  contextWindow: number;
};
/** Normalized model metadata exposed by the agent model catalog. */
type ModelCatalogEntry = {
  /** Native catalog owner, not a physical provider route or transferable readiness fact. */
  nativeRuntime?: string;
  id: string;
  name: string;
  provider: string;
  /** Provider-owned strongest-first picker order; internal and never projected to clients. */
  providerOrder?: number;
  alias?: string;
  api?: ModelApi;
  /** Private transport provenance for route matching; never project directly to clients. */
  baseUrl?: string;
  contextWindow?: number;
  contextWindows?: ModelContextWindowOption[];
  contextWindowDefault?: string;
  contextTokens?: number;
  reasoning?: boolean;
  /** Config-authored reasoning override; internal provenance, never project to clients. */
  configuredReasoning?: boolean;
  /** Concrete runtime owner of thinking policy; internal and never project to clients. */
  thinkingPolicyProvider?: string;
  /** Provider-owned effort support for this exact physical model route. */
  thinkingLevelMap?: ThinkingLevelMap;
  input?: ModelInputType[];
  params?: Record<string, unknown>;
  compat?: ModelCompatConfig;
  mediaInput?: ModelMediaInputConfig;
  status?: ModelCatalogStatus;
  statusReason?: string;
  replaces?: string[];
  replacedBy?: string;
};
/** Logical catalog rows plus the physical variants used for route selection. */
type ModelCatalogSnapshot = {
  entries: ModelCatalogEntry[];
  routeVariants: ModelCatalogEntry[];
  /** Provider-owned outcome of each live catalog request in this generation. */
  providerOutcomes?: readonly ProviderCatalogOutcome[];
  /** The current acquisition failed while this published inventory remained available. */
  refreshFailed?: boolean;
  /** Provider discovery is in progress; existing rows remain usable. */
  pendingProviders?: readonly string[];
  /** Static provider-hook rows captured alongside the full lifecycle generation. */
  staticEntries?: ModelCatalogEntry[];
  /**
   * `false` only when this snapshot came from a degraded load (discovery threw,
   * static or empty fallback). Absent/`true` means authoritative — consumers that
   * destroy durable state (e.g. resetting a pinned model override) must treat only
   * an explicit `false` as degraded, so unrelated hand-built snapshots stay safe.
   */
  authoritative?: boolean;
};
//#endregion
//#region src/agents/model-selection-config.d.ts
declare function resolveDefaultModelForAgent(params: {
  cfg: OpenClawConfig;
  agentId?: string;
  allowManifestNormalization?: boolean;
  allowPluginNormalization?: boolean;
} & ModelManifestNormalizationContext): ProviderModelRef;
//#endregion
//#region src/agents/model-selection-normalize.d.ts
type ModelRefNormalizeOptions = ModelManifestNormalizationContext & {
  allowManifestNormalization?: boolean;
  allowPluginNormalization?: boolean;
};
/** Find a provider value by normalized provider ID. */
declare function findNormalizedProviderValue<T>(entries: Record<string, T> | undefined, provider: string): T | undefined;
/** Parse `provider/model` or bare model text using a default provider. */
declare function parseModelRef(raw: string, defaultProvider: string, options?: ModelRefNormalizeOptions): ProviderModelRef | null;
//#endregion
//#region src/agents/model-selection-shared.d.ts
type ModelManifestPlugins = ModelManifestNormalizationContext["manifestPlugins"];
type ModelAliasIndex = {
  byAlias: Map<string, {
    alias: string;
    ref: ProviderModelRef;
  }>;
  byProviderAlias?: Map<string, {
    alias: string;
    ref: ProviderModelRef;
  }>;
  byKey: Map<string, string[]>;
  disabledKeys?: Set<string>;
};
type BuildModelAliasIndexParams = {
  cfg: OpenClawConfig;
  defaultProvider: string;
  agentId?: string;
  allowManifestNormalization?: boolean;
  allowPluginNormalization?: boolean;
} & ModelManifestNormalizationContext;
/** Build lookup maps from user-facing aliases to normalized model refs. */
declare function buildModelAliasIndex(params: BuildModelAliasIndexParams): ModelAliasIndex;
declare function resolveModelRefFromString(params: {
  cfg?: OpenClawConfig;
  agentId?: string;
  raw: string;
  defaultProvider: string;
  aliasIndex?: ModelAliasIndex;
  allowManifestNormalization?: boolean;
  allowPluginNormalization?: boolean;
} & ModelManifestNormalizationContext): {
  ref: ProviderModelRef;
  alias?: string;
} | null;
/** Build catalog entries from configured provider model rows. */
declare function buildConfiguredModelCatalog(params: {
  cfg: OpenClawConfig;
  catalog?: readonly ModelCatalogEntry[];
  workspaceDir?: string;
  manifestPlugins?: ModelManifestPlugins;
}): ModelCatalogEntry[];
type ModelVisibilityPolicy = {
  allowAny: boolean;
  catalog: ModelCatalogEntry[];
  configuredCatalog: readonly ModelCatalogEntry[];
  allowedCatalog: ModelCatalogEntry[];
  allowedKeys: Set<string>;
  policyAliasIndex: ModelAliasIndex;
  selectionAliasIndex: ModelAliasIndex;
  configuredKeys: ReadonlySet<string>;
  retainedKeys: ReadonlySet<string>;
  exactModelRefs: readonly string[];
  providerWildcards: ReadonlySet<string>;
  hasConfiguredEntries: boolean;
  hasProviderWildcards: boolean;
  allowConfigPath?: string | null;
  allowRepairConfigPath: string;
  allows: (ref: {
    provider: string;
    model: string;
  }) => boolean;
  allowsByWildcard: (ref: {
    provider: string;
    model: string;
  }) => boolean;
  resolveSelection: (ref: ProviderModelRef & {
    routeResolution?: ModelFallbackRouteResolution;
  }) => ProviderModelRef | null;
  visibleCatalog: (params: {
    catalog: readonly ModelCatalogEntry[];
    defaultVisibleCatalog: readonly ModelCatalogEntry[];
    view?: "default" | "configured" | "all";
  }) => ModelCatalogEntry[];
};
//#endregion
//#region src/agents/model-selection-resolve.d.ts
/** Resolves a raw model string into an allowed model ref or an explanatory error. */
declare function resolveAllowedModelRefCore(params: {
  cfg: OpenClawConfig;
  catalog: ModelCatalogEntry[];
  raw: string;
  defaultProvider: string;
  defaultModel?: string | ProviderModelRef;
  agentId?: string;
} & ModelManifestNormalizationContext): {
  ref: ProviderModelRef;
  key: string;
} | {
  error: string;
};
//#endregion
//#region src/agents/model-thinking-default-core.d.ts
type ThinkingDefaultParams = {
  cfg: OpenClawConfig;
  provider: string;
  model: string;
  catalog?: ModelCatalogEntry[];
  agentRuntime?: string | null;
  agentId?: string;
  providerPolicySource?: ProviderThinkingPolicySource;
  catalogResolver?: ThinkingCatalogResolver;
};
declare function resolveThinkingDefaultCore(params: ThinkingDefaultParams): ThinkLevel;
//#endregion
//#region src/agents/model-thinking-default.d.ts
/** Resolves thinking default after loading runtime catalog only when needed. */
declare function resolveThinkingDefaultWithRuntimeCatalogCore(params: {
  cfg: OpenClawConfig;
  provider: string;
  model: string;
  agentId?: string;
  loadRuntimeCatalog: () => Promise<ModelCatalogEntry[]>;
  agentRuntime?: string | null;
}): Promise<ThinkLevel>;
//#endregion
export { ProviderModelRef as S, FailoverReason as _, buildConfiguredModelCatalog as a, ProviderThinkingProfile as b, findNormalizedProviderValue as c, ModelCatalogEntry as d, ModelCatalogSnapshot as f, ModelFallbackRouteResolution as g, ModelFallbackAttemptProvenance as h, ModelVisibilityPolicy as i, parseModelRef as l, FallbackAttempt as m, resolveThinkingDefaultCore as n, buildModelAliasIndex as o, ProviderCatalogOutcome as p, resolveAllowedModelRefCore as r, resolveModelRefFromString as s, resolveThinkingDefaultWithRuntimeCatalogCore as t, resolveDefaultModelForAgent as u, ProviderDefaultThinkingPolicyContext as v, ProviderThinkingRegistry as x, ProviderThinkingPolicyContext as y };