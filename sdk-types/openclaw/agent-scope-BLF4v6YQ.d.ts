import { A as PluginDiagnostic, B as PluginManifestModelIdNormalizationProvider, Et as SessionMaintenanceMode, G as ChannelAccountKeyPolicy, H as PluginManifestProviderEndpoint, M as PluginManifest, N as PluginManifestChannelCommandDefaults, O as PluginBundleFormat, T as PluginInstallRecord, Tt as ReplyToMode, U as PluginManifestProviderRequestProvider, bt as DmScope, h as Message, ht as BroadcastStrategy, j as PluginFormat, jt as SecretRef, k as PluginConfigUiHint, lt as GroupToolPolicyConfig, m as ImageContent, mt as ChatType, n as OpenClawConfig, rt as TtsAutoMode, s as ModelProviderConfig, t as ConfigFileSnapshot, v as StreamFn$1, x as Tool, xt as GroupScope, y as TextContent } from "./types.openclaw-DNYpBV89.js";
import { z } from "zod";
import { Static, TSchema, Type } from "typebox";
import "json5";
import "@openclaw/fs-safe/config";
import "@openclaw/fs-safe/advanced";
import "kysely";
//#region packages/gateway-protocol/src/schema/logs-chat.d.ts
declare const QUEUE_MODES: readonly ["steer", "followup", "collect", "interrupt"];
type QueueMode = (typeof QUEUE_MODES)[number];
//#endregion
//#region src/runtime.d.ts
type RuntimeExitOptions = {
  /** Route ANSI terminal-reset bytes away from structured stdout when needed. */
  resetStream?: NodeJS.WriteStream;
};
type RuntimeEnv = {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  /**
   * Exit the process after restoring terminal state.
   * Pass `resetStream` to route the ANSI reset sequence to a specific
   * stream (e.g. stderr) when structured output on stdout must stay clean.
   */
  exit: (code: number, opts?: RuntimeExitOptions) => void;
};
//#endregion
//#region src/channels/plugins/setup-input.d.ts
type ChannelSetupEnvelope = {
  name?: string;
  token?: string;
  tokenFile?: string;
  useEnv?: boolean;
  defaultTo?: string;
  allowFrom?: string[];
};
/**
 * Compatibility fields with known published readers in the 2026-07-22 registry sweep.
 * Each field is deleted as soon as no published plugin reads it; no version boundary is needed.
 */
type DeprecatedChannelSetupFields = {
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  privateKey?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  secret?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  botToken?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  appToken?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  signingSecret?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  mode?: "socket" | "http" | "relay";
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  cliPath?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  authDir?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  httpUrl?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  httpPort?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  webhookPath?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  webhookUrl?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  userId?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  accessToken?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  password?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  deviceName?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  url?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  baseUrl?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  code?: string;
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  groupChannels?: string[];
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  dmAllowlist?: string[];
  /** @deprecated Declare this field in the owning plugin's setup input type: https://docs.openclaw.ai/plugins/sdk-setup#channel-owned-setup-input-fields. Removed once no published plugin reads it. */
  autoDiscoverChannels?: boolean;
};
/** Generic setup envelope used by CLI, onboarding, and channel-owned setup adapters. */
type ChannelSetupInput = ChannelSetupEnvelope & DeprecatedChannelSetupFields;
//#endregion
//#region src/channels/plugins/setup-adapter.types.d.ts
type ChannelSetupAdapter<Input extends {
  name?: string;
} = ChannelSetupInput> = {
  /** Prepared plugin-owned policy for setup outside a published Gateway metadata generation. */
  accountKeyPolicy?: ChannelAccountKeyPolicy;
  /** Keep root config as an independent identity when the host adds named accounts. */
  configPromotion?: "preserve-root";
  resolveAccountId?: (params: {
    cfg: OpenClawConfig;
    accountId?: string;
    input?: Input;
  }) => string;
  prepareAccountConfigInput?: (params: {
    cfg: OpenClawConfig;
    accountId: string;
    input: Input;
    runtime: RuntimeEnv;
  }) => Promise<Input> | Input;
  resolveBindingAccountId?: (params: {
    cfg: OpenClawConfig;
    agentId: string;
    accountId?: string;
  }) => string | undefined;
  applyAccountName?: (params: {
    cfg: OpenClawConfig;
    accountId: string;
    name?: string;
  }) => OpenClawConfig;
  applyAccountConfig: (params: {
    cfg: OpenClawConfig;
    accountId: string;
    input: Input;
  }) => OpenClawConfig;
  afterAccountConfigWritten?: (params: {
    previousCfg: OpenClawConfig;
    cfg: OpenClawConfig;
    accountId: string;
    input: Input;
    runtime: RuntimeEnv;
  }) => Promise<void> | void;
  validateInput?: (params: {
    cfg: OpenClawConfig;
    accountId: string;
    input: Input;
  }) => string | null;
  singleAccountKeysToMove?: readonly string[];
  namedAccountPromotionKeys?: readonly string[];
  resolveSingleAccountPromotionTarget?: (params: {
    channel: Record<string, unknown>;
  }) => string | undefined;
};
//#endregion
//#region src/channels/plugins/setup-contract.d.ts
type ChannelSetupCliOption = {
  flags: string;
  negatedFlags?: string;
  description: string;
  defaultValue?: boolean | string;
};
type ChannelSetupStringField = {
  kind: "string";
  sensitive?: boolean;
  cli: ChannelSetupCliOption;
};
type ChannelSetupBooleanField = {
  kind: "boolean";
  cli: ChannelSetupCliOption;
  envVars?: readonly string[];
  envVarMode?: "all" | "any";
};
type ChannelSetupIntegerField = {
  kind: "integer";
  cli: ChannelSetupCliOption;
};
type ChannelSetupStringListField = {
  kind: "string-list";
  sensitive?: boolean;
  cli: ChannelSetupCliOption;
};
type ChannelSetupChoiceField<Choices extends readonly string[] = readonly string[]> = {
  kind: "choice";
  choices: Choices;
  cli: ChannelSetupCliOption;
};
type ChannelSetupField = ChannelSetupStringField | ChannelSetupBooleanField | ChannelSetupIntegerField | ChannelSetupStringListField | ChannelSetupChoiceField;
type ChannelSetupFieldMetadataFor<Field extends ChannelSetupField> = Field extends ChannelSetupField ? Field & {
  key: string;
} : never;
type ChannelSetupFieldMetadata = ChannelSetupFieldMetadataFor<ChannelSetupField>;
type ChannelSetupMetadata = {
  fields: readonly ChannelSetupFieldMetadata[];
};
type ChannelSetupParseResult = {
  ok: true;
  value: unknown;
} | {
  ok: false;
  error: string;
};
type ChannelOwnedSetupAdapterShape<Input extends {
  name?: string;
}> = ChannelSetupAdapter<Input>;
type ChannelOwnedSetupContract = {
  kind: "channel-owned";
  accountKeyPolicy?: ChannelSetupAdapter["accountKeyPolicy"];
  configPromotion?: ChannelSetupAdapter["configPromotion"];
  metadata: ChannelSetupMetadata;
  parseInput: (input: unknown) => ChannelSetupParseResult;
  resolveAccountId?: (params: {
    cfg: OpenClawConfig;
    accountId?: string;
    input?: unknown;
  }) => string;
  prepareAccountConfigInput?: (params: {
    cfg: OpenClawConfig;
    accountId: string;
    input: unknown;
    runtime: RuntimeEnv;
  }) => Promise<object> | object;
  resolveBindingAccountId?: ChannelOwnedSetupAdapterShape<{
    name?: string;
  }>["resolveBindingAccountId"];
  applyAccountName?: ChannelOwnedSetupAdapterShape<{
    name?: string;
  }>["applyAccountName"];
  applyAccountConfig: (params: {
    cfg: OpenClawConfig;
    accountId: string;
    input: unknown;
  }) => OpenClawConfig;
  afterAccountConfigWritten?: (params: {
    previousCfg: OpenClawConfig;
    cfg: OpenClawConfig;
    accountId: string;
    input: unknown;
    runtime: RuntimeEnv;
  }) => Promise<void> | void;
  validateInput?: (params: {
    cfg: OpenClawConfig;
    accountId: string;
    input: unknown;
  }) => string | null;
  singleAccountKeysToMove?: readonly string[];
  namedAccountPromotionKeys?: readonly string[];
  resolveSingleAccountPromotionTarget?: ChannelOwnedSetupAdapterShape<{
    name?: string;
  }>["resolveSingleAccountPromotionTarget"];
};
//#endregion
//#region src/compat/legacy-names.d.ts
declare const MANIFEST_KEY: "openclaw";
//#endregion
//#region src/plugins/package-manifest.types.d.ts
/** package.json OpenClaw metadata used for plugin setup and catalog discovery. */
type PluginPackageChannelApprovalFlag = "native";
type PluginPackageChannel = {
  id?: string;
  label?: string;
  selectionLabel?: string;
  detailLabel?: string;
  docsPath?: string;
  docsLabel?: string;
  blurb?: string;
  order?: number;
  aliases?: readonly string[];
  preferOver?: readonly string[];
  systemImage?: string;
  selectionDocsPrefix?: string;
  selectionDocsOmitLabel?: boolean;
  selectionExtras?: readonly string[];
  markdownCapable?: boolean;
  /** Closed manifest flags for approval behavior available before the channel runtime loads. */
  approvalFlags?: readonly PluginPackageChannelApprovalFlag[];
  exposure?: {
    configured?: boolean;
    setup?: boolean;
    docs?: boolean;
  };
  quickstartAllowFrom?: boolean;
  forceAccountBinding?: boolean;
  preferSessionLookupForAnnounceTarget?: boolean;
  commands?: PluginManifestChannelCommandDefaults;
  configuredState?: {
    specifier?: string;
    exportName?: string;
    env?: {
      allOf?: readonly string[];
      anyOf?: readonly string[];
    };
  };
  persistedAuthState?: {
    specifier?: string;
    exportName?: string;
  };
  doctorCapabilities?: PluginPackageChannelDoctorCapabilities;
  /** Typed, serializable setup fields available before plugin runtime load. */
  setup?: ChannelSetupMetadata;
  /** @deprecated Use setup.fields. */
  cliAddOptions?: readonly PluginPackageChannelCliOption[];
};
type PluginPackageChannelDoctorCapabilities = {
  dmAllowFromMode?: "topOnly" | "topOrNested" | "nestedOnly";
  /** Whether dmPolicy="open" requires an explicit "*" in allowFrom. Defaults to true. */
  openDmRequiresAllowFromWildcard?: boolean;
  groupModel?: "sender" | "route" | "hybrid";
  groupAllowFromFallbackToAllowFrom?: boolean;
  warnOnEmptyGroupSenderAllowlist?: boolean;
};
type PluginPackageChannelCliOption = {
  flags: string;
  negatedFlags?: string;
  description: string;
  defaultValue?: boolean | string;
  valueType?: "int" | "list";
};
type PluginPackageInstall = {
  clawhubSpec?: string;
  npmSpec?: string;
  localPath?: string;
  defaultChoice?: "clawhub" | "npm" | "local";
  minHostVersion?: string;
  expectedIntegrity?: string;
  allowInvalidConfigRecovery?: boolean;
  requiredPlatformPackages?: string[];
};
type OpenClawPackageSetupFeatures = {
  configPromotion?: boolean | "preserve-root";
  /**
   * @deprecated Declare doctorContract.stateMigrations in openclaw.plugin.json instead.
   * Removal plan: remove the setup-entry adapter after the 2027.1 external-plugin migration window.
   */
  legacyStateMigrations?: boolean;
  legacySessionSurfaces?: boolean;
};
type OpenClawPackageCompat = {
  pluginApi?: string;
  minGatewayVersion?: string;
};
type OpenClawPackageBuild = {
  bundledDist?: boolean;
  openclawVersion?: string;
  pluginSdkVersion?: string;
};
type OpenClawPackageManifest = {
  extensions?: string[];
  runtimeExtensions?: string[];
  setupEntry?: string;
  runtimeSetupEntry?: string;
  controlUi?: string;
  setupFeatures?: OpenClawPackageSetupFeatures;
  plugin?: {
    id?: string;
    label?: string;
  };
  channel?: PluginPackageChannel;
  compat?: OpenClawPackageCompat;
  install?: PluginPackageInstall;
  build?: OpenClawPackageBuild;
};
type ManifestKey = typeof MANIFEST_KEY;
type PackageManifest = {
  name?: string;
  version?: string;
  description?: string;
  dependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
} & Partial<Record<ManifestKey, OpenClawPackageManifest>>;
//#endregion
//#region src/plugins/plugin-origin.types.d.ts
/** Origin class for plugin discovery and runtime trust decisions. */
type PluginOrigin = "bundled" | "global" | "workspace" | "config";
//#endregion
//#region src/plugins/plugin-trust.d.ts
/** Captured beside the trust decision; consumers never rediscover installation facts. */
type PluginTrust = {
  reason: "bundled" | "trusted-official" | "record-missing" | "owner-ambiguous" | "origin-path" | "install-path-mismatch" | "provenance-missing" | "provenance-invalid";
  registryPath: string | null;
  origin: PluginOrigin | "unknown";
  installSource?: PluginInstallRecord["source"];
  installSpec?: string;
};
//#endregion
//#region src/plugins/status-dependencies-core.d.ts
/** Dependency name-to-version map from a plugin package manifest. */
type PluginDependencySpecMap = Record<string, string>;
/** Installation status for one plugin dependency. */
type PluginDependencyEntry = {
  name: string;
  spec: string;
  installed: boolean;
  optional: boolean;
  resolvedPath?: string;
};
/** Aggregate installation status for required and optional plugin dependencies. */
type PluginDependencyStatus = {
  hasDependencies: boolean;
  installed: boolean;
  requiredInstalled: boolean;
  optionalInstalled: boolean;
  missing: string[];
  missingOptional: string[];
  dependencies: PluginDependencyEntry[];
  optionalDependencies: PluginDependencyEntry[];
};
//#endregion
//#region src/plugins/manifest-registry.types.d.ts
type PluginManifestRecordStatic = Omit<PluginManifest, "capabilityCatalogEntry" | "channels" | "cliBackends" | "configSchema" | "enabledByDefaultOnPlatforms" | "providerCatalogEntry" | "providers" | "requiresPlugins" | "skills" | "uiHints">;
type PluginManifestRecord = PluginManifestRecordStatic & {
  /** Process-local source selection, never persisted in the installed index. */
  sourcePreferred?: true;
  iconPath?: string;
  activityIconPath?: string;
  toolActivityIconPaths?: Record<string, string>;
  packageName?: string;
  packageVersion?: string;
  packageDescription?: string;
  enabledByDefaultOnPlatforms?: string[];
  format?: PluginFormat;
  bundleFormat?: PluginBundleFormat;
  bundleCapabilities?: string[];
  channels: string[];
  providers: string[];
  providerDiscoverySource?: string;
  /** Undefined is undeclared; null retains a rejected declaration without enabling full-entry fallback. */
  capabilityCatalogSource?: string | null;
  cliBackends: string[];
  packageManifest?: OpenClawPackageManifest;
  packageDependencies?: PluginDependencySpecMap;
  packageOptionalDependencies?: PluginDependencySpecMap;
  packageChannel?: PluginPackageChannel;
  packageInstall?: PluginPackageInstall;
  trustedOfficialInstall?: boolean;
  trust?: PluginTrust;
  skills: string[];
  settingsFiles?: string[];
  hooks: string[];
  origin: PluginOrigin;
  workspaceDir?: string;
  rootDir: string;
  source: string;
  setupSource?: string;
  manifestPath: string;
  schemaCacheKey?: string;
  configSchema?: Record<string, unknown>;
  configUiHints?: Record<string, PluginConfigUiHint>;
  channelCatalogMeta?: {
    id: string;
    label?: string;
    blurb?: string;
    preferOver?: readonly string[];
    commands?: PluginManifestChannelCommandDefaults;
  };
};
type PluginManifestRegistry = {
  plugins: PluginManifestRecord[];
  diagnostics: PluginDiagnostic[];
};
//#endregion
//#region src/config/runtime-snapshot.d.ts
type ConfigWriteAfterWrite = {
  mode: "auto";
} | {
  mode: "restart";
  reason: string;
} | {
  mode: "none";
  reason: string;
};
type ConfigWriteFollowUp = {
  mode: "auto";
  requiresRestart: false;
} | {
  mode: "none";
  reason: string;
  requiresRestart: false;
} | {
  mode: "restart";
  reason: string;
  requiresRestart: true;
};
//#endregion
//#region src/plugins/discovery.types.d.ts
/** One potential plugin root discovered before manifest validation and registry normalization. */
type PluginCandidate = {
  idHint: string;
  /** Discovery-owned identity for one entry in a multi-entry package pack. */
  effectivePluginId?: string;
  diagnosticIdHint?: string;
  source: string;
  setupSource?: string;
  rootDir: string;
  origin: PluginOrigin;
  /** Retains explicit load-path precedence when physical aliases merge their provenance. */
  configSelected?: true;
  /** An intentional source overlay must not execute its packaged peer. */
  sourcePreferred?: true;
  format?: PluginFormat;
  bundleFormat?: PluginBundleFormat;
  workspaceDir?: string;
  packageName?: string;
  packageVersion?: string;
  packageDescription?: string;
  packageDir?: string;
  packageManifest?: OpenClawPackageManifest;
  packageDependencies?: PluginDependencySpecMap;
  packageOptionalDependencies?: PluginDependencySpecMap;
  bundledManifestId?: string;
  bundledManifest?: PluginManifest;
  bundledManifestPath?: string;
  requiredPluginIds?: string[];
  requiredPluginSource?: string;
  rawPackageManifest?: PackageManifest;
};
/** Discovery candidates plus warnings/errors emitted while scanning roots. */
type PluginDiscoveryResult = {
  candidates: PluginCandidate[];
  diagnostics: PluginDiagnostic[];
};
//#endregion
//#region packages/normalization-core/src/result.d.ts
/** Result of a fallible operation. Expected failures use the `ok: false` arm. */
type Result<TValue, TError> = {
  ok: true;
  value: TValue;
} | {
  ok: false;
  error: TError;
};
//#endregion
//#region src/plugins/compat/registry-records.d.ts
declare const PLUGIN_COMPAT_RECORDS: readonly [...({
  code: "plugin-sdk-agent-config-primitives-subpath" | "plugin-sdk-channel-logging-subpath" | "plugin-sdk-channel-secret-runtime-subpath" | "plugin-sdk-channel-streaming-subpath" | "plugin-sdk-group-access-subpath" | "plugin-sdk-matrix-subpath" | "plugin-sdk-text-runtime-subpath" | "plugin-sdk-zod-subpath";
  status: "removed";
  owner: "channel" | "config" | "sdk";
  introduced: string;
  replacement: "`openclaw/plugin-sdk/channel-config-schema`" | "`openclaw/plugin-sdk/channel-inbound` and `openclaw/plugin-sdk/channel-outbound`" | "`openclaw/plugin-sdk/channel-ingress-runtime`" | "`openclaw/plugin-sdk/channel-outbound`" | "`openclaw/plugin-sdk/channel-secret-basic-runtime` and `openclaw/plugin-sdk/channel-secret-tts-runtime`" | "`openclaw/plugin-sdk/logging-core`, `openclaw/plugin-sdk/text-chunking`, `openclaw/plugin-sdk/text-utility-runtime`, and `openclaw/plugin-sdk/string-coerce-runtime`" | "`openclaw/plugin-sdk/run-command`" | "the direct `zod` package import";
  docsPath: string;
  surfaces: string[];
  diagnostics: string[];
  tests: string[];
  releaseNote: "The deprecated `agent-config-primitives` Plugin SDK subpath was removed; plugins now use maintained config-schema primitives." | "The deprecated `channel-logging` Plugin SDK subpath was removed; channel logging helpers now come from the inbound and outbound channel surfaces." | "The deprecated `channel-secret-runtime` Plugin SDK subpath was removed; plugins now use the focused basic and TTS secret-runtime subpaths." | "The deprecated `channel-streaming` Plugin SDK subpath was removed; plugins now import channel streaming helpers from `channel-outbound`." | "The deprecated `group-access` Plugin SDK subpath was removed; plugins now resolve message admission through `channel-ingress-runtime`." | "The deprecated `matrix` Plugin SDK facade was removed; command execution now uses the generic `run-command` subpath." | "The deprecated `text-runtime` Plugin SDK facade was removed; plugins now import logging, chunking, text utility, and string coercion helpers from their focused subpaths." | "The deprecated `zod` Plugin SDK re-export was removed; plugins now import `zod` directly.";
  deprecated?: undefined;
  warningStarts?: undefined;
  removeAfter?: undefined;
  removalGate?: undefined;
} | {
  releaseNote?: undefined;
  code: "plugin-sdk-channel-lifecycle-subpath" | "plugin-sdk-channel-message-subpath" | "plugin-sdk-channel-reply-pipeline-subpath" | "plugin-sdk-config-runtime-subpath" | "plugin-sdk-inbound-reply-dispatch-subpath" | "plugin-sdk-infra-runtime-subpath";
  status: "deprecated" | "removal-pending";
  owner: "channel" | "config" | "sdk";
  introduced: string;
  deprecated: string;
  warningStarts: string;
  removeAfter: "2026-10-01" | undefined;
  removalGate: "next-plugin-sdk-major" | undefined;
  replacement: "`api.pluginConfig`, `openclaw/plugin-sdk/config-mutation`, `openclaw/plugin-sdk/runtime-config-snapshot`, and `openclaw/plugin-sdk/config-contracts`; retain until supported external plugin migration is verified" | "`openclaw/plugin-sdk/channel-inbound` and `openclaw/plugin-sdk/channel-outbound`" | "`openclaw/plugin-sdk/channel-outbound` and `openclaw/plugin-sdk/channel-inbound`; retain until supported external plugin migration is verified" | "`openclaw/plugin-sdk/channel-outbound`; retain until supported external plugin migration is verified" | "focused subpaths including `openclaw/plugin-sdk/delivery-queue-runtime`, `openclaw/plugin-sdk/diagnostic-runtime`, `openclaw/plugin-sdk/error-runtime`, `openclaw/plugin-sdk/exec-approvals-runtime`, `openclaw/plugin-sdk/fetch-runtime`, and `openclaw/plugin-sdk/ssrf-runtime`; retain until supported external plugin migration is verified and system-event snapshot inspection and consumption have a modern public replacement";
  docsPath: string;
  surfaces: string[];
  diagnostics: string[];
  tests: string[];
} | {
  status: "removal-pending";
  removeAfter: "2026-09-30";
  replacement: "`api.registerMediaUnderstandingProvider(...)` with provider-owned request helpers and types from `openclaw/plugin-sdk/plugin-entry`; retain the public subpath through the 2026-09-30 window while official plugin consumers migrate";
  docsPath: "/plugins/architecture";
  code: "plugin-sdk-media-understanding-public-demotion" | "plugin-sdk-memory-host-core-public-demotion" | "plugin-sdk-plugin-config-runtime-public-demotion" | "plugin-sdk-tool-plugin-public-demotion";
  owner: "sdk";
  introduced: string;
  deprecated: string;
  warningStarts: string;
  surfaces: string[];
  diagnostics: string[];
  tests: string[];
} | {
  status: "removal-pending";
  removeAfter: "2026-09-30";
  replacement: "host-prepared memory prompts via `openclaw/plugin-sdk/core` and memory capability registration through the injected plugin API; retain the facade through the 2026-09-30 window and until a focused public-artifact read seam exists";
  docsPath: "/plugins/architecture-internals#context-engine-plugins";
  code: "plugin-sdk-media-understanding-public-demotion" | "plugin-sdk-memory-host-core-public-demotion" | "plugin-sdk-plugin-config-runtime-public-demotion" | "plugin-sdk-tool-plugin-public-demotion";
  owner: "sdk";
  introduced: string;
  deprecated: string;
  warningStarts: string;
  surfaces: string[];
  diagnostics: string[];
  tests: string[];
} | {
  status: "removal-pending";
  removeAfter: "2026-12-01";
  replacement: "`api.pluginConfig`, runtime tool context config, and focused `config-contracts`, `runtime-config-snapshot`, or `config-mutation` subpaths; retain the public subpath through the 2026-12-01 window while official plugin consumers migrate";
  docsPath: "/plugins/sdk-runtime";
  code: "plugin-sdk-media-understanding-public-demotion" | "plugin-sdk-memory-host-core-public-demotion" | "plugin-sdk-plugin-config-runtime-public-demotion" | "plugin-sdk-tool-plugin-public-demotion";
  owner: "sdk";
  introduced: string;
  deprecated: string;
  warningStarts: string;
  surfaces: string[];
  diagnostics: string[];
  tests: string[];
} | {
  status: "deprecated";
  replacement: "retain the public subpath until plugin authoring has a nonexecuting static metadata replacement for `defineToolPlugin`; `getToolPluginMetadata` currently reads metadata only from an already-executed entry";
  docsPath: "/plugins/tool-plugins";
  code: "plugin-sdk-media-understanding-public-demotion" | "plugin-sdk-memory-host-core-public-demotion" | "plugin-sdk-plugin-config-runtime-public-demotion" | "plugin-sdk-tool-plugin-public-demotion";
  owner: "sdk";
  introduced: string;
  deprecated: string;
  warningStarts: string;
  surfaces: string[];
  diagnostics: string[];
  tests: string[];
})[], {
  readonly code: "plugin-sdk-channel-setup-input-fields";
  readonly status: "deprecated";
  readonly owner: "channel";
  readonly introduced: "2026-07-25";
  readonly deprecated: "2026-07-25";
  readonly warningStarts: "2026-07-25";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "plugin-local setup input intersections that declare each owning channel field";
  readonly docsPath: "/plugins/sdk-migration#published-channel-setup-compatibility";
  readonly surfaces: readonly ["ChannelSetupInput.privateKey", "ChannelSetupInput.secret", "ChannelSetupInput.botToken", "ChannelSetupInput.appToken", "ChannelSetupInput.signingSecret", "ChannelSetupInput.mode", "ChannelSetupInput.cliPath", "ChannelSetupInput.authDir", "ChannelSetupInput.httpUrl", "ChannelSetupInput.httpPort", "ChannelSetupInput.webhookPath", "ChannelSetupInput.webhookUrl", "ChannelSetupInput.userId", "ChannelSetupInput.accessToken", "ChannelSetupInput.password", "ChannelSetupInput.deviceName", "ChannelSetupInput.url", "ChannelSetupInput.baseUrl", "ChannelSetupInput.code", "ChannelSetupInput.groupChannels", "ChannelSetupInput.dmAllowlist", "ChannelSetupInput.autoDiscoverChannels"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations on the reader-backed ChannelSetupInput compatibility tier", "published-plugin artifact reader sweep required before field removal"];
  readonly tests: readonly ["src/plugin-sdk/channel-setup.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "ChannelSetupInput keeps its reader-backed channel fields through the dated migration window while plugins move them into plugin-local input types.";
}, {
  readonly code: "plugin-sdk-broad-runtime-barrels";
  readonly status: "deprecated";
  readonly owner: "sdk";
  readonly introduced: "2026-07-25";
  readonly deprecated: "2026-07-25";
  readonly warningStarts: "2026-07-25";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "focused plugin SDK subpaths for each runtime capability";
  readonly docsPath: "/plugins/sdk-migration#compatibility-policy";
  readonly surfaces: readonly ["openclaw/plugin-sdk/agent-runtime", "openclaw/plugin-sdk/agent-runtime loadModelCatalog params.useCache", "openclaw/plugin-sdk/agent-runtime loadModelCatalog params.cacheOnly", "openclaw/plugin-sdk/agent-runtime loadModelCatalog params.metadataSnapshot", "openclaw/plugin-sdk/agent-runtime loadModelCatalog", "openclaw/plugin-sdk/cli-runtime", "openclaw/plugin-sdk/conversation-runtime", "openclaw/plugin-sdk/hook-runtime", "openclaw/plugin-sdk/media-runtime", "openclaw/plugin-sdk/media-runtime buildAgentMediaPayload", "openclaw/plugin-sdk/plugin-runtime", "openclaw/plugin-sdk/security-runtime"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations on broad plugin SDK barrels", "plugin boundary report compatibility inventory"];
  readonly tests: readonly ["src/plugins/contracts/plugin-sdk-subpaths.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Broad agent, CLI, conversation, hook, media, plugin, and security runtime barrels remain available while bundled and external plugins migrate to focused subpaths.";
}, {
  readonly code: "plugin-sdk-provider-owned-helper-shims";
  readonly status: "deprecated";
  readonly owner: "provider";
  readonly introduced: "2026-07-25";
  readonly deprecated: "2026-07-25";
  readonly warningStarts: "2026-07-25";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "provider-local auth, model, replay, OAuth, and stream helper APIs";
  readonly docsPath: "/plugins/sdk-migration#compatibility-policy";
  readonly surfaces: readonly ["openclaw/plugin-sdk/provider-stream GOOGLE_THINKING_STREAM_HOOKS", "openclaw/plugin-sdk/provider-stream KILOCODE_THINKING_STREAM_HOOKS", "openclaw/plugin-sdk/provider-stream MOONSHOT_THINKING_STREAM_HOOKS", "openclaw/plugin-sdk/provider-stream MINIMAX_FAST_MODE_STREAM_HOOKS", "openclaw/plugin-sdk/provider-stream OPENAI_RESPONSES_STREAM_HOOKS", "openclaw/plugin-sdk/provider-stream OPENROUTER_THINKING_STREAM_HOOKS", "openclaw/plugin-sdk/provider-stream TOOL_STREAM_DEFAULT_ON_HOOKS", "openclaw/plugin-sdk/provider-stream-shared defaultToolStreamExtraParams", "openclaw/plugin-sdk/provider-stream-shared stripTrailingAnthropicAssistantPrefillWhenThinking", "openclaw/plugin-sdk/provider-stream-shared createAnthropicThinkingPrefillPayloadWrapper", "openclaw/plugin-sdk/provider-stream-shared OpenAICompatibleThinkingLevel", "openclaw/plugin-sdk/provider-stream-shared isOpenAICompatibleThinkingEnabled", "openclaw/plugin-sdk/provider-stream-shared DeepSeekV4ThinkingLevel", "openclaw/plugin-sdk/provider-stream-shared DeepSeekV4ReasoningEffort", "openclaw/plugin-sdk/provider-stream-shared createDeepSeekV4OpenAICompatibleThinkingWrapper", "openclaw/plugin-sdk/provider-stream-shared createThinkingOnlyFinalTextWrapper", "openclaw/plugin-sdk/provider-stream-shared createGoogleThinkingPayloadWrapper", "openclaw/plugin-sdk/provider-stream-shared createGoogleThinkingStreamWrapper", "openclaw/plugin-sdk/provider-model-shared isProxyReasoningUnsupportedModelHint", "openclaw/plugin-sdk/provider-model-shared OPENAI_COMPATIBLE_REPLAY_HOOKS", "openclaw/plugin-sdk/provider-model-shared ANTHROPIC_BY_MODEL_REPLAY_HOOKS", "openclaw/plugin-sdk/provider-model-shared NATIVE_ANTHROPIC_REPLAY_HOOKS", "openclaw/plugin-sdk/provider-model-shared PASSTHROUGH_GEMINI_REPLAY_HOOKS", "openclaw/plugin-sdk/provider-auth DEFAULT_COPILOT_API_BASE_URL", "openclaw/plugin-sdk/provider-auth deriveCopilotApiBaseUrlFromToken", "openclaw/plugin-sdk/provider-auth resolveCopilotApiToken", "openclaw/plugin-sdk/provider-auth-copilot-cache CachedCopilotToken", "openclaw/plugin-sdk/oauth-utils toFormUrlEncoded", "openclaw/plugin-sdk/oauth-utils generatePkceVerifierChallenge", "openclaw/plugin-sdk/provider-oauth-runtime OAuthProvider", "openclaw/plugin-sdk/provider-oauth-runtime OAuthProviderInfo"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations naming provider-local replacements", "plugin boundary report compatibility inventory"];
  readonly tests: readonly ["src/plugins/contracts/plugin-sdk-subpaths.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Provider-specific auth, model, replay, OAuth, and stream shortcuts remain as deprecated SDK shims while providers move to their local APIs.";
}, {
  readonly code: "message-presentation-legacy-bridges";
  readonly status: "deprecated";
  readonly owner: "channel";
  readonly introduced: "2026-07-25";
  readonly deprecated: "2026-07-25";
  readonly warningStarts: "2026-07-25";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "MessagePresentation values and channel presentation renderers";
  readonly docsPath: "/plugins/sdk-migration#compatibility-policy";
  readonly surfaces: readonly ["InteractiveReplyButton.value", "InteractiveReplyButton.url", "InteractiveReplyButton.webApp", "InteractiveReplyButton.web_app", "InteractiveReplyOption.value", "InteractiveReplyButton", "InteractiveReplyOption", "InteractiveReplyBlock", "InteractiveReply", "normalizeInteractiveReply", "hasInteractiveReplyBlocks", "presentationToInteractiveReply", "presentationToInteractiveControlsReply", "interactiveReplyToPresentation", "resolveInteractiveTextFallback", "src/auto-reply ReplyPayload.interactive", "openclaw/plugin-sdk/reply-payload ReplyPayload.interactive", "reduceInteractiveReply", "@openclaw/discord buildDiscordInteractiveComponents", "@openclaw/slack buildSlackInteractiveBlocks", "@openclaw/telegram buildTelegramInteractiveButtons"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations naming MessagePresentation replacements", "plugin boundary report compatibility inventory"];
  readonly tests: readonly ["src/interactive/payload.test.ts", "src/plugin-sdk/reply-payload.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Legacy interactive reply values and channel-specific rendering bridges remain available while producers migrate to MessagePresentation.";
}, {
  readonly code: "plugin-sdk-focused-compat-aliases";
  readonly status: "deprecated";
  readonly owner: "sdk";
  readonly introduced: "2026-07-25";
  readonly deprecated: "2026-07-25";
  readonly warningStarts: "2026-07-25";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "the focused replacement named by each TypeScript @deprecated annotation";
  readonly docsPath: "/plugins/sdk-migration#compatibility-policy";
  readonly surfaces: readonly ["openclaw/plugin-sdk/acp-runtime __testing", "openclaw/plugin-sdk/approval-reaction-runtime", "openclaw/plugin-sdk/channel-inbound BuildChannelTurnContextParams", "openclaw/plugin-sdk/channel-inbound BuiltChannelTurnContext", "openclaw/plugin-sdk/channel-inbound buildChannelTurnContext", "openclaw/plugin-sdk/channel-inbound finalizeChannelInboundContext", "openclaw/plugin-sdk/channel-inbound filterChannelTurnSupplementalContext", "openclaw/plugin-sdk/channel-send-result ChannelSendRawResult", "openclaw/plugin-sdk/command-auth", "openclaw/plugin-sdk/command-auth ResolveSenderCommandAuthorizationParams", "openclaw/plugin-sdk/command-auth resolveCommandAuthorizedFromAuthorizers", "openclaw/plugin-sdk/command-auth CommandAuthorizationRuntime", "openclaw/plugin-sdk/command-auth ResolveSenderCommandAuthorizationWithRuntimeParams", "openclaw/plugin-sdk/command-auth resolveDirectDmAuthorizationOutcome", "openclaw/plugin-sdk/command-auth resolveSenderCommandAuthorizationWithRuntime", "openclaw/plugin-sdk/command-auth resolveSenderCommandAuthorization", "openclaw/plugin-sdk/keyed-async-queue KeyedAsyncQueue.getTailMapForTesting", "openclaw/plugin-sdk/persistent-dedupe PersistentDedupeLegacyPathOptions.lockOptions", "openclaw/plugin-sdk/retry-runtime createTelegramRetryRunner", "openclaw/plugin-sdk/ssrf-policy SsrfPolicyOptions.allowPrivateNetwork", "openclaw/plugin-sdk/ssrf-policy ssrfPolicyFromAllowPrivateNetwork", "openclaw/plugin-sdk/tts-runtime TtsSynthesisStreamResult", "openclaw/plugin-sdk/tts-runtime TtsRuntimeFacade._test"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations naming focused replacements", "plugin boundary report compatibility inventory"];
  readonly tests: readonly ["src/plugin-sdk/channel-inbound.test.ts", "src/plugin-sdk/command-auth.test.ts", "src/plugin-sdk/ssrf-policy.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Focused SDK compatibility aliases remain available through a dated window while callers adopt their annotated replacements.";
}, {
  readonly code: "agent-harness-terminal-result-aliases";
  readonly status: "deprecated";
  readonly owner: "agent-runtime";
  readonly introduced: "2026-07-25";
  readonly deprecated: "2026-07-25";
  readonly warningStarts: "2026-07-25";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "AgentHarnessAttemptResult.terminal and AgentHarnessDeliveryDefaults.visibleReplies";
  readonly docsPath: "/plugins/sdk-agent-harness";
  readonly surfaces: readonly ["AgentHarnessAttemptResult.aborted", "AgentHarnessAttemptResult.externalAbort", "AgentHarnessAttemptResult.timedOut", "AgentHarnessAttemptResult.idleTimedOut", "AgentHarnessAttemptResult.timedOutDuringCompaction", "AgentHarnessAttemptResult.timedOutDuringToolExecution", "AgentHarnessAttemptResult.timedOutByRunBudget", "AgentHarnessAttemptResult.promptError", "AgentHarnessAttemptResult.promptErrorSource", "AgentHarnessDeliveryDefaults.sourceVisibleReplies"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations on agent harness result and delivery defaults", "plugin boundary report compatibility inventory"];
  readonly tests: readonly ["src/agents/harness/settled-turn-finalization-result.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Agent harness result booleans and sourceVisibleReplies remain available while harnesses migrate to terminal outcomes and visibleReplies.";
}, {
  readonly code: "official-plugin-export-aliases";
  readonly status: "deprecated";
  readonly owner: "channel";
  readonly introduced: "2026-07-25";
  readonly deprecated: "2026-07-25";
  readonly warningStarts: "2026-07-25";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "the canonical testing export, MessagePresentation renderers, and host-owned timeout/runtime behavior";
  readonly docsPath: "/plugins/compatibility#current-compatibility-areas";
  readonly surfaces: readonly ["@openclaw/google-meet __testing", "@openclaw/discord buildDiscordInteractiveComponents", "@openclaw/discord normalizeDiscordListenerTimeoutMs", "@openclaw/discord normalizeDiscordInboundWorkerTimeoutMs", "@openclaw/discord isAbortError", "@openclaw/discord runDiscordTaskWithTimeout", "@openclaw/slack buildSlackInteractiveBlocks"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations on published official-plugin exports", "plugin boundary report compatibility inventory"];
  readonly tests: readonly ["extensions/google-meet/index.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Published Google Meet testing, channel presentation, and Discord timeout aliases remain available while consumers move to their canonical exports and host-owned behavior.";
}, {
  readonly code: "memory-host-compatibility-aliases";
  readonly status: "deprecated";
  readonly owner: "sdk";
  readonly introduced: "2026-07-25";
  readonly deprecated: "2026-07-25";
  readonly warningStarts: "2026-07-25";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "canonical memory cache/FTS tables and getRuntimeConfig or caller-provided config";
  readonly docsPath: "/plugins/sdk-migration#compatibility-policy";
  readonly surfaces: readonly ["@openclaw/memory-host-sdk ensureMemoryIndexSchema.embeddingCacheTable", "@openclaw/memory-host-sdk ensureMemoryIndexSchema.ftsTable", "@openclaw/memory-host-sdk/runtime-core loadConfig", "@openclaw/memory-host-sdk/host/openclaw-runtime loadConfig"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations on memory-host SDK compatibility fields", "plugin boundary report memory-host SDK summary"];
  readonly tests: readonly ["packages/memory-host-sdk/src/host/memory-schema.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Memory-host cache-table overrides and runtime config reload aliases remain available while callers migrate to canonical tables and prepared config.";
}, {
  readonly code: "plugin-runtime-api-compat-aliases";
  readonly status: "deprecated";
  readonly owner: "plugin-execution";
  readonly introduced: "2026-07-25";
  readonly deprecated: "2026-07-25";
  readonly warningStarts: "2026-07-25";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "the namespaced plugin API and focused runtime methods named per surface";
  readonly docsPath: "/plugins/sdk-migration#compatibility-policy";
  readonly surfaces: readonly ["OpenClawPluginApi.registerSessionExtension", "OpenClawPluginApi.enqueueNextTurnInjection", "OpenClawPluginApi.registerControlUiDescriptor", "OpenClawPluginApi.registerRuntimeLifecycle", "OpenClawPluginApi.registerAgentEventSubscription", "OpenClawPluginApi.emitAgentEvent", "OpenClawPluginApi.setRunContext", "OpenClawPluginApi.getRunContext", "OpenClawPluginApi.clearRunContext", "OpenClawPluginApi.registerSessionSchedulerJob", "OpenClawPluginApi.registerSessionAction", "OpenClawPluginApi.sendSessionAttachment", "OpenClawPluginApi.scheduleSessionTurn", "OpenClawPluginApi.unscheduleSessionTurnsByTag", "PluginHookContext.senderExternalId", "PluginAttachmentChannelHints.telegram", "PluginAttachmentChannelHints.slack", "AgentPromptSurfaceKind pi_main", "PluginRuntime.channel.reply.createReplyDispatcherWithTyping", "PluginRuntime.channel.reply.resolveHumanDelayConfig", "PluginRuntime.channel.reply.dispatchReplyFromConfig", "PluginRuntime.channel.reply.finalizeInboundContext", "PluginRuntime.channel.media.fetchRemoteMedia", "PluginRuntime.channel.session.resolveStorePath", "PluginRuntime.channel.session.recordInboundSession", "PluginRuntime.channel.inbound.runPreparedReply", "PluginRuntime.channel.turn", "PluginRuntime.system.requestHeartbeatNow"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations on plugin API and runtime aliases", "plugin boundary report compatibility inventory"];
  readonly tests: readonly ["src/plugins/captured-registration.test.ts", "src/plugins/runtime/index.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Flat plugin registration and broad runtime aliases remain available while plugins migrate to namespaced APIs and focused runtime methods.";
}, {
  readonly code: "plugin-provider-manifest-compat-aliases";
  readonly status: "deprecated";
  readonly owner: "provider";
  readonly introduced: "2026-07-25";
  readonly deprecated: "2026-07-25";
  readonly warningStarts: "2026-07-25";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "manifest-owned plugin kind/setup metadata and model catalog registration";
  readonly docsPath: "/plugins/sdk-migration#compatibility-policy";
  readonly surfaces: readonly ["DefinePluginEntryOptions.kind", "SingleProviderPluginOptions.kind", "OpenClawPluginDefinition.kind", "PluginPackageChannel.cliAddOptions", "ProviderPlugin.catalog", "ProviderPlugin.staticCatalog", "ProviderPlugin.suppressBuiltInModel", "ProviderPlugin.augmentModelCatalog", "ProviderBuiltInModelSuppressionContext"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations on plugin manifest and provider catalog aliases", "plugin boundary report compatibility inventory"];
  readonly tests: readonly ["src/plugins/contracts/package-manifest.contract.test.ts", "src/plugins/contracts/provider-catalog-deprecation.contract.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Runtime plugin kind/setup metadata and provider catalog hooks remain available while plugins migrate ownership into manifests and catalog registrations.";
}, {
  readonly code: "media-legacy-projection";
  readonly status: "deprecated";
  readonly owner: "sdk";
  readonly introduced: "2026-07-24";
  readonly deprecated: "2026-07-24";
  readonly warningStarts: "2026-07-24";
  readonly removeAfter: "2026-10-01";
  readonly replacement: "ordered `MsgContext.media` / `InboundMediaFacts[]`; typed hook `media` and `originalMedia`; `Attachment*` template variables; and `openclaw/plugin-sdk/media-local-roots`";
  readonly docsPath: "/plugins/sdk-migration#media-legacy-projection";
  readonly surfaces: readonly ["MsgContext MediaPath/MediaUrl/MediaType and plural/staging fields", "openclaw/plugin-sdk/agent-media-payload", "ChannelInboundMediaPayload and buildChannelInboundMediaPayload", "MediaPayload and buildMediaPayload", "message hook mediaPath/mediaUrl/mediaType and plural/original metadata aliases", "MediaPath/MediaUrl/MediaType/MediaDir template variables"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations naming the facts-first replacement", "plugin boundary report compatibility inventory with the approved removeAfter date", "SDK, hook, and media template migration documentation"];
  readonly tests: readonly ["src/sessions/user-turn-transcript.media.test.ts", "src/hooks/message-hook-mappers.test.ts", "src/media-understanding/runner.cli-audio.test.ts", "src/plugins/compat/registry.test.ts", "src/plugins/contracts/plugin-sdk-subpaths.test.ts"];
  readonly releaseNote: "Legacy parallel media projections remain available as deprecated compatibility while plugins move to ordered facts, typed hook media, Attachment templates, and the focused media-local-roots SDK.";
}, {
  readonly code: "plugin-tasks-sync-reads";
  readonly status: "deprecated";
  readonly owner: "sdk";
  readonly introduced: "2026-09-12";
  readonly deprecated: "2026-09-12";
  readonly warningStarts: "2026-09-12";
  readonly removalGate: "next-plugin-sdk-major";
  readonly replacement: "Await the 14 read methods on api.runtime.tasks.async.runs, flows, and managedFlows, plus createManaged, tryCreateManaged, setWaiting, resume, finish, fail, requestCancel, and runTask on api.runtime.tasks.async.managedFlows. Reconcile outcome-unknown errors before retrying creation or child linkage. Retain synchronous methods until supported external-plugin migration and explicit breaking-release approval; native cancellation remains on the existing surface.";
  readonly docsPath: "/plugins/sdk-runtime/background-work";
  readonly surfaces: readonly ["api.runtime.tasks.runs get/list/findLatest/resolve", "api.runtime.tasks.flows get/list/findLatest/resolve/getTaskSummary", "api.runtime.tasks.managedFlows get/list/findLatest/resolve/getTaskSummary", "api.runtime.tasks.managedFlows createManaged/tryCreateManaged/setWaiting/resume/finish/fail/requestCancel/runTask"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations and migration documentation; no runtime warnings"];
  readonly tests: readonly ["src/infra/sqlite-worker-task-runtime.test.ts", "src/infra/sqlite-worker-managed-task-link.test.ts", "extensions/webhooks/index.test.ts"];
  readonly releaseNote: "Plugins can opt into worker-backed task and flow reads plus managed-flow writes and child linkage through tasks.async while synchronous methods remain available for external compatibility. Cold registry and configuration preparation remains synchronous.";
}, {
  readonly code: "plugin-state-sync-keyed-store";
  readonly status: "deprecated";
  readonly owner: "sdk";
  readonly introduced: "2026-05-29";
  readonly deprecated: "2026-09-11";
  readonly warningStarts: "2026-09-11";
  readonly removalGate: "next-plugin-sdk-major";
  readonly replacement: "`api.runtime.state.openKeyedStore` and `PluginStateKeyedStore`; await operations while keeping transactional callbacks synchronous. Retain the sync adapter until a supported external-plugin migration and explicit breaking-release approval.";
  readonly docsPath: "/plugins/sdk-runtime/state-and-system#synchronous-keyed-store-migration";
  readonly surfaces: readonly ["api.runtime.state.openSyncKeyedStore", "PluginStateSyncKeyedStore", "createPluginStateSyncKeyedStore", "PluginStateKeyedStore.update", "PluginStateKeyedStore.deleteIf"];
  readonly diagnostics: readonly ["TypeScript @deprecated annotations and state-store migration documentation", "plugin compatibility inventory; no new runtime warnings"];
  readonly tests: readonly ["src/plugins/compat/registry.test.ts", "src/plugin-state/plugin-state-store.test.ts", "src/plugin-state/plugin-state-store.runtime.test.ts", "src/plugin-sdk/plugin-state-store-runtime.test.ts", "src/plugins/loader.runtime-registry.test.ts"];
  readonly releaseNote: "Synchronous plugin keyed stores remain supported through the next Plugin SDK major while plugins migrate to awaited keyed-store operations; trust eligibility and transactional callbacks are unchanged.";
}, {
  readonly code: "memory-read-result-statusless-success";
  readonly status: "deprecated";
  readonly owner: "sdk";
  readonly introduced: "2026-04-28";
  readonly deprecated: "2026-08-19";
  readonly warningStarts: "2026-08-19";
  readonly removalGate: "next-plugin-sdk-major";
  readonly replacement: "`MemoryReadResult` with explicit `status: \"ok\" | \"not_found\"`";
  readonly docsPath: "/plugins/sdk-migration#memory-read-missing-results";
  readonly surfaces: readonly ["statusless external memory manager read results"];
  readonly diagnostics: readonly ["host memory-manager acquisition adapter"];
  readonly tests: readonly ["src/plugins/memory-runtime.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "External memory managers must return explicit not-found status for absence; statusless results retain legacy successful-read semantics through the next Plugin SDK major.";
}, {
  readonly code: "context-engine-legacy-host-param-default";
  readonly status: "removed";
  readonly owner: "sdk";
  readonly introduced: "2026-07-29";
  readonly replacement: "`ContextEngineInfo.acceptedHostParams` for restricted projection; omitted declarations receive full host params";
  readonly docsPath: "/concepts/context-engine#the-contextengine-interface";
  readonly surfaces: readonly ["ContextEngineInfo.acceptedHostParams and undeclared-engine default projection"];
  readonly diagnostics: readonly ["plugin compatibility registry and context engine guide"];
  readonly tests: readonly ["src/context-engine/host-param-projection.test.ts"];
  readonly releaseNote: "The undeclared context-engine host-parameter compatibility default was removed; engines without `acceptedHostParams` now receive all current host fields.";
}, {
  readonly code: "removed-global-api-provider-publication";
  readonly status: "removed";
  readonly owner: "sdk";
  readonly introduced: "2026-05-27";
  readonly replacement: "provider plugins via `api.registerProvider(...)`; host/runtime code registers against its lifecycle-owned `ApiRegistry`";
  readonly docsPath: "/plugins/sdk-migration#process-global-api-provider-publication";
  readonly surfaces: readonly ["openclaw/plugin-sdk/llm registerApiProvider", "openclaw/plugin-sdk/llm unregisterApiProviders"];
  readonly diagnostics: readonly ["plugin SDK compatibility registry and migration guide"];
  readonly tests: readonly ["src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "The process-global API-provider publication facade was removed; provider plugins now publish through their lifecycle-owned registration, and host runtimes register directly on their prepared ApiRegistry.";
}, {
  readonly code: "legacy-deactivate-hook-alias";
  readonly status: "removed";
  readonly owner: "sdk";
  readonly introduced: "2026-05-16";
  readonly replacement: "`gateway_stop` hook";
  readonly docsPath: "/plugins/sdk-migration#deactivate-hook-alias";
  readonly surfaces: readonly ["api.on(\"deactivate\", ...)", "plugin typed hook registration"];
  readonly diagnostics: readonly ["plugin compatibility registry and migration guide"];
  readonly tests: readonly ["src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "The deprecated `api.on(\"deactivate\", ...)` hook alias was removed; plugins must register cleanup with `gateway_stop`.";
}, {
  readonly code: "legacy-subagent-spawning-hook";
  readonly status: "removed";
  readonly owner: "sdk";
  readonly introduced: "2026-05-30";
  readonly replacement: "`subagent_spawned` for post-launch observation; core session-binding adapters for thread routing";
  readonly docsPath: "/plugins/hooks#upcoming-deprecations";
  readonly surfaces: readonly ["api.on(\"subagent_spawning\", ...)", "PluginHookSubagentSpawningEvent", "PluginHookSubagentSpawningResult", "SubagentLifecycleHookRunner.runSubagentSpawning"];
  readonly diagnostics: readonly ["plugin compatibility registry and migration guide"];
  readonly tests: readonly ["src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "`api.on(\"subagent_spawning\", ...)` was removed; core now owns thread-bound subagent routing, and `subagent_spawned` remains available for observation.";
}, {
  readonly code: "hook-only-plugin-shape";
  readonly status: "active";
  readonly owner: "sdk";
  readonly introduced: "2026-04-24";
  readonly replacement: "explicit capability registration";
  readonly docsPath: "/plugins/sdk-migration";
  readonly surfaces: readonly ["plugin shape inspection", "plugins inspect", "status diagnostics"];
  readonly diagnostics: readonly ["plugin compatibility notice"];
  readonly tests: readonly ["src/plugins/status.test.ts", "src/plugins/contracts/shape.contract.test.ts"];
}, {
  readonly code: "deprecated-memory-embedding-provider-api";
  readonly status: "removed";
  readonly owner: "sdk";
  readonly introduced: "2026-05-21";
  readonly replacement: "`api.registerEmbeddingProvider(...)` and `contracts.embeddingProviders`";
  readonly docsPath: "/plugins/sdk-migration#memory-embedding-provider-api";
  readonly surfaces: readonly ["api.registerMemoryEmbeddingProvider(...)", "contracts.memoryEmbeddingProviders", "openclaw/plugin-sdk/memory-core-host-engine-embeddings registerMemoryEmbeddingProvider", "plugin compatibility registry and migration guide"];
  readonly diagnostics: readonly ["plugin compatibility registry and migration guide"];
  readonly tests: readonly ["src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Memory-specific embedding provider registration was removed; plugins now use the generic embedding provider contract.";
}, {
  readonly code: "deprecated-session-store-beta5-api";
  readonly status: "deprecated";
  readonly owner: "sdk";
  readonly introduced: "2026-05-21";
  readonly deprecated: "2026-07-12";
  readonly warningStarts: "2026-07-12";
  readonly removeAfter: "2026-10-12";
  readonly replacement: "`getSessionEntry(...)`, `listSessionEntries(...)`, and row-level session mutations";
  readonly docsPath: "/plugins/sdk-migration#removed-session-and-transcript-file-apis";
  readonly surfaces: readonly ["openclaw/plugin-sdk/session-store-runtime loadSessionStore", "openclaw/plugin-sdk/session-store-runtime updateSessionStore", "openclaw/plugin-sdk/session-store-runtime resolveSessionFilePath", "openclaw/plugin-sdk/session-store-runtime resolveSessionStoreEntry", "openclaw package root loadSessionStore", "openclaw package root saveSessionStore"];
  readonly diagnostics: readonly ["plugin SDK deprecation"];
  readonly tests: readonly ["src/plugin-sdk/session-store-runtime.test.ts", "src/index.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "The beta.5 session-store import set and package-root whole-store aliases remain available while official plugins and package consumers migrate to row-level session access.";
}, {
  readonly code: "plugin-sdk-session-agent-resolution-aliases";
  readonly status: "deprecated";
  readonly owner: "sdk";
  readonly introduced: "2026-08-29";
  readonly deprecated: "2026-08-29";
  readonly warningStarts: "2026-08-29";
  readonly removeAfter: "2026-11-29";
  readonly replacement: "`resolveSessionAgentIdsStrict` and `resolveSessionAgentIdStrict` with an explicit agent, agent-scoped session key, prepared fallback, or persisted owner";
  readonly docsPath: "/plugins/compatibility#session-agent-resolution-aliases";
  readonly surfaces: readonly ["openclaw/plugin-sdk/agent-scope-runtime resolveSessionAgentIds and resolveSessionAgentId", "openclaw/plugin-sdk/agent-runtime session-agent resolver aliases", "openclaw/plugin-sdk/agent-harness-runtime session-agent resolver aliases", "openclaw/plugin-sdk/memory-core-host-runtime-core session-agent resolver alias", "openclaw/plugin-sdk/memory-host-core session-agent resolver alias"];
  readonly diagnostics: readonly ["TypeScript deprecated SDK alias annotations", "plugin compatibility registry"];
  readonly tests: readonly ["src/plugin-sdk/agent-scope-runtime.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Legacy Plugin SDK session-agent resolver names preserve ambient system-agent fallback while published plugins migrate to strict owner-required aliases.";
}, {
  readonly code: "agent-harness-credential-prompt-string-argument";
  readonly status: "deprecated";
  readonly owner: "sdk";
  readonly introduced: "2026-08-08";
  readonly deprecated: "2026-09-09";
  readonly warningStarts: "2026-09-09";
  readonly removeAfter: "2026-11-30";
  readonly replacement: "options object `{ controlToolsAvailable }`";
  readonly docsPath: "/plugins/sdk-migration/removed-surfaces#credential-prompt-builder";
  readonly surfaces: readonly ["openclaw/plugin-sdk/agent-harness-runtime buildCredentialSafetyPrompt string argument"];
  readonly diagnostics: readonly ["JSDoc parameter deprecation", "plugin compatibility registry"];
  readonly tests: readonly ["src/agents/credential-safety-prompt.test.ts"];
  readonly releaseNote: "The credential prompt helper remains available with private login-code handoff and capability-aware terminal setup guidance; its ignored legacy string argument is supported through 2026-11-30.";
}, {
  readonly code: "removed-session-transcript-file-api";
  readonly status: "removed";
  readonly owner: "sdk";
  readonly introduced: "2026-07-01";
  readonly replacement: "session identity (`sessionKey`/`sessionId`), `SessionTranscriptUpdate.target`, and Gateway/runtime session helpers";
  readonly docsPath: "/plugins/sdk-migration#removed-session-and-transcript-file-apis";
  readonly surfaces: readonly ["saveSessionStore", "resolveSessionTranscriptPathInDir", "resolveAndPersistSessionFile", "readLatestAssistantTextFromSessionTranscript", "SessionTranscriptUpdate.sessionFile", "sessionFiles", "transcriptPath", "sessionFile", "plugins inspect compatibility notices"];
  readonly diagnostics: readonly ["plugin compatibility notice"];
  readonly tests: readonly ["src/plugins/status.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Session/transcript file APIs were removed with the SQLite session storage flip; plugins now use session identity and Gateway/runtime session helpers.";
}, {
  readonly code: "hook.before_tool_call.terminal-block-approval";
  readonly status: "active";
  readonly owner: "agent-runtime";
  readonly introduced: "2026-04-29";
  readonly docsPath: "/plugins/hooks";
  readonly surfaces: readonly ["before_tool_call block result", "before_tool_call approval result"];
  readonly diagnostics: readonly ["hook runner contract probe"];
  readonly tests: readonly ["src/plugins/hooks.security.test.ts", "src/agents/agent-tools.before-tool-call.e2e.test.ts"];
}, {
  readonly code: "hook.llm-observer.privacy-payload";
  readonly status: "active";
  readonly owner: "agent-runtime";
  readonly introduced: "2026-04-29";
  readonly docsPath: "/plugins/hooks";
  readonly surfaces: readonly ["llm_input", "llm_output", "agent_end", "allowConversationAccess"];
  readonly diagnostics: readonly ["conversation access hook contract probe"];
  readonly tests: readonly ["src/agents/cli-runner.reliability.test.ts", "src/config/schema.help.quality.test.ts"];
}, {
  readonly code: "api.capture.runtime-registrars";
  readonly status: "active";
  readonly owner: "plugin-execution";
  readonly introduced: "2026-04-29";
  readonly docsPath: "/plugins/architecture-internals";
  readonly surfaces: readonly ["createCapturedPluginRegistration", "capturePluginRegistration", "OpenClawPluginApi"];
  readonly diagnostics: readonly ["runtime registration capture contract probe"];
  readonly tests: readonly ["src/plugins/captured-registration.test.ts"];
}, {
  readonly code: "channel.runtime.envelope-config-metadata";
  readonly status: "active";
  readonly owner: "channel";
  readonly introduced: "2026-04-29";
  readonly docsPath: "/plugins/sdk-channel-plugins";
  readonly surfaces: readonly ["api.registerChannel", "channel setup metadata", "channel message envelope"];
  readonly diagnostics: readonly ["channel runtime contract probe"];
  readonly tests: readonly ["src/plugin-sdk/channel-entry-contract.test.ts", "src/plugins/captured-registration.test.ts"];
}, {
  readonly code: "whatsapp-web-inbound-flat-message-aliases";
  readonly status: "removed";
  readonly owner: "channel";
  readonly introduced: "2026-05-30";
  readonly replacement: "WhatsApp `WebInboundCallbackMessage` nested contexts: `event`, `payload`, `quote`, `group`, and `platform`";
  readonly docsPath: "/plugins/compatibility";
  readonly surfaces: readonly ["@openclaw/whatsapp WebInboundMessage flat fields", "WhatsApp monitorWebInbox onMessage callback", "WhatsApp monitorWebChannel listenerFactory injected messages"];
  readonly diagnostics: readonly ["plugin compatibility registry and compatibility guide"];
  readonly tests: readonly ["src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "WhatsApp WebInboundMessage flat fields were removed; callbacks now receive only nested inbound contexts.";
}, {
  readonly code: "whatsapp-web-inbound-admission-top-level-fields";
  readonly status: "removed";
  readonly owner: "channel";
  readonly introduced: "2026-06-14";
  readonly replacement: "WhatsApp `WebInboundMessage.admission` fields: `conversation.id`, `accountId`, `ingress.decision`, and `conversation.kind`";
  readonly docsPath: "/plugins/compatibility";
  readonly surfaces: readonly ["@openclaw/whatsapp WebInboundMessage top-level admission fields", "WhatsApp monitorWebInbox onMessage callback", "WhatsApp monitorWebChannel listenerFactory injected messages"];
  readonly diagnostics: readonly ["plugin compatibility registry and compatibility guide"];
  readonly tests: readonly ["src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "WhatsApp WebInboundMessage top-level admission fields were removed; callbacks now read the canonical admission envelope.";
}, {
  readonly code: "sdk-untrusted-context-identifier-aliases";
  readonly status: "removal-pending";
  readonly owner: "sdk";
  readonly introduced: "2026-07-22";
  readonly deprecated: "2026-07-22";
  readonly warningStarts: "2026-07-22";
  readonly removeAfter: "2026-09-08";
  readonly replacement: "`MsgContext.ChannelPromptContext`, `MsgContext.ChannelStructuredContext`, `ChannelStructuredContextEntry`, `SupplementalContextFacts.channelStructuredContext`, and `buildChannelMetadata`; retain the aliases until migration of published plugin readers is verified and explicit breaking-release approval is granted";
  readonly docsPath: "/plugins/compatibility";
  readonly surfaces: readonly ["openclaw/plugin-sdk reply-runtime MsgContext.UntrustedContext and UntrustedStructuredContext", "openclaw/plugin-sdk reply-runtime UntrustedStructuredContextEntry", "openclaw/plugin-sdk channel-inbound SupplementalContextFacts.untrustedContext", "openclaw/plugin-sdk security-runtime buildUntrustedChannelMetadata"];
  readonly diagnostics: readonly ["TypeScript deprecated SDK alias annotations"];
  readonly tests: readonly ["src/auto-reply/reply/inbound-context.test.ts"];
  readonly releaseNote: "Untrusted-named prompt-context SDK identifiers remain wired as deprecated aliases of the channel-named fields while plugins migrate.";
}, {
  readonly code: "bundled-channel-sdk-compat-facades";
  readonly status: "active";
  readonly owner: "sdk";
  readonly introduced: "2026-04-28";
  readonly replacement: "generic channel SDK subpaths or plugin-local `api.ts` / `runtime-api.ts` barrels for new plugins";
  readonly docsPath: "/plugins/sdk-overview";
  readonly surfaces: readonly ["openclaw/plugin-sdk/discord component message helpers", "openclaw/plugin-sdk/telegram-account resolveTelegramAccount"];
  readonly diagnostics: readonly ["plugin SDK compatibility registry"];
  readonly tests: readonly ["src/plugin-sdk/discord.test.ts", "src/plugin-sdk/telegram-account.test.ts", "src/plugins/contracts/plugin-sdk-package-contract-guardrails.test.ts"];
}, {
  readonly code: "channel-explicit-target-parser";
  readonly status: "removed";
  readonly owner: "sdk";
  readonly introduced: "2026-04-28";
  readonly replacement: "`messaging.targetResolver` for target normalization and `messaging.resolveOutboundSessionRoute` for session/thread identity";
  readonly docsPath: "/plugins/sdk-migration";
  readonly surfaces: readonly ["ChannelMessagingAdapter.parseExplicitTarget", "openclaw/plugin-sdk/channel-route ChannelRouteExplicitTarget", "openclaw/plugin-sdk/channel-route ChannelRouteExplicitTargetParser", "openclaw/plugin-sdk/channel-route resolveChannelRouteTargetWithParser"];
  readonly diagnostics: readonly ["plugin SDK compatibility warning"];
  readonly tests: readonly ["src/channels/plugins/contracts/test-helpers/surface-contract-suite.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "The deprecated channel explicit-target parser was removed; plugins must normalize targets with `messaging.targetResolver` and project session identity with `messaging.resolveOutboundSessionRoute`.";
}, {
  readonly code: "channel-messaging-targets-subpath";
  readonly status: "removed";
  readonly owner: "sdk";
  readonly introduced: "2026-04-28";
  readonly replacement: "`openclaw/plugin-sdk/channel-targets`";
  readonly docsPath: "/plugins/sdk-migration";
  readonly surfaces: readonly ["openclaw/plugin-sdk/messaging-targets"];
  readonly diagnostics: readonly ["plugin SDK compatibility warning"];
  readonly tests: readonly ["src/plugins/compat/registry.test.ts", "src/plugins/contracts/plugin-sdk-subpaths.test.ts"];
  readonly releaseNote: "The deprecated `openclaw/plugin-sdk/messaging-targets` subpath was removed; import target helpers from `openclaw/plugin-sdk/channel-targets`.";
}, {
  readonly code: "bundled-plugin-allowlist";
  readonly status: "active";
  readonly owner: "config";
  readonly introduced: "2026-04-24";
  readonly replacement: "manifest-owned plugin enablement and scoped load plans";
  readonly docsPath: "/plugins/architecture";
  readonly surfaces: readonly ["plugins.allow", "bundled provider startup", "plugins status"];
  readonly diagnostics: readonly ["plugin status report"];
  readonly tests: readonly ["src/plugins/status.test.ts", "src/plugins/config-state.test.ts"];
}, {
  readonly code: "bundled-plugin-enablement";
  readonly status: "active";
  readonly owner: "config";
  readonly introduced: "2026-04-24";
  readonly replacement: "manifest-owned plugin defaults and scoped load plans";
  readonly docsPath: "/plugins/architecture";
  readonly surfaces: readonly ["plugins.entries", "bundled provider startup", "plugins status"];
  readonly diagnostics: readonly ["plugin status report"];
  readonly tests: readonly ["src/plugins/status.test.ts", "src/plugins/config-state.test.ts"];
}, {
  readonly code: "activation-agent-harness-hint";
  readonly status: "active";
  readonly owner: "plugin-execution";
  readonly introduced: "2026-04-24";
  readonly replacement: "top-level `cliBackends[]` for CLI aliases and future `agentRuntime` ownership metadata";
  readonly docsPath: "/plugins/manifest";
  readonly surfaces: readonly ["activation.onAgentHarnesses", "activation planner"];
  readonly diagnostics: readonly ["activation plan compat reason"];
  readonly tests: readonly ["src/plugins/activation-planner.test.ts"];
}, {
  readonly code: "activation-provider-hint";
  readonly status: "active";
  readonly owner: "plugin-execution";
  readonly introduced: "2026-04-24";
  readonly replacement: "`providers[]` manifest ownership";
  readonly docsPath: "/plugins/manifest";
  readonly surfaces: readonly ["activation.onProviders", "activation planner"];
  readonly diagnostics: readonly ["activation plan compat reason"];
  readonly tests: readonly ["src/plugins/activation-planner.test.ts"];
}, {
  readonly code: "activation-channel-hint";
  readonly status: "active";
  readonly owner: "plugin-execution";
  readonly introduced: "2026-04-24";
  readonly replacement: "`channels[]` manifest ownership";
  readonly docsPath: "/plugins/manifest";
  readonly surfaces: readonly ["activation.onChannels", "activation planner"];
  readonly diagnostics: readonly ["activation plan compat reason"];
  readonly tests: readonly ["src/plugins/activation-planner.test.ts"];
}, {
  readonly code: "activation-command-hint";
  readonly status: "active";
  readonly owner: "plugin-execution";
  readonly introduced: "2026-04-24";
  readonly replacement: "`commandAliases` or command contribution metadata";
  readonly docsPath: "/plugins/manifest";
  readonly surfaces: readonly ["activation.onCommands", "activation planner"];
  readonly diagnostics: readonly ["activation plan compat reason"];
  readonly tests: readonly ["src/plugins/activation-planner.test.ts"];
}, {
  readonly code: "activation-route-hint";
  readonly status: "active";
  readonly owner: "plugin-execution";
  readonly introduced: "2026-04-24";
  readonly replacement: "HTTP route contribution metadata";
  readonly docsPath: "/plugins/manifest";
  readonly surfaces: readonly ["activation.onRoutes", "activation planner"];
  readonly diagnostics: readonly ["activation plan compat reason"];
  readonly tests: readonly ["src/plugins/activation-planner.test.ts"];
}, {
  readonly code: "activation-config-path-hint";
  readonly status: "active";
  readonly owner: "plugin-execution";
  readonly introduced: "2026-04-27";
  readonly replacement: "manifest contribution ownership for root config surfaces";
  readonly docsPath: "/plugins/manifest";
  readonly surfaces: readonly ["activation.onConfigPaths", "startup plugin selection"];
  readonly diagnostics: readonly ["activation plan compat reason"];
  readonly tests: readonly ["src/plugins/channel-plugin-ids.test.ts"];
}, {
  readonly code: "activation-capability-hint";
  readonly status: "active";
  readonly owner: "plugin-execution";
  readonly introduced: "2026-04-24";
  readonly replacement: "manifest contribution ownership";
  readonly docsPath: "/plugins/manifest";
  readonly surfaces: readonly ["activation.onCapabilities", "activation planner"];
  readonly diagnostics: readonly ["activation plan compat reason"];
  readonly tests: readonly ["src/plugins/activation-planner.test.ts"];
}, {
  readonly code: "agent-harness-sdk-alias";
  readonly status: "deprecated";
  readonly owner: "agent-runtime";
  readonly introduced: "2026-04-24";
  readonly deprecated: "2026-04-25";
  readonly warningStarts: "2026-04-25";
  readonly replacement: "none yet; retain until a harness subpath ships and external migration is proven";
  readonly docsPath: "/plugins/sdk-agent-harness";
  readonly surfaces: readonly ["openclaw/plugin-sdk/agent-harness", "openclaw/plugin-sdk/agent-harness-runtime"];
  readonly diagnostics: readonly ["plugin SDK compatibility warning"];
  readonly tests: readonly ["src/plugins/contracts/plugin-sdk-subpaths.test.ts"];
}, {
  readonly code: "embedded-pi-agent-sdk-aliases";
  readonly status: "removed";
  readonly owner: "agent-runtime";
  readonly introduced: "2026-05-21";
  readonly replacement: "`runEmbeddedAgent` and `EmbeddedAgent*` SDK/runtime names";
  readonly docsPath: "/plugins/sdk-runtime";
  readonly surfaces: readonly ["api.runtime.agent.runEmbeddedPiAgent", "openclaw/extension-api runEmbeddedPiAgent", "openclaw/plugin-sdk/agent-harness-runtime EmbeddedPi* aliases"];
  readonly diagnostics: readonly ["plugin SDK compatibility registry"];
  readonly tests: readonly ["src/plugins/runtime/index.test.ts", "src/plugins/contracts/plugin-sdk-subpaths.test.ts"];
  readonly releaseNote: "The legacy `runEmbeddedPiAgent` and `EmbeddedPi*` plugin aliases were removed; plugins must use the neutral embedded-agent names.";
}, {
  readonly code: "plugin-sdk-shipped-channel-setup-exports";
  readonly status: "deprecated";
  readonly owner: "channel";
  readonly introduced: "2026-07-23";
  readonly deprecated: "2026-07-23";
  readonly warningStarts: "2026-07-23";
  readonly replacement: "retain until supported published packages migrate to plugin-owned config schemas plus generic `openclaw/plugin-sdk/channel-config-schema` and `openclaw/plugin-sdk/setup-runtime` primitives";
  readonly docsPath: "/plugins/sdk-migration#published-channel-setup-compatibility";
  readonly surfaces: readonly ["openclaw/plugin-sdk/bundled-channel-config-schema SlackConfigSchema", "openclaw/plugin-sdk/bundled-channel-config-schema DiscordConfigSchema", "openclaw/plugin-sdk/bundled-channel-config-schema SignalConfigSchema", "openclaw/plugin-sdk/bundled-channel-config-schema MSTeamsConfigSchema", "openclaw/plugin-sdk/setup-runtime createLegacyCompatChannelDmPolicy", "openclaw/plugin-sdk/setup-runtime promptLegacyChannelAllowFromForAccount"];
  readonly diagnostics: readonly ["repository deprecated API usage guard for core and bundled plugins; no external runtime import warning"];
  readonly tests: readonly ["src/plugin-sdk/shipped-channel-compat.test.ts", "src/plugins/compat/registry.test.ts"];
  readonly releaseNote: "Published OpenClaw channel packages through 2026.7.1 remain loadable while they migrate to plugin-owned config and setup helpers.";
}, {
  readonly code: "generated-bundled-channel-config-fallback";
  readonly status: "active";
  readonly owner: "channel";
  readonly introduced: "2026-04-24";
  readonly replacement: "manifest registry `channelConfigs` metadata";
  readonly docsPath: "/plugins/manifest";
  readonly surfaces: readonly ["generated bundled channel config metadata", "channel config validation"];
  readonly diagnostics: readonly ["channel config metadata fallback"];
  readonly tests: readonly ["src/plugins/contracts/config-footprint-guardrails.test.ts"];
}, {
  readonly code: "setup-runtime-fallback";
  readonly status: "active";
  readonly owner: "setup";
  readonly introduced: "2026-04-24";
  readonly replacement: "`setup.requiresRuntime: false` with complete setup descriptors";
  readonly docsPath: "/plugins/manifest/setup-and-auth#setup-reference";
  readonly surfaces: readonly ["setup-api runtime fallback", "setup.requiresRuntime omitted"];
  readonly diagnostics: readonly ["setup registry runtime diagnostic"];
  readonly tests: readonly ["src/plugins/setup-registry.test.ts", "src/plugins/setup-registry.runtime.test.ts"];
}];
//#endregion
//#region src/plugins/compat/registry.d.ts
type PluginCompatCode = (typeof PLUGIN_COMPAT_RECORDS)[number]["code"];
//#endregion
//#region src/infra/npm-registry-spec.d.ts
/**
 * Parsed registry-only npm spec accepted by plugin install flows.
 * Selectors are limited to exact versions and dist-tags; URL/git/file specs
 * are rejected before they can execute on the gateway host.
 */
type ParsedRegistryNpmSpec = {
  name: string;
  raw: string;
  selector?: string;
  selectorKind: "none" | "exact-version" | "tag";
  selectorIsPrerelease: boolean;
};
//#endregion
//#region src/plugins/install-source-info.types.d.ts
/** Warning emitted while describing plugin package install source metadata. */
type PluginInstallSourceWarning = "invalid-clawhub-spec" | "invalid-npm-spec" | "invalid-default-choice" | "default-choice-missing-source" | "clawhub-spec-floating" | "npm-integrity-without-source" | "npm-spec-floating" | "npm-spec-missing-integrity" | "npm-spec-package-name-mismatch";
/** Pinning state for npm plugin install metadata. */
type PluginInstallNpmPinState = "exact-with-integrity" | "exact-without-integrity" | "floating-with-integrity" | "floating-without-integrity";
/** Parsed npm install source metadata for a plugin package. */
type PluginInstallNpmSourceInfo = {
  spec: string;
  packageName: string;
  expectedPackageName?: string;
  selector?: string;
  selectorKind: ParsedRegistryNpmSpec["selectorKind"];
  exactVersion: boolean;
  expectedIntegrity?: string;
  pinState: PluginInstallNpmPinState;
};
/** Parsed local install source metadata for a plugin package. */
type PluginInstallLocalSourceInfo = {
  path: string;
};
/** Parsed ClawHub install source metadata for a plugin package. */
type PluginInstallClawHubSourceInfo = {
  spec: string;
  packageName: string;
  version?: string;
  exactVersion: boolean;
};
/** Parsed plugin install sources plus validation warnings. */
type PluginInstallSourceInfo = {
  defaultChoice?: PluginPackageInstall["defaultChoice"];
  clawhub?: PluginInstallClawHubSourceInfo;
  npm?: PluginInstallNpmSourceInfo;
  local?: PluginInstallLocalSourceInfo;
  warnings: readonly PluginInstallSourceWarning[];
};
//#endregion
//#region src/plugins/installed-plugin-index-hash.d.ts
/** File metadata signature used to skip unchanged installed plugin files. */
type InstalledPluginFileSignature = {
  size: number;
  mtimeMs: number;
  ctimeMs?: number;
};
//#endregion
//#region src/plugins/installed-plugin-index-types.d.ts
/** Schema version for installed plugin index files. */
declare const INSTALLED_PLUGIN_INDEX_VERSION = 1;
declare const INSTALLED_PLUGIN_INDEX_MIGRATION_VERSION = 1;
type InstalledPluginIndexRefreshReason = "missing" | "stale-manifest" | "stale-package" | "source-changed" | "policy-changed" | "migration" | "host-contract-changed" | "compat-registry-changed" | "manual";
type InstalledPluginStartupInfo = {
  sidecar: boolean;
  memory: boolean;
  agentHarnesses: readonly string[];
  /**
   * Manifest activation.onConfigPaths copied into the installed index for
   * pre-manifest startup scoping. Missing on older persisted index files.
   */
  configPaths?: readonly string[];
};
type InstalledPluginContributionInfo = {
  channels: readonly string[];
  channelConfigs: readonly string[];
  providers: readonly string[];
  modelCatalogProviders: readonly string[];
  modelSupportPrefixes: readonly string[];
  modelSupportPatterns: readonly string[];
  autoEnableProviderIds: readonly string[];
  commandAliases: readonly string[];
  contracts: Readonly<Record<string, readonly string[]>>;
};
type InstalledPluginInstallRecordInfo = Pick<PluginInstallRecord, "source" | "spec" | "sourcePath" | "installPath" | "version" | "resolvedName" | "resolvedVersion" | "resolvedSpec" | "integrity" | "shasum" | "resolvedAt" | "installedAt" | "clawhubUrl" | "clawhubPackage" | "clawhubFamily" | "clawhubChannel" | "clawhubTrustDisposition" | "clawhubTrustScanStatus" | "clawhubTrustModerationState" | "clawhubTrustReasons" | "clawhubTrustPending" | "clawhubTrustStale" | "clawhubTrustCheckedAt" | "clawhubTrustAcknowledgedAt" | "artifactKind" | "artifactFormat" | "npmIntegrity" | "npmShasum" | "npmTarballName" | "clawpackSha256" | "clawpackSpecVersion" | "clawpackManifestSha256" | "clawpackSize" | "gitUrl" | "gitRef" | "gitCommit" | "marketplaceName" | "marketplaceSource" | "marketplacePlugin" | "acceptedSurface" | "acceptedSurfaceHash" | "acceptedSurfaceAt" | "acceptedSurfaceIntegrity">;
type InstalledPluginPackageChannelInfo = PluginPackageChannel;
/** One manifest-backed plugin entry in the generated installed plugin index. */
type InstalledPluginIndexRecord = {
  pluginId: string;
  packageName?: string;
  packageVersion?: string;
  /**
   * Legacy embedded install record accepted when reading earlier index files.
   * New index writes keep install records in InstalledPluginIndex.installRecords.
   */
  installRecord?: InstalledPluginInstallRecordInfo;
  /** Hash of the top-level installRecords entry; used to detect source-changed invalidation. */
  installRecordHash?: string;
  /**
   * Package-authored openclaw.install metadata. This describes catalog/package
   * install intent and must not be treated as the durable install record.
   */
  packageInstall?: PluginInstallSourceInfo;
  packageChannel?: InstalledPluginPackageChannelInfo;
  packageBuild?: OpenClawPackageBuild;
  manifestPath: string;
  manifestHash: string;
  /** Hash of the doctor-contract artifact selected by the runtime resolver. */
  doctorContractHash?: string;
  doctorContractFile?: InstalledPluginFileSignature;
  manifestFile?: InstalledPluginFileSignature;
  format?: PluginManifestRecord["format"];
  bundleFormat?: PluginManifestRecord["bundleFormat"];
  source?: string;
  setupSource?: string;
  packageJson?: {
    path: string;
    hash: string;
    fileSignature?: InstalledPluginFileSignature;
  };
  rootDir: string;
  origin: PluginManifestRecord["origin"];
  enabled: boolean;
  enabledByDefault?: boolean;
  enabledByDefaultOnPlatforms?: readonly string[];
  syntheticAuthRefs?: readonly string[];
  startup: InstalledPluginStartupInfo;
  contributions?: InstalledPluginContributionInfo;
  compat: readonly PluginCompatCode[];
};
/** Full installed-index payload used by control-plane plugin registry loading. */
type InstalledPluginIndex = {
  version: typeof INSTALLED_PLUGIN_INDEX_VERSION;
  warning?: string;
  hostContractVersion: string;
  compatRegistryVersion: string;
  migrationVersion: typeof INSTALLED_PLUGIN_INDEX_MIGRATION_VERSION;
  policyHash: string;
  generatedAtMs: number;
  /** Selected workspace used to build this index. Missing for omitted and legacy scopes. */
  workspaceDir?: string;
  refreshReason?: InstalledPluginIndexRefreshReason;
  installRecords: Readonly<Record<string, InstalledPluginInstallRecordInfo>>;
  plugins: readonly InstalledPluginIndexRecord[];
  diagnostics: readonly PluginDiagnostic[];
};
//#endregion
//#region src/plugins/plugin-registry-snapshot.types.d.ts
/** Source class for plugin registry snapshots used by diagnostics and cache decisions. */
type PluginRegistrySnapshotSource = "provided" | "persisted" | "derived";
/** Which registry facts differ for one plugin; the sources alone can be identical. */
type PluginRegistryDifferenceFacet = "record" | "install" | "diagnostics";
type PluginRegistryDifference = {
  pluginId: string;
  changed: readonly PluginRegistryDifferenceFacet[];
  persistedSource: string | null;
  derivedSource: string | null;
};
type PluginRegistrySnapshotDiagnostic = {
  level: "info" | "warn";
  code: "persisted-registry-missing" | "persisted-registry-stale-policy" | "persisted-registry-stale-source";
  message: string;
  differences?: readonly PluginRegistryDifference[];
};
//#endregion
//#region src/plugins/provider-owner-index.d.ts
type DeclaredProviderOwnerIndex = ReadonlyMap<string, ReadonlySet<string>>;
//#endregion
//#region src/plugins/plugin-metadata-snapshot.types.d.ts
type PluginProviderAuthAliasCandidate = {
  plugin: PluginManifestRecord;
  target: string;
  baseUrls?: readonly string[];
  /** First eligible declaration owns public map order, even if a later candidate wins. */
  order: number;
};
type PluginMetadataSnapshotOwnerMaps = {
  channels: ReadonlyMap<string, readonly string[]>;
  channelAccountKeyPolicies?: ReadonlyMap<string, ChannelAccountKeyPolicy>;
  channelConfigs: ReadonlyMap<string, readonly string[]>;
  providers: ReadonlyMap<string, readonly string[]>;
  modelCatalogProviders: ReadonlyMap<string, readonly string[]>;
  cliBackends: ReadonlyMap<string, readonly string[]>;
  setupProviders: ReadonlyMap<string, readonly string[]>;
  commandAliases: ReadonlyMap<string, readonly string[]>;
  contracts: ReadonlyMap<string, readonly string[]>;
  /** Empty views must not fall through to process-current model normalization policies. */
  modelIdNormalizationPolicies: ReadonlyMap<string, PluginManifestModelIdNormalizationProvider>;
  providerAuthAliases?: ReadonlyMap<string, readonly PluginProviderAuthAliasCandidate[]>;
  providerEndpoints?: readonly PluginManifestProviderEndpoint[];
  providerRequests?: ReadonlyMap<string, PluginManifestProviderRequestProvider>;
};
type PluginMetadataSnapshotMetrics = {
  registrySnapshotMs: number;
  manifestRegistryMs: number;
  ownerMapsMs: number;
  totalMs: number;
  indexPluginCount: number;
  manifestPluginCount: number;
};
type PluginMetadataSnapshot = {
  policyHash: string;
  configFingerprint?: string;
  pluginIds?: readonly string[];
  registrySource?: PluginRegistrySnapshotSource;
  workspaceDir?: string;
  index: InstalledPluginIndex;
  /** The original workspace-scoped index described by registrySource, before runtime unions. */
  registryIndex: InstalledPluginIndex;
  registryDiagnostics: readonly PluginRegistrySnapshotDiagnostic[];
  manifestRegistry: PluginManifestRegistry;
  /** Independently validated bundled owners, including packages shadowed by active plugins. */
  bundledManifestRegistry?: PluginManifestRegistry;
  plugins: readonly PluginManifestRecord[];
  diagnostics: readonly PluginDiagnostic[];
  byPluginId: ReadonlyMap<string, PluginManifestRecord>;
  normalizePluginId: (pluginId: string) => string;
  owners: PluginMetadataSnapshotOwnerMaps;
  /** Strict first-winner literal/setup ownership, separate from public alias maps. */
  declaredProviderOwners: DeclaredProviderOwnerIndex;
  metrics: PluginMetadataSnapshotMetrics;
  discovery?: PluginDiscoveryResult;
};
type PluginMetadataRegistryView = Pick<PluginMetadataSnapshot, "index" | "manifestRegistry" | "discovery" | "workspaceDir"> & Partial<Pick<PluginMetadataSnapshot, "declaredProviderOwners">>;
//#endregion
//#region src/config/mutate.d.ts
type ConfigReplaceResult = {
  path: string;
  previousHash: string | null;
  snapshot: ConfigFileSnapshot;
  nextConfig: OpenClawConfig;
  persistedHash: string | null;
  persistedSourceConfig?: OpenClawConfig;
  afterWrite: ConfigWriteAfterWrite;
  followUp: ConfigWriteFollowUp;
};
//#endregion
//#region packages/normalization-core/src/string-coerce.d.ts
type FastMode = boolean | "auto";
//#endregion
//#region src/config/sessions/activity-summary.d.ts
declare const ActivitySummarySchema: z.ZodObject<{
  version: z.ZodLiteral<1>;
  formatRevision: z.ZodOptional<z.ZodNumber>;
  text: z.ZodString;
  updatedAt: z.ZodNumber;
  sessionId: z.ZodString;
  lifecycleRevision: z.ZodOptional<z.ZodString>;
  generation: z.ZodNullable<z.ZodString>;
  maxSeq: z.ZodNullable<z.ZodNumber>;
  leafEntryId: z.ZodNullable<z.ZodString>;
  coveredMessages: z.ZodNumber;
  totalMessages: z.ZodNumber;
  omittedContent: z.ZodBoolean;
}, z.core.$strip>;
type SessionActivitySummary$1 = z.infer<typeof ActivitySummarySchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/skill-library.d.ts
declare const SkillLibraryFileSchema: Type.TObject<{
  path: Type.TString;
  content: Type.TString;
  encoding: Type.TOptional<Type.TUnion<[Type.TLiteral<"utf8">, Type.TLiteral<"base64">]>>;
  executable: Type.TOptional<Type.TBoolean>;
}>;
declare const SkillLibrarySelectionSchema: Type.TObject<{
  skillId: Type.TString;
  revision: Type.TString;
  /** Persisted command identity: library collisions never shadow workspace names. */
  name: Type.TString;
  ownerProfileId: Type.TUnion<[Type.TString, Type.TNull]>;
}>;
type SkillLibraryFile = Static<typeof SkillLibraryFileSchema>;
type SkillLibrarySelection = Static<typeof SkillLibrarySelectionSchema>;
type SkillLibraryEntry = {
  skillId: string;
  slug: string;
  name: string;
  description: string;
  ownerProfileId: string | null;
  ownerLabel: string;
  authorProfileId: string;
  shared: boolean;
  enabled: boolean;
  removed: boolean;
  revision: string;
  createdAt: number;
  updatedAt: number;
  canEdit: boolean;
};
type SkillsLibraryListResult = {
  entries: SkillLibraryEntry[];
  profileId: string | null;
  multipleProfiles: boolean;
  defaultTarget: "workspace" | "personal" | "unavailable";
  canManageWorkspace: boolean;
  defaultSelectionLimit: number;
  defaultSelectionNotice?: string;
  session?: {
    sessionKey: string;
    selections: Array<SkillLibrarySelection & {
      slug: string;
      description: string;
      ownerLabel: string;
    }>;
    attachable: SkillLibraryEntry[];
  };
};
type SkillsLibraryReadResult = {
  entry: SkillLibraryEntry;
  content: string;
  files: SkillLibraryFile[];
  revisions: Array<{
    revision: string;
    createdAt: number;
  }>;
};
type SkillsLibraryReceipt = {
  state: "published" | "unchanged" | "removed";
  target: "personal" | "team";
  entry: SkillLibraryEntry;
  sessionActivation: "new-sessions";
  nextAction: string;
};
type SkillsLibraryActivateResult = {
  sessionKey: string;
  selections: SkillLibrarySelection[];
  sessionActivation: "next-turn";
};
//#endregion
//#region src/security/external-content-source.d.ts
/** Hook session sources that carry untrusted external content into agent prompts. */
type HookExternalContentSource = "email" | "gmail" | "webhook";
//#endregion
//#region packages/gateway-protocol/src/schema/session-participant.d.ts
/** Product identity, independent of display metadata and authorization. */
declare const SessionParticipantIdentitySchema: Type.TUnion<[Type.TObject<{
  type: Type.TLiteral<"profile">;
  id: Type.TString;
}>, Type.TObject<{
  type: Type.TLiteral<"agent">;
  id: Type.TString;
}>, Type.TObject<{
  type: Type.TLiteral<"remote">;
  pluginId: Type.TString;
  domain: Type.TString;
  idKind: Type.TString;
  id: Type.TString;
}>, Type.TObject<{
  type: Type.TLiteral<"observation">;
  pluginId: Type.TUnion<[Type.TString, Type.TNull]>;
  accountId: Type.TUnion<[Type.TString, Type.TNull]>;
  senderKind: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"bot">, Type.TLiteral<"unknown">]>;
  id: Type.TString;
}>, Type.TObject<{
  type: Type.TLiteral<"legacy">;
  actorType: Type.TString;
  source: Type.TUnion<[Type.TString, Type.TNull]>;
  id: Type.TString;
}>]>;
declare const SessionParticipantSchema: Type.TObject<{
  identity: Type.TUnion<[Type.TObject<{
    type: Type.TLiteral<"profile">;
    id: Type.TString;
  }>, Type.TObject<{
    type: Type.TLiteral<"agent">;
    id: Type.TString;
  }>, Type.TObject<{
    type: Type.TLiteral<"remote">;
    pluginId: Type.TString;
    domain: Type.TString;
    idKind: Type.TString;
    id: Type.TString;
  }>, Type.TObject<{
    type: Type.TLiteral<"observation">;
    pluginId: Type.TUnion<[Type.TString, Type.TNull]>;
    accountId: Type.TUnion<[Type.TString, Type.TNull]>;
    senderKind: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"bot">, Type.TLiteral<"unknown">]>;
    id: Type.TString;
  }>, Type.TObject<{
    type: Type.TLiteral<"legacy">;
    actorType: Type.TString;
    source: Type.TUnion<[Type.TString, Type.TNull]>;
    id: Type.TString;
  }>]>;
  label: Type.TOptional<Type.TString>;
  avatarUrl: Type.TOptional<Type.TString>;
}>;
type SessionParticipantIdentity = Static<typeof SessionParticipantIdentitySchema>;
type SessionParticipant = Static<typeof SessionParticipantSchema>;
//#endregion
//#region src/config/sessions/session-entry-provenance.d.ts
/** Kept aligned with SessionStateActorType (src/sessions/session-state-event-kinds.ts); not imported to avoid layering config/sessions onto src/sessions. */
type SessionActor = {
  type: "human" | "agent" | "system";
  id?: string;
  label?: string;
};
/** Only trusted creation owners may stamp a Gateway profile namespace. */
type SessionCreatedActor = SessionActor & ({
  type: "human";
  source: "profile" | "channel" | "unknown";
} | {
  type: "agent" | "system";
});
type SessionOwnerAssignment = {
  actor: SessionActor;
  assignedBy?: SessionActor;
  assignedAt?: number;
};
type SessionCreatedVia = "operator" | "spawn" | "channel" | "cron" | "talk" | "run" | "plugin" | "internal";
type SessionEntryProvenance = {
  /** Plugin id that owns this session through a trusted runtime creation seam. */
  pluginOwnerId?: string;
  /** External hook source that has contributed content to this transcript. */
  hookExternalContentSource?: HookExternalContentSource;
};
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-goal.d.ts
declare const SessionGoalSchema: Type.TObject<{
  schemaVersion: Type.TLiteral<1>;
  id: Type.TString;
  objective: Type.TString;
  status: Type.TUnion<[Type.TLiteral<"active">, Type.TLiteral<"paused">, Type.TLiteral<"blocked">, Type.TLiteral<"usage_limited">, Type.TLiteral<"budget_limited">, Type.TLiteral<"complete">]>;
  createdAt: Type.TNumber;
  updatedAt: Type.TNumber;
  tokenStart: Type.TNumber;
  tokenStartFresh: Type.TOptional<Type.TBoolean>;
  tokensUsed: Type.TNumber;
  tokenBudget: Type.TOptional<Type.TNumber>;
  continuationTurns: Type.TNumber;
  lastStatusNote: Type.TOptional<Type.TString>;
  pausedAt: Type.TOptional<Type.TNumber>;
  blockedAt: Type.TOptional<Type.TNumber>;
  completedAt: Type.TOptional<Type.TNumber>;
  usageLimitedAt: Type.TOptional<Type.TNumber>;
  budgetLimitedAt: Type.TOptional<Type.TNumber>;
}>;
type SessionGoal = Static<typeof SessionGoalSchema>;
declare const SessionsGoalMutationResultSchema: Type.TObject<{
  operationId: Type.TString;
  action: Type.TUnion<[Type.TLiteral<"start">, Type.TLiteral<"edit">, Type.TLiteral<"pause">, Type.TLiteral<"resume">, Type.TLiteral<"complete">, Type.TLiteral<"block">, Type.TLiteral<"clear">]>;
  sessionId: Type.TString;
  goalId: Type.TString;
  goal: Type.TOptional<Type.TObject<{
    schemaVersion: Type.TLiteral<1>;
    id: Type.TString;
    objective: Type.TString;
    status: Type.TUnion<[Type.TLiteral<"active">, Type.TLiteral<"paused">, Type.TLiteral<"blocked">, Type.TLiteral<"usage_limited">, Type.TLiteral<"budget_limited">, Type.TLiteral<"complete">]>;
    createdAt: Type.TNumber;
    updatedAt: Type.TNumber;
    tokenStart: Type.TNumber;
    tokenStartFresh: Type.TOptional<Type.TBoolean>;
    tokensUsed: Type.TNumber;
    tokenBudget: Type.TOptional<Type.TNumber>;
    continuationTurns: Type.TNumber;
    lastStatusNote: Type.TOptional<Type.TString>;
    pausedAt: Type.TOptional<Type.TNumber>;
    blockedAt: Type.TOptional<Type.TNumber>;
    completedAt: Type.TOptional<Type.TNumber>;
    usageLimitedAt: Type.TOptional<Type.TNumber>;
    budgetLimitedAt: Type.TOptional<Type.TNumber>;
  }>>;
  runId: Type.TOptional<Type.TString>;
  replayed: Type.TOptional<Type.TLiteral<true>>;
  status: Type.TUnion<[Type.TLiteral<"started">, Type.TLiteral<"updated">, Type.TLiteral<"cleared">]>;
}>;
type SessionsGoalMutationResult = Static<typeof SessionsGoalMutationResultSchema>;
//#endregion
//#region src/config/sessions/goals-operations.types.d.ts
type SessionGoalOperationResult = Omit<SessionsGoalMutationResult, "replayed">;
type SessionTranscriptTurnMutationResult = {
  result: SessionGoalOperationResult;
  replayed: boolean;
};
//#endregion
//#region src/channels/inbound-event/kind.d.ts
/**
 * High-level inbound event class used to separate actionable user requests from room activity.
 */
type InboundEventKind = "user_request" | "room_event";
//#endregion
//#region src/gateway/ui-command-target.types.d.ts
/** Presentation destination captured from the requesting Control UI, never model arguments. */
type GatewayUiCommandTarget = Readonly<{
  connId: string;
  profileId?: string;
}>;
//#endregion
//#region packages/media-understanding-common/src/types.d.ts
/** Kind of media-understanding output produced for an attachment. */
type MediaUnderstandingKind = "audio.transcription" | "video.description" | "image.description";
/** Capability exposed by a media-understanding provider. */
type MediaUnderstandingCapability = "image" | "audio" | "video";
/** Normalized text output produced by media understanding. */
type MediaUnderstandingOutput = {
  kind: MediaUnderstandingKind;
  attachmentIndex: number;
  text: string;
  provider: string;
  model?: string;
  requestedBackend?: string;
  observedBackend?: string;
};
//#endregion
//#region src/agents/auth-profiles/credential-schema.d.ts
/** Provider-owned fields retained with OAuth material through storage and refresh. */
declare const oauthCredentialMetadataSchema: z.ZodObject<{
  idToken: z.ZodOptional<z.ZodString>;
  clientId: z.ZodOptional<z.ZodString>;
  enterpriseUrl: z.ZodOptional<z.ZodString>;
  projectId: z.ZodOptional<z.ZodString>;
  accountId: z.ZodOptional<z.ZodString>;
  chatgptPlanType: z.ZodOptional<z.ZodString>;
  subscriptionType: z.ZodOptional<z.ZodString>;
  rateLimitTier: z.ZodOptional<z.ZodString>;
  tokenEndpoint: z.ZodOptional<z.ZodString>;
  deviceAuthorizationEndpoint: z.ZodOptional<z.ZodString>;
  issuer: z.ZodOptional<z.ZodString>;
  authFlow: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
type OAuthCredentialMetadata = z.infer<typeof oauthCredentialMetadataSchema>;
//#endregion
//#region src/agents/auth-profiles/legacy-oauth-ref.d.ts
/** Legacy OAuth ref source persisted by older credential stores. */
declare const LEGACY_OAUTH_REF_SOURCE = "openclaw-credentials";
/** Legacy OAuth ref provider persisted by older credential stores. */
declare const LEGACY_OAUTH_REF_PROVIDER = "openai-codex";
type LegacyOAuthRef = {
  source: typeof LEGACY_OAUTH_REF_SOURCE;
  provider: typeof LEGACY_OAUTH_REF_PROVIDER;
  id: string;
};
//#endregion
//#region src/agents/auth-profiles/types.d.ts
/** Provider identifier recorded on auth profile credentials. */
type OAuthProvider = string;
/** Refreshable OAuth credential fields persisted for provider auth profiles. */
type OAuthCredentials = OAuthCredentialMetadata & {
  access: string;
  refresh: string;
  expires: number;
  provider?: OAuthProvider;
  email?: string;
};
/** API-key credential with optional secret reference indirection. */
type ApiKeyCredential = {
  type: "api_key";
  provider: string;
  key?: string;
  keyRef?: SecretRef;
  /** Explicit opt-out for copying this profile when creating another agent. */
  copyToAgents?: boolean;
  email?: string;
  displayName?: string;
  /** Optional provider-specific metadata (e.g., account IDs, gateway IDs). */
  metadata?: Record<string, string>;
};
/** Static token credential that OpenClaw does not refresh. */
type TokenCredential = {
  /**
   * Static bearer-style token (often OAuth access token / PAT).
   * Not refreshable by OpenClaw (unlike `type: "oauth"`).
   */
  type: "token";
  provider: string;
  token?: string;
  tokenRef?: SecretRef;
  /** Explicit opt-out for copying this profile when creating another agent. */
  copyToAgents?: boolean;
  /** Optional expiry timestamp (ms since epoch). */
  expires?: number;
  email?: string;
  displayName?: string;
};
/** Refreshable OAuth credential plus provider metadata and legacy references. */
type OAuthCredential = OAuthCredentials & {
  type: "oauth";
  provider: string;
  oauthRef?: LegacyOAuthRef;
  /**
   * OAuth refresh tokens are not portable by default. Provider-owned flows may
   * set this only when copying refresh material across agents is known safe.
   */
  copyToAgents?: boolean;
  email?: string;
  displayName?: string;
};
type SavedSetupCredential = {
  apiKeyHeader?: true;
  agentRuntimeId?: string;
  replacement: boolean;
  modelRef: string;
  /** Setup validates the connection config when retrying, outside auth hot paths. */
  configJson: string;
  authChoice?: string;
  pluginId?: string;
};
/** Credential variants supported by auth profiles. */
type AuthProfileCredential = (ApiKeyCredential | TokenCredential | OAuthCredential) & {
  /** Replacement credentials stay unavailable until their verified connection is activated. */
  setup?: SavedSetupCredential;
};
/** Closed reasons that drive cooldown, disable, and failure counters. */
type AuthProfileFailureReason = "auth" | "auth_permanent" | "format" | "overloaded" | "rate_limit" | "billing" | "timeout" | "model_not_found" | "session_expired" | "empty_response" | "no_error_details" | "unclassified" | "unknown";
/** Optional host diagnostic attached to a canonical cooldown reason. */
type AuthProfileCooldownClassification = "wham_token_expired" | "wham_account_dead";
/** Profile-wide blocked reason reported by provider usage probes. */
type AuthProfileBlockedReason = "subscription_limit";
/** Source that marked a profile as blocked. */
type AuthProfileBlockedSource = "codex_rate_limits" | "wham";
/** Per-profile usage statistics for round-robin and cooldown tracking */
type ProfileUsageStats = {
  lastUsed?: number;
  blockedUntil?: number;
  blockedReason?: AuthProfileBlockedReason;
  blockedSource?: AuthProfileBlockedSource;
  blockedModel?: string;
  blockedScope?: "model";
  cooldownUntil?: number;
  cooldownReason?: AuthProfileFailureReason;
  cooldownClassification?: AuthProfileCooldownClassification;
  cooldownModel?: string;
  disabledUntil?: number;
  disabledReason?: AuthProfileFailureReason;
  errorCount?: number;
  failureCounts?: Partial<Record<AuthProfileFailureReason, number>>;
  lastFailureAt?: number;
  /** Most recent quota probe or successful provider use. */
  lastProbeAt?: number;
};
/** Durable, non-secret auth profile selection state. */
type AuthProfileState = {
  /**
   * Optional per-agent preferred profile order overrides.
   * This lets you lock/override auth rotation for a specific agent without
   * changing the global config.
   */
  order?: Record<string, string[]>;
  lastGood?: Record<string, string>;
  /** Usage statistics per profile for round-robin rotation */
  usageStats?: Record<string, ProfileUsageStats>;
};
/** Persisted credential payload without runtime-only selection state. */
type AuthProfileSecretsStore = {
  version: number;
  profiles: Record<string, AuthProfileCredential>;
};
/** Effective in-memory auth store combining credentials, state, and overlays. */
type AuthProfileStore = AuthProfileSecretsStore & AuthProfileState & {
  /** Runtime-only provenance for credentials cloned from persisted auth stores. */
  runtimePersistedProfileIds?: string[];
  /** Runtime-only provenance for external OAuth profiles overlaid onto this store. */
  runtimeExternalProfileIds?: string[];
  /** True when the runtime external profile set was freshly resolved, even if empty. */
  runtimeExternalProfileIdsAuthoritative?: boolean;
};
/** Physical origin of a canonical credential selected into a session read view. */
type AuthProfileCredentialSource = {
  readonly databasePath: string;
  readonly provider: string;
};
/** Internal effective-store ownership metadata; never exposed through the plugin SDK. */
type RuntimeAuthProfileStore = AuthProfileStore & {
  /** Physical sources of the selected rows; retained only in session read views. */
  runtimeCredentialSources?: Record<string, AuthProfileCredentialSource>;
  /** Runtime-only built-in CLI winners; internal provenance, never exposed or persisted. */
  runtimeExternalCliProfileIds?: string[];
  runtimeLocalProfileIds?: string[];
  /** Provider orders stored by this owner; [] means no local override, even with inherited priority. */
  runtimeLocalOrderProviderIds?: string[];
  runtimeInheritsMainState?: boolean;
};
//#endregion
//#region src/media-understanding/types.d.ts
/** Agent-owned runtime handle carried opaquely through media provider requests. */
type MediaPreparedModelRuntime = Readonly<{
  agentDir: string;
  workspaceDir?: string;
  config: OpenClawConfig;
  createStores: () => unknown;
}>;
type MediaUnderstandingDecisionOutcome = "success" | "failed" | "skipped" | "disabled" | "no-attachment" | "scope-deny";
type MediaUnderstandingModelDecision = {
  provider?: string;
  model?: string;
  requestedBackend?: string;
  observedBackend?: string;
  type: "provider" | "cli";
  outcome: "success" | "skipped" | "failed";
  reason?: string;
};
type MediaUnderstandingAttachmentDecision = {
  attachmentIndex: number;
  attempts: MediaUnderstandingModelDecision[];
  chosen?: MediaUnderstandingModelDecision;
};
type MediaAttachmentDisposition = {
  kind: "handled";
} | {
  kind: "handed-to-native-vision";
} | {
  kind: "not-selected";
} | {
  kind: "capability-disabled";
} | {
  kind: "no-model";
} | {
  kind: "scope-denied";
} | {
  kind: "failed";
  reason?: string;
};
type MediaAttachmentProcessing = "completed" | "omitted";
type MediaUnderstandingDecision = {
  capability: MediaUnderstandingCapability;
  outcome: MediaUnderstandingDecisionOutcome;
  attachments: MediaUnderstandingAttachmentDecision[];
  attachmentDispositions?: Record<number, MediaAttachmentDisposition>;
  attachmentProcessing?: Record<number, MediaAttachmentProcessing>;
  nativeVisionActive?: boolean;
};
type MediaUnderstandingProviderRequestAuthOverride = {
  mode: "provider-default";
} | {
  mode: "authorization-bearer";
  token: string;
} | {
  mode: "header";
  headerName: string;
  value: string;
  prefix?: string;
};
type MediaUnderstandingProviderRequestTlsOverride = {
  ca?: string;
  cert?: string;
  key?: string;
  passphrase?: string;
  serverName?: string;
  insecureSkipVerify?: boolean;
};
type MediaUnderstandingProviderRequestProxyOverride = {
  mode: "env-proxy";
  tls?: MediaUnderstandingProviderRequestTlsOverride;
} | {
  mode: "explicit-proxy";
  url: string;
  tls?: MediaUnderstandingProviderRequestTlsOverride;
};
type MediaUnderstandingProviderRequestTransportOverrides = {
  headers?: Record<string, string>;
  auth?: MediaUnderstandingProviderRequestAuthOverride;
  proxy?: MediaUnderstandingProviderRequestProxyOverride;
  tls?: MediaUnderstandingProviderRequestTlsOverride;
  /** Runtime-only flag from trusted model-provider config; media config rejects it. */
  allowPrivateNetwork?: boolean;
};
type MediaUnderstandingProviderRequestAuth = {
  kind: "api-key";
  apiKey: string;
  source?: string;
} | {
  kind: "none";
  source: string;
};
type AudioTranscriptionRequest = {
  buffer: Buffer;
  fileName: string;
  mime?: string;
  /** Compatibility field for existing providers; prefer auth.kind/apiKey. */
  apiKey: string;
  auth?: MediaUnderstandingProviderRequestAuth;
  baseUrl?: string;
  headers?: Record<string, string>;
  request?: MediaUnderstandingProviderRequestTransportOverrides;
  model?: string;
  language?: string;
  prompt?: string;
  query?: Record<string, string | number | boolean>;
  timeoutMs: number;
  signal?: AbortSignal;
  fetchFn?: typeof fetch;
};
type AudioTranscriptionResult = {
  text: string;
  model?: string;
};
type AudioTranscriptionContext = Omit<AudioTranscriptionRequest, "apiKey" | "auth"> & {
  cfg: OpenClawConfig;
  agentDir?: string;
  workspaceDir?: string;
  profile?: string;
  preferredProfile?: string;
};
type VideoDescriptionRequest = {
  buffer: Buffer;
  fileName: string;
  mime?: string;
  /** Compatibility field for existing providers; prefer auth.kind/apiKey. */
  apiKey: string;
  auth?: MediaUnderstandingProviderRequestAuth;
  baseUrl?: string;
  headers?: Record<string, string>;
  request?: MediaUnderstandingProviderRequestTransportOverrides;
  model?: string;
  prompt?: string;
  timeoutMs: number;
  signal?: AbortSignal;
  fetchFn?: typeof fetch;
};
type VideoDescriptionResult = {
  text: string;
  model?: string;
};
type ImageDescriptionRequest = {
  buffer: Buffer;
  fileName: string;
  mime?: string;
  prompt?: string;
  maxTokens?: number;
  timeoutMs: number;
  signal?: AbortSignal;
  profile?: string;
  preferredProfile?: string;
  authStore?: AuthProfileStore;
  agentId?: string;
  agentDir: string;
  workspaceDir?: string;
  preparedModelRuntime?: MediaPreparedModelRuntime;
  cfg: OpenClawConfig;
  model: string;
  provider: string;
};
type ImagesDescriptionInput = {
  buffer: Buffer;
  fileName: string;
  mime?: string;
};
type ImagesDescriptionRequest = {
  images: ImagesDescriptionInput[];
  model: string;
  provider: string;
  prompt?: string;
  maxTokens?: number;
  timeoutMs: number;
  signal?: AbortSignal;
  profile?: string;
  preferredProfile?: string;
  authStore?: AuthProfileStore;
  agentId?: string;
  agentDir: string;
  workspaceDir?: string;
  preparedModelRuntime?: MediaPreparedModelRuntime;
  cfg: OpenClawConfig;
};
type ImageDescriptionResult = {
  text: string;
  model?: string;
};
type ImagesDescriptionResult = {
  text: string;
  model?: string;
};
type StructuredExtractionTextInput = {
  type: "text";
  text: string;
};
type StructuredExtractionImageInput = {
  type: "image";
  buffer: Buffer;
  fileName: string;
  mime?: string;
};
type StructuredExtractionInput = StructuredExtractionTextInput | StructuredExtractionImageInput;
type StructuredExtractionRequest = {
  /** Image-first extraction input; callers must include at least one image. */
  input: StructuredExtractionInput[];
  instructions: string;
  schemaName?: string;
  jsonSchema?: unknown;
  jsonMode?: boolean;
  timeoutMs: number;
  signal?: AbortSignal;
  profile?: string;
  preferredProfile?: string;
  authStore?: AuthProfileStore;
  agentDir: string;
  cfg: OpenClawConfig;
  model: string;
  provider: string;
};
type StructuredExtractionResult = {
  text: string;
  parsed?: unknown;
  model?: string;
  provider?: string;
  contentType?: "json" | "text";
};
type MediaUnderstandingDocumentModelDefaults = {
  textExtraction?: string;
  image?: string | false;
};
type MediaUnderstandingProviderAuthContext = {
  config?: OpenClawConfig;
  provider: string;
  providerConfig?: ModelProviderConfig;
};
type MediaUnderstandingProviderAuthResult = {
  kind: "none";
  source: string;
} | {
  kind: "api-key";
  apiKey: string;
  source: string;
  mode?: "api-key";
};
type MediaUnderstandingProviderSyntheticAuthResult = {
  apiKey: string;
  source: string;
  mode: "api-key";
};
type MediaUnderstandingProvider = {
  id: string;
  capabilities?: MediaUnderstandingCapability[];
  defaultModels?: Partial<Record<MediaUnderstandingCapability, string>>;
  autoPriority?: Partial<Record<MediaUnderstandingCapability, number>>;
  nativeDocumentInputs?: Array<"pdf">;
  documentModels?: Partial<Record<"pdf", MediaUnderstandingDocumentModelDefaults>>;
  resolveAuth?: (ctx: MediaUnderstandingProviderAuthContext) => MediaUnderstandingProviderAuthResult | null | undefined;
  /** @deprecated Use resolveAuth. */
  resolveSyntheticAuth?: (ctx: MediaUnderstandingProviderAuthContext) => MediaUnderstandingProviderSyntheticAuthResult | null | undefined;
  transcribeAudio?: (req: AudioTranscriptionRequest) => Promise<AudioTranscriptionResult>;
  /** Called after file loading. Result.error is only a rejection before audio upload;
   * upload/HTTP failures must throw and stop automatic provider selection. */
  transcribeAudioWithContext?: (req: AudioTranscriptionContext) => Promise<Result<AudioTranscriptionResult, unknown>>;
  describeVideo?: (req: VideoDescriptionRequest) => Promise<VideoDescriptionResult>;
  describeImage?: (req: ImageDescriptionRequest) => Promise<ImageDescriptionResult>;
  describeImages?: (req: ImagesDescriptionRequest) => Promise<ImagesDescriptionResult>;
  extractStructured?: (req: StructuredExtractionRequest) => Promise<StructuredExtractionResult>;
};
//#endregion
//#region packages/media-core/src/constants.d.ts
/** Canonical media families used by attachment facts, routing, and MIME classification. */
type MediaKind = "image" | "audio" | "video" | "document" | "sticker" | "unknown";
/** Maps a MIME type to the media family used for size limits and routing. */
declare function mediaKindFromMime(mime?: string | null): MediaKind | undefined;
//#endregion
//#region src/media/prompt-image-order.d.ts
/** Tracks whether prompt images stayed inline or were offloaded while preserving model order. */
type PromptImageOrderEntry = "inline" | "offloaded";
//#endregion
//#region src/media/media-facts.d.ts
/** One ordered runtime attachment; array position is its alignment identity. */
type MediaFact = {
  path?: string;
  url?: string;
  contentType?: string;
  kind?: MediaKind;
  fileName?: string;
  sizeBytes?: number;
  durationMs?: number;
  width?: number;
  height?: number;
  transcribed?: boolean;
  messageId?: string;
  workspaceDir?: string;
  /** Internal proof that this exact fact was covered by a legacy staged projection. */
  staged?: boolean;
  hydrationSuppressed?: boolean;
};
type MediaFactInput = { [Key in keyof MediaFact]?: MediaFact[Key] | null; };
declare const LEGACY_MEDIA_CONTEXT_KEYS: readonly ["MediaPath", "MediaPaths", "MediaUrl", "MediaUrls", "MediaType", "MediaTypes", "MediaDir", "MediaTranscribedIndexes", "MediaStaged", "MediaWorkspaceDir"];
type LegacyMediaContextKey = (typeof LEGACY_MEDIA_CONTEXT_KEYS)[number];
//#endregion
//#region src/plugins/hook-channel-context.types.d.ts
interface PluginHookChannelSenderContext {
  /** Channel-scoped sender ID, matching `ctx.senderId` when both are present. */
  id?: string;
  [key: string]: unknown;
}
interface PluginHookChannelChatContext {
  /** Transport-native conversation ID, matching `ctx.chatId` when both are present. */
  id?: string;
  [key: string]: unknown;
}
interface PluginHookChannelContext {
  /** Sender metadata supplied by the originating channel. */
  sender?: PluginHookChannelSenderContext;
  /** Chat/conversation metadata supplied by the originating channel. */
  chat?: PluginHookChannelChatContext;
}
//#endregion
//#region packages/agent-core/src/types.d.ts
/**
 * Stream function used by the agent loop.
 *
 * Contract:
 * - Must not throw or return a rejected promise for request/model/runtime failures.
 * - Must return an AssistantMessageEventStream.
 * - Failures must be encoded in the returned stream via protocol events and a
 *   final AssistantMessage with stopReason "error" or "aborted" and errorMessage.
 */
type StreamFn = StreamFn$1;
/**
 * Configuration for how tool calls from a single assistant message are executed.
 *
 * - "sequential": each tool call is prepared, checked for steering, executed, and finalized before the next one starts.
 * - "parallel": tool calls are prepared sequentially, checked for steering once, then allowed tools execute concurrently.
 *   `tool_execution_end` is emitted in tool completion order after each tool is finalized,
 *   while tool-result message artifacts are emitted later in assistant source order.
 */
type ToolExecutionMode = "sequential" | "parallel";
/** Bucketed feedback for an admitted call, not a veto or recovery attempt. */
interface ToolLoopWarning {
  kind: "tool-loop-warning";
  toolCallId: string;
  count: number;
}
interface BashExecutionMessage {
  /** Harness role for shell command transcripts. */
  role: "bashExecution";
  /** Command line that was executed. */
  command: string;
  /** Captured command output, usually already truncated for context. */
  output: string;
  /** Process exit code when the command reached process exit. */
  exitCode: number | undefined;
  /** True when the command was interrupted before normal completion. */
  cancelled: boolean;
  /** True when output was shortened for transcript/context storage. */
  truncated: boolean;
  /** Optional path containing the complete output when truncation occurred. */
  fullOutputPath?: string;
  /** Millisecond timestamp for transcript ordering. */
  timestamp: number;
  /** Exclude this command transcript from model context while keeping it in session history. */
  excludeFromContext?: boolean;
}
interface CustomMessage<T = unknown> {
  /** Harness role for application-defined transcript content. */
  role: "custom";
  /** Application-defined discriminator for rendering or handling this message. */
  customType: string;
  /** Content replayed into model context when this message is included. */
  content: string | (TextContent | ImageContent)[];
  /** Whether UI surfaces should display this message. */
  display: boolean;
  /** Keep display-only application activity out of future model context. */
  excludeFromContext?: boolean;
  /** Optional application-specific metadata. */
  details?: T;
  /** Millisecond timestamp for transcript ordering. */
  timestamp: number;
}
interface BranchSummaryMessage {
  /** Harness role for summaries produced when returning from another branch. */
  role: "branchSummary";
  /** Summary text inserted back into model context. */
  summary: string;
  /** Entry id of the branch root or source leaf being summarized. */
  fromId: string;
  /** Millisecond timestamp for transcript ordering. */
  timestamp: number;
}
interface CompactionSummaryMessage {
  /** Harness role for summaries that replace compacted transcript history. */
  role: "compactionSummary";
  /** Summary text inserted back into model context. */
  summary: string;
  /** Estimated context tokens before compaction. */
  tokensBefore: number;
  /** Timestamp may be numeric in memory or string when loaded from older persisted rows. */
  timestamp: number | string;
  /** Optional estimated context tokens after compaction. */
  tokensAfter?: number;
  /** Optional first retained entry id from the compaction range. */
  firstKeptEntryId?: string;
  /** Optional implementation-specific compaction metadata. */
  details?: unknown;
}
/**
 * Extensible interface for custom app and harness messages.
 * Apps can extend via declaration merging.
 */
interface CustomAgentMessages {
  bashExecution: BashExecutionMessage;
  custom: CustomMessage;
  branchSummary: BranchSummaryMessage;
  compactionSummary: CompactionSummaryMessage;
}
/**
 * AgentMessage: Union of LLM messages + custom messages.
 * This abstraction allows apps to add custom message types while maintaining
 * type safety and compatibility with the base LLM messages.
 */
type AgentMessage = Message | CustomAgentMessages[keyof CustomAgentMessages];
/** Channel-safe progress text emitted by a running tool. */
interface AgentToolProgress {
  /** Public text suitable for user-facing progress surfaces. */
  text: string;
  /** Tool progress is rendered by channel progress UIs. */
  visibility: "channel";
  /** Progress text must not contain secrets, private args, or fetched content. */
  privacy: "public";
  /** Optional stable id for progress line replacement. */
  id?: string;
}
/** Final or partial result produced by a tool. */
interface AgentToolResult<T> {
  /** Text or image content returned to the model. */
  content: (TextContent | ImageContent)[];
  /** Arbitrary structured details for logs or UI rendering. */
  details: T;
  /** Optional public progress hint for partial tool updates; never model content. */
  progress?: AgentToolProgress;
  /**
   * Hint that the agent should stop after the current tool batch.
   * Early termination only happens when every finalized tool result in the batch sets this to true.
   */
  terminate?: boolean;
}
/** Callback used by tools to stream partial execution updates. */
type AgentToolUpdateCallback<T = unknown> = (partialResult: AgentToolResult<T>) => void;
/** Origin class for tool output that can taint later model-authored content in the same turn. */
type ToolResultContentSource = "network";
/** Tool definition used by the agent runtime. */
interface AgentTool<TParameters extends TSchema = TSchema, TDetails = unknown> extends Tool<TParameters> {
  /** Human-readable label for UI display. */
  label: string;
  /** Optional schema for the structured `AgentToolResult.details` value. */
  outputSchema?: TSchema;
  /** Preserve lifecycle telemetry without rendering transient channel progress. */
  hideFromChannelProgress?: boolean;
  /** Tool results contain externally controlled network content. */
  resultContentSource?: ToolResultContentSource;
  /**
   * Optional compatibility shim for raw tool-call arguments before schema validation.
   * Must return an object that matches `TParameters`.
   */
  prepareArguments?: (args: unknown) => Static<TParameters>;
  /** Execute the tool call. Throw on failure instead of encoding errors in `content`. */
  execute: (toolCallId: string, params: Static<TParameters>, signal?: AbortSignal, onUpdate?: AgentToolUpdateCallback<TDetails>) => Promise<AgentToolResult<TDetails>>;
  /**
   * Per-tool execution mode override.
   * - "sequential": this tool must execute one at a time with other tool calls.
   * - "parallel": this tool can execute concurrently with other tool calls.
   *
   * If omitted, the default execution mode applies.
   */
  executionMode?: ToolExecutionMode;
}
//#endregion
//#region src/sessions/input-provenance.d.ts
declare const INPUT_PROVENANCE_KIND_VALUES: readonly ["external_user", "inter_session", "internal_system"];
type InputProvenanceKind = (typeof INPUT_PROVENANCE_KIND_VALUES)[number];
type InputProvenance = {
  kind: InputProvenanceKind;
  originSessionId?: string;
  sourceSessionKey?: string;
  sourceChannel?: string;
  sourceTool?: string;
  sourceRole?: "subagent";
  sourcePromptPrefix?: string;
  jobId?: string;
  runId?: string;
};
//#endregion
//#region src/auto-reply/command-turn-context.d.ts
type CommandTurnKind = "native" | "text-slash" | "normal";
type BaseCommandTurnContext = {
  commandName?: string;
  body?: string;
};
type NativeCommandTurnContext = BaseCommandTurnContext & {
  kind: "native";
  source: "native";
  authorized: boolean;
};
type TextSlashCommandTurnContext = BaseCommandTurnContext & {
  kind: "text-slash";
  source: "text";
  authorized: boolean;
};
type NormalCommandTurnContext = BaseCommandTurnContext & {
  kind: "normal";
  source: "message";
  authorized: false;
};
type CommandTurnContext = NativeCommandTurnContext | TextSlashCommandTurnContext | NormalCommandTurnContext;
//#endregion
//#region src/auto-reply/commands-args.types.d.ts
/** Primitive values accepted by parsed auto-reply command args. */
type CommandArgValue = string | number | boolean | bigint;
/** Named parsed auto-reply command values. */
type CommandArgValues = Record<string, CommandArgValue>;
/** Parsed command argument bundle with raw source and structured values. */
type CommandArgs = {
  raw?: string;
  values?: CommandArgValues;
};
//#endregion
//#region src/auto-reply/group-thread.types.d.ts
type ResolvedGroupThreadConfig = {
  agents: string[];
  unknownAgentIds: string[];
  qualified: boolean;
  configuredAgentCount: number;
  mentionGating: boolean;
  maxRounds: number;
  maxTurns: number;
  strategy: BroadcastStrategy;
};
type GroupThreadMentionFacts = {
  channel: string;
  peerId: string;
  group: ResolvedGroupThreadConfig;
  mentionedAgentIds: string[];
};
//#endregion
//#region src/auto-reply/reply/history.types.d.ts
/** Normalized history message used when building reply context. */
type HistoryEntry = {
  sender: string;
  body: string;
  timestamp?: number;
  messageId?: string;
  media?: HistoryMediaEntry[];
};
/** Media metadata attached to a normalized history message. */
type HistoryMediaEntry = Pick<MediaFact, "contentType" | "durationMs" | "height" | "kind" | "messageId" | "path" | "url" | "width">;
//#endregion
//#region packages/normalization-core/src/agent-run-terminal-outcome.d.ts
declare const AGENT_RUN_TIMEOUT_PHASES: readonly ["queue", "preflight", "provider", "post_turn", "gateway_draining"];
type AgentRunTimeoutPhase = (typeof AGENT_RUN_TIMEOUT_PHASES)[number];
type AgentRunWaitStatus = "ok" | "error" | "timeout";
type AgentRunTerminalReason = "completed" | "hard_timeout" | "timed_out" | "superseded" | "cancelled" | "aborted" | "blocked" | "abandoned" | "failed";
type AgentRunTerminalFacts = {
  reason: AgentRunTerminalReason;
  status: AgentRunWaitStatus;
  stopReason?: string;
  livenessState?: string;
  timeoutPhase?: AgentRunTimeoutPhase;
  providerStarted?: boolean;
};
//#endregion
//#region src/agents/agent-run-terminal-outcome.types.d.ts
/** Normalized terminal outcome for an agent run. */
type AgentRunTerminalOutcome = AgentRunTerminalFacts & {
  error?: string;
  startedAt?: number;
  endedAt?: number;
};
//#endregion
//#region src/audit/execution-identity-admission.d.ts
declare const ExecutionIdentityAdmissionEnvelopeSchema: Type.TObject<{
  envelopeVersion: Type.TLiteral<1>;
  contextId: Type.TString;
  executionId: Type.TString;
  runId: Type.TString;
  createdAt: Type.TInteger;
  runtimeInstanceId: Type.TString;
  agentId: Type.TString;
  ingress: Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"local-cli">, Type.TLiteral<"gateway-client">, Type.TLiteral<"channel">, Type.TLiteral<"api">, Type.TLiteral<"schedule">, Type.TLiteral<"webhook">, Type.TLiteral<"task">, Type.TLiteral<"subagent">, Type.TLiteral<"acp">, Type.TLiteral<"worker">, Type.TLiteral<"plugin">, Type.TLiteral<"recovery">, Type.TLiteral<"system">]>;
    boundary: Type.TString;
    state: Type.TUnion<[Type.TLiteral<"present">, Type.TLiteral<"absent">, Type.TLiteral<"unknown">, Type.TLiteral<"unsupported">]>;
    rawSourceRef: Type.TOptional<Type.TString>;
  }>;
  runtime: Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"embedded">, Type.TLiteral<"worker">, Type.TLiteral<"plugin-harness">, Type.TLiteral<"acp">]>;
  }>;
  invoker: Type.TOptional<Type.TUnion<[Type.TObject<{
    state: Type.TLiteral<"present">;
    kind: Type.TUnion<[Type.TLiteral<"person">, Type.TLiteral<"agent">, Type.TLiteral<"service">, Type.TLiteral<"schedule">, Type.TLiteral<"webhook">, Type.TLiteral<"system">, Type.TLiteral<"local-account">, Type.TLiteral<"runtime">]>;
    rawPrincipalRef: Type.TString;
    displayLabel: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    state: Type.TLiteral<"unknown">;
  }>]>>;
  applicableGrants: Type.TArray<Type.TObject<{
    rawGrantRef: Type.TString;
    state: Type.TUnion<[Type.TLiteral<"present">, Type.TLiteral<"absent">, Type.TLiteral<"unknown">, Type.TLiteral<"unsupported">]>;
  }>>;
  assurance: Type.TArray<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"durable-profile">, Type.TLiteral<"trusted-proxy">, Type.TLiteral<"tailscale-whois">, Type.TLiteral<"device-proof">, Type.TLiteral<"channel-admission">, Type.TLiteral<"local-process">, Type.TLiteral<"spawn-lineage">, Type.TLiteral<"worker-admission">, Type.TLiteral<"runtime-binding">, Type.TLiteral<"other">]>;
    rawEvidenceRef: Type.TString;
    strength: Type.TUnion<[Type.TLiteral<"self-asserted">, Type.TLiteral<"boundary-verified">, Type.TLiteral<"cryptographic">]>;
  }>>;
}>;
declare const ExecutionIdentityAdmissionTokenSchema: Type.TObject<{
  tokenVersion: Type.TLiteral<1>;
  contextId: Type.TString;
  executionId: Type.TString;
  runId: Type.TString;
  createdAt: Type.TInteger;
}>;
type ExecutionIdentityAdmissionEnvelope = Static<typeof ExecutionIdentityAdmissionEnvelopeSchema>;
type ExecutionIdentityAdmissionFacts = Omit<ExecutionIdentityAdmissionEnvelope, "envelopeVersion" | "contextId" | "executionId" | "createdAt" | "runtimeInstanceId" | "ingress" | "applicableGrants" | "assurance"> & {
  ingress: Omit<ExecutionIdentityAdmissionEnvelope["ingress"], "state"> & {
    state?: ExecutionIdentityAdmissionEnvelope["ingress"]["state"];
  };
  applicableGrants?: ExecutionIdentityAdmissionEnvelope["applicableGrants"];
  assurance?: ExecutionIdentityAdmissionEnvelope["assurance"];
};
type ExecutionIdentityAdmissionToken = Static<typeof ExecutionIdentityAdmissionTokenSchema>;
//#endregion
//#region src/channels/streaming.d.ts
type AgentPlanStepStatus = "pending" | "in_progress" | "completed";
type AgentPlanStep = {
  step: string;
  status: AgentPlanStepStatus;
};
//#endregion
//#region src/config/sessions/transcript-entry-anchor.d.ts
/** Immutable transcript identity issued by the SQLite append transaction. */
type TranscriptEntryAnchor = Readonly<{
  agentId: string;
  sessionId: string;
  sessionKey: string;
  storePath: string;
  generation: string;
  entryId: string;
  rawSeq: number;
  effectiveParentId: string | null;
  activeMessagePosition: number;
  idempotencyKey?: string;
}>;
/** Current user row bound to one recorder-owned logical turn. */
type TranscriptTurnAdmission = TranscriptEntryAnchor & Readonly<{
  logicalTurnId: string;
  role: "user";
}>;
/** Exact accepted transcript range, inclusive of admission and terminal. */
type TranscriptTurnBoundary = Readonly<{
  admission: TranscriptTurnAdmission;
  terminal: TranscriptEntryAnchor;
}>;
//#endregion
//#region packages/gateway-protocol/src/schema/session-placement.d.ts
declare const SessionPlacementDiskSpaceSchema: Type.TObject<{
  status: Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
  availableBytes: Type.TInteger;
  totalBytes: Type.TInteger;
  observedAtMs: Type.TInteger;
}>;
declare const SessionPlacementRunnerSchema: Type.TObject<{
  kind: Type.TLiteral<"device">;
  status: Type.TUnion<[Type.TLiteral<"available">, Type.TLiteral<"offline">]>;
  deviceId: Type.TOptional<Type.TString>;
}>;
declare const SessionPlacementMachineSchema: Type.TObject<{
  class: Type.TOptional<Type.TString>;
  os: Type.TOptional<Type.TString>;
  osLabel: Type.TOptional<Type.TString>;
  cpu: Type.TOptional<Type.TInteger>;
  memoryGb: Type.TOptional<Type.TInteger>;
}>;
/** Stops a worker or explicitly recovers one failed placement onto the Gateway. */
declare const SessionsReclaimParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  recoverToGateway: Type.TOptional<Type.TObject<{
    expectedGeneration: Type.TInteger;
  }>>;
}>;
/** Closed destination union for session placement moves. */
declare const SessionMoveTargetSchema: Type.TUnion<[Type.TObject<{
  kind: Type.TLiteral<"gateway">;
}>, Type.TObject<{
  kind: Type.TLiteral<"profile">;
  profileId: Type.TString;
  machineClass: Type.TOptional<Type.TString>;
  os: Type.TOptional<Type.TString>;
}>, Type.TObject<{
  kind: Type.TLiteral<"device">;
  deviceId: Type.TString;
}>]>;
type SessionPlacementDiskSpace = Static<typeof SessionPlacementDiskSpaceSchema>;
type SessionPlacementRunner = Static<typeof SessionPlacementRunnerSchema>;
type SessionPlacementMachine = Static<typeof SessionPlacementMachineSchema>;
type SessionsReclaimParams = Static<typeof SessionsReclaimParamsSchema>;
type SessionMoveTarget = Static<typeof SessionMoveTargetSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/frames.d.ts
/** Initial client hello/connect payload sent before the gateway accepts frames. */
declare const ConnectParamsSchema: Type.TObject<{
  minProtocol: Type.TInteger;
  maxProtocol: Type.TInteger;
  client: Type.TObject<{
    id: Type.TEnum<["openclaw-android", "openclaw-browser-copilot", "cli", "openclaw-control-ui", "fingerprint", "gateway-client", "openclaw-ios", "openclaw-linux", "openclaw-macos", "node-host", "openclaw-probe", "test", "openclaw-tui", "openclaw-watchos", "webchat", "webchat-ui", "openclaw-worker"]>;
    displayName: Type.TOptional<Type.TString>;
    version: Type.TString;
    buildId: Type.TOptional<Type.TString>;
    platform: Type.TString;
    deviceFamily: Type.TOptional<Type.TString>;
    modelIdentifier: Type.TOptional<Type.TString>;
    /** Self-reported IANA zone. Bounded because the longest real name is well under this cap. */
    timeZone: Type.TOptional<Type.TString>;
    mode: Type.TEnum<["backend", "cli", "node", "probe", "test", "ui", "webchat", "worker"]>;
    instanceId: Type.TOptional<Type.TString>;
  }>;
  caps: Type.TOptional<Type.TArray<Type.TString>>;
  commands: Type.TOptional<Type.TArray<Type.TString>>;
  /** Additive Computer Use declaration; the owning core contract validates its bounded shape. */
  computerUse: Type.TOptional<Type.TUnknown>;
  /** @deprecated Accepted for the shipped v1 node-host envelope; current hosts use runner inventory. */
  workerRuns: Type.TOptional<Type.TObject<{
    bundleHash: Type.TString;
    openclawVersion: Type.TString;
    protocolFeatures: Type.TArray<Type.TString>;
    bundlePrewarm: Type.TOptional<Type.TInteger>;
  }>>;
  permissions: Type.TOptional<Type.TRecord<"^.*$", Type.TBoolean>>;
  pathEnv: Type.TOptional<Type.TString>;
  role: Type.TOptional<Type.TString>;
  scopes: Type.TOptional<Type.TArray<Type.TString>>;
  /** Initial catalog read scope; method authorization still owns access. */
  modelCatalog: Type.TOptional<Type.TUnion<[Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    shortId: Type.TString;
    slugHint: Type.TOptional<Type.TString>;
  }>]>>;
  device: Type.TOptional<Type.TObject<{
    id: Type.TString;
    publicKey: Type.TString;
    signature: Type.TString;
    signedAt: Type.TInteger;
    nonce: Type.TString;
  }>>;
  auth: Type.TOptional<Type.TObject<{
    token: Type.TOptional<Type.TString>;
    bootstrapToken: Type.TOptional<Type.TString>;
    deviceToken: Type.TOptional<Type.TString>;
    password: Type.TOptional<Type.TString>;
    approvalRuntimeToken: Type.TOptional<Type.TString>;
    agentRuntimeIdentityToken: Type.TOptional<Type.TString>;
  }>>;
  locale: Type.TOptional<Type.TString>;
  userAgent: Type.TOptional<Type.TString>;
}>;
/** Standard structured error shape used in response frames and connect failures. */
declare const ErrorShapeSchema: Type.TObject<{
  code: Type.TString;
  message: Type.TString;
  details: Type.TOptional<Type.TUnknown>;
  retryable: Type.TOptional<Type.TBoolean>;
  retryAfterMs: Type.TOptional<Type.TInteger>;
}>;
/** Client request frame envelope; `method` selects the payload validator. */
declare const RequestFrameSchema: Type.TObject<{
  type: Type.TLiteral<"req">;
  id: Type.TString;
  method: Type.TString;
  params: Type.TOptional<Type.TUnknown>;
  traceparent: Type.TOptional<Type.TString>;
  expectedProfileId: Type.TOptional<Type.TString>;
}>;
type ConnectParams = Static<typeof ConnectParamsSchema>;
type ErrorShape = Static<typeof ErrorShapeSchema>;
type RequestFrame = Static<typeof RequestFrameSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/session-github-publication.d.ts
declare const GitHubPublicationPublisherSchema: Type.TObject<{
  accountId: Type.TInteger;
  login: Type.TString;
  source: Type.TUnion<[Type.TLiteral<"personal">, Type.TLiteral<"system-detected">, Type.TLiteral<"system-configured">, Type.TLiteral<"agent-override">]>;
}>;
declare const SessionGitHubPublishParamsSchema: Type.TObject<{
  sessionKey: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
  idempotencyKey: Type.TString;
  title: Type.TOptional<Type.TString>;
  body: Type.TOptional<Type.TString>;
  selection: Type.TOptional<Type.TUnion<[Type.TObject<{
    source: Type.TLiteral<"shared">;
    expected: Type.TOptional<Type.TObject<{
      accountId: Type.TInteger;
      login: Type.TString;
      source: Type.TUnion<[Type.TLiteral<"system-detected">, Type.TLiteral<"system-configured">, Type.TLiteral<"agent-override">]>;
    }>>;
  }>, Type.TObject<{
    source: Type.TLiteral<"personal">;
    generation: Type.TString;
    account: Type.TObject<{
      accountId: Type.TInteger;
      login: Type.TString;
    }>;
  }>]>>;
}>;
declare const SessionGitHubPublicationResultSchema: Type.TUnion<[Type.TObject<{
  requestId: Type.TString;
  publisher: Type.TOptional<Type.TObject<{
    accountId: Type.TInteger;
    login: Type.TString;
    source: Type.TUnion<[Type.TLiteral<"personal">, Type.TLiteral<"system-detected">, Type.TLiteral<"system-configured">, Type.TLiteral<"agent-override">]>;
  }>>;
  effect: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"push">, Type.TLiteral<"pull_request">]>;
    status: Type.TUnion<[Type.TLiteral<"dispatched">, Type.TLiteral<"observed">]>;
    headCommit: Type.TOptional<Type.TString>;
    url: Type.TOptional<Type.TString>;
  }>>;
  status: Type.TLiteral<"requested">;
  message: Type.TString;
}>, Type.TObject<{
  requestId: Type.TString;
  publisher: Type.TOptional<Type.TObject<{
    accountId: Type.TInteger;
    login: Type.TString;
    source: Type.TUnion<[Type.TLiteral<"personal">, Type.TLiteral<"system-detected">, Type.TLiteral<"system-configured">, Type.TLiteral<"agent-override">]>;
  }>>;
  effect: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"push">, Type.TLiteral<"pull_request">]>;
    status: Type.TUnion<[Type.TLiteral<"dispatched">, Type.TLiteral<"observed">]>;
    headCommit: Type.TOptional<Type.TString>;
    url: Type.TOptional<Type.TString>;
  }>>;
  status: Type.TLiteral<"publishing">;
  message: Type.TString;
}>, Type.TObject<{
  requestId: Type.TString;
  publisher: Type.TOptional<Type.TObject<{
    accountId: Type.TInteger;
    login: Type.TString;
    source: Type.TUnion<[Type.TLiteral<"personal">, Type.TLiteral<"system-detected">, Type.TLiteral<"system-configured">, Type.TLiteral<"agent-override">]>;
  }>>;
  effect: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"push">, Type.TLiteral<"pull_request">]>;
    status: Type.TUnion<[Type.TLiteral<"dispatched">, Type.TLiteral<"observed">]>;
    headCommit: Type.TOptional<Type.TString>;
    url: Type.TOptional<Type.TString>;
  }>>;
  status: Type.TLiteral<"published">;
  url: Type.TString;
  repository: Type.TString;
  branch: Type.TString;
  headCommit: Type.TString;
}>, Type.TObject<{
  requestId: Type.TString;
  publisher: Type.TOptional<Type.TObject<{
    accountId: Type.TInteger;
    login: Type.TString;
    source: Type.TUnion<[Type.TLiteral<"personal">, Type.TLiteral<"system-detected">, Type.TLiteral<"system-configured">, Type.TLiteral<"agent-override">]>;
  }>>;
  effect: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"push">, Type.TLiteral<"pull_request">]>;
    status: Type.TUnion<[Type.TLiteral<"dispatched">, Type.TLiteral<"observed">]>;
    headCommit: Type.TOptional<Type.TString>;
    url: Type.TOptional<Type.TString>;
  }>>;
  status: Type.TLiteral<"failed">;
  code: Type.TUnion<[Type.TLiteral<"identity_changed">, Type.TLiteral<"identity_unavailable">, Type.TLiteral<"session_changed">, Type.TLiteral<"workspace_changed">, Type.TLiteral<"not_git">, Type.TLiteral<"not_github">, Type.TLiteral<"no_changes">, Type.TLiteral<"push_rejected">, Type.TLiteral<"github_rejected">, Type.TLiteral<"unavailable">]>;
  message: Type.TString;
  nextAction: Type.TString;
}>, Type.TObject<{
  requestId: Type.TString;
  publisher: Type.TOptional<Type.TObject<{
    accountId: Type.TInteger;
    login: Type.TString;
    source: Type.TUnion<[Type.TLiteral<"personal">, Type.TLiteral<"system-detected">, Type.TLiteral<"system-configured">, Type.TLiteral<"agent-override">]>;
  }>>;
  effect: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"push">, Type.TLiteral<"pull_request">]>;
    status: Type.TUnion<[Type.TLiteral<"dispatched">, Type.TLiteral<"observed">]>;
    headCommit: Type.TOptional<Type.TString>;
    url: Type.TOptional<Type.TString>;
  }>>;
  status: Type.TLiteral<"needs_confirmation">;
  message: Type.TString;
}>]>;
type GitHubPublicationPublisher = Static<typeof GitHubPublicationPublisherSchema>;
type SessionGitHubPublishParams = Static<typeof SessionGitHubPublishParamsSchema>;
type SessionGitHubPublicationResult = Static<typeof SessionGitHubPublicationResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/session-agent-status.d.ts
declare const SESSION_AGENT_ATTENTION_ICON_IDS: readonly ["hand", "key", "alert", "flag", "lock", "hourglass"];
type SessionAgentAttentionIconId = (typeof SESSION_AGENT_ATTENTION_ICON_IDS)[number];
type SessionAgentStatus = {
  note: string;
  expiresAt: number;
  attention?: SessionAgentAttentionIconId;
};
//#endregion
//#region packages/gateway-protocol/src/schema/agents-models-skills.d.ts
declare const ModelChoiceSchema: Type.TObject<{
  available: Type.TOptional<Type.TBoolean>;
  /** Scoped manual-choice permission; separate from runtime readiness and automatic selection. */
  manualSelectionAllowed: Type.TOptional<Type.TBoolean>;
  unavailableReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"missing-auth">, Type.TLiteral<"auth-failed">, Type.TLiteral<"cooldown">]>>;
  /** Earliest known retry time in epoch milliseconds, only for unavailable models. */
  unavailableUntil: Type.TOptional<Type.TInteger>;
  contextWindow: Type.TOptional<Type.TInteger>;
  contextTokens: Type.TOptional<Type.TInteger>;
  local: Type.TOptional<Type.TBoolean>;
  contextWindows: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString;
    label: Type.TString;
    contextWindow: Type.TInteger;
  }>>>;
  contextWindowDefault: Type.TOptional<Type.TString>;
  reasoning: Type.TOptional<Type.TBoolean>;
  thinkingLevels: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString;
    label: Type.TString;
  }>>>;
  thinkingDefault: Type.TOptional<Type.TString>;
  effectiveFastMode: Type.TOptional<Type.TUnion<[Type.TBoolean, Type.TLiteral<"auto">]>>;
  /** Local selected-request applicability, not preference or upstream fulfillment. */
  supportsFastMode: Type.TOptional<Type.TBoolean>;
  supportsTools: Type.TOptional<Type.TBoolean>;
  input: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"image">, Type.TLiteral<"audio">, Type.TLiteral<"video">, Type.TLiteral<"document">]>>>;
  id: Type.TString;
  name: Type.TString;
  provider: Type.TString;
  alias: Type.TOptional<Type.TString>;
  tags: Type.TOptional<Type.TArray<Type.TString>>;
  agentRuntime: Type.TOptional<Type.TObject<{
    id: Type.TString;
    fallback: Type.TOptional<Type.TUnion<[Type.TLiteral<"openclaw">, Type.TLiteral<"none">]>>;
    cloudPlacementSupported: Type.TOptional<Type.TBoolean>;
    cloudPlacementExecutionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"worker-turn">, Type.TLiteral<"remote-exec">]>>;
    devicePlacement: Type.TOptional<Type.TObject<{
      requiredNodeCommands: Type.TArray<Type.TString>;
      consumesWorkerSlot: Type.TBoolean;
    }>>;
    devicePlacementSupported: Type.TOptional<Type.TBoolean>;
    source: Type.TUnion<[Type.TLiteral<"env">, Type.TLiteral<"agent">, Type.TLiteral<"defaults">, Type.TLiteral<"model">, Type.TLiteral<"provider">, Type.TLiteral<"implicit">, Type.TLiteral<"session">, Type.TLiteral<"session-key">]>;
  }>>;
  apiKeySupported: Type.TOptional<Type.TBoolean>;
  runtimeChoices: Type.TOptional<Type.TArray<Type.TObject<{
    available: Type.TOptional<Type.TBoolean>;
    /** Scoped manual-choice permission; separate from runtime readiness and automatic selection. */
    manualSelectionAllowed: Type.TOptional<Type.TBoolean>;
    /** Earliest known retry time in epoch milliseconds, only for unavailable models. */
    unavailableUntil: Type.TOptional<Type.TInteger>;
    contextWindow: Type.TOptional<Type.TInteger>;
    contextTokens: Type.TOptional<Type.TInteger>;
    local: Type.TOptional<Type.TBoolean>;
    contextWindows: Type.TOptional<Type.TArray<Type.TObject<{
      id: Type.TString;
      label: Type.TString;
      contextWindow: Type.TInteger;
    }>>>;
    contextWindowDefault: Type.TOptional<Type.TString>;
    reasoning: Type.TOptional<Type.TBoolean>;
    thinkingLevels: Type.TOptional<Type.TArray<Type.TObject<{
      id: Type.TString;
      label: Type.TString;
    }>>>;
    thinkingDefault: Type.TOptional<Type.TString>;
    effectiveFastMode: Type.TOptional<Type.TUnion<[Type.TBoolean, Type.TLiteral<"auto">]>>;
    /** Local selected-request applicability, not preference or upstream fulfillment. */
    supportsFastMode: Type.TOptional<Type.TBoolean>;
    supportsTools: Type.TOptional<Type.TBoolean>;
    input: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"image">, Type.TLiteral<"audio">, Type.TLiteral<"video">, Type.TLiteral<"document">]>>>;
    agentRuntime: Type.TObject<{
      id: Type.TString;
      fallback: Type.TOptional<Type.TUnion<[Type.TLiteral<"openclaw">, Type.TLiteral<"none">]>>;
      cloudPlacementSupported: Type.TOptional<Type.TBoolean>;
      cloudPlacementExecutionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"worker-turn">, Type.TLiteral<"remote-exec">]>>;
      devicePlacement: Type.TOptional<Type.TObject<{
        requiredNodeCommands: Type.TArray<Type.TString>;
        consumesWorkerSlot: Type.TBoolean;
      }>>;
      devicePlacementSupported: Type.TOptional<Type.TBoolean>;
      source: Type.TUnion<[Type.TLiteral<"env">, Type.TLiteral<"agent">, Type.TLiteral<"defaults">, Type.TLiteral<"model">, Type.TLiteral<"provider">, Type.TLiteral<"implicit">, Type.TLiteral<"session">, Type.TLiteral<"session-key">]>;
    }>;
    unavailableReason: Type.TOptional<Type.TUnion<[Type.TUnion<[Type.TLiteral<"missing-auth">, Type.TLiteral<"auth-failed">, Type.TLiteral<"cooldown">]>, Type.TLiteral<"unsupported-runtime">]>>;
  }>>>;
}>;
/** Proposal record result returned after non-apply proposal actions. */
declare const SkillsProposalRecordResultSchema: Type.TObject<{
  schema: Type.TLiteral<"openclaw.skill-workshop.proposal.v1">;
  id: Type.TString;
  kind: Type.TUnion<[Type.TLiteral<"create">, Type.TLiteral<"update">]>;
  status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"applied">, Type.TLiteral<"rejected">, Type.TLiteral<"quarantined">, Type.TLiteral<"stale">]>;
  title: Type.TString;
  description: Type.TString;
  createdAt: Type.TString;
  updatedAt: Type.TString;
  createdBy: Type.TUnion<[Type.TLiteral<"skill-workshop">, Type.TLiteral<"cli">, Type.TLiteral<"gateway">]>;
  origin: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    messageId: Type.TOptional<Type.TString>;
  }>>;
  proposedVersion: Type.TString;
  draftFile: Type.TLiteral<"PROPOSAL.md">;
  draftHash: Type.TString;
  supportFiles: Type.TOptional<Type.TArray<Type.TObject<{
    path: Type.TString;
    sizeBytes: Type.TInteger;
    hash: Type.TString;
    targetExisted: Type.TOptional<Type.TBoolean>;
    targetContentHash: Type.TOptional<Type.TString>;
  }>>>;
  target: Type.TObject<{
    skillName: Type.TString;
    skillKey: Type.TString;
    skillDir: Type.TString;
    skillFile: Type.TString;
    source: Type.TOptional<Type.TString>;
    currentContentHash: Type.TOptional<Type.TString>;
  }>;
  scan: Type.TObject<{
    state: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"clean">, Type.TLiteral<"failed">, Type.TLiteral<"quarantined">]>;
    scannedAt: Type.TString;
    critical: Type.TInteger;
    warn: Type.TInteger;
    info: Type.TInteger;
    findings: Type.TArray<Type.TObject<{
      ruleId: Type.TString;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
      file: Type.TString;
      line: Type.TInteger;
      message: Type.TString;
      evidence: Type.TString;
    }>>;
  }>;
  goal: Type.TOptional<Type.TString>;
  evidence: Type.TOptional<Type.TString>;
  appliedAt: Type.TOptional<Type.TString>;
  rejectedAt: Type.TOptional<Type.TString>;
  quarantinedAt: Type.TOptional<Type.TString>;
  staleAt: Type.TOptional<Type.TString>;
  statusReason: Type.TOptional<Type.TString>;
  evaluation: Type.TOptional<Type.TObject<{
    id: Type.TString;
    proposedVersion: Type.TString;
    revisionHash: Type.TString;
    trigger: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"apply">]>;
    startedAt: Type.TString;
    completedAt: Type.TString;
    correlationId: Type.TOptional<Type.TString>;
    targetTreeSha256: Type.TOptional<Type.TString>;
    outcomes: Type.TArray<Type.TUnion<[Type.TObject<{
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
      status: Type.TLiteral<"completed">;
      result: Type.TObject<{
        summary: Type.TOptional<Type.TString>;
        findings: Type.TOptional<Type.TArray<Type.TObject<{
          ruleId: Type.TString;
          severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
          message: Type.TString;
          file: Type.TOptional<Type.TString>;
          line: Type.TOptional<Type.TInteger>;
        }>>>;
        metrics: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean]>>>;
        evaluatorVersion: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TString>;
        decision: Type.TOptional<Type.TUnion<[Type.TLiteral<"pass">, Type.TLiteral<"revise">, Type.TLiteral<"block">]>>;
        decisionReason: Type.TOptional<Type.TString>;
      }>;
    }>, Type.TObject<{
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
      status: Type.TLiteral<"skipped">;
    }>, Type.TObject<{
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
      status: Type.TLiteral<"error">;
      error: Type.TString;
    }>]>>;
  }>>;
}>;
declare const ToolsGitHubAuthorizeStartResultSchema: Type.TObject<{
  requestId: Type.TString;
  userCode: Type.TString;
  verificationUri: Type.TLiteral<"https://github.com/login/device">;
  expiresInMs: Type.TInteger;
  pollAfterMs: Type.TInteger;
}>;
declare const ToolsGitHubAuthorizePollResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"pending">;
  retryAfterMs: Type.TInteger;
}>, Type.TObject<{
  status: Type.TLiteral<"slow_down">;
  retryAfterMs: Type.TInteger;
}>, Type.TObject<{
  status: Type.TLiteral<"access_denied">;
}>, Type.TObject<{
  status: Type.TLiteral<"expired">;
}>, Type.TObject<{
  status: Type.TLiteral<"incorrect_device_code">;
}>, Type.TObject<{
  status: Type.TLiteral<"network_error">;
  retryAfterMs: Type.TInteger;
}>, Type.TObject<{
  status: Type.TLiteral<"failed">;
  reason: Type.TUnion<[Type.TLiteral<"identity_changed">, Type.TLiteral<"setup_failed">]>;
}>, Type.TObject<{
  status: Type.TLiteral<"success">;
  githubStatus: Type.TObject<{
    agentId: Type.TString;
    selectedScope: Type.TUnion<[Type.TLiteral<"system">, Type.TLiteral<"agent">]>;
    selected: Type.TObject<{
      scope: Type.TUnion<[Type.TLiteral<"system">, Type.TLiteral<"agent">]>;
      configured: Type.TBoolean;
      identity: Type.TUnion<[Type.TObject<{
        source: Type.TUnion<[Type.TLiteral<"system-detected">, Type.TLiteral<"system-configured">, Type.TLiteral<"agent-override">]>;
        credentialKind: Type.TUnion<[Type.TLiteral<"native">, Type.TLiteral<"managed-pat">, Type.TLiteral<"managed-oauth">]>;
        credentialState: Type.TUnion<[Type.TLiteral<"available">, Type.TLiteral<"unavailable">, Type.TLiteral<"configured_unavailable">, Type.TLiteral<"unverified">, Type.TLiteral<"rate_limited">]>;
        account: Type.TUnion<[Type.TObject<{
          login: Type.TString;
        }>, Type.TNull]>;
        gitAuthor: Type.TObject<{
          name: Type.TUnion<[Type.TString, Type.TNull]>;
          email: Type.TUnion<[Type.TString, Type.TNull]>;
        }>;
        evidence: Type.TUnion<[Type.TLiteral<"github-api">, Type.TLiteral<"none">, Type.TLiteral<"unverified">, Type.TLiteral<"rate-limited">]>;
        accessExpiresAtMs: Type.TUnion<[Type.TInteger, Type.TNull]>;
        refreshState: Type.TUnion<[Type.TLiteral<"not_applicable">, Type.TLiteral<"available">, Type.TLiteral<"expired">, Type.TLiteral<"unavailable">, Type.TLiteral<"refreshing">, Type.TLiteral<"failed">]>;
        oauthScopes: Type.TArray<Type.TString>;
        repositoryGrants: Type.TLiteral<"unknown">;
      }>, Type.TNull]>;
    }>;
    effective: Type.TObject<{
      source: Type.TUnion<[Type.TLiteral<"system-detected">, Type.TLiteral<"system-configured">, Type.TLiteral<"agent-override">]>;
      credentialKind: Type.TUnion<[Type.TLiteral<"native">, Type.TLiteral<"managed-pat">, Type.TLiteral<"managed-oauth">]>;
      credentialState: Type.TUnion<[Type.TLiteral<"available">, Type.TLiteral<"unavailable">, Type.TLiteral<"configured_unavailable">, Type.TLiteral<"unverified">, Type.TLiteral<"rate_limited">]>;
      account: Type.TUnion<[Type.TObject<{
        login: Type.TString;
      }>, Type.TNull]>;
      gitAuthor: Type.TObject<{
        name: Type.TUnion<[Type.TString, Type.TNull]>;
        email: Type.TUnion<[Type.TString, Type.TNull]>;
      }>;
      evidence: Type.TUnion<[Type.TLiteral<"github-api">, Type.TLiteral<"none">, Type.TLiteral<"unverified">, Type.TLiteral<"rate-limited">]>;
      accessExpiresAtMs: Type.TUnion<[Type.TInteger, Type.TNull]>;
      refreshState: Type.TUnion<[Type.TLiteral<"not_applicable">, Type.TLiteral<"available">, Type.TLiteral<"expired">, Type.TLiteral<"unavailable">, Type.TLiteral<"refreshing">, Type.TLiteral<"failed">]>;
      oauthScopes: Type.TArray<Type.TString>;
      repositoryGrants: Type.TLiteral<"unknown">;
    }>;
  }>;
}>]>;
type ModelChoice = Static<typeof ModelChoiceSchema>;
type ToolsGitHubAuthorizeStartResult = Static<typeof ToolsGitHubAuthorizeStartResultSchema>;
type ToolsGitHubAuthorizePollResult = Static<typeof ToolsGitHubAuthorizePollResultSchema>;
type SkillsProposalRecordResult = Static<typeof SkillsProposalRecordResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/approvals.d.ts
/**
 * Owner-declared blast-radius facts for a pending approval. Variants are
 * named schemas so native protocol generators emit the discriminated union.
 */
declare const ApprovalScopeSchema: Type.TUnion<[Type.TObject<{
  kind: Type.TLiteral<"message-send">;
  target: Type.TString;
  recipientCount: Type.TInteger;
  recipients: Type.TOptional<Type.TArray<Type.TString>>;
  audience: Type.TOptional<Type.TUnion<[Type.TLiteral<"internal">, Type.TLiteral<"external">]>>;
}>, Type.TObject<{
  kind: Type.TLiteral<"payment">;
  amount: Type.TString;
  currency: Type.TString;
  target: Type.TString;
}>, Type.TObject<{
  kind: Type.TLiteral<"external-post">;
  target: Type.TString;
  visibility: Type.TUnion<[Type.TLiteral<"public">, Type.TLiteral<"restricted">]>;
}>, Type.TObject<{
  kind: Type.TLiteral<"standing-grant">;
  automation: Type.TString;
  command: Type.TString;
  expiresInDays: Type.TOptional<Type.TInteger>;
}>]>;
/** Reviewer-safe presentation discriminated by the approval owner. */
declare const ApprovalPresentationSchema: Type.TUnion<[Type.TObject<{
  kind: Type.TLiteral<"exec">;
  commandText: Type.TString;
  commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  scope: Type.TOptional<Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"message-send">;
    target: Type.TString;
    recipientCount: Type.TInteger;
    recipients: Type.TOptional<Type.TArray<Type.TString>>;
    audience: Type.TOptional<Type.TUnion<[Type.TLiteral<"internal">, Type.TLiteral<"external">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"payment">;
    amount: Type.TString;
    currency: Type.TString;
    target: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"external-post">;
    target: Type.TString;
    visibility: Type.TUnion<[Type.TLiteral<"public">, Type.TLiteral<"restricted">]>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"standing-grant">;
    automation: Type.TString;
    command: Type.TString;
    expiresInDays: Type.TOptional<Type.TInteger>;
  }>]>>;
  allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
}>, Type.TObject<{
  kind: Type.TLiteral<"plugin">;
  title: Type.TString;
  description: Type.TString;
  detail: Type.TOptional<Type.TString>;
  severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
  pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  scope: Type.TOptional<Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"message-send">;
    target: Type.TString;
    recipientCount: Type.TInteger;
    recipients: Type.TOptional<Type.TArray<Type.TString>>;
    audience: Type.TOptional<Type.TUnion<[Type.TLiteral<"internal">, Type.TLiteral<"external">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"payment">;
    amount: Type.TString;
    currency: Type.TString;
    target: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"external-post">;
    target: Type.TString;
    visibility: Type.TUnion<[Type.TLiteral<"public">, Type.TLiteral<"restricted">]>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"standing-grant">;
    automation: Type.TString;
    command: Type.TString;
    expiresInDays: Type.TOptional<Type.TInteger>;
  }>]>>;
  allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  externalResolution: Type.TOptional<Type.TObject<{
    label: Type.TString;
    decisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>>;
  }>>;
}>, Type.TObject<{
  kind: Type.TLiteral<"system-agent">;
  title: Type.TString;
  description: Type.TString;
  proposalHash: Type.TString;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
}>]>;
/** Authoritative pending approval set returned when a session stream subscribes. */
declare const SessionApprovalReplaySchema: Type.TObject<{
  sessionKey: Type.TString;
  updatedAtMs: Type.TInteger;
  approvals: Type.TArray<Type.TObject<{
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      scope: Type.TOptional<Type.TUnion<[Type.TObject<{
        kind: Type.TLiteral<"message-send">;
        target: Type.TString;
        recipientCount: Type.TInteger;
        recipients: Type.TOptional<Type.TArray<Type.TString>>;
        audience: Type.TOptional<Type.TUnion<[Type.TLiteral<"internal">, Type.TLiteral<"external">]>>;
      }>, Type.TObject<{
        kind: Type.TLiteral<"payment">;
        amount: Type.TString;
        currency: Type.TString;
        target: Type.TString;
      }>, Type.TObject<{
        kind: Type.TLiteral<"external-post">;
        target: Type.TString;
        visibility: Type.TUnion<[Type.TLiteral<"public">, Type.TLiteral<"restricted">]>;
      }>, Type.TObject<{
        kind: Type.TLiteral<"standing-grant">;
        automation: Type.TString;
        command: Type.TString;
        expiresInDays: Type.TOptional<Type.TInteger>;
      }>]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      scope: Type.TOptional<Type.TUnion<[Type.TObject<{
        kind: Type.TLiteral<"message-send">;
        target: Type.TString;
        recipientCount: Type.TInteger;
        recipients: Type.TOptional<Type.TArray<Type.TString>>;
        audience: Type.TOptional<Type.TUnion<[Type.TLiteral<"internal">, Type.TLiteral<"external">]>>;
      }>, Type.TObject<{
        kind: Type.TLiteral<"payment">;
        amount: Type.TString;
        currency: Type.TString;
        target: Type.TString;
      }>, Type.TObject<{
        kind: Type.TLiteral<"external-post">;
        target: Type.TString;
        visibility: Type.TUnion<[Type.TLiteral<"public">, Type.TLiteral<"restricted">]>;
      }>, Type.TObject<{
        kind: Type.TLiteral<"standing-grant">;
        automation: Type.TString;
        command: Type.TString;
        expiresInDays: Type.TOptional<Type.TInteger>;
      }>]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
      externalResolution: Type.TOptional<Type.TObject<{
        label: Type.TString;
        decisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>>;
      }>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
    status: Type.TLiteral<"pending">;
    /** Canonical raising session when projected into a session-scoped reviewer surface. */
    sourceSessionKey: Type.TOptional<Type.TString>;
  }>>;
  truncated: Type.TBoolean;
}>;
type ApprovalScope$1 = Static<typeof ApprovalScopeSchema>;
type ApprovalPresentation = Static<typeof ApprovalPresentationSchema>;
type SessionApprovalReplay = Static<typeof SessionApprovalReplaySchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/worker-inference.d.ts
declare const WorkerInferenceStartParamsSchema: Type.TObject<{
  readonly runEpoch: Type.TInteger;
  readonly sessionId: Type.TString;
  readonly runId: Type.TString;
  readonly turnId: Type.TString;
  readonly modelRef: Type.TObject<{
    readonly provider: Type.TString;
    readonly model: Type.TString;
  }>;
  readonly context: Type.TObject<{
    readonly systemPrompt: Type.TOptional<Type.TString>;
    readonly messages: Type.TArray<Type.TUnion<[Type.TObject<{
      readonly role: Type.TLiteral<"user">;
      readonly content: Type.TUnion<[Type.TString, Type.TArray<Type.TUnion<[Type.TObject<{
        readonly type: Type.TLiteral<"text">;
        readonly text: Type.TString;
        readonly textSignature: Type.TOptional<Type.TString>;
      }>, Type.TObject<{
        readonly type: Type.TLiteral<"image">;
        readonly data: Type.TString;
        readonly mimeType: Type.TString;
      }>]>>]>;
      readonly timestamp: Type.TInteger;
      readonly runtimeContextCarrier: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      readonly role: Type.TLiteral<"assistant">;
      readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
        readonly type: Type.TLiteral<"text">;
        readonly text: Type.TString;
        readonly textSignature: Type.TOptional<Type.TString>;
      }>, Type.TObject<{
        readonly type: Type.TLiteral<"thinking">;
        readonly thinking: Type.TString;
        readonly thinkingSignature: Type.TOptional<Type.TString>;
        readonly redacted: Type.TOptional<Type.TBoolean>;
      }>, Type.TObject<{
        readonly type: Type.TLiteral<"toolCall">;
        readonly id: Type.TString;
        readonly name: Type.TString;
        readonly arguments: Type.TRecord<"^.*$", Type.TUnknown>;
        readonly thoughtSignature: Type.TOptional<Type.TString>;
        readonly executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
      }>]>>;
      readonly api: Type.TString;
      readonly provider: Type.TString;
      readonly model: Type.TString;
      readonly responseModel: Type.TOptional<Type.TString>;
      readonly responseId: Type.TOptional<Type.TString>;
      readonly providerReplay: Type.TOptional<Type.TObject<{
        v: Type.TLiteral<1>;
        type: Type.TString;
        id: Type.TOptional<Type.TString>;
        data: Type.TString;
        replayIndex: Type.TOptional<Type.TInteger>;
        provider: Type.TString;
        api: Type.TString;
        model: Type.TString;
        baseUrlHash: Type.TOptional<Type.TString>;
        sessionHash: Type.TOptional<Type.TString>;
        authProfileHash: Type.TOptional<Type.TString>;
      }>>;
      readonly usage: Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
          state: Type.TLiteral<"available">;
          promptTokens: Type.TNumber;
          totalTokens: Type.TNumber;
        }>, Type.TObject<{
          state: Type.TLiteral<"unavailable">;
        }>]>>;
        totalTokens: Type.TNumber;
        cost: Type.TObject<{
          input: Type.TNumber;
          output: Type.TNumber;
          cacheRead: Type.TNumber;
          cacheWrite: Type.TNumber;
          total: Type.TNumber;
          totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
        }>;
      }>;
      readonly timestamp: Type.TInteger;
      readonly diagnostics: Type.TOptional<Type.TArray<Type.TObject<{
        type: Type.TString;
        timestamp: Type.TInteger;
        error: Type.TOptional<Type.TObject<{
          name: Type.TOptional<Type.TString>;
          message: Type.TString;
          stack: Type.TOptional<Type.TString>;
          code: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
        }>>;
        details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
      }>>>;
      readonly stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">, Type.TLiteral<"error">, Type.TLiteral<"aborted">]>;
      readonly errorMessage: Type.TOptional<Type.TString>;
      readonly errorCode: Type.TOptional<Type.TString>;
      readonly errorType: Type.TOptional<Type.TString>;
      readonly errorBody: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly role: Type.TLiteral<"toolResult">;
      readonly toolCallId: Type.TString;
      readonly toolName: Type.TString;
      readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
        readonly type: Type.TLiteral<"text">;
        readonly text: Type.TString;
        readonly textSignature: Type.TOptional<Type.TString>;
      }>, Type.TObject<{
        readonly type: Type.TLiteral<"image">;
        readonly data: Type.TString;
        readonly mimeType: Type.TString;
      }>]>>;
      readonly details: Type.TOptional<Type.TUnknown>;
      readonly isError: Type.TBoolean;
      readonly timestamp: Type.TInteger;
    }>]>>;
    readonly tools: Type.TOptional<Type.TArray<Type.TObject<{
      readonly name: Type.TString;
      readonly description: Type.TString;
      readonly parameters: Type.TUnknown;
    }>>>;
  }>;
  readonly options: Type.TObject<{
    readonly temperature: Type.TOptional<Type.TNumber>;
    readonly maxTokens: Type.TOptional<Type.TInteger>;
    readonly reasoning: Type.TOptional<Type.TUnion<[Type.TLiteral<"off">, Type.TLiteral<"minimal">, Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">, Type.TLiteral<"xhigh">, Type.TLiteral<"adaptive">, Type.TLiteral<"max">]>>;
    readonly thinkingBudgets: Type.TOptional<Type.TObject<{
      readonly minimal: Type.TOptional<Type.TInteger>;
      readonly low: Type.TOptional<Type.TInteger>;
      readonly medium: Type.TOptional<Type.TInteger>;
      readonly high: Type.TOptional<Type.TInteger>;
      readonly max: Type.TOptional<Type.TInteger>;
    }>>;
  }>;
}>;
declare const WorkerInferenceStartResultSchema: Type.TObject<{
  readonly status: Type.TUnion<[Type.TLiteral<"accepted">, Type.TLiteral<"replayed">]>;
}>;
declare const WorkerInferenceErrorReasonSchema: Type.TUnion<[Type.TLiteral<"model-not-approved">, Type.TLiteral<"invalid-context">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"provider-error">, Type.TLiteral<"cancelled">]>;
declare const WorkerInferenceCancelParamsSchema: Type.TObject<{
  readonly runEpoch: Type.TInteger;
  readonly sessionId: Type.TString;
  readonly runId: Type.TString;
  readonly turnId: Type.TString;
}>;
declare const WorkerInferenceCancelResultSchema: Type.TObject<{
  readonly status: Type.TLiteral<"cancelled">;
}>;
declare const WorkerInferenceEventParamsSchema: Type.TObject<{
  readonly runEpoch: Type.TInteger;
  readonly sessionId: Type.TString;
  readonly runId: Type.TString;
  readonly turnId: Type.TString;
  readonly seq: Type.TInteger;
  readonly event: Type.TUnion<[Type.TObject<{
    readonly type: Type.TLiteral<"start">;
    readonly resolvedModel: Type.TObject<{
      readonly api: Type.TString;
      readonly provider: Type.TString;
      readonly model: Type.TString;
    }>;
    readonly timestamp: Type.TInteger;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"text_start">;
    readonly contentIndex: Type.TInteger;
    readonly contentSignature: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"text_delta">;
    readonly contentIndex: Type.TInteger;
    readonly delta: Type.TString;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"text_end">;
    readonly contentIndex: Type.TInteger;
    readonly contentSignature: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"thinking_start">;
    readonly contentIndex: Type.TInteger;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"thinking_delta">;
    readonly contentIndex: Type.TInteger;
    readonly delta: Type.TString;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"thinking_end">;
    readonly contentIndex: Type.TInteger;
    readonly contentSignature: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"toolcall_start">;
    readonly contentIndex: Type.TInteger;
    readonly id: Type.TString;
    readonly toolName: Type.TString;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"toolcall_delta">;
    readonly contentIndex: Type.TInteger;
    readonly delta: Type.TString;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"toolcall_end">;
    readonly contentIndex: Type.TInteger;
  }>]>;
}>;
declare const WorkerInferenceEventFrameSchema: Type.TObject<{
  readonly type: Type.TLiteral<"event">;
  readonly event: Type.TLiteral<"worker.inference.event">;
  readonly payload: Type.TObject<{
    readonly runEpoch: Type.TInteger;
    readonly sessionId: Type.TString;
    readonly runId: Type.TString;
    readonly turnId: Type.TString;
    readonly seq: Type.TInteger;
    readonly event: Type.TUnion<[Type.TObject<{
      readonly type: Type.TLiteral<"start">;
      readonly resolvedModel: Type.TObject<{
        readonly api: Type.TString;
        readonly provider: Type.TString;
        readonly model: Type.TString;
      }>;
      readonly timestamp: Type.TInteger;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"text_start">;
      readonly contentIndex: Type.TInteger;
      readonly contentSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"text_delta">;
      readonly contentIndex: Type.TInteger;
      readonly delta: Type.TString;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"text_end">;
      readonly contentIndex: Type.TInteger;
      readonly contentSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"thinking_start">;
      readonly contentIndex: Type.TInteger;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"thinking_delta">;
      readonly contentIndex: Type.TInteger;
      readonly delta: Type.TString;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"thinking_end">;
      readonly contentIndex: Type.TInteger;
      readonly contentSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"toolcall_start">;
      readonly contentIndex: Type.TInteger;
      readonly id: Type.TString;
      readonly toolName: Type.TString;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"toolcall_delta">;
      readonly contentIndex: Type.TInteger;
      readonly delta: Type.TString;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"toolcall_end">;
      readonly contentIndex: Type.TInteger;
    }>]>;
  }>;
}>;
declare const WorkerInferenceTerminalOutcomeSchema: Type.TUnion<[Type.TObject<{
  readonly type: Type.TLiteral<"done">;
  readonly message: Type.TObject<{
    readonly role: Type.TLiteral<"assistant">;
    readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
      readonly type: Type.TLiteral<"text">;
      readonly text: Type.TString;
      readonly textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"thinking">;
      readonly thinking: Type.TString;
      readonly thinkingSignature: Type.TOptional<Type.TString>;
      readonly redacted: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"toolCall">;
      readonly id: Type.TString;
      readonly name: Type.TString;
      readonly arguments: Type.TRecord<"^.*$", Type.TUnknown>;
      readonly thoughtSignature: Type.TOptional<Type.TString>;
      readonly executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
    }>]>>;
    readonly api: Type.TString;
    readonly provider: Type.TString;
    readonly model: Type.TString;
    readonly responseModel: Type.TOptional<Type.TString>;
    readonly responseId: Type.TOptional<Type.TString>;
    readonly providerReplay: Type.TOptional<Type.TObject<{
      v: Type.TLiteral<1>;
      type: Type.TString;
      id: Type.TOptional<Type.TString>;
      data: Type.TString;
      replayIndex: Type.TOptional<Type.TInteger>;
      provider: Type.TString;
      api: Type.TString;
      model: Type.TString;
      baseUrlHash: Type.TOptional<Type.TString>;
      sessionHash: Type.TOptional<Type.TString>;
      authProfileHash: Type.TOptional<Type.TString>;
    }>>;
    readonly usage: Type.TObject<{
      input: Type.TNumber;
      output: Type.TNumber;
      cacheRead: Type.TNumber;
      cacheWrite: Type.TNumber;
      contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
        state: Type.TLiteral<"available">;
        promptTokens: Type.TNumber;
        totalTokens: Type.TNumber;
      }>, Type.TObject<{
        state: Type.TLiteral<"unavailable">;
      }>]>>;
      totalTokens: Type.TNumber;
      cost: Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        total: Type.TNumber;
        totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
      }>;
    }>;
    readonly timestamp: Type.TInteger;
    readonly stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">]>;
  }>;
}>, Type.TObject<{
  readonly type: Type.TLiteral<"error">;
  readonly reason: Type.TUnion<[Type.TLiteral<"model-not-approved">, Type.TLiteral<"invalid-context">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"provider-error">, Type.TLiteral<"cancelled">]>;
  readonly message: Type.TString;
  readonly usage: Type.TOptional<Type.TObject<{
    input: Type.TNumber;
    output: Type.TNumber;
    cacheRead: Type.TNumber;
    cacheWrite: Type.TNumber;
    contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
      state: Type.TLiteral<"available">;
      promptTokens: Type.TNumber;
      totalTokens: Type.TNumber;
    }>, Type.TObject<{
      state: Type.TLiteral<"unavailable">;
    }>]>>;
    totalTokens: Type.TNumber;
    cost: Type.TObject<{
      input: Type.TNumber;
      output: Type.TNumber;
      cacheRead: Type.TNumber;
      cacheWrite: Type.TNumber;
      total: Type.TNumber;
      totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
    }>;
  }>>;
}>]>;
declare const WorkerInferenceTerminalFrameSchema: Type.TObject<{
  readonly type: Type.TLiteral<"event">;
  readonly event: Type.TLiteral<"worker.inference.terminal">;
  readonly payload: Type.TObject<{
    readonly runEpoch: Type.TInteger;
    readonly sessionId: Type.TString;
    readonly runId: Type.TString;
    readonly turnId: Type.TString;
    readonly seq: Type.TInteger;
    readonly outcome: Type.TUnion<[Type.TObject<{
      readonly type: Type.TLiteral<"done">;
      readonly message: Type.TObject<{
        readonly role: Type.TLiteral<"assistant">;
        readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
          readonly type: Type.TLiteral<"text">;
          readonly text: Type.TString;
          readonly textSignature: Type.TOptional<Type.TString>;
        }>, Type.TObject<{
          readonly type: Type.TLiteral<"thinking">;
          readonly thinking: Type.TString;
          readonly thinkingSignature: Type.TOptional<Type.TString>;
          readonly redacted: Type.TOptional<Type.TBoolean>;
        }>, Type.TObject<{
          readonly type: Type.TLiteral<"toolCall">;
          readonly id: Type.TString;
          readonly name: Type.TString;
          readonly arguments: Type.TRecord<"^.*$", Type.TUnknown>;
          readonly thoughtSignature: Type.TOptional<Type.TString>;
          readonly executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
        }>]>>;
        readonly api: Type.TString;
        readonly provider: Type.TString;
        readonly model: Type.TString;
        readonly responseModel: Type.TOptional<Type.TString>;
        readonly responseId: Type.TOptional<Type.TString>;
        readonly providerReplay: Type.TOptional<Type.TObject<{
          v: Type.TLiteral<1>;
          type: Type.TString;
          id: Type.TOptional<Type.TString>;
          data: Type.TString;
          replayIndex: Type.TOptional<Type.TInteger>;
          provider: Type.TString;
          api: Type.TString;
          model: Type.TString;
          baseUrlHash: Type.TOptional<Type.TString>;
          sessionHash: Type.TOptional<Type.TString>;
          authProfileHash: Type.TOptional<Type.TString>;
        }>>;
        readonly usage: Type.TObject<{
          input: Type.TNumber;
          output: Type.TNumber;
          cacheRead: Type.TNumber;
          cacheWrite: Type.TNumber;
          contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
            state: Type.TLiteral<"available">;
            promptTokens: Type.TNumber;
            totalTokens: Type.TNumber;
          }>, Type.TObject<{
            state: Type.TLiteral<"unavailable">;
          }>]>>;
          totalTokens: Type.TNumber;
          cost: Type.TObject<{
            input: Type.TNumber;
            output: Type.TNumber;
            cacheRead: Type.TNumber;
            cacheWrite: Type.TNumber;
            total: Type.TNumber;
            totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
          }>;
        }>;
        readonly timestamp: Type.TInteger;
        readonly stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">]>;
      }>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"error">;
      readonly reason: Type.TUnion<[Type.TLiteral<"model-not-approved">, Type.TLiteral<"invalid-context">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"provider-error">, Type.TLiteral<"cancelled">]>;
      readonly message: Type.TString;
      readonly usage: Type.TOptional<Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
          state: Type.TLiteral<"available">;
          promptTokens: Type.TNumber;
          totalTokens: Type.TNumber;
        }>, Type.TObject<{
          state: Type.TLiteral<"unavailable">;
        }>]>>;
        totalTokens: Type.TNumber;
        cost: Type.TObject<{
          input: Type.TNumber;
          output: Type.TNumber;
          cacheRead: Type.TNumber;
          cacheWrite: Type.TNumber;
          total: Type.TNumber;
          totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
        }>;
      }>>;
    }>]>;
  }>;
}>;
type WorkerInferenceStartParams = Static<typeof WorkerInferenceStartParamsSchema>;
type WorkerInferenceStartResult = Static<typeof WorkerInferenceStartResultSchema>;
type WorkerInferenceErrorReason = Static<typeof WorkerInferenceErrorReasonSchema>;
type WorkerInferenceCancelParams = Static<typeof WorkerInferenceCancelParamsSchema>;
type WorkerInferenceCancelResult = Static<typeof WorkerInferenceCancelResultSchema>;
type WorkerInferenceEventParams = Static<typeof WorkerInferenceEventParamsSchema>;
type WorkerInferenceEventFrame = Static<typeof WorkerInferenceEventFrameSchema>;
type WorkerInferenceTerminalOutcome = Static<typeof WorkerInferenceTerminalOutcomeSchema>;
type WorkerInferenceTerminalFrame = Static<typeof WorkerInferenceTerminalFrameSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/worker-computer.d.ts
declare const WorkerComputerParamsSchema: Type.TObject<{
  command: Type.TEnum<["screen.snapshot", "computer.act"]>;
  paramsJson: Type.TString;
  timeoutMs: Type.TOptional<Type.TInteger>;
  idempotencyKey: Type.TOptional<Type.TString>;
}>;
declare const WorkerComputerResultSchema: Type.TObject<{
  resultJson: Type.TString;
}>;
type WorkerComputerParams = Static<typeof WorkerComputerParamsSchema>;
type WorkerComputerResult = Static<typeof WorkerComputerResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-row.d.ts
declare const SessionPermissionModeSchema: Type.TUnion<[Type.TLiteral<"read-only">, Type.TLiteral<"guarded">, Type.TLiteral<"workspace">, Type.TLiteral<"full">]>;
declare const SessionRunStatusSchema: Type.TUnion<[Type.TLiteral<"queued">, Type.TLiteral<"running">, Type.TLiteral<"done">, Type.TLiteral<"failed">, Type.TLiteral<"killed">, Type.TLiteral<"timeout">]>;
declare const SessionEntryArchiveReasonSchema: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"active-session-cap">, Type.TLiteral<"age-retention">, Type.TLiteral<"stale-dashboard">, Type.TLiteral<"restart-recovery">]>;
/** Stable Gateway session row fields; mutation envelopes may add null tombstones. */
declare const SessionRowSchema: Type.TObject<{
  key: Type.TString;
  sessionId: Type.TOptional<Type.TString>;
  incognito: Type.TOptional<Type.TLiteral<true>>;
  kind: Type.TUnion<[Type.TLiteral<"direct">, Type.TLiteral<"group">, Type.TLiteral<"global">, Type.TLiteral<"unknown">]>;
  label: Type.TOptional<Type.TString>;
  autoLabel: Type.TOptional<Type.TString>;
  icon: Type.TOptional<Type.TString>;
  /** Named sidebar tint from SESSION_COLOR_IDS; clients map names to theme hues. */
  color: Type.TOptional<Type.TString>;
  channelAvatarUrl: Type.TOptional<Type.TString>;
  boardFace: Type.TOptional<Type.TUnion<[Type.TLiteral<"chat">, Type.TLiteral<"dashboard">]>>;
  /** Shared dashboard default; absent means split. */
  boardPresentation: Type.TOptional<Type.TUnion<[Type.TLiteral<"split">, Type.TLiteral<"expanded">]>>;
  displayName: Type.TOptional<Type.TString>;
  derivedTitle: Type.TOptional<Type.TString>;
  lastMessagePreview: Type.TOptional<Type.TString>;
  channel: Type.TOptional<Type.TString>;
  /** Stable non-sensitive facts derived from the canonical session route. */
  classification: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
  accountId: Type.TOptional<Type.TString>;
  peerKind: Type.TOptional<Type.TString>;
  isMain: Type.TOptional<Type.TBoolean>;
  isBackground: Type.TOptional<Type.TBoolean>;
  chatType: Type.TOptional<Type.TUnion<[Type.TLiteral<"direct">, Type.TLiteral<"group">, Type.TLiteral<"channel">]>>;
  activitySummary: Type.TOptional<Type.TObject<{
    canEnsure: Type.TOptional<Type.TBoolean>;
    text: Type.TOptional<Type.TString>;
    updatedAt: Type.TOptional<Type.TInteger>;
    state: Type.TUnion<[Type.TLiteral<"current">, Type.TLiteral<"stale">, Type.TLiteral<"updating">, Type.TLiteral<"unavailable">]>;
  }>>;
  updatedAt: Type.TOptional<Type.TUnion<[Type.TNumber, Type.TNull]>>;
  /** Gateway sampling time, retained when a read reuses a cached projection. */
  snapshotAt: Type.TOptional<Type.TNumber>;
  archived: Type.TOptional<Type.TBoolean>;
  archivedAt: Type.TOptional<Type.TNumber>;
  archivedBy: Type.TOptional<Type.TObject<{
    type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
    label: Type.TOptional<Type.TString>;
    /** Durable profile avatar route; absent for actors without a stored profile avatar. */
    avatarUrl: Type.TOptional<Type.TString>;
    /** Display identity is separate from the actor fields used by ownership policy. */
    identity: Type.TOptional<Type.TUnion<[Type.TObject<{
      type: Type.TLiteral<"profile">;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"agent">;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"remote">;
      pluginId: Type.TString;
      domain: Type.TString;
      idKind: Type.TString;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"observation">;
      pluginId: Type.TUnion<[Type.TString, Type.TNull]>;
      accountId: Type.TUnion<[Type.TString, Type.TNull]>;
      senderKind: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"bot">, Type.TLiteral<"unknown">]>;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"legacy">;
      actorType: Type.TString;
      source: Type.TUnion<[Type.TString, Type.TNull]>;
      id: Type.TString;
    }>]>>;
  }>>;
  archiveReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"active-session-cap">, Type.TLiteral<"age-retention">, Type.TLiteral<"stale-dashboard">, Type.TLiteral<"restart-recovery">]>>;
  pinned: Type.TOptional<Type.TBoolean>;
  pinnedAt: Type.TOptional<Type.TNumber>;
  unread: Type.TOptional<Type.TBoolean>;
  lastReadAt: Type.TOptional<Type.TNumber>;
  markedUnreadAt: Type.TOptional<Type.TNumber>;
  lastActivityAt: Type.TOptional<Type.TNumber>;
  lastInteractionAt: Type.TOptional<Type.TNumber>;
  status: Type.TOptional<Type.TUnion<[Type.TLiteral<"queued">, Type.TLiteral<"running">, Type.TLiteral<"done">, Type.TLiteral<"failed">, Type.TLiteral<"killed">, Type.TLiteral<"timeout">]>>;
  lastRunError: Type.TOptional<Type.TString>;
  /** Exact run that produced the latest terminal lifecycle projection. */
  lastRunId: Type.TOptional<Type.TString>;
  restartRecoveryStatus: Type.TOptional<Type.TLiteral<"tombstoned">>;
  activeLeafEntryId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  spawnedBy: Type.TOptional<Type.TString>;
  parentSessionKey: Type.TOptional<Type.TString>;
  parentSessionId: Type.TOptional<Type.TString>;
  controlOwnerSessionKey: Type.TOptional<Type.TString>;
  childSessions: Type.TOptional<Type.TArray<Type.TString>>;
  forkedFromParent: Type.TOptional<Type.TBoolean>;
  spawnDepth: Type.TOptional<Type.TNumber>;
  subagentRole: Type.TOptional<Type.TUnion<[Type.TLiteral<"orchestrator">, Type.TLiteral<"leaf">]>>;
  subagentControlScope: Type.TOptional<Type.TUnion<[Type.TLiteral<"children">, Type.TLiteral<"none">]>>;
  swarmGroupId: Type.TOptional<Type.TString>;
  /** Requester-owned execution counts; never child content or parent synthesis status. */
  swarm: Type.TOptional<Type.TObject<{
    groups: Type.TArray<Type.TObject<{
      groupId: Type.TString;
      createdAt: Type.TNumber;
      children: Type.TOptional<Type.TArray<Type.TObject<{
        sessionKey: Type.TString;
        status: Type.TUnion<[Type.TLiteral<"queued">, Type.TLiteral<"running">, Type.TLiteral<"done">, Type.TLiteral<"failed">]>;
      }>>>;
      queued: Type.TInteger;
      running: Type.TInteger;
      done: Type.TInteger;
      failed: Type.TInteger;
    }>>;
    otherActiveGroups: Type.TInteger;
  }>>;
  worktree: Type.TOptional<Type.TObject<{
    id: Type.TString;
    branch: Type.TString;
    repoRoot: Type.TString;
  }>>;
  repositoryWorkspaceId: Type.TOptional<Type.TString>;
  repository: Type.TOptional<Type.TObject<{
    url: Type.TString;
    ref: Type.TOptional<Type.TString>;
    branch: Type.TString;
  }>>;
  execNode: Type.TOptional<Type.TString>;
  execCwd: Type.TOptional<Type.TString>;
  spawnedWorkspaceDir: Type.TOptional<Type.TString>;
  spawnedCwd: Type.TOptional<Type.TString>;
  /** Persisted project registry association, distinct from a cloud repository workspace. */
  projectId: Type.TOptional<Type.TString>;
  /** Persisted task cwd or spawned workspace; no filesystem resolution is implied. */
  workspaceDir: Type.TOptional<Type.TString>;
  permissionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"read-only">, Type.TLiteral<"guarded">, Type.TLiteral<"workspace">, Type.TLiteral<"full">]>>;
  permissionModePending: Type.TOptional<Type.TBoolean>;
  sessionRoot: Type.TOptional<Type.TString>;
  createdVia: Type.TOptional<Type.TUnion<[Type.TLiteral<"operator">, Type.TLiteral<"spawn">, Type.TLiteral<"channel">, Type.TLiteral<"cron">, Type.TLiteral<"talk">, Type.TLiteral<"run">, Type.TLiteral<"plugin">, Type.TLiteral<"internal">]>>;
  createdActor: Type.TOptional<Type.TObject<{
    type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
    label: Type.TOptional<Type.TString>;
    /** Durable profile avatar route; absent for actors without a stored profile avatar. */
    avatarUrl: Type.TOptional<Type.TString>;
    /** Display identity is separate from the actor fields used by ownership policy. */
    identity: Type.TOptional<Type.TUnion<[Type.TObject<{
      type: Type.TLiteral<"profile">;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"agent">;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"remote">;
      pluginId: Type.TString;
      domain: Type.TString;
      idKind: Type.TString;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"observation">;
      pluginId: Type.TUnion<[Type.TString, Type.TNull]>;
      accountId: Type.TUnion<[Type.TString, Type.TNull]>;
      senderKind: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"bot">, Type.TLiteral<"unknown">]>;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"legacy">;
      actorType: Type.TString;
      source: Type.TUnion<[Type.TString, Type.TNull]>;
      id: Type.TString;
    }>]>>;
  }>>;
  owner: Type.TOptional<Type.TObject<{
    actor: Type.TObject<{
      type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
      label: Type.TOptional<Type.TString>;
      /** Durable profile avatar route; absent for actors without a stored profile avatar. */
      avatarUrl: Type.TOptional<Type.TString>;
      /** Display identity is separate from the actor fields used by ownership policy. */
      identity: Type.TOptional<Type.TUnion<[Type.TObject<{
        type: Type.TLiteral<"profile">;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"agent">;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"remote">;
        pluginId: Type.TString;
        domain: Type.TString;
        idKind: Type.TString;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"observation">;
        pluginId: Type.TUnion<[Type.TString, Type.TNull]>;
        accountId: Type.TUnion<[Type.TString, Type.TNull]>;
        senderKind: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"bot">, Type.TLiteral<"unknown">]>;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"legacy">;
        actorType: Type.TString;
        source: Type.TUnion<[Type.TString, Type.TNull]>;
        id: Type.TString;
      }>]>>;
    }>;
    assignedBy: Type.TOptional<Type.TObject<{
      type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
      label: Type.TOptional<Type.TString>;
      /** Durable profile avatar route; absent for actors without a stored profile avatar. */
      avatarUrl: Type.TOptional<Type.TString>;
      /** Display identity is separate from the actor fields used by ownership policy. */
      identity: Type.TOptional<Type.TUnion<[Type.TObject<{
        type: Type.TLiteral<"profile">;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"agent">;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"remote">;
        pluginId: Type.TString;
        domain: Type.TString;
        idKind: Type.TString;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"observation">;
        pluginId: Type.TUnion<[Type.TString, Type.TNull]>;
        accountId: Type.TUnion<[Type.TString, Type.TNull]>;
        senderKind: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"bot">, Type.TLiteral<"unknown">]>;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"legacy">;
        actorType: Type.TString;
        source: Type.TUnion<[Type.TString, Type.TNull]>;
        id: Type.TString;
      }>]>>;
    }>>;
    assignedAt: Type.TOptional<Type.TNumber>;
  }>>;
  participants: Type.TOptional<Type.TArray<Type.TObject<{
    identity: Type.TUnion<[Type.TObject<{
      type: Type.TLiteral<"profile">;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"agent">;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"remote">;
      pluginId: Type.TString;
      domain: Type.TString;
      idKind: Type.TString;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"observation">;
      pluginId: Type.TUnion<[Type.TString, Type.TNull]>;
      accountId: Type.TUnion<[Type.TString, Type.TNull]>;
      senderKind: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"bot">, Type.TLiteral<"unknown">]>;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"legacy">;
      actorType: Type.TString;
      source: Type.TUnion<[Type.TString, Type.TNull]>;
      id: Type.TString;
    }>]>;
    label: Type.TOptional<Type.TString>;
    avatarUrl: Type.TOptional<Type.TString>;
  }>>>;
  expandedParticipants: Type.TOptional<Type.TArray<Type.TObject<{
    identity: Type.TUnion<[Type.TObject<{
      type: Type.TLiteral<"profile">;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"agent">;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"remote">;
      pluginId: Type.TString;
      domain: Type.TString;
      idKind: Type.TString;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"observation">;
      pluginId: Type.TUnion<[Type.TString, Type.TNull]>;
      accountId: Type.TUnion<[Type.TString, Type.TNull]>;
      senderKind: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"bot">, Type.TLiteral<"unknown">]>;
      id: Type.TString;
    }>, Type.TObject<{
      type: Type.TLiteral<"legacy">;
      actorType: Type.TString;
      source: Type.TUnion<[Type.TString, Type.TNull]>;
      id: Type.TString;
    }>]>;
    label: Type.TOptional<Type.TString>;
    avatarUrl: Type.TOptional<Type.TString>;
  }>>>;
  participantCount: Type.TOptional<Type.TInteger>;
  visibility: Type.TOptional<Type.TUnion<[Type.TLiteral<"shared">, Type.TLiteral<"read-only">, Type.TLiteral<"suggest">, Type.TLiteral<"draft">]>>;
  sharingRole: Type.TOptional<Type.TUnion<[Type.TLiteral<"admin">, Type.TLiteral<"owner">, Type.TLiteral<"member">, Type.TLiteral<"viewer">]>>;
  createdAt: Type.TOptional<Type.TNumber>;
  forkSource: Type.TOptional<Type.TObject<{
    sessionKey: Type.TString;
    sessionId: Type.TString;
    entryId: Type.TOptional<Type.TString>;
  }>>;
  previousSessionId: Type.TOptional<Type.TString>;
  inputTokens: Type.TOptional<Type.TNumber>;
  outputTokens: Type.TOptional<Type.TNumber>;
  totalTokens: Type.TOptional<Type.TNumber>;
  totalTokensFresh: Type.TOptional<Type.TBoolean>;
  contextTokens: Type.TOptional<Type.TNumber>;
  estimatedCostUsd: Type.TOptional<Type.TNumber>;
  model: Type.TOptional<Type.TString>;
  modelProvider: Type.TOptional<Type.TString>;
  /** Runtime model serving this session while it differs from the selected model. */
  activeModel: Type.TOptional<Type.TString>;
  activeModelProvider: Type.TOptional<Type.TString>;
  /** Effective override provenance; null means configured default, omission means not projected. */
  modelOverrideSource: Type.TOptional<Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"auto">, Type.TLiteral<"inherited">, Type.TNull]>>;
  toolOverrides: Type.TOptional<Type.TObject<{
    mcpServers: Type.TOptional<Type.TRecord<"^.*$", Type.TBoolean>>;
    mcpToolsDeny: Type.TOptional<Type.TRecord<"^.*$", Type.TArray<Type.TString>>>;
    skills: Type.TOptional<Type.TRecord<"^.*$", Type.TBoolean>>;
    webSearch: Type.TOptional<Type.TBoolean>;
  }>>;
}>;
type SessionPermissionMode = Static<typeof SessionPermissionModeSchema>;
type SessionRunStatus = Static<typeof SessionRunStatusSchema>;
type SessionRow = Static<typeof SessionRowSchema>;
type SessionEntryArchiveReason = Static<typeof SessionEntryArchiveReasonSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-activity-summary.d.ts
declare const SessionActivitySummarySchema: Type.TObject<{
  /** Caller-specific participation permission; operator.write is required separately. */
  canEnsure: Type.TOptional<Type.TBoolean>;
  text: Type.TOptional<Type.TString>;
  updatedAt: Type.TOptional<Type.TInteger>;
  state: Type.TUnion<[Type.TLiteral<"current">, Type.TLiteral<"stale">, Type.TLiteral<"updating">, Type.TLiteral<"unavailable">]>;
}>;
type SessionActivitySummary = Static<typeof SessionActivitySummarySchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/tasks.d.ts
declare const TasksHistoryResultSchema: Type.TObject<{
  /** Stable messageId or __openclaw.id anchors refreshes; entry IDs can have sibling rows. */
  messages: Type.TArray<Type.TUnknown>;
  nextCursor: Type.TOptional<Type.TString>;
}>;
type TasksHistoryResult = Static<typeof TasksHistoryResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-catalog.d.ts
declare const SessionCatalogShareRouteSchema: Type.TObject<{
  kind: Type.TLiteral<"thread-id-prefix">;
  routeSegment: Type.TString;
  hostId: Type.TString;
  identifierAlphabet: Type.TLiteral<"lowercase-hex">;
  fullLength: Type.TLiteral<32>;
  minPrefixLength: Type.TLiteral<12>;
  lookup: Type.TLiteral<"catalog-list-search-by-thread-id-prefix">;
  ambiguity: Type.TLiteral<"multiple-results-or-next-cursor">;
}>;
declare const SessionCatalogHostSchema: Type.TObject<{
  hostId: Type.TString;
  label: Type.TString;
  kind: Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"node">]>;
  connected: Type.TBoolean;
  nodeId: Type.TOptional<Type.TString>;
  canStartTerminal: Type.TOptional<Type.TBoolean>;
  sessions: Type.TArray<Type.TObject<{
    threadId: Type.TString;
    sourceHomeId: Type.TOptional<Type.TString>;
    name: Type.TOptional<Type.TString>;
    /** Named tint imported from the source CLI session (SESSION_COLOR_IDS). */
    color: Type.TOptional<Type.TString>;
    cwd: Type.TOptional<Type.TString>;
    status: Type.TString;
    createdAt: Type.TOptional<Type.TNumber>;
    updatedAt: Type.TOptional<Type.TNumber>;
    recencyAt: Type.TOptional<Type.TNumber>;
    source: Type.TOptional<Type.TString>;
    modelProvider: Type.TOptional<Type.TString>;
    cliVersion: Type.TOptional<Type.TString>;
    gitBranch: Type.TOptional<Type.TString>;
    customGroup: Type.TOptional<Type.TString>;
    pullRequest: Type.TOptional<Type.TObject<{
      numbers: Type.TArray<Type.TInteger>;
      state: Type.TUnion<[Type.TLiteral<"open">, Type.TLiteral<"draft">, Type.TLiteral<"merged">, Type.TLiteral<"closed">]>;
    }>>;
    archived: Type.TBoolean;
    sessionKey: Type.TOptional<Type.TString>;
    createdActor: Type.TOptional<Type.TObject<{
      type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
      label: Type.TOptional<Type.TString>;
      avatarUrl: Type.TOptional<Type.TString>;
      identity: Type.TOptional<Type.TUnion<[Type.TObject<{
        type: Type.TLiteral<"profile">;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"agent">;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"remote">;
        pluginId: Type.TString;
        domain: Type.TString;
        idKind: Type.TString;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"observation">;
        pluginId: Type.TUnion<[Type.TString, Type.TNull]>;
        accountId: Type.TUnion<[Type.TString, Type.TNull]>;
        senderKind: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"bot">, Type.TLiteral<"unknown">]>;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"legacy">;
        actorType: Type.TString;
        source: Type.TUnion<[Type.TString, Type.TNull]>;
        id: Type.TString;
      }>]>>;
    }>>;
    canContinue: Type.TBoolean;
    canArchive: Type.TBoolean;
    canOpenTerminal: Type.TOptional<Type.TBoolean>;
  }>>;
  nextCursor: Type.TOptional<Type.TString>;
  error: Type.TOptional<Type.TObject<{
    code: Type.TString;
    message: Type.TString;
  }>>;
}>;
declare const SessionsCatalogReadParamsSchema: Type.TObject<{
  catalogId: Type.TString;
  hostId: Type.TString;
  threadId: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  sourceHomeId: Type.TOptional<Type.TString>;
  limit: Type.TOptional<Type.TInteger>;
  cursor: Type.TOptional<Type.TString>;
}>;
declare const SessionsCatalogReadResultSchema: Type.TObject<{
  hostId: Type.TString;
  label: Type.TOptional<Type.TString>;
  threadId: Type.TString;
  items: Type.TArray<Type.TObject<{
    id: Type.TOptional<Type.TString>;
    type: Type.TUnion<[Type.TLiteral<"userMessage">, Type.TLiteral<"agentMessage">, Type.TLiteral<"reasoning">, Type.TLiteral<"toolCall">, Type.TLiteral<"toolResult">, Type.TLiteral<"other">]>;
    text: Type.TOptional<Type.TString>;
    timestamp: Type.TOptional<Type.TString>;
    model: Type.TOptional<Type.TString>;
    /** Source-supplied attribution, independent of the viewer and session adopter. */
    sender: Type.TOptional<Type.TObject<{
      identity: Type.TUnion<[Type.TObject<{
        type: Type.TLiteral<"profile">;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"agent">;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"remote">;
        pluginId: Type.TString;
        domain: Type.TString;
        idKind: Type.TString;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"observation">;
        pluginId: Type.TUnion<[Type.TString, Type.TNull]>;
        accountId: Type.TUnion<[Type.TString, Type.TNull]>;
        senderKind: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"bot">, Type.TLiteral<"unknown">]>;
        id: Type.TString;
      }>, Type.TObject<{
        type: Type.TLiteral<"legacy">;
        actorType: Type.TString;
        source: Type.TUnion<[Type.TString, Type.TNull]>;
        id: Type.TString;
      }>]>;
      label: Type.TOptional<Type.TString>;
      avatarUrl: Type.TOptional<Type.TString>;
    }>>;
    truncated: Type.TOptional<Type.TBoolean>;
    raw: Type.TOptional<Type.TUnknown>;
  }>>;
  nextCursor: Type.TOptional<Type.TString>;
}>;
declare const SessionsCatalogContinueParamsSchema: Type.TObject<{
  catalogId: Type.TString;
  hostId: Type.TString;
  threadId: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  sourceHomeId: Type.TOptional<Type.TString>;
}>;
declare const SessionsCatalogArchiveParamsSchema: Type.TObject<{
  catalogId: Type.TString;
  hostId: Type.TString;
  threadId: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  sourceHomeId: Type.TOptional<Type.TString>;
  confirmNoOtherRunner: Type.TLiteral<true>;
}>;
type SessionCatalogShareRoute = Static<typeof SessionCatalogShareRouteSchema>;
type SessionCatalogHost = Static<typeof SessionCatalogHostSchema>;
type SessionsCatalogReadParams = Static<typeof SessionsCatalogReadParamsSchema>;
type SessionsCatalogReadResult = Static<typeof SessionsCatalogReadResultSchema>;
type SessionsCatalogContinueParams = Static<typeof SessionsCatalogContinueParamsSchema>;
type SessionsCatalogArchiveParams = Static<typeof SessionsCatalogArchiveParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/agent.d.ts
/** Waits for a submitted agent run to complete or time out. */
declare const AgentWaitParamsSchema: Type.TObject<{
  runId: Type.TString;
  timeoutMs: Type.TOptional<Type.TInteger>;
}>;
type AgentWaitParams = Static<typeof AgentWaitParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/model-account-selection.d.ts
/** Configured preference only; provider failover can use a different account. */
declare const ChatAccountSelectionSchema: Type.TUnion<[Type.TObject<{
  kind: Type.TLiteral<"automatic">;
  label: Type.TString;
}>, Type.TObject<{
  kind: Type.TLiteral<"personal">;
  label: Type.TString;
  authProfileId: Type.TOptional<Type.TString>;
  source: Type.TOptional<Type.TUnion<[Type.TLiteral<"auto">, Type.TLiteral<"user">, Type.TLiteral<"user-link">]>>;
}>, Type.TObject<{
  kind: Type.TLiteral<"shared">;
  label: Type.TString;
  authProfileId: Type.TString;
  source: Type.TOptional<Type.TUnion<[Type.TLiteral<"auto">, Type.TLiteral<"user">, Type.TLiteral<"user-link">]>>;
}>]>;
type ChatAccountSelection = Static<typeof ChatAccountSelectionSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/users.d.ts
declare const UsersListModelAccountsResultSchema: Type.TObject<{
  profileId: Type.TString;
  accounts: Type.TArray<Type.TObject<{
    authProfileId: Type.TString;
    provider: Type.TString;
    label: Type.TString;
    authType: Type.TUnion<[Type.TLiteral<"api_key">, Type.TLiteral<"oauth">, Type.TLiteral<"token">]>;
    selected: Type.TBoolean;
  }>>;
  nextCursor: Type.TOptional<Type.TString>;
  links: Type.TArray<Type.TObject<{
    provider: Type.TString;
    authProfileId: Type.TString;
    updatedAt: Type.TInteger;
  }>>;
}>;
declare const UsersSelectModelAccountResultSchema: Type.TObject<{
  links: Type.TArray<Type.TObject<{
    provider: Type.TString;
    authProfileId: Type.TString;
    updatedAt: Type.TInteger;
  }>>;
}>;
declare const UsersListAuthLinksResultSchema: Type.TObject<{
  links: Type.TArray<Type.TObject<{
    provider: Type.TString;
    authProfileId: Type.TString;
    updatedAt: Type.TInteger;
  }>>;
}>;
declare const UsersLinkAuthProfileResultSchema: Type.TObject<{
  links: Type.TArray<Type.TObject<{
    provider: Type.TString;
    authProfileId: Type.TString;
    updatedAt: Type.TInteger;
  }>>;
}>;
declare const UsersUnlinkAuthProfileResultSchema: Type.TObject<{
  links: Type.TArray<Type.TObject<{
    provider: Type.TString;
    authProfileId: Type.TString;
    updatedAt: Type.TInteger;
  }>>;
}>;
declare const UsersAuthConnectCatalogResultSchema: Type.TObject<{
  providers: Type.TArray<Type.TObject<{
    id: Type.TString;
    label: Type.TString;
    methods: Type.TArray<Type.TObject<{
      id: Type.TString;
      label: Type.TString;
      hint: Type.TOptional<Type.TString>;
    }>>;
  }>>;
}>;
declare const UsersAuthConnectStartResultSchema: Type.TObject<{
  connectId: Type.TString;
  expiresAtMs: Type.TInteger;
}>;
declare const UsersAuthConnectStatusResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"pending">;
  step: Type.TOptional<Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"note">, Type.TLiteral<"select">, Type.TLiteral<"text">, Type.TLiteral<"confirm">, Type.TLiteral<"multiselect">, Type.TLiteral<"progress">, Type.TLiteral<"action">]>;
    title: Type.TOptional<Type.TString>;
    message: Type.TOptional<Type.TString>;
    format: Type.TOptional<Type.TUnion<[Type.TLiteral<"plain">]>>;
    options: Type.TOptional<Type.TArray<Type.TObject<{
      value: Type.TUnknown;
      label: Type.TString;
      hint: Type.TOptional<Type.TString>;
    }>>>;
    initialValue: Type.TOptional<Type.TUnknown>;
    placeholder: Type.TOptional<Type.TString>;
    sensitive: Type.TOptional<Type.TBoolean>;
    executor: Type.TOptional<Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"client">]>>;
    externalUrl: Type.TOptional<Type.TString>;
    deviceCode: Type.TOptional<Type.TObject<{
      code: Type.TString;
      expiresInMinutes: Type.TOptional<Type.TInteger>;
      message: Type.TOptional<Type.TString>;
    }>>;
  }>>;
  error: Type.TOptional<Type.TString>;
}>, Type.TObject<{
  status: Type.TLiteral<"connected">;
  authProfileId: Type.TString;
  links: Type.TArray<Type.TObject<{
    provider: Type.TString;
    authProfileId: Type.TString;
    updatedAt: Type.TInteger;
  }>>;
}>, Type.TObject<{
  status: Type.TLiteral<"cancelled">;
}>, Type.TObject<{
  status: Type.TLiteral<"expired">;
}>, Type.TObject<{
  status: Type.TLiteral<"failed">;
  reason: Type.TUnion<[Type.TLiteral<"exchange">, Type.TLiteral<"identity">, Type.TLiteral<"authority">, Type.TLiteral<"unavailable">]>;
}>]>;
type UsersListModelAccountsResult = Static<typeof UsersListModelAccountsResultSchema>;
type UsersSelectModelAccountResult = Static<typeof UsersSelectModelAccountResultSchema>;
type UsersAuthConnectStartResult = Static<typeof UsersAuthConnectStartResultSchema>;
type UsersAuthConnectCatalogResult = Static<typeof UsersAuthConnectCatalogResultSchema>;
type UsersAuthConnectStatusResult = Static<typeof UsersAuthConnectStatusResultSchema>;
type UsersListAuthLinksResult = Static<typeof UsersListAuthLinksResultSchema>;
type UsersLinkAuthProfileResult = Static<typeof UsersLinkAuthProfileResultSchema>;
type UsersUnlinkAuthProfileResult = Static<typeof UsersUnlinkAuthProfileResultSchema>;
declare const UsersGitHubAuthorizeStartResultSchema: Type.TObject<{
  requestId: Type.TString;
  userCode: Type.TString;
  verificationUri: Type.TLiteral<"https://github.com/login/device">;
  expiresInMs: Type.TInteger;
  pollAfterMs: Type.TInteger;
}>;
declare const PersonalGitHubStatusSchema: Type.TObject<{
  state: Type.TUnion<[Type.TLiteral<"connected">, Type.TLiteral<"disconnected">, Type.TLiteral<"unavailable">]>;
  generation: Type.TUnion<[Type.TString, Type.TNull]>;
  account: Type.TUnion<[Type.TObject<{
    accountId: Type.TInteger;
    login: Type.TString;
  }>, Type.TNull]>;
  accessExpiresAtMs: Type.TUnion<[Type.TInteger, Type.TNull]>;
  refreshState: Type.TUnion<[Type.TLiteral<"available">, Type.TLiteral<"refreshing">, Type.TLiteral<"expired">, Type.TLiteral<"failed">, Type.TLiteral<"not_applicable">]>;
  pending: Type.TUnion<[Type.TObject<{
    requestId: Type.TString;
    userCode: Type.TString;
    verificationUri: Type.TLiteral<"https://github.com/login/device">;
    expiresInMs: Type.TInteger;
    pollAfterMs: Type.TInteger;
  }>, Type.TNull]>;
}>;
declare const UsersGitHubAuthorizePollResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"pending">;
  retryAfterMs: Type.TInteger;
}>, Type.TObject<{
  status: Type.TLiteral<"slow_down">;
  retryAfterMs: Type.TInteger;
}>, Type.TObject<{
  status: Type.TLiteral<"access_denied">;
}>, Type.TObject<{
  status: Type.TLiteral<"expired">;
}>, Type.TObject<{
  status: Type.TLiteral<"incorrect_device_code">;
}>, Type.TObject<{
  status: Type.TLiteral<"network_error">;
  retryAfterMs: Type.TInteger;
}>, Type.TObject<{
  status: Type.TLiteral<"failed">;
  reason: Type.TUnion<[Type.TLiteral<"identity_changed">, Type.TLiteral<"setup_failed">]>;
}>, Type.TObject<{
  status: Type.TLiteral<"success">;
  personal: Type.TObject<{
    state: Type.TUnion<[Type.TLiteral<"connected">, Type.TLiteral<"disconnected">, Type.TLiteral<"unavailable">]>;
    generation: Type.TUnion<[Type.TString, Type.TNull]>;
    account: Type.TUnion<[Type.TObject<{
      accountId: Type.TInteger;
      login: Type.TString;
    }>, Type.TNull]>;
    accessExpiresAtMs: Type.TUnion<[Type.TInteger, Type.TNull]>;
    refreshState: Type.TUnion<[Type.TLiteral<"available">, Type.TLiteral<"refreshing">, Type.TLiteral<"expired">, Type.TLiteral<"failed">, Type.TLiteral<"not_applicable">]>;
    pending: Type.TUnion<[Type.TObject<{
      requestId: Type.TString;
      userCode: Type.TString;
      verificationUri: Type.TLiteral<"https://github.com/login/device">;
      expiresInMs: Type.TInteger;
      pollAfterMs: Type.TInteger;
    }>, Type.TNull]>;
  }>;
}>]>;
type PersonalGitHubStatus = Static<typeof PersonalGitHubStatusSchema>;
type UsersGitHubAuthorizeStartResult = Static<typeof UsersGitHubAuthorizeStartResultSchema>;
type UsersGitHubAuthorizePollResult = Static<typeof UsersGitHubAuthorizePollResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/openclaw.d.ts
declare const SystemAgentWizardCancelSchema: Type.TObject<{
  /** The visible step this action belongs to; stale controls must not affect a newer step. */
  stepId: Type.TString;
}>;
/**
 * Structured choice attached to a chat reply. Card-capable clients render the
 * options and send back `reply` (default: `label`) as the next message; text
 * clients ignore this and use the reply prose, which always stands alone.
 */
declare const SystemAgentChatQuestionSchema: Type.TObject<{
  id: Type.TString;
  header: Type.TString;
  question: Type.TString;
  options: Type.TArray<Type.TObject<{
    label: Type.TString;
    description: Type.TOptional<Type.TString>;
    recommended: Type.TOptional<Type.TBoolean>;
    /** Message text a client sends when this option is chosen; defaults to label. */
    reply: Type.TOptional<Type.TString>;
  }>>;
  /** Free-text answers are also accepted for this question. */
  isOther: Type.TOptional<Type.TBoolean>;
  /** Client-owned action for the visible skip control; omitted means send a reply. */
  skipAction: Type.TOptional<Type.TLiteral<"exit">>;
}>;
type SystemAgentWizardCancel = Static<typeof SystemAgentWizardCancelSchema>;
type SystemAgentChatQuestion = Static<typeof SystemAgentChatQuestionSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/cron.d.ts
/** Persisted cron job definition returned by scheduler list/get APIs. */
declare const CronJobSchema: Type.TObject<{
  id: Type.TString;
  declarationKey: Type.TOptional<Type.TString>;
  displayName: Type.TOptional<Type.TString>;
  owner: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    accountId: Type.TOptional<Type.TString>;
  }>>;
  scheduledToolPolicy: Type.TOptional<Type.TUnion<[Type.TObject<{
    version: Type.TLiteral<1>;
    mode: Type.TLiteral<"trusted">;
  }>, Type.TObject<{
    version: Type.TLiteral<1>;
    mode: Type.TLiteral<"account">;
    ownerSessionKey: Type.TString;
    ownerAccountId: Type.TString;
  }>]>>;
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  name: Type.TString;
  description: Type.TOptional<Type.TString>;
  enabled: Type.TBoolean;
  deleteAfterRun: Type.TOptional<Type.TBoolean>;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  /** Opaque Gateway-computed token for the job definition, excluding scheduler state. */
  configRevision: Type.TOptional<Type.TString>;
  schedule: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"at">;
    at: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"every">;
    everyMs: Type.TInteger;
    anchorMs: Type.TOptional<Type.TInteger>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"cron">;
    expr: Type.TString;
    tz: Type.TOptional<Type.TString>;
    staggerMs: Type.TOptional<Type.TInteger>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"on-exit">;
    command: Type.TString;
    cwd: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"stream">;
    command: Type.TArray<Type.TString>;
    cwd: Type.TOptional<Type.TString>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"line">, Type.TLiteral<"match">]>>;
    match: Type.TOptional<Type.TString>;
    batchMs: Type.TOptional<Type.TInteger>;
    maxBatchBytes: Type.TOptional<Type.TInteger>;
  }>]>;
  pacing: Type.TOptional<Type.TObject<{
    min: Type.TOptional<Type.TString>;
    max: Type.TOptional<Type.TString>;
  }>>;
  trigger: Type.TOptional<Type.TObject<{
    script: Type.TString;
    once: Type.TOptional<Type.TBoolean>;
  }>>;
  sessionTarget: Type.TUnion<[Type.TLiteral<"main">, Type.TLiteral<"isolated">, Type.TLiteral<"current">, Type.TString]>;
  wakeMode: Type.TUnion<[Type.TLiteral<"next-heartbeat">, Type.TLiteral<"now">]>;
  payload: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"systemEvent">;
    text: Type.TString;
    toolsAllow: Type.TOptional<Type.TArray<Type.TString>>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"agentTurn">;
    message: Type.TString;
    model: Type.TOptional<Type.TString>;
    fallbacks: Type.TOptional<Type.TArray<Type.TString>>;
    thinking: Type.TOptional<Type.TString>;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    allowUnsafeExternalContent: Type.TOptional<Type.TBoolean>;
    lightContext: Type.TOptional<Type.TBoolean>;
    toolsAllow: Type.TOptional<Type.TArray<Type.TString>>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"command">;
    argv: Type.TArray<Type.TString>;
    cwd: Type.TOptional<Type.TString>;
    env: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
    input: Type.TOptional<Type.TString>;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    noOutputTimeoutSeconds: Type.TOptional<Type.TNumber>;
    outputMaxBytes: Type.TOptional<Type.TInteger>;
    toolsAllow: Type.TOptional<Type.TArray<Type.TString>>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"script">;
    script: Type.TString;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    toolBudget: Type.TOptional<Type.TInteger>;
    toolsAllow: Type.TOptional<Type.TArray<Type.TString>>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"heartbeat">;
  }>]>;
  delivery: Type.TOptional<Type.TUnion<[Type.TObject<{
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"none">;
    to: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"announce">;
    completionDestination: Type.TOptional<Type.TObject<{
      mode: Type.TLiteral<"webhook">;
      to: Type.TString;
    }>>;
    to: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"webhook">;
    to: Type.TString;
  }>]>>;
  failureAlert: Type.TOptional<Type.TUnion<[Type.TLiteral<false>, Type.TObject<{
    after: Type.TOptional<Type.TInteger>;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    to: Type.TOptional<Type.TString>;
    cooldownMs: Type.TOptional<Type.TInteger>;
    includeSkipped: Type.TOptional<Type.TBoolean>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    accountId: Type.TOptional<Type.TString>;
  }>]>>;
  state: Type.TObject<{
    lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
    lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
    lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
    lastFailureAlertAtMs: Type.TOptional<Type.TInteger>;
    lastTriggerEvalAtMs: Type.TOptional<Type.TInteger>;
    triggerEvalCount: Type.TOptional<Type.TInteger>;
    lastTriggerFireAtMs: Type.TOptional<Type.TInteger>;
    triggerState: Type.TOptional<Type.TUnknown>;
    streamStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"starting">, Type.TLiteral<"running">, Type.TLiteral<"restarting">, Type.TLiteral<"stopped">, Type.TLiteral<"disabled">, Type.TLiteral<"error">]>>;
    streamError: Type.TOptional<Type.TString>;
    streamConsecutiveFailures: Type.TOptional<Type.TInteger>;
    streamRestartExhausted: Type.TOptional<Type.TBoolean>;
    nextRunAtMs: Type.TOptional<Type.TInteger>;
    scheduleActivatedAtMs: Type.TOptional<Type.TInteger>;
    runningAtMs: Type.TOptional<Type.TInteger>;
    lastRunAtMs: Type.TOptional<Type.TInteger>;
    lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
    lastStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
    lastError: Type.TOptional<Type.TString>;
    lastDiagnostics: Type.TOptional<Type.TObject<{
      summary: Type.TOptional<Type.TString>;
      entries: Type.TArray<Type.TObject<{
        ts: Type.TInteger;
        source: Type.TUnion<[Type.TLiteral<"cron-preflight">, Type.TLiteral<"cron-setup">, Type.TLiteral<"model-preflight">, Type.TLiteral<"agent-run">, Type.TLiteral<"tool">, Type.TLiteral<"exec">, Type.TLiteral<"delivery">]>;
        severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"error">]>;
        message: Type.TString;
        toolName: Type.TOptional<Type.TString>;
        exitCode: Type.TOptional<Type.TUnion<[Type.TNumber, Type.TNull]>>;
        truncated: Type.TOptional<Type.TBoolean>;
      }>>;
    }>>;
    lastDiagnosticSummary: Type.TOptional<Type.TString>;
    lastErrorReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"tls_certificate">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
    lastDurationMs: Type.TOptional<Type.TInteger>;
    consecutiveErrors: Type.TOptional<Type.TInteger>;
    autoDisabled: Type.TOptional<Type.TObject<{
      reason: Type.TUnion<[Type.TLiteral<"consecutive-failures">, Type.TLiteral<"schedule-errors">]>;
      atMs: Type.TInteger;
      consecutiveErrors: Type.TInteger;
    }>>;
    consecutiveSkipped: Type.TOptional<Type.TInteger>;
    lastDelivered: Type.TOptional<Type.TBoolean>;
    lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
    lastDeliveryError: Type.TOptional<Type.TString>;
    deliverySuppressionReason: Type.TOptional<Type.TString>;
    streamSourceIdentity: Type.TOptional<Type.TString>;
    streamDroppedBatches: Type.TOptional<Type.TInteger>;
    streamCoalescedBatches: Type.TOptional<Type.TInteger>;
    streamLastStartedAtMs: Type.TOptional<Type.TInteger>;
    streamLastExitAtMs: Type.TOptional<Type.TInteger>;
  }>;
  nextRunAtMs: Type.TOptional<Type.TInteger>;
  lastRunAtMs: Type.TOptional<Type.TInteger>;
  lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
  lastRunError: Type.TOptional<Type.TString>;
  lastDelivered: Type.TOptional<Type.TBoolean>;
  lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
  lastDeliveryError: Type.TOptional<Type.TString>;
  deliverySuppressionReason: Type.TOptional<Type.TString>;
  lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
  lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
  lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
}>;
//#endregion
//#region packages/gateway-protocol/src/schema/cron.types.d.ts
type CronJob = Static<typeof CronJobSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/environments.d.ts
/** Operational desktop state reported by the current native node connection. */
declare const DesktopAvailabilitySchema: Type.TObject<{
  state: Type.TUnion<[Type.TLiteral<"locked">, Type.TLiteral<"unlocked">, Type.TLiteral<"unknown">]>;
}>;
type DesktopAvailability = Static<typeof DesktopAvailabilitySchema>;
/** Durable lifecycle states for plugin-provisioned worker environments. */
declare const WorkerEnvironmentStateSchema: Type.TUnion<[Type.TLiteral<"requested">, Type.TLiteral<"provisioning">, Type.TLiteral<"bootstrapping">, Type.TLiteral<"ready">, Type.TLiteral<"attached">, Type.TLiteral<"idle">, Type.TLiteral<"draining">, Type.TLiteral<"destroying">, Type.TLiteral<"destroyed">, Type.TLiteral<"failed">, Type.TLiteral<"orphaned">]>;
/** Process-local SSH tunnel connectivity for a worker environment. */
declare const WorkerTunnelStatusSchema: Type.TUnion<[Type.TLiteral<"stopped">, Type.TLiteral<"connecting">, Type.TLiteral<"connected">, Type.TLiteral<"reconnecting">]>;
type WorkerEnvironmentState = Static<typeof WorkerEnvironmentStateSchema>;
type WorkerTunnelStatus = Static<typeof WorkerTunnelStatusSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/devices.d.ts
/** Returns the terminal scope-upgrade state to the identity-bound waiter. */
declare const ScopeUpgradeResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"approved">;
  requestId: Type.TString;
  deviceToken: Type.TString;
  scopes: Type.TArray<Type.TString>;
}>, Type.TObject<{
  status: Type.TLiteral<"rejected">;
  requestId: Type.TString;
}>, Type.TObject<{
  status: Type.TLiteral<"expired">;
  requestId: Type.TString;
}>]>;
type ScopeUpgradeResult = Static<typeof ScopeUpgradeResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/human-mentions.d.ts
/** Explicit selections bound to UTF-16 offsets in the submitted message text. */
declare const HumanMentionSchema: Type.TObject<{
  profileId: Type.TString;
  start: Type.TInteger;
  end: Type.TInteger;
}>;
declare const UsersMentionableParamsSchema: Type.TUnion<[Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  query: Type.TOptional<Type.TString>;
}>, Type.TObject<{
  agentId: Type.TString;
  visibility: Type.TOptional<Type.TUnion<[Type.TLiteral<"shared">, Type.TLiteral<"read-only">, Type.TLiteral<"suggest">, Type.TLiteral<"draft">]>>;
  query: Type.TOptional<Type.TString>;
}>]>;
declare const UsersMentionableResultSchema: Type.TObject<{
  users: Type.TArray<Type.TObject<{
    profileId: Type.TString;
    displayName: Type.TString;
    avatarUrl: Type.TOptional<Type.TString>;
    online: Type.TBoolean;
  }>>;
  truncated: Type.TBoolean;
}>;
declare const MentionsListResultSchema: Type.TObject<{
  gatewayInstanceId: Type.TString;
  revision: Type.TInteger;
  items: Type.TArray<Type.TObject<{
    id: Type.TString;
    senderProfileId: Type.TString;
    senderLabel: Type.TString;
    senderAvatarUrl: Type.TOptional<Type.TString>;
    sessionKey: Type.TString;
    agentId: Type.TString;
    sessionTitle: Type.TString;
    messageId: Type.TString;
    createdAt: Type.TInteger;
    expiresAt: Type.TInteger;
    excerpt: Type.TOptional<Type.TString>;
  }>>;
}>;
type HumanMention = Static<typeof HumanMentionSchema>;
type UsersMentionableParams = Static<typeof UsersMentionableParamsSchema>;
type UsersMentionableResult = Static<typeof UsersMentionableResultSchema>;
type MentionsListResult = Static<typeof MentionsListResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/nodes.d.ts
declare const NodeHostStatsPayloadSchema: Type.TRefine<Type.TObject<{
  cpuCount: Type.TInteger;
  loadAverage: Type.TOptional<Type.TTuple<[Type.TNumber, Type.TNumber, Type.TNumber]>>;
  memoryTotalBytes: Type.TInteger;
  memoryFreeBytes: Type.TInteger;
  diskTotalBytes: Type.TOptional<Type.TInteger>;
  diskAvailableBytes: Type.TOptional<Type.TInteger>;
}>>;
/** Agent-visible tool descriptor advertised by a connected node. */
declare const NodePluginToolDescriptorSchema: Type.TObject<{
  pluginId: Type.TString;
  name: Type.TString;
  description: Type.TString;
  parameters: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  command: Type.TOptional<Type.TString>;
  mcp: Type.TOptional<Type.TObject<{
    server: Type.TString;
    tool: Type.TString;
  }>>;
}>;
type NodePluginToolDescriptor = Static<typeof NodePluginToolDescriptorSchema>;
/** Agent-visible skill descriptor advertised by a connected node. */
declare const NodeSkillDescriptorSchema: Type.TObject<{
  name: Type.TString;
  description: Type.TString;
  content: Type.TString;
}>;
type NodeSkillDescriptor = Static<typeof NodeSkillDescriptorSchema>;
type NodeHostStatsPayload = Static<typeof NodeHostStatsPayloadSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/questions.d.ts
/** Canonical normalized question shown to an operator. */
declare const QuestionSchema: Type.TObject<{
  questionId: Type.TString;
  header: Type.TString;
  question: Type.TString;
  url: Type.TOptional<Type.TString>;
  options: Type.TArray<Type.TObject<{
    label: Type.TString;
    description: Type.TOptional<Type.TString>;
  }>>;
  multiSelect: Type.TOptional<Type.TBoolean>;
  isOther: Type.TOptional<Type.TBoolean>;
  isSecret: Type.TOptional<Type.TBoolean>;
  secretStore: Type.TOptional<Type.TObject<{
    name: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"secret">, Type.TLiteral<"env">]>;
    allowedHosts: Type.TOptional<Type.TArray<Type.TString>>;
    reason: Type.TOptional<Type.TString>;
  }>>;
  secretStoreExisting: Type.TOptional<Type.TObject<{
    updatedAtMs: Type.TInteger;
    updatedBy: Type.TOptional<Type.TString>;
  }>>;
}>;
declare const QuestionAnswersSchema: Type.TObject<{
  answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
}>;
/**
 * One pending or recently resolved transient question request. Flat object with
 * optional terminal fields (exec-approval record precedent): native protocol
 * codegen cannot emit per-status object unions, and the manager owns the
 * status/answers invariant (answers present only when status is "answered").
 */
declare const QuestionRecordSchema: Type.TObject<{
  id: Type.TString;
  questions: Type.TArray<Type.TObject<{
    questionId: Type.TString;
    header: Type.TString;
    question: Type.TString;
    url: Type.TOptional<Type.TString>;
    options: Type.TArray<Type.TObject<{
      label: Type.TString;
      description: Type.TOptional<Type.TString>;
    }>>;
    multiSelect: Type.TOptional<Type.TBoolean>;
    isOther: Type.TOptional<Type.TBoolean>;
    isSecret: Type.TOptional<Type.TBoolean>;
    secretStore: Type.TOptional<Type.TObject<{
      name: Type.TString;
      kind: Type.TUnion<[Type.TLiteral<"secret">, Type.TLiteral<"env">]>;
      allowedHosts: Type.TOptional<Type.TArray<Type.TString>>;
      reason: Type.TOptional<Type.TString>;
    }>>;
    secretStoreExisting: Type.TOptional<Type.TObject<{
      updatedAtMs: Type.TInteger;
      updatedBy: Type.TOptional<Type.TString>;
    }>>;
  }>>;
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"answered">, Type.TLiteral<"cancelled">, Type.TLiteral<"expired">]>;
  answers: Type.TOptional<Type.TObject<{
    answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
  }>>;
  resolvedBy: Type.TOptional<Type.TString>;
}>;
declare const QuestionWaitAnswerResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"pending">;
}>, Type.TObject<{
  status: Type.TLiteral<"answered">;
  answers: Type.TObject<{
    answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
  }>;
  resolutionId: Type.TOptional<Type.TString>;
}>, Type.TObject<{
  status: Type.TLiteral<"cancelled">;
}>, Type.TObject<{
  status: Type.TLiteral<"expired">;
}>]>;
declare const QuestionResolveResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"answered">;
  answers: Type.TObject<{
    answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
  }>;
}>, Type.TObject<{
  status: Type.TLiteral<"cancelled">;
}>]>;
declare const QuestionResolvedEventSchema: Type.TUnion<[Type.TObject<{
  id: Type.TString;
  status: Type.TLiteral<"answered">;
  answers: Type.TObject<{
    answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
  }>;
}>, Type.TObject<{
  id: Type.TString;
  status: Type.TLiteral<"cancelled">;
}>, Type.TObject<{
  id: Type.TString;
  status: Type.TLiteral<"expired">;
}>]>;
type Question = Static<typeof QuestionSchema>;
type QuestionAnswers = Static<typeof QuestionAnswersSchema>;
type QuestionRecord = Static<typeof QuestionRecordSchema>;
type QuestionWaitAnswerResult = Static<typeof QuestionWaitAnswerResultSchema>;
type QuestionResolveResult = Static<typeof QuestionResolveResultSchema>;
type QuestionResolvedEvent = Static<typeof QuestionResolvedEventSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions.d.ts
/** Live session status judgment broadcast to subscribed operator clients. */
declare const SessionObserverDigestSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  sessionId: Type.TOptional<Type.TString>;
  lifecycleRevision: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  revision: Type.TInteger;
  updatedAt: Type.TInteger;
  headline: Type.TString;
  assessment: Type.TOptional<Type.TString>;
  health: Type.TUnion<[Type.TLiteral<"on-track">, Type.TLiteral<"grinding">, Type.TLiteral<"stuck">, Type.TLiteral<"waiting-on-user">, Type.TLiteral<"wrapping-up">, Type.TLiteral<"done">, Type.TLiteral<"failed">]>;
  planProgress: Type.TOptional<Type.TObject<{
    completed: Type.TInteger;
    total: Type.TInteger;
  }>>;
}>;
/** Companion answer returned only to the requesting operator. */
declare const SessionsCompanionAskResultSchema: Type.TObject<{
  answer: Type.TString;
  ts: Type.TInteger;
}>;
/** Current bounded exchanges for one session companion thread. */
declare const SessionsCompanionStateResultSchema: Type.TObject<{
  exchanges: Type.TArray<Type.TObject<{
    question: Type.TString;
    answer: Type.TString;
    ts: Type.TInteger;
  }>>;
}>;
type SessionObserverDigest = Static<typeof SessionObserverDigestSchema>;
type SessionsCompanionAskResult = Static<typeof SessionsCompanionAskResultSchema>;
type SessionsCompanionStateResult = Static<typeof SessionsCompanionStateResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/snapshot.d.ts
/** Initial and incremental gateway state snapshot payload. */
declare const SnapshotSchema: Type.TObject<{
  suspension: Type.TOptional<Type.TObject<{
    phase: Type.TUnion<[Type.TLiteral<"accepting">, Type.TLiteral<"preparing">, Type.TLiteral<"draining">, Type.TLiteral<"prepared">]>;
  }>>;
  presence: Type.TArray<Type.TObject<{
    host: Type.TOptional<Type.TString>;
    clientId: Type.TOptional<Type.TString>;
    ip: Type.TOptional<Type.TString>;
    version: Type.TOptional<Type.TString>;
    platform: Type.TOptional<Type.TString>;
    deviceFamily: Type.TOptional<Type.TString>;
    modelIdentifier: Type.TOptional<Type.TString>;
    timeZone: Type.TOptional<Type.TString>;
    mode: Type.TOptional<Type.TString>;
    lastInputSeconds: Type.TOptional<Type.TInteger>;
    reason: Type.TOptional<Type.TString>;
    tags: Type.TOptional<Type.TArray<Type.TString>>;
    text: Type.TOptional<Type.TString>;
    /** Heartbeat freshness, not online duration or user activity. */
    ts: Type.TInteger;
    /** Server timestamps for the person's continuous online interval and last accepted activity. */
    onlineSince: Type.TOptional<Type.TInteger>;
    lastActivityAt: Type.TOptional<Type.TInteger>;
    deviceId: Type.TOptional<Type.TString>;
    roles: Type.TOptional<Type.TArray<Type.TString>>;
    scopes: Type.TOptional<Type.TArray<Type.TString>>;
    instanceId: Type.TOptional<Type.TString>;
    user: Type.TOptional<Type.TObject<{
      /** Canonical profile id when resolved, otherwise authenticated identity; grouping also uses identity qualification. */
      id: Type.TString;
      identity: Type.TOptional<Type.TObject<{
        type: Type.TLiteral<"profile">;
        id: Type.TString;
      }>>;
      email: Type.TOptional<Type.TString>;
      name: Type.TOptional<Type.TString>;
      avatarUrl: Type.TOptional<Type.TString>;
    }>>;
    /** Sessions this connection declares it is viewing, independent of transport subscriptions. Sorted lexicographically. */
    watchedSessions: Type.TOptional<Type.TArray<Type.TString>>;
  }>>;
  health: Type.TObject<{
    ok: Type.TOptional<Type.TLiteral<true>>;
    ts: Type.TOptional<Type.TInteger>;
    durationMs: Type.TOptional<Type.TInteger>;
    eventLoop: Type.TOptional<Type.TObject<{
      degraded: Type.TBoolean;
      degradedSinceMs: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
      reasons: Type.TArray<Type.TUnion<[Type.TLiteral<"event_loop_delay">, Type.TLiteral<"event_loop_utilization">, Type.TLiteral<"cpu">]>>;
      intervalMs: Type.TNumber;
      delayP99Ms: Type.TNumber;
      delayMaxMs: Type.TNumber;
      utilization: Type.TNumber;
      cpuCoreRatio: Type.TNumber;
    }>>;
    plugins: Type.TOptional<Type.TObject<{
      loaded: Type.TArray<Type.TString>;
      errors: Type.TArray<Type.TObject<{
        id: Type.TString;
        origin: Type.TString;
        activated: Type.TBoolean;
        activationSource: Type.TOptional<Type.TString>;
        activationReason: Type.TOptional<Type.TString>;
        failurePhase: Type.TOptional<Type.TString>;
        error: Type.TString;
      }>>;
      unavailable: Type.TOptional<Type.TArray<Type.TObject<{
        id: Type.TString;
        state: Type.TLiteral<"configured-unavailable">;
        diagnostic: Type.TObject<{
          kind: Type.TLiteral<"plugin-verification">;
          reason: Type.TString;
          detail: Type.TString;
        }>;
      }>>>;
    }>>;
    contextEngines: Type.TOptional<Type.TObject<{
      quarantined: Type.TArray<Type.TObject<{
        engineId: Type.TString;
        owner: Type.TOptional<Type.TString>;
        operation: Type.TString;
        reason: Type.TString;
        failedAt: Type.TInteger;
      }>>;
    }>>;
    deliveryQueues: Type.TOptional<Type.TObject<{
      failed: Type.TArray<Type.TObject<{
        queueName: Type.TString;
        count: Type.TInteger;
        oldestFailedAt: Type.TOptional<Type.TInteger>;
      }>>;
      ingressFailed: Type.TOptional<Type.TArray<Type.TObject<{
        channelId: Type.TString;
        accountId: Type.TString;
        count: Type.TInteger;
        oldestFailedAt: Type.TOptional<Type.TInteger>;
      }>>>;
      ingressPressure: Type.TOptional<Type.TArray<Type.TObject<{
        channelId: Type.TString;
        accountId: Type.TString;
        laneCount: Type.TInteger;
        pendingCount: Type.TInteger;
        claimedCount: Type.TInteger;
        blockedCount: Type.TInteger;
        oldestReceivedAt: Type.TInteger;
      }>>>;
    }>>;
    modelPricing: Type.TOptional<Type.TObject<{
      state: Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"degraded">, Type.TLiteral<"disabled">]>;
      sources: Type.TArray<Type.TObject<{
        source: Type.TUnion<[Type.TLiteral<"openrouter">, Type.TLiteral<"litellm">, Type.TLiteral<"bootstrap">, Type.TLiteral<"refresh">]>;
        state: Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"degraded">]>;
        lastFailureAt: Type.TOptional<Type.TInteger>;
        detail: Type.TOptional<Type.TString>;
      }>>;
      lastFailureAt: Type.TOptional<Type.TInteger>;
      detail: Type.TOptional<Type.TString>;
    }>>;
    configReload: Type.TOptional<Type.TObject<{
      hotReloadStatus: Type.TUnion<[Type.TLiteral<"active">, Type.TLiteral<"disabled">]>;
    }>>;
    channels: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    channelOrder: Type.TOptional<Type.TArray<Type.TString>>;
    channelLabels: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
    heartbeatSeconds: Type.TOptional<Type.TInteger>;
    defaultAgentId: Type.TOptional<Type.TString>;
    agents: Type.TOptional<Type.TArray<Type.TObject<{
      agentId: Type.TString;
      name: Type.TOptional<Type.TString>;
      isDefault: Type.TBoolean;
      heartbeat: Type.TObject<{
        enabled: Type.TBoolean;
        every: Type.TString;
        everyMs: Type.TUnion<[Type.TInteger, Type.TNull]>;
        prompt: Type.TString;
        target: Type.TString;
        model: Type.TOptional<Type.TString>;
        session: Type.TOptional<Type.TString>;
        ackMaxChars: Type.TInteger;
      }>;
      sessions: Type.TObject<{
        path: Type.TString;
        count: Type.TInteger;
        recent: Type.TArray<Type.TObject<{
          key: Type.TString;
          updatedAt: Type.TUnion<[Type.TInteger, Type.TNull]>;
          age: Type.TUnion<[Type.TInteger, Type.TNull]>;
        }>>;
      }>;
    }>>>;
    sessions: Type.TOptional<Type.TObject<{
      path: Type.TString;
      count: Type.TInteger;
      recent: Type.TArray<Type.TObject<{
        key: Type.TString;
        updatedAt: Type.TUnion<[Type.TInteger, Type.TNull]>;
        age: Type.TUnion<[Type.TInteger, Type.TNull]>;
      }>>;
    }>>;
  }>;
  stateVersion: Type.TObject<{
    presence: Type.TInteger;
    health: Type.TInteger;
  }>;
  uptimeMs: Type.TInteger;
  /** Resolved source-config revision accepted by the active Gateway runtime. */
  appliedConfigHash: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  configPath: Type.TOptional<Type.TString>;
  stateDir: Type.TOptional<Type.TString>;
  sessionDefaults: Type.TOptional<Type.TObject<{
    defaultAgentId: Type.TString;
    modelConfigured: Type.TOptional<Type.TBoolean>;
    ownership: Type.TOptional<Type.TUnion<[Type.TLiteral<"sole">, Type.TLiteral<"legacy">, Type.TLiteral<"explicit">]>>;
    selectionRequired: Type.TOptional<Type.TBoolean>;
    mainKey: Type.TString;
    mainSessionKey: Type.TString;
    scope: Type.TOptional<Type.TString>;
  }>>;
  /** Credential-free browser sign-in endpoint advertised to authenticated operators. */
  controlUiIdentityUrl: Type.TOptional<Type.TString>;
  authMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"none">, Type.TLiteral<"token">, Type.TLiteral<"password">, Type.TLiteral<"trusted-proxy">]>>;
  updateAvailable: Type.TOptional<Type.TObject<{
    currentVersion: Type.TString;
    latestVersion: Type.TString;
    channel: Type.TString;
    currentSha: Type.TOptional<Type.TString>;
    upstreamRef: Type.TOptional<Type.TString>;
    upstreamSha: Type.TOptional<Type.TString>;
    commitsBehind: Type.TOptional<Type.TInteger>;
    commits: Type.TOptional<Type.TArray<Type.TObject<{
      sha: Type.TString;
      subject: Type.TString;
    }>>>;
  }>>;
  updateSchedule: Type.TOptional<Type.TObject<{
    channel: Type.TString;
    autoEnabled: Type.TBoolean;
    install: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"package">, Type.TLiteral<"git">, Type.TLiteral<"unknown">]>;
      git: Type.TOptional<Type.TUnion<[Type.TObject<{
        currentSha: Type.TOptional<Type.TString>;
        commitAtMs: Type.TOptional<Type.TInteger>;
        installedAtMs: Type.TOptional<Type.TInteger>;
        status: Type.TLiteral<"current">;
      }>, Type.TObject<{
        currentSha: Type.TOptional<Type.TString>;
        commitAtMs: Type.TOptional<Type.TInteger>;
        installedAtMs: Type.TOptional<Type.TInteger>;
        status: Type.TLiteral<"behind">;
        commitsBehind: Type.TInteger;
      }>, Type.TObject<{
        currentSha: Type.TOptional<Type.TString>;
        commitAtMs: Type.TOptional<Type.TInteger>;
        installedAtMs: Type.TOptional<Type.TInteger>;
        status: Type.TLiteral<"ahead">;
        commitsAhead: Type.TInteger;
      }>, Type.TObject<{
        currentSha: Type.TOptional<Type.TString>;
        commitAtMs: Type.TOptional<Type.TInteger>;
        installedAtMs: Type.TOptional<Type.TInteger>;
        status: Type.TLiteral<"diverged">;
        commitsAhead: Type.TInteger;
        commitsBehind: Type.TInteger;
      }>, Type.TObject<{
        currentSha: Type.TOptional<Type.TString>;
        commitAtMs: Type.TOptional<Type.TInteger>;
        installedAtMs: Type.TOptional<Type.TInteger>;
        status: Type.TLiteral<"unavailable">;
        reason: Type.TUnion<[Type.TLiteral<"fetch-failed">, Type.TLiteral<"no-upstream">, Type.TLiteral<"no-upstream-sha">, Type.TLiteral<"comparison-failed">, Type.TLiteral<"git-unavailable">]>;
      }>]>>;
    }>>;
    target: Type.TOptional<Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"package">;
      version: Type.TString;
    }>, Type.TObject<{
      kind: Type.TLiteral<"git">;
      upstreamRef: Type.TString;
      upstreamSha: Type.TString;
      commitsBehind: Type.TInteger;
    }>]>>;
    campaign: Type.TOptional<Type.TObject<{
      id: Type.TString;
      state: Type.TUnion<[Type.TLiteral<"waiting-for-idle">, Type.TLiteral<"countdown">, Type.TLiteral<"applying">]>;
      announcedAtMs: Type.TInteger;
      applyAtMs: Type.TOptional<Type.TInteger>;
      holdUntilMs: Type.TOptional<Type.TInteger>;
      forceAtMs: Type.TInteger;
      updatedAtMs: Type.TInteger;
    }>>;
  }>>;
}>;
type Snapshot = Static<typeof SnapshotSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/terminal.d.ts
/** Absolute temporary path pasted into the active terminal after upload. */
declare const TerminalUploadResultSchema: Type.TObject<{
  path: Type.TString;
  size: Type.TInteger;
  /** Explicit path insertion contract for a native CLI rather than a shell. */
  uploadPathStyle: Type.TOptional<Type.TLiteral<"native">>;
}>;
type TerminalUploadResult = Static<typeof TerminalUploadResultSchema>;
type TerminalUploadPathStyle = NonNullable<TerminalUploadResult["uploadPathStyle"]>;
//#endregion
//#region packages/gateway-protocol/src/schema/portals.d.ts
declare const PortalSummarySchema: Type.TObject<{
  id: Type.TString;
  title: Type.TString;
  port: Type.TInteger;
  listenPort: Type.TInteger;
  publicUrl: Type.TString;
  path: Type.TOptional<Type.TString>;
  description: Type.TOptional<Type.TString>;
  origin: Type.TOptional<Type.TString>;
  createdAtMs: Type.TInteger;
  tokenQuery: Type.TOptional<Type.TString>;
  url: Type.TOptional<Type.TString>;
}>;
declare const PortalOpenResultSchema: Type.TObject<{
  id: Type.TString;
  title: Type.TString;
  port: Type.TInteger;
  listenPort: Type.TInteger;
  publicUrl: Type.TString;
  path: Type.TOptional<Type.TString>;
  description: Type.TOptional<Type.TString>;
  origin: Type.TOptional<Type.TString>;
  createdAtMs: Type.TInteger;
  tokenQuery: Type.TString;
  url: Type.TString;
}>;
type PortalSummary = Static<typeof PortalSummarySchema>;
type PortalOpenResult = Static<typeof PortalOpenResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/wizard.d.ts
/** Client answer payload for the current wizard step. */
declare const WizardAnswerSchema: Type.TObject<{
  stepId: Type.TString;
  value: Type.TOptional<Type.TUnknown>;
}>;
/** UI contract for one wizard step rendered by gateway clients. */
declare const WizardStepSchema: Type.TObject<{
  id: Type.TString;
  type: Type.TUnion<[Type.TLiteral<"note">, Type.TLiteral<"select">, Type.TLiteral<"text">, Type.TLiteral<"confirm">, Type.TLiteral<"multiselect">, Type.TLiteral<"progress">, Type.TLiteral<"action">]>;
  title: Type.TOptional<Type.TString>;
  message: Type.TOptional<Type.TString>;
  format: Type.TOptional<Type.TUnion<[Type.TLiteral<"plain">]>>;
  options: Type.TOptional<Type.TArray<Type.TObject<{
    value: Type.TUnknown;
    label: Type.TString;
    hint: Type.TOptional<Type.TString>;
  }>>>;
  initialValue: Type.TOptional<Type.TUnknown>;
  placeholder: Type.TOptional<Type.TString>;
  sensitive: Type.TOptional<Type.TBoolean>;
  executor: Type.TOptional<Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"client">]>>;
  externalUrl: Type.TOptional<Type.TString>;
  deviceCode: Type.TOptional<Type.TObject<{
    code: Type.TString;
    expiresInMinutes: Type.TOptional<Type.TInteger>;
    message: Type.TOptional<Type.TString>;
  }>>;
}>;
/** Result after advancing a wizard session. */
declare const WizardNextResultSchema: Type.TObject<{
  done: Type.TBoolean;
  step: Type.TOptional<Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"note">, Type.TLiteral<"select">, Type.TLiteral<"text">, Type.TLiteral<"confirm">, Type.TLiteral<"multiselect">, Type.TLiteral<"progress">, Type.TLiteral<"action">]>;
    title: Type.TOptional<Type.TString>;
    message: Type.TOptional<Type.TString>;
    format: Type.TOptional<Type.TUnion<[Type.TLiteral<"plain">]>>;
    options: Type.TOptional<Type.TArray<Type.TObject<{
      value: Type.TUnknown;
      label: Type.TString;
      hint: Type.TOptional<Type.TString>;
    }>>>;
    initialValue: Type.TOptional<Type.TUnknown>;
    placeholder: Type.TOptional<Type.TString>;
    sensitive: Type.TOptional<Type.TBoolean>;
    executor: Type.TOptional<Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"client">]>>;
    externalUrl: Type.TOptional<Type.TString>;
    deviceCode: Type.TOptional<Type.TObject<{
      code: Type.TString;
      expiresInMinutes: Type.TOptional<Type.TInteger>;
      message: Type.TOptional<Type.TString>;
    }>>;
  }>>;
  status: Type.TOptional<Type.TUnion<[Type.TLiteral<"running">, Type.TLiteral<"done">, Type.TLiteral<"cancelled">, Type.TLiteral<"error">]>>;
  error: Type.TOptional<Type.TString>;
  channels: Type.TOptional<Type.TArray<Type.TString>>;
  accounts: Type.TOptional<Type.TArray<Type.TObject<{
    channel: Type.TString;
    accountId: Type.TString;
  }>>>;
  preparedModelRef: Type.TOptional<Type.TString>;
  modelActivation: Type.TOptional<Type.TObject<{
    modelRef: Type.TString;
    modelTarget: Type.TOptional<Type.TLiteral<"utility">>;
    gatewayRestartRequired: Type.TOptional<Type.TLiteral<true>>;
  }>>;
  activationRejection: Type.TOptional<Type.TObject<{
    disposition: Type.TLiteral<"rejected-before-promotion">;
    status: Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"rate_limit">, Type.TLiteral<"billing">, Type.TLiteral<"timeout">, Type.TLiteral<"format">, Type.TLiteral<"unavailable">, Type.TLiteral<"unknown">]>;
  }>>;
}>;
type WizardAnswer = Static<typeof WizardAnswerSchema>;
type WizardStep = Static<typeof WizardStepSchema>;
type WizardNextResult = Static<typeof WizardNextResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/worker-protocol-primitives.d.ts
declare const WorkerIdentifierSchema: Type.TString;
declare const WorkerAdmissionFailureReasonSchema: Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>;
declare const WorkerProtocolCloseReasonSchema: Type.TUnion<[Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>, Type.TLiteral<"admission-rejected">, Type.TLiteral<"invalid-handshake">, Type.TLiteral<"protocol-mismatch">, Type.TLiteral<"gateway-unavailable">, Type.TLiteral<"invalid-frame">, Type.TLiteral<"slow-consumer">, Type.TLiteral<"method-not-allowed">, Type.TLiteral<"invalid-heartbeat">, Type.TLiteral<"credential-replaced">, Type.TLiteral<"gateway-shutdown">]>;
declare const LiveIntegerSchema: Type.TInteger;
declare const LiveSequenceSchema: Type.TInteger;
//#endregion
//#region packages/gateway-protocol/src/schema/worker-admission.d.ts
declare const WORKER_BUNDLE_PREWARM_VERSION = 1;
/** Build identity presented by a worker before the gateway admits it. */
declare const WorkerAdmissionHandshakeSchema: Type.TObject<{
  bundleHash: Type.TString;
  openclawVersion: Type.TString;
  protocolFeatures: Type.TArray<Type.TString>;
  bundlePrewarm: Type.TOptional<Type.TInteger>;
}>;
/** Dedicated first-frame payload accepted only on the worker ingress. */
declare const WorkerConnectParamsSchema: Type.TObject<{
  minProtocol: Type.TInteger;
  maxProtocol: Type.TInteger;
  client: Type.TObject<{
    id: Type.TLiteral<"openclaw-worker">;
    version: Type.TString;
    platform: Type.TString;
    mode: Type.TLiteral<"worker">;
  }>;
  role: Type.TLiteral<"worker">;
  admission: Type.TUnion<[Type.TObject<{
    environmentId: Type.TString;
    credential: Type.TString;
    ownerEpoch: Type.TInteger;
    rpcSetVersion: Type.TInteger;
    handshake: Type.TObject<{
      bundleHash: Type.TString;
      openclawVersion: Type.TString;
      protocolFeatures: Type.TArray<Type.TString>;
      bundlePrewarm: Type.TOptional<Type.TInteger>;
    }>;
    sessionId: Type.TNull;
    runId: Type.TNull;
  }>, Type.TObject<{
    environmentId: Type.TString;
    credential: Type.TString;
    ownerEpoch: Type.TInteger;
    rpcSetVersion: Type.TInteger;
    handshake: Type.TObject<{
      bundleHash: Type.TString;
      openclawVersion: Type.TString;
      protocolFeatures: Type.TArray<Type.TString>;
      bundlePrewarm: Type.TOptional<Type.TInteger>;
    }>;
    sessionId: Type.TString;
    runId: Type.TString;
  }>]>;
}>;
declare const WorkerSessionsSpawnParamsSchema: Type.TObject<{
  toolCallId: Type.TString;
  task: Type.TString;
  label: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
  model: Type.TOptional<Type.TString>;
  runTimeoutSeconds: Type.TOptional<Type.TInteger>;
}>;
declare const WorkerSessionsSendParamsSchema: Type.TObject<{
  toolCallId: Type.TString;
  sessionKey: Type.TString;
  message: Type.TString;
  timeoutSeconds: Type.TOptional<Type.TInteger>;
}>;
declare const WorkerPortalParamsSchema: Type.TObject<{
  toolCallId: Type.TString;
  action: Type.TUnion<[Type.TLiteral<"open">, Type.TLiteral<"list">, Type.TLiteral<"close">]>;
  port: Type.TOptional<Type.TInteger>;
  title: Type.TOptional<Type.TString>;
  description: Type.TOptional<Type.TString>;
  path: Type.TOptional<Type.TString>;
  id: Type.TOptional<Type.TString>;
}>;
declare const WorkerSessionToolResultSchema: Type.TObject<{
  resultJson: Type.TString;
}>;
declare const WorkerTranscriptCommitParamsSchema: Type.TObject<{
  runEpoch: Type.TInteger;
  seq: Type.TInteger;
  baseLeafId: Type.TUnion<[Type.TString, Type.TNull]>;
  messages: Type.TArray<Type.TUnion<[Type.TObject<{
    role: Type.TLiteral<"user">;
    content: Type.TArray<Type.TUnion<[Type.TObject<{
      type: Type.TLiteral<"text">;
      text: Type.TString;
      textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      type: Type.TLiteral<"image">;
      data: Type.TString;
      mimeType: Type.TString;
    }>]>>;
    timestamp: Type.TInteger;
  }>, Type.TObject<{
    role: Type.TLiteral<"assistant">;
    content: Type.TArray<Type.TUnion<[Type.TObject<{
      type: Type.TLiteral<"text">;
      text: Type.TString;
      textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      type: Type.TLiteral<"thinking">;
      thinking: Type.TString;
      thinkingSignature: Type.TOptional<Type.TString>;
      redacted: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      type: Type.TLiteral<"toolCall">;
      id: Type.TString;
      name: Type.TString;
      arguments: Type.TRecord<"^.*$", Type.TUnknown>;
      thoughtSignature: Type.TOptional<Type.TString>;
      executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
    }>]>>;
    api: Type.TString;
    provider: Type.TString;
    model: Type.TString;
    responseModel: Type.TOptional<Type.TString>;
    responseId: Type.TOptional<Type.TString>;
    providerReplay: Type.TOptional<Type.TObject<{
      v: Type.TLiteral<1>;
      type: Type.TString;
      id: Type.TOptional<Type.TString>;
      data: Type.TString;
      replayIndex: Type.TOptional<Type.TInteger>;
      provider: Type.TString;
      api: Type.TString;
      model: Type.TString;
      baseUrlHash: Type.TOptional<Type.TString>;
      sessionHash: Type.TOptional<Type.TString>;
      authProfileHash: Type.TOptional<Type.TString>;
    }>>;
    diagnostics: Type.TOptional<Type.TArray<Type.TObject<{
      type: Type.TString;
      timestamp: Type.TInteger;
      error: Type.TOptional<Type.TObject<{
        name: Type.TOptional<Type.TString>;
        message: Type.TString;
        stack: Type.TOptional<Type.TString>;
        code: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
      }>>;
      details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    }>>>;
    usage: Type.TObject<{
      input: Type.TNumber;
      output: Type.TNumber;
      cacheRead: Type.TNumber;
      cacheWrite: Type.TNumber;
      contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
        state: Type.TLiteral<"available">;
        promptTokens: Type.TNumber;
        totalTokens: Type.TNumber;
      }>, Type.TObject<{
        state: Type.TLiteral<"unavailable">;
      }>]>>;
      totalTokens: Type.TNumber;
      cost: Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        total: Type.TNumber;
        totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
      }>;
    }>;
    stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">, Type.TLiteral<"error">, Type.TLiteral<"aborted">]>;
    errorMessage: Type.TOptional<Type.TString>;
    errorCode: Type.TOptional<Type.TString>;
    errorType: Type.TOptional<Type.TString>;
    errorBody: Type.TOptional<Type.TString>;
    timestamp: Type.TInteger;
  }>, Type.TObject<{
    role: Type.TLiteral<"toolResult">;
    toolCallId: Type.TString;
    toolName: Type.TString;
    content: Type.TArray<Type.TUnion<[Type.TObject<{
      type: Type.TLiteral<"text">;
      text: Type.TString;
      textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      type: Type.TLiteral<"image">;
      data: Type.TString;
      mimeType: Type.TString;
    }>]>>;
    details: Type.TOptional<Type.TUnknown>;
    isError: Type.TBoolean;
    timestamp: Type.TInteger;
  }>]>>;
}>;
declare const WorkerTranscriptCommitResultSchema: Type.TObject<{
  entryIds: Type.TArray<Type.TString>;
  newLeafId: Type.TString;
}>;
declare const WorkerTranscriptCommitErrorReasonSchema: Type.TUnion<[Type.TLiteral<"stale-base-leaf">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"invalid-batch">, Type.TLiteral<"session-not-attached">]>;
declare const WorkerLiveEventSchema: Type.TUnion<[Type.TObject<{
  readonly kind: Type.TLiteral<"assistant">;
  readonly payload: Type.TObject<{
    readonly text: Type.TString;
    readonly delta: Type.TString;
    readonly replace: Type.TOptional<Type.TLiteral<true>>;
    readonly mediaUrls: Type.TOptional<Type.TArray<Type.TString>>;
    readonly phase: Type.TOptional<Type.TUnion<[Type.TLiteral<"commentary">, Type.TLiteral<"final_answer">]>>;
    readonly itemId: Type.TOptional<Type.TString>;
  }>;
}>, Type.TObject<{
  readonly kind: Type.TLiteral<"thinking">;
  readonly payload: Type.TObject<{
    readonly text: Type.TString;
    readonly delta: Type.TString;
  }>;
}>, Type.TObject<{
  readonly kind: Type.TLiteral<"tool">;
  readonly payload: Type.TUnion<[Type.TObject<{
    readonly name: Type.TString;
    readonly toolCallId: Type.TString;
    readonly hideFromChannelProgress: Type.TOptional<Type.TLiteral<true>>;
    readonly phase: Type.TLiteral<"start">;
    readonly args: Type.TUnknown;
  }>, Type.TObject<{
    readonly name: Type.TString;
    readonly toolCallId: Type.TString;
    readonly hideFromChannelProgress: Type.TOptional<Type.TLiteral<true>>;
    readonly phase: Type.TLiteral<"update">;
    readonly partialResult: Type.TUnknown;
  }>, Type.TObject<{
    readonly name: Type.TString;
    readonly toolCallId: Type.TString;
    readonly hideFromChannelProgress: Type.TOptional<Type.TLiteral<true>>;
    readonly phase: Type.TLiteral<"result">;
    readonly meta: Type.TOptional<Type.TString>;
    readonly isError: Type.TBoolean;
    readonly result: Type.TUnknown;
    readonly toolErrorSummary: Type.TOptional<Type.TString>;
  }>]>;
}>, Type.TObject<{
  readonly kind: Type.TLiteral<"approval">;
  readonly payload: Type.TUnion<[Type.TObject<{
    readonly kind: Type.TUnion<[Type.TLiteral<"exec">, Type.TLiteral<"plugin">, Type.TLiteral<"unknown">]>;
    readonly title: Type.TString;
    readonly itemId: Type.TOptional<Type.TString>;
    readonly toolCallId: Type.TOptional<Type.TString>;
    readonly approvalId: Type.TOptional<Type.TString>;
    readonly approvalSlug: Type.TOptional<Type.TString>;
    readonly command: Type.TOptional<Type.TString>;
    readonly host: Type.TOptional<Type.TString>;
    readonly reason: Type.TOptional<Type.TString>;
    readonly scope: Type.TOptional<Type.TUnion<[Type.TLiteral<"turn">, Type.TLiteral<"session">]>>;
    readonly message: Type.TOptional<Type.TString>;
    readonly phase: Type.TLiteral<"requested">;
    readonly status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"unavailable">]>;
  }>, Type.TObject<{
    readonly kind: Type.TUnion<[Type.TLiteral<"exec">, Type.TLiteral<"plugin">, Type.TLiteral<"unknown">]>;
    readonly title: Type.TString;
    readonly itemId: Type.TOptional<Type.TString>;
    readonly toolCallId: Type.TOptional<Type.TString>;
    readonly approvalId: Type.TOptional<Type.TString>;
    readonly approvalSlug: Type.TOptional<Type.TString>;
    readonly command: Type.TOptional<Type.TString>;
    readonly host: Type.TOptional<Type.TString>;
    readonly reason: Type.TOptional<Type.TString>;
    readonly scope: Type.TOptional<Type.TUnion<[Type.TLiteral<"turn">, Type.TLiteral<"session">]>>;
    readonly message: Type.TOptional<Type.TString>;
    readonly phase: Type.TLiteral<"resolved">;
    readonly status: Type.TUnion<[Type.TLiteral<"approved">, Type.TLiteral<"denied">, Type.TLiteral<"failed">]>;
  }>]>;
}>, Type.TObject<{
  readonly kind: Type.TLiteral<"lifecycle">;
  readonly payload: Type.TUnion<[Type.TObject<{
    readonly phase: Type.TLiteral<"start">;
    readonly startedAt: Type.TInteger;
  }>, Type.TObject<{
    readonly selectedProvider: Type.TString;
    readonly selectedModel: Type.TString;
    readonly activeProvider: Type.TString;
    readonly activeModel: Type.TString;
    readonly phase: Type.TLiteral<"fallback">;
    readonly reasonSummary: Type.TString;
    readonly attemptSummaries: Type.TArray<Type.TString>;
    readonly attempts: Type.TArray<Type.TObject<{
      readonly provider: Type.TString;
      readonly model: Type.TString;
      readonly error: Type.TString;
      readonly reason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"tls_certificate">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
      readonly authMode: Type.TOptional<Type.TString>;
      readonly status: Type.TOptional<Type.TInteger>;
      readonly code: Type.TOptional<Type.TString>;
    }>>;
  }>, Type.TObject<{
    readonly selectedProvider: Type.TString;
    readonly selectedModel: Type.TString;
    readonly activeProvider: Type.TString;
    readonly activeModel: Type.TString;
    readonly phase: Type.TLiteral<"fallback_cleared">;
    readonly previousActiveModel: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    readonly phase: Type.TLiteral<"fallback_step">;
    readonly fallbackStepType: Type.TLiteral<"fallback_step">;
    readonly fallbackStepFromModel: Type.TString;
    readonly fallbackStepToModel: Type.TOptional<Type.TString>;
    readonly fallbackStepFromFailureReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"tls_certificate">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
    readonly fallbackStepFromFailureDetail: Type.TOptional<Type.TString>;
    readonly fallbackStepChainPosition: Type.TOptional<Type.TInteger>;
    readonly fallbackStepFinalOutcome: Type.TUnion<[Type.TLiteral<"next_fallback">, Type.TLiteral<"succeeded">, Type.TLiteral<"chain_exhausted">]>;
  }>, Type.TUnion<[Type.TObject<{
    readonly startedAt: Type.TOptional<Type.TInteger>;
    readonly endedAt: Type.TInteger;
    readonly stopReason: Type.TOptional<Type.TString>;
    readonly yielded: Type.TOptional<Type.TLiteral<true>>;
    readonly timeoutPhase: Type.TOptional<Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"preflight">, Type.TLiteral<"provider">, Type.TLiteral<"post_turn">, Type.TLiteral<"gateway_draining">]>>;
    readonly providerStarted: Type.TOptional<Type.TBoolean>;
    readonly aborted: Type.TOptional<Type.TBoolean>;
    readonly toolErrorSummary: Type.TOptional<Type.TString>;
    readonly livenessState: Type.TOptional<Type.TUnion<[Type.TLiteral<"working">, Type.TLiteral<"paused">, Type.TLiteral<"blocked">, Type.TLiteral<"abandoned">]>>;
    readonly replayInvalid: Type.TOptional<Type.TLiteral<true>>;
    readonly phase: Type.TLiteral<"finishing">;
    readonly error: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    readonly startedAt: Type.TOptional<Type.TInteger>;
    readonly endedAt: Type.TInteger;
    readonly stopReason: Type.TOptional<Type.TString>;
    readonly yielded: Type.TOptional<Type.TLiteral<true>>;
    readonly timeoutPhase: Type.TOptional<Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"preflight">, Type.TLiteral<"provider">, Type.TLiteral<"post_turn">, Type.TLiteral<"gateway_draining">]>>;
    readonly providerStarted: Type.TOptional<Type.TBoolean>;
    readonly aborted: Type.TOptional<Type.TBoolean>;
    readonly toolErrorSummary: Type.TOptional<Type.TString>;
    readonly livenessState: Type.TOptional<Type.TUnion<[Type.TLiteral<"working">, Type.TLiteral<"paused">, Type.TLiteral<"blocked">, Type.TLiteral<"abandoned">]>>;
    readonly replayInvalid: Type.TOptional<Type.TLiteral<true>>;
    readonly phase: Type.TLiteral<"end">;
  }>, Type.TObject<{
    readonly startedAt: Type.TOptional<Type.TInteger>;
    readonly endedAt: Type.TInteger;
    readonly stopReason: Type.TOptional<Type.TString>;
    readonly yielded: Type.TOptional<Type.TLiteral<true>>;
    readonly timeoutPhase: Type.TOptional<Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"preflight">, Type.TLiteral<"provider">, Type.TLiteral<"post_turn">, Type.TLiteral<"gateway_draining">]>>;
    readonly providerStarted: Type.TOptional<Type.TBoolean>;
    readonly aborted: Type.TOptional<Type.TBoolean>;
    readonly toolErrorSummary: Type.TOptional<Type.TString>;
    readonly livenessState: Type.TOptional<Type.TUnion<[Type.TLiteral<"working">, Type.TLiteral<"paused">, Type.TLiteral<"blocked">, Type.TLiteral<"abandoned">]>>;
    readonly replayInvalid: Type.TOptional<Type.TLiteral<true>>;
    readonly phase: Type.TLiteral<"error">;
    readonly error: Type.TString;
    readonly fallbackExhaustedFailure: Type.TOptional<Type.TLiteral<true>>;
  }>]>]>;
}>]>;
declare const WorkerLiveEventParamsSchema: Type.TObject<{
  readonly runEpoch: typeof LiveIntegerSchema;
  readonly lastAckedSeq: typeof LiveIntegerSchema;
  readonly seq: typeof LiveSequenceSchema;
  readonly runId: typeof WorkerIdentifierSchema;
  readonly event: typeof WorkerLiveEventSchema;
}>;
declare const WorkerLiveEventResultSchema: Type.TObject<{
  readonly ackedSeq: Type.TInteger;
}>;
declare const WorkerLiveEventErrorDetailsSchema: Type.TUnion<[Type.TObject<{
  readonly reason: Type.TUnion<[Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"invalid-event">, Type.TLiteral<"capacity-exceeded">]>;
}>, Type.TObject<{
  readonly reason: Type.TLiteral<"resync-required">;
  readonly ackedSeq: Type.TInteger;
  readonly expectedSeq: Type.TInteger;
}>]>;
type WorkerAdmissionHandshake = Static<typeof WorkerAdmissionHandshakeSchema>;
type WorkerConnectParams = Static<typeof WorkerConnectParamsSchema>;
type WorkerAdmissionFailureReason = Static<typeof WorkerAdmissionFailureReasonSchema>;
type WorkerProtocolCloseReason = Static<typeof WorkerProtocolCloseReasonSchema>;
type WorkerSessionsSpawnParams = Static<typeof WorkerSessionsSpawnParamsSchema>;
type WorkerSessionsSendParams = Static<typeof WorkerSessionsSendParamsSchema>;
type WorkerPortalParams = Static<typeof WorkerPortalParamsSchema>;
type WorkerSessionToolResult = Static<typeof WorkerSessionToolResultSchema>;
type WorkerTranscriptCommitParams = Static<typeof WorkerTranscriptCommitParamsSchema>;
type WorkerTranscriptCommitResult = Static<typeof WorkerTranscriptCommitResultSchema>;
type WorkerTranscriptCommitErrorReason = Static<typeof WorkerTranscriptCommitErrorReasonSchema>;
type WorkerLiveEventParams = Static<typeof WorkerLiveEventParamsSchema>;
type WorkerLiveEventResult = Static<typeof WorkerLiveEventResultSchema>;
type WorkerLiveEventErrorDetails = Static<typeof WorkerLiveEventErrorDetailsSchema>;
//#endregion
//#region packages/gateway-protocol/src/client-info.d.ts
/** Canonical client ids accepted in gateway hello/connect payloads. */
declare const GATEWAY_CLIENT_IDS: {
  readonly WEBCHAT_UI: "webchat-ui";
  readonly CONTROL_UI: "openclaw-control-ui";
  readonly BROWSER_COPILOT: "openclaw-browser-copilot";
  readonly TUI: "openclaw-tui";
  readonly WEBCHAT: "webchat";
  readonly CLI: "cli";
  readonly GATEWAY_CLIENT: "gateway-client";
  readonly MACOS_APP: "openclaw-macos";
  readonly LINUX_APP: "openclaw-linux";
  readonly IOS_APP: "openclaw-ios";
  readonly WATCHOS_APP: "openclaw-watchos";
  readonly ANDROID_APP: "openclaw-android";
  readonly NODE_HOST: "node-host";
  readonly WORKER: "openclaw-worker";
  readonly TEST: "test";
  readonly FINGERPRINT: "fingerprint";
  readonly PROBE: "openclaw-probe";
};
/** Stable gateway client ids used on the wire during hello/connect handshakes. */
type GatewayClientId = (typeof GATEWAY_CLIENT_IDS)[keyof typeof GATEWAY_CLIENT_IDS];
/** Compatibility alias for internal callers that still use "name" terminology. */
type GatewayClientName = GatewayClientId;
/** Coarse modes let policy group clients without matching every product id. */
declare const GATEWAY_CLIENT_MODES: {
  readonly WEBCHAT: "webchat";
  readonly CLI: "cli";
  readonly UI: "ui";
  readonly BACKEND: "backend";
  readonly NODE: "node";
  readonly WORKER: "worker";
  readonly PROBE: "probe";
  readonly TEST: "test";
};
/** Coarse client category used for gateway policy and diagnostics. */
type GatewayClientMode = (typeof GATEWAY_CLIENT_MODES)[keyof typeof GATEWAY_CLIENT_MODES];
/** Client metadata sent during gateway connection setup. */
type GatewayClientInfo = {
  /** Stable product/client identifier from `GATEWAY_CLIENT_IDS`. */
  id: GatewayClientId;
  /** Human-readable label for diagnostics; not used for policy decisions. */
  displayName?: string;
  /** Client app or package version reported by the connecting process. */
  version: string;
  /** Exact immutable artifact identity when the client can report one. */
  buildId?: string;
  /** Runtime platform string, such as `darwin`, `ios`, `android`, or `web`. */
  platform: string;
  /** Optional device family used by native clients for display and routing hints. */
  deviceFamily?: string;
  /** Native hardware/model identifier when available. */
  modelIdentifier?: string;
  /** Self-reported IANA time zone, such as `Europe/Vienna`, for presence display. */
  timeZone?: string;
  /** Coarse category from `GATEWAY_CLIENT_MODES` for policy and diagnostics. */
  mode: GatewayClientMode;
  /** Per-installation or per-process id used to distinguish same-product clients. */
  instanceId?: string;
};
//#endregion
//#region src/chat/message-client-source.d.ts
/** Reported transport facts, separate from authenticated sender identity. */
type MessageClientSource = Pick<GatewayClientInfo, "id" | "mode" | "displayName">;
//#endregion
//#region src/chat/sender-identity.d.ts
type TranscriptSenderIdentity = Extract<SessionParticipantIdentity, {
  type: "profile" | "remote" | "observation";
}>;
//#endregion
//#region src/auto-reply/source-reply-delivery-mode.types.d.ts
/** Per-turn authority for automatic replies versus explicit message-tool sends. */
type SourceReplyDeliveryMode = "automatic" | "message_tool_only";
//#endregion
//#region src/plugin-sdk/channel-route.d.ts
/** Coarse chat shape used when a channel can distinguish direct, group, and broadcast targets. */
type ChannelRouteChatType = "direct" | "group" | "channel";
/** Provider-specific thread kind carried with normalized channel routes. */
type ChannelRouteThreadKind = "topic" | "thread" | "reply";
/** Describes which runtime surface supplied a channel route thread id. */
type ChannelRouteThreadSource = "explicit" | "target" | "session" | "turn";
/** Normalized channel route used for comparison, binding, and dedupe helpers. */
type ChannelRouteRef = {
  /** Lowercase channel id such as `slack`, `telegram`, or `discord`. */
  channel?: string;
  /** Normalized account/profile id when a channel supports multiple accounts. */
  accountId?: string;
  target?: {
    /** Canonical destination id used for route equality and delivery. */
    to: string;
    /** Original destination text when provider target grammar differs from the canonical id. */
    rawTo?: string;
    /** Coarse destination shape used by channels with different direct/group/broadcast rules. */
    chatType?: ChannelRouteChatType;
  };
  thread?: {
    /** Provider thread/topic/root id; strings are preserved when providers use opaque ids. */
    id: string | number;
    /** Provider-specific thread family for channels that distinguish topics, replies, and threads. */
    kind?: ChannelRouteThreadKind;
    /** Runtime source that supplied the thread id, used when callers need route provenance. */
    source?: ChannelRouteThreadSource;
  };
};
/** Loose route input accepted at SDK boundaries before normalization. */
type ChannelRouteRefInput = {
  /** Raw channel id; normalized to lowercase. */
  channel?: unknown;
  /** Raw account/profile id; normalized with account-id rules when string. */
  accountId?: unknown;
  /** Raw destination id before trimming and route-key normalization. */
  to?: unknown;
  /** Provider-specific target text retained when different from `to`. */
  rawTo?: unknown;
  /** Coarse destination shape supplied by channels that distinguish target kinds. */
  chatType?: ChannelRouteChatType;
  /** Raw provider thread/topic/root id before route-key normalization. */
  threadId?: unknown;
  /** Provider-specific thread family carried with the normalized thread id. */
  threadKind?: ChannelRouteThreadKind;
  /** Runtime surface that supplied the thread id. */
  threadSource?: ChannelRouteThreadSource;
};
/** Raw outbound target input shape used by helpers that do not need thread metadata source. */
type ChannelRouteTargetInput = Pick<ChannelRouteRefInput, "channel" | "accountId" | "to" | "rawTo" | "chatType" | "threadId">;
//#endregion
//#region src/utils/delivery-context.types.d.ts
/** Deferred outbound delivery intent attached to a session or task. */
type DeliveryIntentRef = {
  /** Stable queue/work item id. */
  id: string;
  /** Intent family; currently scoped to outbound queue delivery. */
  kind: "outbound_queue";
  /** Whether queueing is mandatory or best-effort for this delivery. */
  queuePolicy?: "required" | "best_effort";
};
/** Canonical channel delivery target shared by sessions, cron, tasks, and plugins. */
type DeliveryContext = Pick<ChannelRouteTargetInput, "accountId" | "channel" | "threadId" | "to"> & {
  /** Channel/plugin id that owns the delivery target. */
  channel?: string;
  /** Channel-local destination id, preserved with channel-specific casing. */
  to?: string;
  /** Optional channel account/workspace id. */
  accountId?: string;
  /** Optional thread/topic id nested under `to`. */
  threadId?: string | number;
  /** Optional queued-delivery intent associated with this context. */
  deliveryIntent?: DeliveryIntentRef;
};
//#endregion
//#region src/config/sessions/restart-recovery-types.d.ts
/** Exact task and requester generation captured by the admitted host completion turn. */
type HarnessCompletionRecovery = {
  taskId: string;
  /** Terminal outcome captured when this completion input was admitted. */
  taskStatus: "succeeded" | "failed";
  taskRunId: string;
  sourceRunId: string;
  requesterSessionKey: string;
  requesterAgentId: string;
  sessionId: string;
  /** Absence is an expected absent revision, not a wildcard. */
  lifecycleRevision?: string;
};
type RestartRecoveryBeforeAgentReplyState = "admitted" | "pending" | "continue" | "handled-silent" | "handled-reply" | "handled-unrecoverable";
type RestartRecoveryTerminalDeliveryEvidenceResult = {
  /** The terminal result was captured even when it contained no visible or delivery evidence. */
  captured?: true;
  payloads?: Array<{
    mediaUrls?: string[];
    visible?: boolean;
  }>;
  payloadsTruncated?: true;
  deliveryStatus?: {
    status: "failed" | "partial_failed" | "sent" | "suppressed";
    resultCount?: number;
    errorMessage?: string;
    payloadOutcomes?: Array<{
      index: number;
      status: "failed" | "sent" | "suppressed";
      sentBeforeError?: boolean;
    }>;
  };
  messagingToolSentTargets?: Array<{
    provider?: string;
    accountId?: string;
    to?: string;
    threadId?: string;
    threadImplicit?: boolean;
    threadSuppressed?: boolean;
    mediaUrls?: string[];
    visible?: boolean;
    /** Explicit false remains progress-only after a restart. */
    sourceReplyFinal?: boolean;
  }>;
  messagingToolSentTargetsTruncated?: true;
  /** Aggregate committed sends were not all represented by route-checkable target records. */
  messagingToolAggregateEvidenceUnaccounted?: true;
  /** The terminal run reported a committed effect that makes fresh replay unsafe. */
  restartUnsafeSideEffectsDetected?: true;
};
type RestartRecoveryTerminalDeliveryEvidence = RestartRecoveryTerminalDeliveryEvidenceResult & {
  runId: string;
  harnessCompletion?: HarnessCompletionRecovery;
  deliveryContext?: DeliveryContext;
  /** Identified queue completion retained before its exact harness task settles. */
  durableFinalReceipt?: {
    intentId: string;
    deliveryId: string;
    platformMessageId: string;
  };
  /** Actual completion run; a resumed run can differ from its queued source. */
  transcriptRunId?: string;
};
/** Durable ownership and idempotency state for gateway restart recovery. */
type SessionRestartRecoveryState = {
  restartRecoveryBeforeAgentReplyState?: RestartRecoveryBeforeAgentReplyState;
  /** Durable pre/post boundary around the terminal external send. */
  restartRecoveryDeliveryReceiptState?: "terminal-pending" | "delivered-terminal";
  /** Exact agent tool call whose terminal external send owns the receipt. */
  restartRecoveryDeliveryToolCallId?: string;
  restartRecoveryDeliveryContext?: DeliveryContext;
  /** Exact host-owned media allowlist for a generated-media recovery run. */
  restartRecoveryDeliveryMediaUrls?: string[];
  /** Keeps the message tool absent while a generated-media recovery run is resumed. */
  restartRecoveryDisableMessageTool?: true;
  /** Suppresses visible text when a recovery attempt repairs only missing media. */
  restartRecoverySuppressTextDelivery?: true;
  restartRecoveryDeliveryRequestFingerprint?: string;
  restartRecoveryDeliveryRunId?: string;
  restartRecoveryDeliverySourceRunId?: string;
  restartRecoveryHarnessCompletion?: HarnessCompletionRecovery;
  restartRecoveryRequesterAccountId?: string;
  restartRecoveryRequesterSenderId?: string;
  restartRecoverySameChannelThreadRequired?: true;
  restartRecoverySourceIngress?: "channel" | "control-ui" | "internal";
  restartRecoverySourceReplyDeliveryMode?: SourceReplyDeliveryMode;
  restartRecoveryTerminalDeliveryEvidence?: RestartRecoveryTerminalDeliveryEvidence[];
  restartRecoveryTerminalRunIds?: string[];
};
//#endregion
//#region src/config/sessions/session-transcript-turn-lifecycle.types.d.ts
/** Authoritative lifecycle snapshot required for an atomic transcript admission. */
type SessionTranscriptTurnExpectedState = {
  /** Rejects a run-owned turn after another admitted run takes writer ownership. */
  expectedWriterRunId?: string;
  abortedLastRun: boolean | undefined;
  /** Fences recovery-only transcript writes against concurrent ownership changes. */
  mainRestartRecoveryCycleId: string | undefined;
  mainRestartRecoveryRevision: number | undefined;
  restartRecoveryBeforeAgentReplyState: SessionRestartRecoveryState["restartRecoveryBeforeAgentReplyState"];
  restartRecoveryDeliveryReceiptState: SessionRestartRecoveryState["restartRecoveryDeliveryReceiptState"];
  restartRecoveryDeliveryToolCallId: SessionRestartRecoveryState["restartRecoveryDeliveryToolCallId"];
  restartRecoveryDeliveryRequestFingerprint: SessionRestartRecoveryState["restartRecoveryDeliveryRequestFingerprint"];
  restartRecoveryDeliveryRunId: SessionRestartRecoveryState["restartRecoveryDeliveryRunId"];
  restartRecoveryDeliverySourceRunId: SessionRestartRecoveryState["restartRecoveryDeliverySourceRunId"];
  restartRecoveryRequesterAccountId: SessionRestartRecoveryState["restartRecoveryRequesterAccountId"];
  restartRecoveryRequesterSenderId: SessionRestartRecoveryState["restartRecoveryRequesterSenderId"];
  restartRecoverySameChannelThreadRequired: SessionRestartRecoveryState["restartRecoverySameChannelThreadRequired"];
  restartRecoverySourceIngress: SessionRestartRecoveryState["restartRecoverySourceIngress"];
  restartRecoverySourceReplyDeliveryMode: SessionRestartRecoveryState["restartRecoverySourceReplyDeliveryMode"];
  restartRecoveryTerminalRunIds: SessionRestartRecoveryState["restartRecoveryTerminalRunIds"];
  status: PersistedSessionRunStatus | undefined;
};
/** Lifecycle fields committed with an accepted transcript turn. */
type SessionTranscriptTurnLifecyclePatch = {
  abortedLastRun?: boolean;
  endedAt?: number;
  lifecycleRunId?: InternalSessionEntry["lifecycleRunId"];
  lastRunId?: InternalSessionEntry["lastRunId"];
  lastRunError?: InternalSessionEntry["lastRunError"];
  pendingFinalDelivery?: InternalSessionEntry["pendingFinalDelivery"];
  mainRestartRecovery?: InternalSessionEntry["mainRestartRecovery"];
  restartRecoveryBeforeAgentReplyState?: SessionRestartRecoveryState["restartRecoveryBeforeAgentReplyState"];
  restartRecoveryDeliveryReceiptState?: SessionRestartRecoveryState["restartRecoveryDeliveryReceiptState"];
  restartRecoveryDeliveryToolCallId?: SessionRestartRecoveryState["restartRecoveryDeliveryToolCallId"];
  restartRecoveryDeliveryContext?: SessionRestartRecoveryState["restartRecoveryDeliveryContext"];
  restartRecoveryDeliveryRequestFingerprint?: SessionRestartRecoveryState["restartRecoveryDeliveryRequestFingerprint"];
  restartRecoveryDeliveryRunId?: SessionRestartRecoveryState["restartRecoveryDeliveryRunId"];
  restartRecoveryDeliverySourceRunId?: SessionRestartRecoveryState["restartRecoveryDeliverySourceRunId"];
  restartRecoveryRequesterAccountId?: SessionRestartRecoveryState["restartRecoveryRequesterAccountId"];
  restartRecoveryRequesterSenderId?: SessionRestartRecoveryState["restartRecoveryRequesterSenderId"];
  restartRecoverySameChannelThreadRequired?: SessionRestartRecoveryState["restartRecoverySameChannelThreadRequired"];
  restartRecoverySourceIngress?: SessionRestartRecoveryState["restartRecoverySourceIngress"];
  restartRecoverySourceReplyDeliveryMode?: SessionRestartRecoveryState["restartRecoverySourceReplyDeliveryMode"];
  restartRecoveryForceSafeTools?: InternalSessionEntry["restartRecoveryForceSafeTools"];
  restartRecoveryRuns?: InternalSessionEntry["restartRecoveryRuns"];
  /** Durable tombstones merged with the fresh row inside the SQLite write transaction. */
  restartRecoveryTerminalRunIds?: SessionRestartRecoveryState["restartRecoveryTerminalRunIds"];
  runtimeMs?: number;
  startedAt?: number;
  status?: PersistedSessionRunStatus;
  updatedAt?: number;
};
//#endregion
//#region src/sessions/user-turn-transcript.types.d.ts
type UserTurnSessionEntry = SessionEntry;
type PersistedUserTurnMediaInput = Pick<MediaFactInput, "contentType" | "durationMs" | "fileName" | "height" | "hydrationSuppressed" | "messageId" | "path" | "sizeBytes" | "transcribed" | "url" | "width"> & {
  kind?: string | null;
  workspaceDir?: string | null;
};
type PersistedUserTurnMessage = Extract<AgentMessage, {
  role: "user";
}> & {
  display?: false;
  excludeFromContext?: true;
  /** Private transcript correlation; never authorizes an execution. */
  idempotencyKey?: string;
  provenance?: InputProvenance;
  __openclaw?: Record<string, unknown> & {
    humanMentions?: readonly HumanMention[];
  };
};
type UserTurnInput = Pick<PersistedUserTurnMessage, "display" | "excludeFromContext"> & {
  text?: string | null;
  /** Explicit human selections bound to UTF-16 offsets in text. */
  mentions?: readonly HumanMention[];
  media?: readonly PersistedUserTurnMediaInput[] | null;
  /** Restart-safe native image placement; model-visible prompt bytes remain separate. */
  mediaImageLayout?: {
    slots: readonly {
      kind: "inline" | "offloaded";
      factIndex?: number;
    }[];
    suppressedFactIndexes?: readonly number[];
  } | null;
  timestamp?: number;
  idempotencyKey?: string;
  /** Durable transcript message reference used to render and hydrate replies. */
  replyToId?: string;
  /** Bounded display fallback for replies whose target is outside loaded history. */
  replyToPreview?: {
    text: string;
    senderLabel?: string | null;
  } | null;
  senderIsOwner?: boolean;
  provenance?: InputProvenance;
  /** Identity is producer-owned attribution; labels remain editable display metadata. */
  sender?: {
    id?: string | null;
    name?: string | null;
    username?: string | null;
    identity?: TranscriptSenderIdentity;
  } | null;
  /** Durable transport correlation; stored privately and never rendered into model input. */
  transport?: {
    /** Reported client sources retained through collection; never sender authority. */
    clients?: readonly MessageClientSource[];
    channel?: string;
    conversationRef?: string;
    messageId?: string;
    replyToId?: string;
    threadId?: string;
  };
};
type UserTurnTranscriptUpdateMode = "inline" | "none";
type UserTurnBeforeMessageWrite = (params: {
  message: PersistedUserTurnMessage;
  agentId?: string;
  sessionKey?: string;
}) => AgentMessage | null;
type UserTurnTranscriptPersistenceTarget = {
  sessionId: string;
  expectedSessionId?: string;
  initialSessionEntry?: SessionEntry;
  sessionKey: string;
  sessionEntry: UserTurnSessionEntry | undefined;
  sessionStore?: Record<string, UserTurnSessionEntry>;
  storePath?: string;
  agentId: string;
  threadId?: string | number;
  cwd?: string;
  config?: unknown;
  beforeMessageWrite?: UserTurnBeforeMessageWrite;
};
type UserTurnTranscriptTarget = UserTurnTranscriptPersistenceTarget;
type UserTurnTranscriptAdmissionReceipt = TranscriptTurnAdmission;
/** Native producer facts for the current host-admitted prompt; never a message replacement. */
type UserTurnTranscriptAnnotation = Readonly<{
  mirrorIdentity: string;
  upstreamUserText: string;
  mirrorOrigin: string;
  mirrorSourceFingerprint: string;
}>;
type UserTurnTranscriptPersistResult = {
  sessionTurnMutationResult?: SessionTranscriptTurnMutationResult;
  /** True only when this call inserted the transcript message. */
  appended?: boolean;
  sessionFile: string;
  sessionEntry: UserTurnSessionEntry | undefined;
  messageId: string;
  message: PersistedUserTurnMessage;
  admission: UserTurnTranscriptAdmissionReceipt;
};
type UserTurnTranscriptTargetResolver = UserTurnTranscriptTarget | (() => UserTurnTranscriptTarget | undefined | Promise<UserTurnTranscriptTarget | undefined>);
type UserTurnTranscriptRecorder = {
  readonly message: PersistedUserTurnMessage | undefined;
  resolveMessage: () => Promise<PersistedUserTurnMessage | undefined>;
  /** Committed input, accepted pending custody, and blocked notices are exempt. */
  assertOriginalInputCommit?: () => void;
  /** Durable input custody leaves the active transcript unchanged until execution owns it. */
  stageApproved?: (options: {
    runId: string;
    assertCurrent: () => void;
    assertAdmittedCurrent?: () => void;
    assertCompletionCurrent?: () => void;
  }) => Promise<boolean>;
  getProcessingCompletion?: () => AgentRunTerminalOutcome | undefined;
  completeProcessing?: (outcome: AgentRunTerminalOutcome) => AgentRunTerminalOutcome | undefined;
  getPendingInputMessage?: () => PersistedUserTurnMessage | undefined;
  isPendingInputConsumed?: () => boolean;
  withPendingInput?: <T>(run: () => T) => T;
  finishPendingInput?: (disposition: "cancelled" | "interrupted") => void;
  /** Replaces generated current-turn text before runtime persistence/provider submission. */
  replaceTextBeforePersistence?: (text: string) => void;
  /** Confirms exact-run steering provenance after transcript commitment is proven. */
  confirmSteerTargetRunIdForPersistence?: (targetRunId: string) => Promise<void>;
  getPersistedMessage?: () => PersistedUserTurnMessage | undefined;
  getAdmissionReceipt: () => UserTurnTranscriptAdmissionReceipt | undefined;
  setAdmissionHandler?: (handler: (admission: UserTurnTranscriptAdmissionReceipt) => void) => void;
  markSentToProvider?: () => void;
  markRuntimePersistencePending: (pending: Promise<void>) => void;
  markRuntimePersisted: (message?: PersistedUserTurnMessage, anchor?: TranscriptEntryAnchor | UserTurnTranscriptAdmissionReceipt, persistence?: {
    appended: boolean;
  }) => void;
  markBlocked: () => void;
  hasPersisted: () => boolean;
  isBlocked: () => boolean;
  hasRuntimePersistencePending: () => boolean;
  waitForRuntimePersistence: () => Promise<void>;
  persistApproved: (params?: {
    target?: UserTurnTranscriptTargetResolver;
    updateMode?: UserTurnTranscriptUpdateMode;
    cwd?: string;
    expectedSessionId?: string;
    expectedSessionState?: SessionTranscriptTurnExpectedState;
    sessionLifecyclePatch?: SessionTranscriptTurnLifecyclePatch;
    /** Allow a later explicit persistence attempt when this attempt appends nothing. */
    retryIfUnpersisted?: boolean;
  }) => Promise<UserTurnTranscriptPersistResult | undefined>;
  persistBlocked: (message: PersistedUserTurnMessage, params?: {
    target?: UserTurnTranscriptTargetResolver;
    updateMode?: UserTurnTranscriptUpdateMode;
    cwd?: string;
  }) => Promise<UserTurnTranscriptPersistResult | undefined>;
  persistFallback: (params?: {
    target?: UserTurnTranscriptTargetResolver;
    updateMode?: UserTurnTranscriptUpdateMode;
    cwd?: string;
  }) => Promise<UserTurnTranscriptPersistResult | undefined>;
};
//#endregion
//#region src/channels/location.d.ts
/** Normalized source kind for channel-provided geographic locations. */
type LocationSource = "pin" | "place" | "live";
/** Channel-neutral location payload passed from plugins into shared prompt rendering. */
type NormalizedLocation = {
  latitude: number;
  longitude: number;
  accuracy?: number;
  name?: string;
  address?: string;
  isLive?: boolean;
  source?: LocationSource;
  caption?: string;
};
/** Portable outbound location fields supported by channel send adapters. */
type OutboundLocation = Pick<NormalizedLocation, "latitude" | "longitude" | "accuracy" | "name" | "address">;
//#endregion
//#region src/infra/command-analysis/explain.d.ts
/** Compact command explanation summary shown in approval UI. */
type CommandExplanationSummary = {
  commandCount: number;
  nestedCommandCount: number;
  riskKinds: string[];
  warningLines: string[];
};
//#endregion
//#region src/infra/exec-approval-policy-snapshot.d.ts
type ExecApprovalPolicyRule = {
  pattern: string;
  argPattern?: string;
  source?: "allow-always";
};
type ExecApprovalPolicySnapshot = {
  security: "deny" | "allowlist" | "full";
  ask: "off" | "on-miss" | "always";
  askFallback: "deny" | "allowlist" | "full";
  autoAllowSkills: boolean;
  allowlistRules: readonly ExecApprovalPolicyRule[];
};
//#endregion
//#region src/infra/exec-approvals-core.d.ts
type ExecHost = "sandbox" | "gateway" | "node";
type ExecTarget = "auto" | ExecHost;
type ExecSecurity = "deny" | "allowlist" | "full";
type ExecAsk = "off" | "on-miss" | "always";
type ExecMode = "deny" | "allowlist" | "ask" | "auto" | "full";
type ExecApprovalDecision = "allow-once" | "allow-always" | "deny";
type ExecApprovalUnavailableDecision = "allow-always";
type SystemRunApprovalBinding = {
  argv: string[];
  cwd: string | null;
  agentId: string | null;
  sessionKey: string | null;
  envHash: string | null;
};
type SystemRunApprovalFileOperand = {
  argvIndex: number;
  path: string;
  sha256: string;
};
type SystemRunApprovalPlan = {
  argv: string[];
  cwd: string | null;
  commandText: string;
  commandPreview?: string | null;
  agentId: string | null;
  sessionKey: string | null;
  policySnapshot?: ExecApprovalPolicySnapshot;
  mutableFileOperand?: SystemRunApprovalFileOperand | null;
};
type ExecApprovalCommandSpan = {
  startIndex: number;
  endIndex: number;
};
/** Cron job identity recorded at approval creation for a cron isolated run. */
type ExecApprovalCronExecutionSource = {
  jobId: string;
  jobConfigRevision: string;
};
type ExecApprovalRequestPayload = {
  command: string;
  commandPreview?: string | null;
  commandArgv?: string[];
  envKeys?: string[];
  systemRunBinding?: SystemRunApprovalBinding | null;
  systemRunPlan?: SystemRunApprovalPlan | null;
  cwd?: string | null;
  nodeId?: string | null;
  host?: string | null;
  security?: string | null;
  ask?: string | null;
  warningText?: string | null;
  /** Owner-declared blast-radius facts; display-only, never authorization. */
  scope?: ApprovalScope$1 | null;
  commandAnalysis?: CommandExplanationSummary | null;
  commandSpans?: ExecApprovalCommandSpan[];
  unavailableDecisions?: readonly ExecApprovalUnavailableDecision[];
  allowedDecisions?: readonly ExecApprovalDecision[];
  agentId?: string | null;
  resolvedPath?: string | null;
  sessionKey?: string | null;
  sessionId?: string | null;
  runId?: string | null;
  toolCallId?: string | null;
  turnSourceChannel?: string | null;
  turnSourceTo?: string | null;
  turnSourceAccountId?: string | null;
  turnSourceThreadId?: string | number | null;
  /** Gateway-recorded cron source; never taken from client request params. */
  cronExecutionSource?: ExecApprovalCronExecutionSource | null;
  /** Exact operation binding prepared at creation for standing-grant minting. */
  cronOperationBinding?: string | null;
};
type ExecApprovalRequest = {
  /** Descriptive wire metadata; readers derive it from the payload when absent. */
  approvalKind?: "exec";
  id: string;
  request: ExecApprovalRequestPayload;
  createdAtMs: number;
  expiresAtMs: number;
};
type ExecApprovalResolved = {
  id: string;
  decision: ExecApprovalDecision;
  resolvedBy?: string | null;
  ts: number;
  request?: ExecApprovalRequest["request"];
};
//#endregion
//#region src/infra/approval-scope.d.ts
type ApprovalScope = Static<typeof ApprovalScopeSchema>;
//#endregion
//#region src/infra/plugin-approvals.d.ts
/** Button/action metadata shown with a plugin approval request. */
type PluginApprovalActionView = {
  kind?: "command" | "decision";
  label: string;
  command: string;
  decision?: ExecApprovalDecision;
  style?: "primary" | "secondary" | "success" | "danger";
};
/** Gateway-minted placement identity; plugin and RPC callers never supply this authority. */
type PluginApprovalPlacementGrantBinding = {
  pluginId: string;
  command: string;
  approvalScope: string;
  agentId: string;
  sessionKey: string;
  sessionId: string;
  nodeId: string;
  pairingGeneration: string;
  environmentId: string;
  ownerEpoch: number;
  placementGeneration: number;
  cwd: string;
};
/** Request payload supplied by plugin approval callers. */
type PluginApprovalRequestPayload = {
  pluginId?: string | null;
  title: string;
  description: string;
  detail?: string | null;
  severity?: "info" | "warning" | "critical" | null;
  /** Owner-declared blast-radius facts; display-only, never authorization. */
  scope?: ApprovalScope | null;
  toolName?: string | null;
  toolCallId?: string | null;
  /** Exact MCP persistence intent; the host separately binds live tool-call proof. */
  mcpTool?: {
    server: string;
    tool: string;
  };
  allowedDecisions?: readonly ExecApprovalDecision[] | null;
  /** Trusted in-process metadata; public Gateway callers cannot submit this field. */
  externalResolution?: {
    label: string;
    decisions?: readonly ("allow-once" | "allow-always")[];
  } | null;
  actions?: readonly PluginApprovalActionView[] | null;
  agentId?: string | null;
  sessionKey?: string | null;
  /** Host-derived source run; never accepted from plugin approval RPC params. */
  runId?: string | null;
  /** Host-derived grant binding; never accepted from plugin approval RPC params. */
  placementGrant?: PluginApprovalPlacementGrantBinding | null;
  turnSourceChannel?: string | null;
  turnSourceTo?: string | null;
  turnSourceAccountId?: string | null;
  turnSourceThreadId?: string | number | null;
};
/** Timed plugin approval request persisted while awaiting a decision. */
type PluginApprovalRequest = {
  /** Descriptive wire metadata; readers derive it from the payload when absent. */
  approvalKind?: "plugin";
  id: string;
  request: PluginApprovalRequestPayload;
  createdAtMs: number;
  expiresAtMs: number;
};
/** Resolved plugin approval decision plus optional request snapshot. */
type PluginApprovalResolved = {
  id: string;
  decision: ExecApprovalDecision;
  resolvedBy?: string | null;
  ts: number;
  request?: PluginApprovalRequestPayload;
};
//#endregion
//#region src/infra/system-agent-approvals.d.ts
type SystemAgentApprovalRequestPayload = {
  title: string;
  description: string;
  command: string;
  proposalHash: string;
  allowedDecisions: readonly ExecApprovalDecision[];
  agentId?: string | null;
  sessionKey?: string | null;
  sessionId: string;
  runId?: string | null;
  turnSourceChannel?: string | null;
  turnSourceTo?: string | null;
  turnSourceAccountId?: string | null;
  turnSourceThreadId?: string | number | null;
};
type SystemAgentApprovalRequest = {
  approvalKind?: "system-agent";
  id: string;
  request: SystemAgentApprovalRequestPayload;
  createdAtMs: number;
  expiresAtMs: number;
};
type SystemAgentApprovalApplicationStatus = "applied" | "not-applied";
type SystemAgentApprovalResolved = {
  id: string;
  decision: ExecApprovalDecision;
  resolvedBy?: string | null;
  ts: number;
  request?: SystemAgentApprovalRequestPayload;
  applicationStatus?: SystemAgentApprovalApplicationStatus;
  terminalStatus?: "expired" | "cancelled";
};
//#endregion
//#region src/infra/approval-types.d.ts
type ChannelApprovalKind = "exec" | "plugin" | "system-agent";
/** Backward-compatible request shape accepted from Gateway events and replay. */
type ApprovalRequestInput = ExecApprovalRequest | PluginApprovalRequest | SystemAgentApprovalRequest;
//#endregion
//#region src/interactive/payload.d.ts
type InteractiveButtonStyle = "primary" | "secondary" | "success" | "danger";
/** Visual tone for a portable message presentation. */
type MessagePresentationTone = "info" | "success" | "warning" | "danger" | "neutral";
type QuestionPresentationAction = {
  /** Resolve one declared choice. */
  type: "question";
  questionId: string;
  optionValue: string;
} | {
  /** Switch this question to its free-text answer path. */
  type: "question";
  questionId: string;
  intent: "custom-input";
};
/** Core-owned model-picker action; channels serialize it only inside private envelopes. */
type ModelPickerAction = ({
  type: "model-picker";
  version: 1;
  snapshotToken: string;
  intent: "show-providers";
  cursor?: string;
} | {
  type: "model-picker";
  version: 1;
  snapshotToken: string;
  intent: "show-models";
  providerToken: string;
  cursor?: string;
} | {
  type: "model-picker";
  version: 1;
  snapshotToken: string;
  intent: "show-recents";
  cursor?: string;
} | {
  type: "model-picker";
  version: 1;
  snapshotToken: string;
  intent: "choose-model";
  providerToken: string;
  modelToken: string;
} | {
  type: "model-picker";
  version: 1;
  snapshotToken: string;
  intent: "choose-runtime";
  providerToken: string;
  modelToken: string;
  runtimeToken: string;
} | {
  type: "model-picker";
  version: 1;
  snapshotToken: string;
  intent: "reset";
} | {
  type: "model-picker";
  version: 1;
  snapshotToken: string;
  intent: "cancel";
}) & {
  /** Legacy command/callback payload fields are deliberately unavailable on picker actions. */
  readonly command?: never;
  readonly value?: never;
};
/** Portable typed action behind a button or select option. */
type MessagePresentationAction = {
  /** Run a core/plugin slash command through the target channel's native command path. */
  type: "command";
  command: string;
} | {
  /** Opaque callback value interpreted by the target channel/plugin. */
  type: "callback";
  value: string;
} | ModelPickerAction | {
  /** Resolve one durable operator approval without exposing transport callback data. */
  type: "approval";
  approvalId: string;
  approvalKind: ChannelApprovalKind;
  decision: "allow-once" | "allow-always" | "deny";
} | QuestionPresentationAction | {
  /** Open a normal external link. */
  type: "url";
  url: string;
} | {
  /** Launch a channel-native web app. */
  type: "web-app";
  /** External web app URL for channels that launch web apps by URL. */
  url: string;
  /** OpenClaw hosted-widget ID whose launch mechanics are owned by the channel. */
  widgetId?: string;
} | {
  /** Launch a channel-native web app. */
  type: "web-app";
  /** External web app URL for channels that launch web apps by URL. */
  url?: string;
  /** OpenClaw hosted-widget ID whose launch mechanics are owned by the channel. */
  widgetId: string;
};
/** Portable action control rendered as a button or link by channel adapters. */
type MessagePresentationButton = {
  /** User-visible button label. */
  label: string;
  /** Typed action sent when the button is pressed. */
  action?: MessagePresentationAction;
  /**
   * Legacy opaque callback value sent when the button is pressed.
   * Prefer action for new presentation controls.
   * @deprecated Use action.
   */
  value?: string;
  /** @deprecated Use an action with type "url". */
  url?: string;
  /** @deprecated Use an action with type "web-app". */
  webApp?: {
    url: string;
  };
  /**
   * @deprecated Use an action with type "web-app". Accepted for legacy JSON payloads only.
   */
  web_app?: {
    url: string;
  };
  /** Higher-priority buttons are kept first when channel limits require truncation. */
  priority?: number;
  /** Disable the button when the target channel supports disabled controls. */
  disabled?: boolean;
  /** Keep this action available after a successful interaction when the target channel supports it. */
  reusable?: boolean;
  /** Optional visual style hint; unsupported channels ignore or normalize it. */
  style?: InteractiveButtonStyle;
};
/** Portable select/menu option. */
type MessagePresentationOption = {
  /** User-visible option label. */
  label: string;
  /** Typed action sent when the option is selected. */
  action?: Extract<MessagePresentationAction, {
    type: "command" | "callback" | "model-picker";
  }>;
  /** @deprecated Use action. */
  value?: string;
};
type LegacyInteractiveReplyOption = MessagePresentationOption;
type LegacyInteractiveReplyTextBlock = {
  type: "text";
  text: string;
};
type LegacyInteractiveReplySelectBlock = {
  type: "select";
  placeholder?: string;
  options: LegacyInteractiveReplyOption[];
};
type LegacyInteractiveReplyBlock = LegacyInteractiveReplyTextBlock | MessagePresentationButtonsBlock | LegacyInteractiveReplySelectBlock;
type LegacyInteractiveReply = {
  blocks: LegacyInteractiveReplyBlock[];
};
/** @deprecated Use MessagePresentation. */
type InteractiveReply = LegacyInteractiveReply;
type MessagePresentationTextBlock = {
  type: "text";
  /** Primary markdown-ish text rendered in the message body. */
  text: string;
};
type MessagePresentationContextBlock = {
  type: "context";
  /** Lower-emphasis contextual text, or normal text on channels without context support. */
  text: string;
};
type MessagePresentationDividerBlock = {
  type: "divider";
};
type MessagePresentationButtonsBlock = {
  type: "buttons";
  /** Button row candidates; core may split or truncate them for channel limits. */
  buttons: MessagePresentationButton[];
};
type MessagePresentationSelectBlock = {
  type: "select";
  /** Optional prompt shown above or inside the select control. */
  placeholder?: string;
  /** Menu options; core may truncate them for channel limits. */
  options: MessagePresentationOption[];
};
type MessagePresentationChartSegment = {
  /** Category label shown in the chart legend. */
  label: string;
  /** Positive segment magnitude. */
  value: number;
};
type MessagePresentationChartSeries = {
  /** Unique series name shown in the chart legend. */
  name: string;
  /** One finite value for each chart category, in category order. */
  values: number[];
};
type MessagePresentationChartBlock = {
  type: "chart";
  chartType: "pie";
  /** Short chart heading. */
  title: string;
  segments: MessagePresentationChartSegment[];
} | {
  type: "chart";
  chartType: "bar" | "area" | "line";
  /** Short chart heading. */
  title: string;
  /** Ordered categories shared by every series. */
  categories: string[];
  series: MessagePresentationChartSeries[];
  xLabel?: string;
  yLabel?: string;
};
/** Scalar cell value supported by portable table presentations. */
type MessagePresentationTableCell = string | number;
/** Portable table rendered natively where supported and linearly elsewhere. */
type MessagePresentationTableBlock = {
  type: "table";
  /** Short table heading used by native renderers and fallback text. */
  caption: string;
  /** Unique ordered column labels shared by every row. */
  headers: string[];
  /** Rows whose width exactly matches the header count. */
  rows: MessagePresentationTableCell[][];
  /** Optional column whose cells should be rendered as row headers. */
  rowHeaderColumnIndex?: number;
};
type MessagePresentationBlock = MessagePresentationTextBlock | MessagePresentationContextBlock | MessagePresentationDividerBlock | MessagePresentationButtonsBlock | MessagePresentationSelectBlock | MessagePresentationChartBlock | MessagePresentationTableBlock;
type MessagePresentation = {
  /** Optional short heading rendered before blocks when the channel supports it. */
  title?: string;
  /** Optional severity/status tone for renderers that support toned presentations. */
  tone?: MessagePresentationTone;
  /** Ordered portable blocks rendered or downgraded by the target channel adapter. */
  blocks: MessagePresentationBlock[];
};
type ReplyPayloadDeliveryPin = {
  enabled: boolean;
  notify?: boolean;
  required?: boolean;
};
type ReplyPayloadDelivery = {
  pin?: boolean | ReplyPayloadDeliveryPin;
};
//#endregion
//#region src/shared/reply-payload.types.d.ts
type ReplyMediaAttachment = {
  type?: "image" | "audio" | "video" | "file";
  path?: string;
  url?: string;
  mediaUrl?: string;
  filePath?: string;
  mimeType?: string;
  name?: string;
  sizeBytes?: number;
  durationMs?: number;
  width?: number;
  height?: number;
  /** Internal per-URL trust carried until mixed media is split for history projection. */
  trustedLocalMedia?: boolean;
};
/** Metadata for audio-only media that supplements already-visible assistant text. */
type ReplyPayloadTtsSupplement = {
  spokenText: string;
  visibleTextAlreadyDelivered?: boolean;
};
/** Channel-agnostic assistant reply payload. */
type ReplyPayload = {
  text?: string;
  /** Visible body a channel adapter may use when native structured content requires text. */
  fallbackText?: {
    text: string;
    /** Batch payload replaced when the adapter adopts this fallback body. */
    replacesPayloadIndex?: number;
  };
  mediaUrl?: string;
  mediaUrls?: string[];
  /** Prepared metadata aligned with mediaUrls for client-facing history projection. */
  attachments?: ReplyMediaAttachment[];
  /** Internal-only trust signal for gateway webchat local media embedding. */
  trustedLocalMedia?: boolean;
  /** Treat media as live-only content and avoid persisting the underlying media reference. */
  sensitiveMedia?: boolean;
  /** Channel-agnostic rich presentation. Core degrades or asks the channel renderer to map it. */
  presentation?: MessagePresentation;
  /** Runtime-authored text is the exact fallback, not additional native presentation content. */
  presentationTextMode?: "fallback";
  /** Channel-agnostic delivery preferences, e.g. pin the sent message when supported. */
  delivery?: ReplyPayloadDelivery;
  /**
   * @deprecated Use presentation.
   *
   * Internal legacy representation used by existing approval/reply helpers during migration.
   */
  interactive?: InteractiveReply;
  btw?: {
    question: string;
  };
  replyToId?: string;
  replyToTag?: boolean;
  /** True when [[reply_to_current]] was present but not yet mapped to a message id. */
  replyToCurrent?: boolean;
  /** Send audio as voice message (bubble) instead of audio file. Defaults to false. */
  audioAsVoice?: boolean;
  /** Send video media as a round video note when the channel supports it. */
  videoAsNote?: boolean;
  /** Channel-neutral geographic location or named place. */
  location?: OutboundLocation;
  /**
   * Text synthesized into an audio-only TTS payload. Exposed to hooks for
   * archival/search use when no visible channel text is sent.
   */
  spokenText?: string;
  /**
   * Marks a TTS media payload as supplemental audio for assistant text that is
   * already visible through streaming or transcript projection.
   */
  ttsSupplement?: ReplyPayloadTtsSupplement;
  isError?: boolean;
  /** Marks this payload as a reasoning/thinking block. Channels that do not
   *  have a dedicated reasoning lane (e.g. WhatsApp, web) should suppress it. */
  isReasoning?: boolean;
  /** Marks pre-tool commentary (💬) — a display lane, suppressed unless the channel opts in. */
  isCommentary?: boolean;
  /** Reasoning stream text is a complete replacement snapshot, not a delta. */
  isReasoningSnapshot?: boolean;
  /** Marks this payload as a compaction status notice (start/end).
   *  Should be excluded from TTS transcript accumulation so compaction
   *  status lines are not synthesised into the spoken assistant reply. */
  isCompactionNotice?: boolean;
  /** Marks this payload as a model-fallback transition/recovery notice. */
  isFallbackNotice?: boolean;
  /** Marks this payload as transient status, not assistant answer content. */
  isStatusNotice?: boolean;
  /** Channel-specific payload data (per-channel envelope). */
  channelData?: Record<string, unknown>;
};
//#endregion
//#region src/auto-reply/reply-payload.d.ts
/** Reply policy facts that provider adapters use to resolve the final transport route. */
type ReplyDeliveryContext = {
  chatType?: "direct" | "group" | "channel" | null;
  replyToMode: ReplyToMode;
};
/** WeakMap-backed metadata attached to payload objects without changing wire shape. */
type SessionWriterDeliveryAuthority = {
  agentId?: string;
  /** Captured admitted completion authority, retained by the durable queue. */
  harnessCompletion?: HarnessCompletionRecovery;
  expectedLifecycleRevision?: string;
  expectedSessionId: string;
  expectedWriterRunId?: string;
  sessionKey: string;
  storePath?: string;
};
//#endregion
//#region src/auto-reply/reply/typing.d.ts
/** Controller for channel typing indicator lifecycle during a reply run. */
type TypingController = {
  onReplyStart: () => Promise<void>;
  startTypingLoop: () => Promise<void>;
  startTypingOnText: (text?: string) => Promise<void>;
  refreshTypingTtl: () => void;
  isActive: () => boolean;
  markRunComplete: () => void;
  markDispatchIdle: () => void;
  cleanup: () => void;
};
//#endregion
//#region src/auto-reply/get-reply-options.types.d.ts
/** A successful runtime append, independent of optional active-path projection anchors. */
type ReplyDispatchAssistantTranscript = Pick<TranscriptEntryAnchor, "agentId" | "sessionId" | "sessionKey" | "storePath"> & {
  messageId: string;
  anchor?: TranscriptEntryAnchor;
  idempotencyKey: string;
};
type ReplyDispatchRun = {
  completionSource: "reply-dispatch";
  getResult: () => {
    assistantTranscript?: ReplyDispatchAssistantTranscript;
    terminalOutcome?: AgentRunTerminalOutcome;
  };
};
type BlockReplyContext = {
  abortSignal?: AbortSignal;
  timeoutMs?: number;
  /** Source assistant message index from the upstream stream, when available. */
  assistantMessageIndex?: number;
  /** @internal Stable durable outbound intent owned by the producing runtime. */
  deliveryIntentId?: string;
};
/** Context passed to onModelSelected callback with actual model used. */
type ModelSelectedContext = {
  provider: string;
  model: string;
  thinkLevel: string | undefined;
};
/** Typing indicator class for channel-owned UX policy. */
type TypingPolicy = "auto" | "user_message" | "system_event" | "internal_webchat" | "heartbeat";
/** Per-turn policy for source-message reply threading. */
type ReplyThreadingPolicy = {
  /** Override implicit reply-to-current behavior for the current turn. */
  implicitCurrentMessage?: "default" | "allow" | "deny";
};
/** Action sink available for model-proposed follow-up tasks during this turn. */
type TaskSuggestionDeliveryMode = "gateway";
/** Correlates queued reply ownership transfer with later delivery drains. */
type QueuedReplyDeliveryCorrelation = {
  begin: () => (() => void) | void;
};
/**
 * Exclusive: each lifecycle is its own collect-admission identity.
 * Cancel-only: share collect identity via ownerKey (gateway chat.send).
 */
type TurnAdoptionAdmission = "exclusive" | "cancel-only";
/**
 * Canonical turn-ownership lifecycle (adopt / defer / abandon / settle).
 * Single surface for durable ingress, gateway cancel identity, and reply-lane transfer.
 */
type TurnAdoptionLifecycle = {
  /**
   * Admission isolation mode (closed). Exclusive isolates collect identity per
   * lifecycle; cancel-only shares via ownerKey. Never inferred from onAbandoned.
   * Durable ingress sets exclusive; gateway cancel identity sets cancel-only.
   */
  admission?: TurnAdoptionAdmission;
  /** Transcript branch leaf from which this turn was admitted. */
  originatingLeafEntryId?: string | null;
  onAdopted: () => void | Promise<void>;
  /** Return false to reject followup enqueue. */
  onDeferred?: () => boolean | void;
  /** Pre-adoption liveness while waiting for reply-lane admission or preflight compaction. */
  onDeferredHeartbeat?: () => void;
  /** Requested cadence for pre-adoption heartbeats. */
  deferredHeartbeatIntervalMs?: number;
  /** Deferred turn finished without owning the reply lane. */
  onAbandoned?: () => void;
  /** Always fires when the followup ownership cycle ends (admitted or not). Gateway cleanup. */
  onSettled?: () => void;
  /** Retires cancellation ownership while retaining live identity. */
  onCancellationRetired?: () => void;
  /** Stable cancellation owner for collect-mode batches. */
  ownerKey?: string;
  abortSignal?: AbortSignal;
  /** Ephemeral fact: a direct local operator turn lost fresh cron authority when queued. */
  cronCreatorAuthorityUnavailable?: "queued-local-operator";
};
/** Partial assistant payload emitted during streaming or replacement updates. */
type PartialReplyPayload = {
  /**
   * Sanitized text, which may be an enumerable memoized getter. Content materializes on first
   * read: direct-delivery consumers pay per partial, while throttled consumers pay per flush.
   */
  text?: ReplyPayload["text"];
  mediaUrls?: ReplyPayload["mediaUrls"];
  delta?: string;
  replace?: true;
};
type ReasoningStreamPayload = Pick<ReplyPayload, "text" | "mediaUrls" | "isReasoning" | "isReasoningSnapshot"> & {
  requiresReasoningProgressOptIn?: boolean;
};
type ReasoningProgressPayload = {
  progressTokens: number;
};
/** Return false until the channel has accepted operator-visible progress. */
type ProgressCallbackResult = boolean | void;
/** Reply generation options shared by auto-reply, webchat, channels, and tests. */
type GetReplyOptions = {
  /** Channel-owned participant name encoding for source replies sent through message actions. */
  groupThreadReplyFormatter?: (text: string, participant: {
    agentId: string;
    name: string;
  }) => string;
  /** Override run id for agent events (defaults to random UUID). */
  runId?: string;
  /** Stable provider prompt-cache affinity key; distinct from run id/idempotency. */
  promptCacheKey?: string;
  /** Abort signal for the underlying agent run. */
  abortSignal?: AbortSignal;
  /** Ephemeral channel owner check for a targeted Stop; never serialized as authority. */
  isCommandTargetCurrent?: () => boolean;
  /** Optional inbound images (used for webchat attachments). */
  images?: ImageContent[];
  /** Original inline/offloaded attachment order for inbound images. */
  imageOrder?: PromptImageOrderEntry[];
  /** Ordered media facts whose model-facing text projection is already present in the prompt. */
  media?: MediaFact[];
  /**
   * Notifies when an agent run starts. Return "reply-dispatch" synchronously to accept
   * completion ownership offered in options; all other legacy callback results are ignored.
   */
  onAgentRunStart?: (runId: string, executionIdentityToken?: ExecutionIdentityAdmissionToken, options?: ReplyDispatchRun) => unknown;
  /** Reports the terminal agent-run classification to the shared dispatch owner. */
  onAgentRunTerminalOutcome?: (outcome: "completed" | "failed") => void;
  /**
   * Canonical adoption lifecycle (adopted / deferred / abandoned / settled + pre-adoption abort).
   */
  turnAdoptionLifecycle?: TurnAdoptionLifecycle;
  /** Shared lifecycle owner for the current user-turn transcript append. */
  userTurnTranscriptRecorder?: UserTurnTranscriptRecorder;
  /** Gateway-owned start-or-steer decision for this turn. */
  messageInjectionDisposition?: "none" | "accepted" | "rejected";
  /** Current user turn is already durable; replay it without appending another copy. */
  suppressNextUserMessagePersistence?: boolean;
  onReplyStart?: () => Promise<void> | void;
  /** Called when the typing controller cleans up (e.g., run ended with NO_REPLY). */
  onTypingCleanup?: () => void;
  onTypingController?: (typing: TypingController) => void;
  /** If false, send only the initial typing signal without periodic keepalive refreshes. */
  typingKeepalive?: boolean;
  isHeartbeat?: boolean;
  /** Policy-level typing control for run classes (user/system/internal/heartbeat). */
  typingPolicy?: TypingPolicy;
  /** Force-disable typing indicators for this run (system/internal/cross-channel routes). */
  suppressTyping?: boolean;
  /** Resolved heartbeat model override (provider/model string from merged per-agent config). */
  heartbeatModelOverride?: string;
  /** One-shot thinking level override for this run; does not persist to the session. */
  thinkingLevelOverride?: string;
  /** One-shot fast-mode override for this run; does not persist to the session. */
  fastModeOverride?: FastMode;
  /** One-shot auto fast-mode cutoff override in seconds; does not persist to the session. */
  fastModeAutoOnSecondsOverride?: number;
  /** Controls bootstrap workspace context injection (default: full). */
  bootstrapContextMode?: "full" | "lightweight";
  /** If true, run the model without OpenClaw tools for this turn. */
  disableTools?: boolean;
  /** Runtime tool allow-list for this turn. Empty means no tools. */
  toolsAllow?: string[];
  /** If true, include the heartbeat response tool for structured heartbeat outcomes. */
  enableHeartbeatTool?: boolean;
  /** If true, keep the heartbeat response tool available even under narrow tool profiles. */
  forceHeartbeatTool?: boolean;
  /**
   * @deprecated Ignored. The tool-failure warning is delivered whenever a run ends
   * without a reply and cannot be suppressed. Kept only so plugin-sdk callers that
   * still pass it keep compiling; removed in the first stable release after 2026.10.
   */
  suppressToolErrorWarnings?: boolean;
  /**
   * If true, dispatch skips default tool/progress text messages and expects the
   * channel to surface progress via its own streaming/edit UX.
   */
  suppressDefaultToolProgressMessages?: boolean;
  /** Suppress standalone tool/progress text even when verbose progress is enabled. */
  suppressToolProgressMessages?: boolean;
  /** Allow channel-owned tool lifecycle feedback while text progress remains hidden. */
  allowToolLifecycleWhenProgressHidden?: boolean;
  /**
   * Called before dispatch with a live getter for whether verbose standalone
   * progress messages are active for this run. Channels that render tool or
   * commentary progress inside an ephemeral streaming draft should yield those
   * draft lines while the getter returns true, so progress is not rendered in
   * both lanes at once.
   */
  onVerboseProgressVisibility?: (isActive: () => boolean) => void;
  /** Preserve source-event callback start order for stateful channel progress renderers. */
  preserveProgressCallbackStartOrder?: boolean;
  onPartialReply?: (payload: PartialReplyPayload) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  onReasoningStream?: (payload: ReasoningStreamPayload) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  onReasoningProgress?: (payload: ReasoningProgressPayload) => Promise<void> | void;
  streamReasoningInNonStreamModes?: boolean;
  /** Called when a thinking/reasoning block ends. */
  onReasoningEnd?: () => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /** Called when a new assistant message starts (e.g., after tool call or thinking block). */
  onAssistantMessageStart?: () => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /** Called synchronously when a block reply is logically emitted, before async
   * delivery drains. Useful for channels that need to rotate preview state at
   * block boundaries without waiting for transport acks. */
  onBlockReplyQueued?: (payload: ReplyPayload, context?: BlockReplyContext) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  onBlockReply?: (payload: ReplyPayload, context?: BlockReplyContext) => Promise<void> | void;
  onToolResult?: (payload: ReplyPayload) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /** Called when a tool phase starts/updates, before summary payloads are emitted. */
  onToolStart?: (payload: {
    itemId?: string;
    toolCallId?: string;
    name?: string;
    phase?: string;
    args?: Record<string, unknown>;
    detailMode?: "explain" | "raw";
  }) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /** Called when a concrete work item starts, updates, or completes. */
  onItemEvent?: (payload: {
    itemId?: string;
    toolCallId?: string;
    kind?: string;
    title?: string;
    name?: string;
    phase?: string;
    status?: string;
    summary?: string;
    progressText?: string;
    meta?: string;
    commandBearing?: boolean;
    approvalId?: string;
    approvalSlug?: string;
    suppressDurableProgress?: true;
  }) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /**
   * Called when the utility-model narration of the in-progress turn changes.
   * Providing this callback opts the channel into progress narration; core
   * only generates narration when a utility model resolves (explicit
   * config or the provider-declared default; utilityModel: "" disables).
   * An empty text clears narration; a retained model preamble still wins before
   * the channel falls back to raw tool progress.
   */
  onNarrationUpdate?: (payload: {
    text: string;
  }) => Promise<void> | void;
  /** Channel-owned final and queued-turn boundaries for the current narrator. */
  onProgressNarratorLifecycle?: (lifecycle: {
    beginTurn: () => void;
    stopTurn: () => void;
  }) => void;
  /** False while utility-model narration has no visible progress draft. */
  isProgressDraftVisible?: () => boolean;
  /**
   * Omit exec/bash command text from narration model input, mirroring the
   * channel's `streaming.progress.commandText: "status"` display policy so
   * narration never receives more command detail than the draft shows.
   */
  narrationHideCommandText?: boolean;
  /** In progress mode, classify Claude pre-tool text; true also renders it as commentary. */
  commentaryProgressEnabled?: boolean;
  /** Bridge typed preambles to a channel-owned progress headline without commentary. */
  progressPreambleEnabled?: boolean;
  /** Deliver durable reasoning payloads to channels that own a separate reasoning lane. */
  reasoningPayloadsEnabled?: boolean;
  /** Deliver durable commentary (💬) payloads to channels that own a separate commentary lane. */
  commentaryPayloadsEnabled?: boolean;
  /** Optional turn-frozen commentary owner; visibility is live by default.
   * With the static opt-in and this callback, core freezes, evaluates once, and snapshots. */
  shouldDeliverCommentaryPayloads?: () => boolean;
  /** Called when the agent emits a structured plan update. */
  onPlanUpdate?: (payload: {
    phase?: string;
    title?: string;
    explanation?: string;
    /** Prepared literal text; unmarked explanations retain authored Markdown. */
    explanationFormat?: "plain";
    steps?: AgentPlanStep[];
    source?: string;
  }) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /** Called when an approval becomes pending or resolves. */
  onApprovalEvent?: (payload: {
    phase?: string;
    kind?: string;
    status?: string;
    title?: string;
    itemId?: string;
    toolCallId?: string;
    approvalId?: string;
    approvalSlug?: string;
    command?: string;
    host?: string;
    reason?: string;
    scope?: "turn" | "session";
    message?: string;
  }) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /** Called when command output streams or completes. */
  onCommandOutput?: (payload: {
    itemId?: string;
    phase?: string;
    title?: string;
    toolCallId?: string;
    name?: string;
    output?: string;
    status?: string;
    exitCode?: number | null;
    durationMs?: number;
    cwd?: string;
  }) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /** Called when a patch completes with a file summary. */
  onPatchSummary?: (payload: {
    itemId?: string;
    phase?: string;
    title?: string;
    toolCallId?: string;
    name?: string;
    added?: string[];
    modified?: string[];
    deleted?: string[];
    summary?: string;
  }) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /** Called when context auto-compaction starts (allows UX feedback during the pause). */
  onCompactionStart?: () => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /** Called when context auto-compaction ends; omitted outcome means completed for legacy callers. */
  onCompactionEnd?: (payload?: {
    completed: boolean;
  }) => Promise<ProgressCallbackResult> | ProgressCallbackResult;
  /** Called when the actual model is selected (including after fallback).
   * Use this to get model/provider/thinkLevel for responsePrefix template interpolation. */
  onModelSelected?: (ctx: ModelSelectedContext) => void;
  /**
   * Controls whether normal assistant replies are automatically delivered to
   * the source conversation. `message_tool_only` prefers message-tool visible
   * delivery and keeps normal final text, block output, and preview output
   * private unless dispatch explicitly marks a source reply as deliverable.
   */
  sourceReplyDeliveryMode?: SourceReplyDeliveryMode;
  /** Enables task-suggestion tools only when the initiating surface can action Gateway events. */
  taskSuggestionDeliveryMode?: TaskSuggestionDeliveryMode;
  /** Starts delivery tracking when this turn later drains as a queued followup. */
  queuedDeliveryCorrelations?: QueuedReplyDeliveryCorrelation[];
  /** Called after a queued followup owns the reply lane, before its model run starts. */
  onQueuedFollowupAdmitted?: () => Promise<void> | void;
  /** Called after an admitted queued followup finishes, including failed attempts. */
  onQueuedFollowupSettled?: () => Promise<void> | void;
  /** Allow channel-owned progress UI while final/source reply delivery remains message-tool-only. */
  allowProgressCallbacksWhenSourceDeliverySuppressed?: boolean;
  /** Called when a suppressed source reply mode observes visible delivery through another path. */
  onObservedReplyDelivery?: () => Promise<void> | void;
  /** Emit tool result summaries for channel-owned progress UI even when verbose is off. */
  forceToolResultProgress?: boolean;
  disableBlockStreaming?: boolean;
  /** Timeout for block reply delivery (ms). */
  blockReplyTimeoutMs?: number;
  /** If provided, only load these skills for this session (empty = no skills). */
  skillFilter?: string[];
  /** Mutable ref to track if a reply was sent (for Slack "first" threading mode). */
  hasRepliedRef?: {
    value: boolean;
  };
  /** Override agent timeout in seconds (0 = no timeout). Threads through to resolveAgentTimeoutMs. */
  timeoutOverrideSeconds?: number;
  /** Millisecond run timeout override; takes precedence over seconds (0 = no timeout). */
  timeoutOverrideMs?: number;
};
//#endregion
//#region src/auto-reply/templating.d.ts
/** Valid message channels for routing. */
type OriginatingChannelType = string & {
  readonly __originatingChannelBrand?: never;
};
type MentionSource = "explicit_bot" | "subteam" | "mention_pattern" | "implicit_thread" | "command_bypass" | "none";
type InboundSourceModality = "text" | "voice" | "audio" | "image" | "video" | "document";
type StickerContextMetadata = {
  cachedDescription?: string;
  emoji?: string;
  setName?: string;
  description?: string;
  fileId?: string;
  fileUniqueId?: string;
  uniqueFileId?: string;
  isAnimated?: boolean;
  isVideo?: boolean;
} & Record<string, unknown>;
type ChannelStructuredContextEntry = {
  label: string;
  source?: string;
  type?: string;
  payload: unknown;
  /** Keeps this provider-owned window independent of bounded canonical transcript enrichment. */
  sessionTranscriptMode?: "preserve";
  /** Internal exact-id hints for canonical transcript/live-cache deduplication. */
  sessionTranscriptDedupeMessageIds?: string[];
  /** Internal visible-text hints for legacy assistant rows without transcript ids. */
  sessionTranscriptAssistantTextDedupeKeys?: string[];
};
type SessionTranscriptContext = {
  chatWindow?: boolean;
  historyLimit: number;
  beforeTimestampMs?: number;
  minTimestampMs?: number;
  senderLabels?: {
    assistant: string;
    user: string;
  };
};
/** @deprecated Use ChannelStructuredContextEntry. Removal: after 2026-09-08 (see sdk-untrusted-context-identifier-aliases). */
type UntrustedStructuredContextEntry = ChannelStructuredContextEntry;
/** Structured supplemental facts projected into prompt context by inbound finalization. */
type SupplementalContextFacts = {
  quote?: {
    id?: string;
    fullId?: string;
    body?: string;
    sender?: string;
    senderAllowed?: boolean;
    isExternal?: boolean;
    isQuote?: boolean;
  };
  forwarded?: {
    from?: string;
    fromType?: string;
    fromId?: string;
    date?: number;
    senderAllowed?: boolean;
  };
  thread?: {
    id?: string;
    starterBody?: string;
    historyBody?: string;
    label?: string;
    parentSessionKey?: string;
    modelParentSessionKey?: string;
    senderAllowed?: boolean;
  };
  channelStructuredContext?: ChannelStructuredContextEntry[];
  /** @deprecated Use channelStructuredContext. Removal: after 2026-09-08 (see sdk-untrusted-context-identifier-aliases). */
  untrustedContext?: ChannelStructuredContextEntry[];
  groupSystemPrompt?: string;
  /** Prompt-like group metadata from user-controlled sources; never enters the system prompt. */
  untrustedGroupSystemPrompt?: string;
};
/** Canonical normalized inbound text populated once by `finalizeInboundContext`. */
type CanonicalInboundText = {
  /** Clean text used for command and directive parsing. */
  commandText: string;
  /** Prompt-facing text used for the agent turn. */
  agentText: string;
  /** Normalized visible/raw inbound text before command-specific projection. */
  rawText: string;
};
/** Raw inbound message context accepted from channels before finalization. */
type MsgContext = Partial<CanonicalInboundText> & {
  Body?: string;
  InboundEventKind?: InboundEventKind;
  /**
   * Agent prompt body (may include envelope/history/context). Prefer this for prompt shaping.
   * Should use real newlines (`\n`), not escaped `\\n`.
   */
  BodyForAgent?: string;
  /**
   * Recent chat history for context (untrusted user content). Prefer passing this
   * as structured context blocks in the user prompt rather than rendering plaintext envelopes.
   */
  InboundHistory?: HistoryEntry[];
  /** Internal facts used to merge canonical transcript turns before dispatch. */
  SessionTranscriptContext?: SessionTranscriptContext;
  /**
   * @deprecated Use CommandBody.
   *
   * Raw message body without structural context (history, sender labels).
   * Legacy alias for CommandBody. Falls back to Body if not set.
   */
  RawBody?: string;
  /**
   * Prefer for command detection; RawBody is treated as legacy alias.
   */
  CommandBody?: string;
  /**
   * Command parsing body. Prefer this over CommandBody/RawBody when set.
   * Should be the "clean" text (no history/sender context).
   */
  BodyForCommands?: string;
  CommandArgs?: CommandArgs;
  From?: string;
  To?: string;
  SessionKey?: string;
  /**
   * Resolved agent scope for canonical session keys that do not encode the agent
   * id, such as selected-agent global sessions.
   */
  AgentId?: string;
  /** Participant mention facts prepared once from the physical inbound message. */
  GroupThread?: GroupThreadMentionFacts;
  /** Effective routed DM scope, including binding overrides. */
  DmScope?: DmScope;
  /**
   * Session-like key used for runtime policy (sandbox/tool policy) when the
   * conversation key intentionally remains broader, such as a main-session DM.
   */
  RuntimePolicySessionKey?: string;
  /** Provider account id (multi-account). */
  AccountId?: string;
  ParentSessionKey?: string;
  /**
   * Session key used only for inheriting session-scoped model/provider
   * overrides. Unlike ParentSessionKey, this must not trigger transcript
   * forking or parent-session lifecycle behavior.
   */
  ModelParentSessionKey?: string;
  MessageSid?: string;
  /** Provider-specific full message id when MessageSid is a shortened alias. */
  MessageSidFull?: string;
  MessageSids?: string[];
  MessageSidFirst?: string;
  MessageSidLast?: string;
  AmbientTranscriptWatermarkKey?: string;
  AmbientTranscriptBody?: string;
  AmbientTranscriptMessageId?: string;
  AmbientTranscriptTimestampMs?: number;
  AmbientTranscriptPreviousMessageId?: string;
  AmbientTranscriptPreviousTimestampMs?: number;
  /** Per-turn reply-threading overrides. */
  ReplyThreading?: ReplyThreadingPolicy;
  /** Effective channel reply mode prepared for this turn. */
  ReplyToMode?: ReplyToMode;
  ReplyToId?: string;
  /**
   * Root message id for thread reconstruction (used by Feishu for root_id).
   * When a message is part of a thread, this is the id of the first message.
   */
  RootMessageId?: string;
  /** Provider-specific full reply-to id when ReplyToId is a shortened alias. */
  ReplyToIdFull?: string;
  ReplyToBody?: string;
  ReplyToQuoteText?: string;
  ReplyToSender?: string;
  ReplyChain?: Array<{
    messageId?: string;
    threadId?: string;
    sender?: string;
    senderId?: string;
    senderUsername?: string;
    timestamp?: number;
    body?: string;
    isQuote?: boolean;
    mediaType?: string;
    mediaPath?: string;
    mediaRef?: string;
    replyToId?: string;
    forwardedFrom?: string;
    forwardedFromId?: string;
    forwardedFromUsername?: string;
    forwardedDate?: number;
  }>;
  ReplyToIsQuote?: boolean;
  /** Forward origin from the reply target (when reply_to_message is a forwarded message). */
  ReplyToForwardedFrom?: string;
  ReplyToForwardedFromType?: string;
  ReplyToForwardedFromId?: string;
  ReplyToForwardedFromUsername?: string;
  ReplyToForwardedFromTitle?: string;
  ReplyToForwardedDate?: number;
  ForwardedFrom?: string;
  ForwardedFromType?: string;
  ForwardedFromId?: string;
  ForwardedFromUsername?: string;
  ForwardedFromTitle?: string;
  ForwardedFromSignature?: string;
  ForwardedFromChatType?: string;
  ForwardedFromMessageId?: number;
  ForwardedDate?: number;
  ThreadStarterBody?: string;
  /** Full thread history when starting a new thread session. */
  ThreadHistoryBody?: string;
  IsFirstThreadTurn?: boolean;
  ThreadLabel?: string;
  /** @deprecated Use `media?.[0]?.path`. */
  MediaPath?: string;
  /** @deprecated Use `media?.[0]?.url`. */
  MediaUrl?: string;
  /** @deprecated Use `media?.[0]?.contentType` or `.kind`. */
  MediaType?: string;
  /** @deprecated Derive the directory from `media?.[0]?.path` at the consuming boundary. */
  MediaDir?: string;
  /** @deprecated Use `media?.map((entry) => entry.path)`. */
  MediaPaths?: string[];
  /** @deprecated Use `media?.map((entry) => entry.url)`. */
  MediaUrls?: string[];
  /** @deprecated Use `media?.map((entry) => entry.contentType ?? entry.kind)`. */
  MediaTypes?: string[];
  /** Ordered current-turn media facts; array position is attachment identity. */
  media?: MediaFact[];
  /** Original message modality before transcription or other media normalization. */
  SourceModality?: InboundSourceModality;
  /** @deprecated Use each media fact's `workspaceDir`. */
  MediaWorkspaceDir?: string;
  /** Attachment indexes whose audio was already transcribed before media understanding runs. */
  /** @deprecated Use each media fact's `transcribed` field. */
  MediaTranscribedIndexes?: number[];
  /**
   * Marker: skip downstream stageSandboxMedia. chat.send RPC sets this so
   * staging runs synchronously before respond() and surfaces 5xx to the
   * client; any later failure only reaches the broadcast channel.
   */
  /** @deprecated Use each media fact's `workspaceDir` or `staged` proof. */
  MediaStaged?: boolean;
  /** Telegram sticker metadata (emoji, set name, file IDs, cached description). */
  Sticker?: StickerContextMetadata;
  /** True when current-turn sticker media is present in structured facts. */
  StickerMediaIncluded?: boolean;
  /** Skip automatic understanding for the current sticker because its cached description is used. */
  SkipStickerMediaUnderstanding?: boolean;
  OutputDir?: string;
  OutputBase?: string;
  /** Remote host for SCP when media lives on a different machine (e.g., openclaw@192.168.64.3). */
  MediaRemoteHost?: string;
  Transcript?: string;
  MediaUnderstanding?: MediaUnderstandingOutput[];
  MediaUnderstandingDecisions?: MediaUnderstandingDecision[];
  LinkUnderstanding?: string[];
  Prompt?: string;
  MaxChars?: number;
  ChatType?: string;
  /** Trusted channel-configured policy for this admitted conversation turn. */
  ConversationToolPolicy?: GroupToolPolicyConfig;
  /** Human label for envelope headers (conversation label, not sender). */
  ConversationLabel?: string;
  GroupSubject?: string;
  /** Human label for channel-like group conversations (e.g. #general, #support). */
  GroupChannel?: string;
  GroupSpace?: string;
  /** Trusted provider role ids for the sender in this group turn. */
  MemberRoleIds?: string[];
  GroupMembers?: string;
  GroupSystemPrompt?: string;
  /**
   * Canonical inbound supplemental facts for new channel code. `finalizeInboundContext`
   * projects these to the existing flat reply/forward/thread/group prompt fields.
   */
  SupplementalContext?: SupplementalContextFacts;
  /** Channel-provided metadata that must not be treated as system instructions. */
  ChannelPromptContext?: string[];
  /** @deprecated Use ChannelPromptContext. Removal: after 2026-09-08 (see sdk-untrusted-context-identifier-aliases). */
  UntrustedContext?: string[];
  /** Structured channel metadata rendered by prompt assembly as fenced JSON. */
  ChannelStructuredContext?: ChannelStructuredContextEntry[];
  /** @deprecated Use ChannelStructuredContext. Removal: after 2026-09-08 (see sdk-untrusted-context-identifier-aliases). */
  UntrustedStructuredContext?: UntrustedStructuredContextEntry[];
  /** System-attached provenance for the current inbound message. */
  InputProvenance?: InputProvenance;
  /** Internal wake cause, independent of transport, transcript provenance, and execution authority. */
  InternalTurnSource?: "heartbeat" | "cron" | "exec";
  /** Explicit owner allowlist overrides (trusted, configuration-derived). */
  OwnerAllowFrom?: Array<string | number>;
  SenderName?: string;
  SenderId?: string;
  /** Trusted in-process creation provenance; never populated from channel payloads. */
  SessionCreation?: {
    skillLibrarySelections?: SkillLibrarySelection[];
    via: SessionCreatedVia;
    actor?: SessionCreatedActor;
    sandbox?: "required";
  };
  SenderUsername?: string;
  SenderTag?: string;
  SenderE164?: string;
  SenderIsBot?: boolean;
  /** Channel-ingress fact: sender is the operator's own account (from-me). */
  SenderIsSelf?: boolean;
  Timestamp?: number;
  LocationLat?: number;
  LocationLon?: number;
  LocationAccuracy?: number;
  LocationName?: string;
  LocationAddress?: string;
  LocationSource?: string;
  LocationIsLive?: boolean;
  LocationLivePeriodSeconds?: number;
  LocationCaption?: string;
  /** Stable identity of the provider update that carried this message. */
  ProviderUpdateId?: string;
  /** Provider update kind, for example `message` or `edited_message`. */
  ProviderUpdateKind?: string;
  /** Provider-native timestamp for the original message. */
  ProviderMessageTimestamp?: number;
  /** Provider-native timestamp for an edited message update. */
  ProviderEditTimestamp?: number;
  /** Provider label. */
  Provider?: string;
  /** Provider surface label. Prefer this over `Provider` when available. */
  Surface?: string;
  /** Platform bot username when command mentions should be normalized. */
  BotUsername?: string;
  WasMentioned?: boolean;
  /** Effective channel-owned mention policy before any plugin-binding bypass. */
  GroupRequireMention?: boolean;
  /** True when this turn explicitly mentioned the current bot target. */
  ExplicitlyMentionedBot?: boolean;
  /** Provider-native explicit user mention ids present on this turn. */
  MentionedUserIds?: string[];
  /** Provider-native explicit user-group/subteam mention ids present on this turn. */
  MentionedSubteamIds?: string[];
  /** Provider-native implicit mention wake reasons present on this turn. */
  ImplicitMentionKinds?: string[];
  /** Provider-native source that caused the current mention decision. */
  MentionSource?: MentionSource;
  CommandAuthorized?: boolean;
  CommandTurn?: CommandTurnContext;
  CommandSource?: "text" | "native";
  CommandInterpretationSuppressed?: boolean;
  CommandTargetSessionKey?: string;
  /**
   * Internal flag: command handling prepared trailing prompt text for ACP dispatch.
   * Used for `/new <prompt>` and `/reset <prompt>` on ACP-bound sessions.
   */
  AcpDispatchTailAfterReset?: boolean;
  /** Gateway client scopes when the message originates from the gateway. */
  GatewayClientScopes?: string[];
  /** Gateway client capabilities when the message originates from the gateway. */
  GatewayClientCaps?: string[];
  /** Server-bound requesting browser; never sourced from message text or rendered into prompts. */
  GatewayUiCommandTarget?: GatewayUiCommandTarget;
  /** Run-scoped plugin tool bindings; never rendered into prompt text. */
  GatewayRunToolBindings?: Readonly<Record<string, unknown>>;
  /** Gateway device id allowed to review approvals initiated by this turn. */
  ApprovalReviewerDeviceId?: string;
  /** Thread identifier (Telegram topic id or Matrix thread event id). */
  MessageThreadId?: string | number;
  /** Provider-native thread target for reply delivery without making the session thread-scoped. */
  TransportThreadId?: string | number;
  /** Platform-native channel/conversation id (e.g. Slack DM channel "D…" id). */
  NativeChannelId?: string;
  /** Channel-owned local conversation image reference; never rendered into prompt text. */
  ConversationAvatar?: string;
  /** Channel-owned metadata exposed to plugin hook context, not prompt text. */
  ChannelContext?: PluginHookChannelContext;
  /** Provider-native chat/conversation id used by channel plugins that expose `chat_id`. */
  ChatId?: string;
  /** Stable provider-native direct-peer id when a DM room/user mapping must survive later writes. */
  NativeDirectUserId?: string;
  /** Telegram forum supergroup marker. */
  IsForum?: boolean;
  /** Human-readable Telegram forum topic name (cached from service messages). */
  TopicName?: string;
  /** Warning: DM has topics enabled but this message is not in a topic. */
  TopicRequiredButMissing?: boolean;
  /**
   * Originating channel for reply routing.
   * When set, replies should be routed back to this provider
   * instead of using lastChannel from the session.
   */
  OriginatingChannel?: OriginatingChannelType;
  /**
   * Originating destination for reply routing.
   * The chat/channel/user ID where the reply should be sent.
   */
  OriginatingTo?: string;
  /**
   * True when the current turn intentionally requested external delivery to
   * OriginatingChannel/OriginatingTo, rather than inheriting stale session route metadata.
   */
  ExplicitDeliverRoute?: boolean;
  /**
   * Internal proof that the channel ingress owner admitted this sender/event.
   * Correlation interceptors must fail closed when this proof is absent.
   */
  InboundAccessAuthorized?: boolean;
  /** Internal marker that channel ingress authoritatively observed route-context facts. */
  ConversationRouteContextObserved?: boolean;
  /** Canonical peer used by route selection; delivery targets may use a different namespace. */
  ConversationRoutePeerId?: string;
  /**
   * Internal flag for channels that emit message_received through a channel-specific
   * privacy gate before entering the shared reply dispatcher.
   */
  SuppressMessageReceivedHooks?: boolean;
  /**
   * Provider-specific parent conversation id for threaded contexts.
   * For Discord threads, this is the parent channel id.
   */
  ThreadParentId?: string;
  /**
   * Messages from hooks to be included in the response.
   * Used for hook confirmation messages like "Session context saved to memory".
   */
  HookMessages?: string[];
};
type FinalizedMsgContext = Omit<MsgContext, "CommandAuthorized"> & {
  /**
   * Always set by finalizeInboundContext().
   * Default-deny: missing/undefined becomes false.
   */
  CommandAuthorized: boolean;
  /**
   * Populated by finalizeInboundContext(); optional for public SDK
   * compatibility with existing plugin-constructed finalized contexts.
   */
  CommandTurn?: CommandTurnContext;
};
type RuntimeMediaContextKey = "MediaPath" | "MediaUrl" | "MediaType" | "MediaDir" | "MediaPaths" | "MediaUrls" | "MediaTypes" | "MediaWorkspaceDir" | "MediaTranscribedIndexes" | "MediaStaged";
/** Internal inbound context; legacy media fields exist only on the shipped SDK adapter. */
type RuntimeMsgContext = Omit<MsgContext, RuntimeMediaContextKey>;
type FinalizedRuntimeMsgContext = Omit<RuntimeMsgContext, "CommandAuthorized" | keyof CanonicalInboundText> & CanonicalInboundText & {
  CommandAuthorized: boolean;
  CommandTurn?: CommandTurnContext;
};
type NonTemplateContextKey = "ConversationAvatar";
type TemplateContext = Omit<RuntimeMsgContext, NonTemplateContextKey> & {
  BodyStripped?: string;
  SessionId?: string;
  IsNewSession?: string;
  /** Local path for the attachment currently being processed. */
  AttachmentPath?: string;
  /** Original URL/reference for the attachment currently being processed. */
  AttachmentUrl?: string;
  /** MIME content type for the attachment currently being processed. */
  AttachmentContentType?: string;
  /** Directory containing AttachmentPath. */
  AttachmentDir?: string;
  /** Stable zero-based source fact index for the attachment currently being processed. */
  AttachmentIndex?: number;
  /** @deprecated Use AttachmentPath. */
  MediaPath?: string;
  /** @deprecated Use AttachmentUrl. */
  MediaUrl?: string;
  /** @deprecated Use AttachmentContentType. */
  MediaType?: string;
  /** @deprecated Use AttachmentDir. */
  MediaDir?: string;
};
//#endregion
//#region src/config/sessions/store-maintenance.d.ts
type ResolvedSessionMaintenanceConfig = {
  mode: SessionMaintenanceMode;
  pruneAfterMs: number;
  archiveDashboardAfterMs: number | null;
  maxEntries: number;
  modelRunPruneAfterMs: number;
  preserveRecentMs?: number | null;
  resetArchiveRetentionMs: number | null;
  maxDiskBytes: number | null;
  highWaterBytes: number | null;
};
type ResolvedSessionMaintenanceConfigInput = Omit<ResolvedSessionMaintenanceConfig, "archiveDashboardAfterMs" | "modelRunPruneAfterMs"> & Partial<Pick<ResolvedSessionMaintenanceConfig, "archiveDashboardAfterMs" | "modelRunPruneAfterMs">>;
//#endregion
//#region src/config/sessions/session-accessor.types.d.ts
/** Raw transcript record for non-message events; message records use appendTranscriptMessage. */
type TranscriptEvent = unknown;
interface SessionTranscriptRuntimeTarget {
  agentId: string;
  sessionId: string;
  sessionKey: string;
  storePath: string;
}
//#endregion
//#region src/config/sessions/cli-history-boundary.d.ts
/** Private proof of the account that owns every covered transcript event. */
type CliHistoryBoundary = {
  version: 1;
  sessionId: string;
  state: "unknown";
} | {
  version: 1;
  sessionId: string;
  state: "known";
  authFingerprint: string;
  generation: string | null;
  maxSeq: number | null;
  writerRunId: string;
};
//#endregion
//#region src/config/sessions/session-diff-baseline-capture.d.ts
type SessionDiffBaselineCapture = {
  version: 1;
  captureId: string;
  status: "pending" | "unavailable";
};
//#endregion
//#region packages/acp-core/src/types.d.ts
type SessionAcpIdentitySource = "ensure" | "status" | "event";
type SessionAcpIdentityState = "pending" | "resolved";
type SessionAcpIdentity = {
  /** Pending identities may expose provisional ids; resolved identities are safe for resume output. */
  state: SessionAcpIdentityState;
  acpxRecordId?: string;
  acpxSessionId?: string;
  agentSessionId?: string;
  /** Runtime lifecycle point that last supplied the identity fields. */
  source: SessionAcpIdentitySource;
  lastUpdatedAt: number;
};
type AcpSessionRuntimeOptions = {
  /**
   * ACP runtime mode set via session/set_mode (for example: "plan", "normal", "auto").
   */
  runtimeMode?: string;
  /** ACP runtime config option: model id. */
  model?: string;
  /** ACP runtime config option: thinking/reasoning effort. */
  thinking?: string;
  /** Working directory override for ACP session turns. */
  cwd?: string;
  /** ACP runtime config option: permission profile id. */
  permissionProfile?: string;
  /** ACP runtime config option: per-turn timeout in seconds. */
  timeoutSeconds?: number;
  /** Backend-specific option bag mapped through session/set_config_option. */
  backendExtras?: Record<string, string>;
};
type SessionAcpMeta = {
  backend: string;
  agent: string;
  runtimeSessionName: string;
  /** Canonical backend/agent ids used for resume hints and thread/status details. */
  identity?: SessionAcpIdentity;
  mode: "persistent" | "oneshot";
  runtimeOptions?: AcpSessionRuntimeOptions;
  cwd?: string;
  state: "idle" | "running" | "error";
  lastActivityAt: number;
  lastError?: string;
};
//#endregion
//#region src/cron/scheduled-tool-policy.d.ts
/** Closed, server-authored origin of an account-scoped scheduled tool cap. */
type CronScheduledToolCallerOrigin = {
  kind: "external";
  channel: string;
} | {
  kind: "local";
} | {
  kind: "unknown";
};
/**
 * Restrict-only execution target for a job's exec grant, captured from a
 * creator surface whose only exec capability was host-pinned. New pinned jobs
 * persist this as part of a grant-coupled envelope; unmarked legacy jobs keep
 * baseline exec behavior.
 */
type CronToolsAllowExecTarget = {
  version: 1;
  host: "gateway";
  /** Mandatory approval floor inherited from the captured creator surface. */
  ask?: "always";
};
/** Persisted proof that this job was created with an exact exec restriction. */
type CronToolsAllowExecTargetRequirement = {
  version: 1;
  target: CronToolsAllowExecTarget;
  grantIndex: number;
  recoveryRequired?: never;
} | {
  version: 1;
  target?: never;
  recoveryRequired: true;
};
/** Server-authored provenance for a persisted scheduled tool-cap authority envelope. */
type CronScheduledToolPolicy = {
  version: 1;
  mode: "trusted";
  ownerSessionKey?: never;
  ownerAccountId?: never;
} | {
  version: 1;
  mode: "account";
  ownerSessionKey: string;
  ownerAccountId: string;
};
//#endregion
//#region src/shared/session-types.d.ts
/** Per-session Control UI face preference carried by session list rows. */
type SessionBoardFace = "chat" | "dashboard";
//#endregion
//#region src/config/sessions/main-session-recovery.types.d.ts
type MainRestartRecoveryState = {
  /** Stable identity for one interrupted episode; prevents clear-and-rewedge ABA matches. */
  cycleId: string;
  /** Monotonic identity for observations within the current recovery cycle. */
  revision: number;
  /** Attempts charged when their reservation is persisted, before dispatch. */
  chargedAttempts: number;
  /** Last attempt observed starting a backend turn; later startup failures get a fresh budget. */
  startedAttempt?: number;
  /** Private safe token for one recovered outer turn; raw identity refs never enter session state. */
  executionIdentity?: {
    tokenVersion: 1;
    contextId: string;
    executionId: string;
    runId: string;
    createdAt: number;
  };
  reservation?: {
    runId: string;
    attempt: number;
    lifecycleGeneration: string;
  };
  foregroundClaims?: {
    lifecycleGeneration: string;
    tokens: string[];
    /** Run identity for claims that have crossed the actual agent-run boundary. */
    runIdsByClaimId?: Record<string, string>;
  };
  tombstone?: {
    reason: string;
    /** Durable successor returned when an explicit rollover request is retried. */
    recoveredSessionId?: string;
    recoveredSessionKey?: string;
  };
};
//#endregion
//#region src/config/sessions/pending-final-delivery-types.d.ts
type PendingFinalDeliveryState = {
  createdAt: number;
  context?: DeliveryContext;
  intentId?: string;
  deliveries?: Array<{
    id: string;
    state: "prepared" | "queued" | "delivered" | "suppressed" | "unknown";
  }>;
} & ({
  kind: "replayable";
  text: string;
} | {
  kind: "transport-only";
});
/**
 * Owed user-visible notice that a final's delivery outcome stayed unknown.
 * Settled unknown custody records the debt here; the next same-route turn
 * sends it once, so an ambiguous loss never ends silently.
 */
type PendingDeliveryNoticeState = {
  createdAt: number;
  context: DeliveryContext;
  intentId: string;
  state: "owed" | "unresolved" | "acknowledged";
};
//#endregion
//#region src/config/sessions/session-model-fallback.d.ts
type AgentPatchedSessionModelFallback = {
  prevModel: string;
  prevProvider: string;
  prevModelOverride?: string;
  prevProviderOverride?: string;
  prevModelOverrideSource?: "auto" | "user" | "default";
  prevModelOverrideRouteResolution?: "resolved";
  prevModelOverrideFallbackOriginProvider?: string;
  prevModelOverrideFallbackOriginModel?: string;
  prevAuthProfileOverride?: string;
  prevAuthProfileOverrideSource?: "auto" | "user" | "user-link";
  prevAuthProfileOverrideCompactionCount?: number;
  prevContextWindow?: string;
  prevThinkingLevel?: string;
  lastValidatedPatchTs?: number;
  ts: number;
  source: "agent-patch";
};
//#endregion
//#region src/agents/sessions/source-info.d.ts
/**
 * Source metadata helpers for session resources.
 *
 * Tracks where prompts, skills, and extension-provided assets came from for diagnostics and UI.
 */
type SourceScope = "user" | "project" | "temporary";
type SourceOrigin = "package" | "top-level";
interface PathMetadata {
  source: string;
  scope: SourceScope;
  origin: SourceOrigin;
  baseDir?: string;
}
interface SourceInfo extends PathMetadata {
  path: string;
}
//#endregion
//#region src/skills/loading/skill-contract.d.ts
interface Skill {
  name: string;
  /** Human-readable title from the first Markdown H1, falling back to the identifier. */
  displayName?: string;
  description: string;
  /** Additional loading guidance rendered with the location in full and compact catalogs. */
  locationNote?: string;
  /** Prepared instructions for transferred bundles or non-filesystem locators such as node://. */
  readContent?: string;
  /** Prepared runtime identity of instruction bytes, or the complete delivered bundle tree. */
  contentHash?: string;
  filePath: string;
  baseDir: string;
  /** @deprecated Ignored; retained for API compatibility until the next Plugin SDK major. */
  promptVersion?: string;
  sourceInfo: SourceInfo;
  disableModelInvocation: boolean;
  source: string;
}
//#endregion
//#region src/config/sessions/session-prompt-types.d.ts
type SessionSkillPromptRef = {
  version: 1;
  algorithm: "sha256";
  hash: string;
  bytes: number;
};
type SessionSkillSnapshot = {
  librarySelections?: SkillLibrarySelection[];
  prompt: string;
  /** Persisted stores may replace large duplicate prompts with a content-addressed blob ref. */
  promptRef?: SessionSkillPromptRef;
  skills: Array<{
    name: string;
    primaryEnv?: string;
    requiredEnv?: string[];
  }>;
  /** Normalized agent-level filter used to build this snapshot; undefined means unrestricted. */
  skillFilter?: string[];
  /** Effective node-exec eligibility used to select connected node-hosted skills. */
  nodeSkillsEligibility?: {
    canExec: boolean;
    node?: string;
  };
  /**
   * Runtime-only, never persisted. Carries the full parsed Skill[] (including
   * each SKILL.md body) so the embedded runner can skip a workspace skill
   * scan within a turn. Persistence projections strip it before committing
   * session state. On a cold session resume this is undefined and
   * src/skills/runtime/embedded-run-entries.ts rebuilds it from disk.
   */
  resolvedSkills?: Skill[];
  version?: number;
};
//#endregion
//#region src/config/sessions/session-system-prompt-report.d.ts
/** Persisted size and provenance summary for one assembled system prompt. */
type SessionSystemPromptReport = {
  source: "run" | "estimate";
  generatedAt: number;
  sessionId?: string;
  sessionKey?: string;
  provider?: string;
  model?: string;
  workspaceDir?: string;
  bootstrapMaxChars?: number;
  bootstrapTotalMaxChars?: number;
  bootstrapTruncation?: {
    warningMode?: "off" | "once" | "always";
    warningShown?: boolean;
    promptWarningSignature?: string;
    warningSignaturesSeen?: string[];
    truncatedFiles?: number;
    nearLimitFiles?: number;
    totalNearLimit?: boolean;
  };
  sandbox?: {
    mode?: string;
    sandboxed?: boolean;
  };
  systemPrompt: {
    chars: number;
    projectContextChars: number;
    nonProjectContextChars: number;
    hash?: string;
  };
  currentTurn?: {
    kind?: "user_request" | "room_event";
    promptChars: number;
    runtimeContextChars: number;
    modelOnlyPromptChars?: number;
  };
  injectedWorkspaceFiles: Array<{
    name: string;
    path: string;
    missing: boolean;
    rawChars: number;
  } & ({
    injectionStatus?: "verified";
    injectedChars: number;
    truncated: boolean;
  } | {
    injectionStatus: "native_unverified";
    injectedChars: null;
    truncated: null;
  })>;
  skills: {
    promptChars: number;
    hash?: string;
    entries: Array<{
      name: string;
      blockChars: number;
    }>;
  };
  tools: {
    listChars: number;
    schemaChars: number;
    entries: Array<{
      name: string;
      summaryChars: number;
      summaryHash?: string;
      schemaChars: number;
      schemaHash?: string;
      propertiesCount?: number | null;
    }>;
  };
};
//#endregion
//#region src/config/sessions/session-tool-overrides.d.ts
type SessionToolOverrides = {
  mcpServers?: Record<string, boolean>;
  mcpToolsDeny?: Record<string, string[]>;
  skills?: Record<string, boolean>;
  webSearch?: boolean;
};
//#endregion
//#region src/config/sessions/types.d.ts
type SessionChatType = ChatType;
type PersistedSessionRunStatus = SessionRunStatus | "interrupted";
declare const SESSION_TOTAL_TOKENS_VERSION: 1;
type SessionVisibility = "shared" | "read-only" | "suggest" | "draft";
type SessionOrigin = {
  label?: string;
  provider?: string;
  surface?: string;
  chatType?: SessionChatType;
  from?: string;
  to?: string;
  nativeChannelId?: string;
  nativeDirectUserId?: string;
  avatar?: string;
  accountId?: string;
  threadId?: string | number;
};
/** Canonical persisted delivery ownership for one session. */
type SessionDeliveryState = {
  kind: "none";
} | {
  kind: "internal";
} | {
  kind: "external";
  route: ChannelRouteRef;
  context: DeliveryContext;
  origin: SessionOrigin;
};
/**
 * Durable transcript-repair record: an assistant final that was delivered to
 * the user but could not be appended to the canonical transcript. Kept
 * separate from `pendingFinalDelivery` so transport-replay cleanup never drops
 * the only copy of the missing assistant turn.
 */
type PendingTranscriptRepairState = {
  /** Stable identity for retry-safe transcript insertion. */
  id: string;
  text: string;
  provider?: string;
  model?: string;
  createdAt: number;
};
type FallbackNoticeState = {
  kind: "active";
  selectedModel: string;
  activeModel: string;
  reason?: string;
};
type MemoryFlushState = {
  kind: "succeeded";
  compactionCount: number;
} | {
  kind: "failed";
  compactionCount?: number;
  failureCount: number;
};
type CliSessionReseedReceipt = {
  version: 1;
  promptHash: string;
  localSessionId: string;
  userTurnDisposition: "persisted" | "omitted";
};
type SessionDiffBaseline = {
  version: 1;
  sessionId: string;
  root: string;
  files: Array<{
    path: string;
    fingerprint: string;
  }>;
  /** Some checkout entries could not be fingerprinted without exceeding diff safety caps. */
  truncated?: true;
};
type CliSessionBinding = {
  sessionId: string;
  /** Last successful assistant boundary accepted by the backend's resume contract. */
  resumeCheckpointId?: string;
  /** Resume with the backend's fork argument once, then clear before process start. */
  forkNextResume?: true;
  /** Trust an explicitly attached CLI session even when auth, prompt, or MCP fingerprints drift. */
  forceReuse?: boolean;
  authProfileId?: string;
  authEpoch?: string;
  authEpochVersion?: number;
  extraSystemPromptHash?: string;
  messageToolPolicyHash?: string;
  promptToolNamesHash?: string;
  cwdHash?: string;
  mcpConfigHash?: string;
  mcpResumeHash?: string;
  /** Identifies one synthetic history prompt and the trusted local handling of its user turn. */
  reseedReceipt?: CliSessionReseedReceipt;
};
type AcpSessionBinding = {
  acpBackendId: string;
  acpAgentId: string;
  agentSessionId: string;
};
type SessionCompactionCheckpointReason = "manual" | "auto-threshold" | "overflow-retry" | "timeout-retry";
type SessionCompactionTranscriptReference = {
  sessionId: string;
  sessionFile?: string;
  leafId?: string;
  entryId?: string;
};
type SessionCompactionCheckpoint = {
  checkpointId: string;
  sessionKey: string;
  sessionId: string;
  createdAt: number;
  reason: SessionCompactionCheckpointReason;
  tokensBefore?: number;
  tokensAfter?: number;
  tokensVersion?: typeof SESSION_TOTAL_TOKENS_VERSION;
  summary?: string;
  firstKeptEntryId?: string;
  preCompaction: SessionCompactionTranscriptReference;
  postCompaction: SessionCompactionTranscriptReference;
};
type SessionContextBudgetStatusRoute = "fits" | "compact_only" | "truncate_tool_results_only" | "compact_then_truncate";
type SessionContextBudgetStatus = {
  schemaVersion: 1;
  source: "pre-prompt-estimate";
  updatedAt: number;
  provider: string;
  model: string;
  route: SessionContextBudgetStatusRoute;
  shouldCompact: boolean;
  estimatedPromptTokens: number;
  contextTokenBudget: number;
  promptBudgetBeforeReserve: number;
  reserveTokens: number;
  effectiveReserveTokens: number;
  remainingPromptBudgetTokens: number;
  overflowTokens: number;
  toolResultReducibleChars: number;
  messageCount: number;
  unwindowedMessageCount: number;
  sessionId?: string;
};
type AmbientTranscriptWatermark = {
  sessionId: string;
  messageId: string;
  timestampMs?: number;
  updatedAt: number;
};
type SessionPluginDebugEntry = {
  pluginId: string;
  lines: string[];
};
type SessionPluginJsonValue = string | number | boolean | null | SessionPluginJsonValue[] | {
  [key: string]: SessionPluginJsonValue;
};
type SessionPluginNextTurnInjection = {
  id: string;
  pluginId: string;
  pluginName?: string;
  text: string;
  idempotencyKey?: string;
  placement: "prepend_context" | "append_context";
  ttlMs?: number;
  createdAt: number;
  metadata?: SessionPluginJsonValue;
};
type SubagentRecoveryState = {
  /** Consecutive accepted automatic orphan-recovery resumes in the rapid re-wedge window. */
  automaticAttempts?: number;
  /** Timestamp (ms) of the latest accepted automatic orphan-recovery resume. */
  lastAttemptAt?: number;
  /** Registry run id that triggered the latest automatic orphan-recovery resume. */
  lastRunId?: string;
  /** Timestamp (ms) when automatic recovery was tombstoned for this session. */
  wedgedAt?: number;
  /** Human-readable reason automatic recovery was tombstoned. */
  wedgedReason?: string;
};
type LaneExecutionState = "active" | "draining" | "suspended" | "resuming" | "circuit_open" | "failed_handoff";
interface QuotaSuspension {
  schemaVersion: 1;
  suspendedAt: number;
  reason: "quota_exhausted" | "manual" | "circuit_open";
  failedProvider: string;
  failedModel: string;
  /** Recovery briefing text injected into the next attempt when state === "resuming". */
  summary?: string;
  /** Opaque pointer to an external snapshot blob (path/key); not the briefing text itself. */
  snapshotRef?: string;
  /**
   * @deprecated Lane suspension was removed; nothing writes this anymore. Kept only to
   * hold the shipped SDK surface stable; drop at the next surface window.
   */
  laneId?: string;
  expectedResumeBy?: number;
  state: LaneExecutionState;
}
type RestartRecoveryRun = {
  runId: string;
  lifecycleGeneration: string;
};
type SessionEntryCore = SessionRestartRecoveryState & SessionEntryProvenance & Pick<SessionRow, "permissionMode" | "sessionRoot"> & {
  /** Collaboration mode. Missing legacy values are equivalent to "shared". */
  visibility?: SessionVisibility;
  /**
   * Last delivered heartbeat payload (used to suppress duplicate heartbeat notifications).
   * Stored on the main session entry.
   */
  lastHeartbeatText?: string;
  /** Timestamp (ms) when lastHeartbeatText was delivered. */
  lastHeartbeatSentAt?: number;
  /**
   * Base session key for heartbeat-created isolated sessions.
   * When present, `<base>:heartbeat` is a synthetic isolated session rather than
   * a real user/session-scoped key that merely happens to end with `:heartbeat`.
   */
  heartbeatIsolatedBaseSessionKey?: string;
  /** Legacy heartbeat task timestamps consumed and cleared only by doctor migration. */
  heartbeatTaskState?: Record<string, number>;
  /** Plugin-owned session state, grouped by plugin id then extension namespace. */
  pluginExtensions?: Record<string, Record<string, SessionPluginJsonValue>>;
  /** Trusted session initialization is incomplete; all work admission stays blocked. */
  initializationPending?: true;
  /** Top-level SessionEntry mirror slots owned by plugin session extensions. */
  pluginExtensionSlotKeys?: Record<string, Record<string, string>>;
  /** Durable one-shot prompt additions drained before the next agent turn. */
  pluginNextTurnInjections?: Record<string, SessionPluginNextTurnInjection[]>;
  sessionId: string;
  updatedAt: number;
  /** Process-lifetime session whose entry and transcript stay in the in-memory agent database. */
  incognito?: true;
  /** Opaque owner revision used to reject stale lifecycle mutations. */
  lifecycleRevision?: string;
  /** Timestamp (ms) when the session was archived from active session lists. */
  archivedAt?: number;
  /** Actor that archived the session; cleared when the session is restored. */
  archivedBy?: SessionActor;
  /** Stable lifecycle cause; absent values are legacy archives and remain manually protected. */
  archiveReason?: SessionEntryArchiveReason;
  /** Timestamp (ms) when the session was pinned for quick access. */
  pinnedAt?: number;
  /** Timestamp (ms) when an operator client last marked the session read. */
  lastReadAt?: number;
  /** Agent-declared sidebar presence; projection drops it after expiresAt. */
  agentStatus?: SessionAgentStatus;
  /** Latest utility-model status judgment for idle session status surfaces. */
  observerDigest?: SessionObserverDigest;
  /** Versioned, reconstructible Activity recap; never authoritative task status. */
  activitySummary?: SessionActivitySummary$1;
  /** Timestamp (ms) when an operator explicitly marked the session unread; cleared on read. */
  markedUnreadAt?: number;
  /** Timestamp (ms) of the latest completed agent run; metadata patches do not update it. */
  lastActivityAt?: number;
  /** Parent session key that spawned this session (used for sandbox session-tool scoping). */
  spawnedBy?: string;
  /** Immutable session key authorized to receive this child's completion handoff. */
  completionOwnerSessionKey?: string;
  /** Workspace inherited by spawned sessions and reused on later turns for the same child session. */
  spawnedWorkspaceDir?: string;
  /** Task working directory inherited by spawned sessions and reused on later turns. */
  spawnedCwd?: string;
  /** Content-free fingerprints for checkout changes that predate this session generation. */
  sessionDiffBaseline?: SessionDiffBaseline;
  /**
   * Managed worktree bound to this session; set with spawnedCwd at worktree
   * creation and cleared together when a plain New Chat detaches the checkout.
   */
  worktree?: {
    id: string;
    branch: string;
    repoRoot: string;
    /** Durable skill workspace prepared when this session runs from a managed worktree. */
    canonicalWorkspaceDir?: string;
  };
  /** Project registry id selected when this logical session node was created. */
  projectId?: string;
  /** Durable cloud repository owner; never identifies a Gateway filesystem path. */
  repositoryWorkspaceId?: string;
  /** Explicit parent session linkage for dashboard-created child sessions. */
  parentSessionKey?: string;
  /** Exact parent incarnation captured when this child was created. */
  parentSessionId?: string;
  /** How this session node came to exist; written once and retained across sessionId rotations. */
  createdVia?: SessionCreatedVia;
  /** Actor that caused node creation, with an optional profile, session, or sender id; written once. */
  createdActor?: SessionCreatedActor;
  /** Creation-only sandbox requirement; existing unstamped sessions always remain unstamped. */
  sandbox?: "required";
  /** Mutable responsibility, projected from SQLite; absent means createdActor owns the session. */
  owner?: SessionOwnerAssignment;
  /** Retained identities, projected from the participant table before display truncation. */
  participants?: SessionParticipant[];
  /** Raw retained identity count, including the owner, for admission-bound coverage. */
  participantCount?: number;
  /** Node creation time (ms); unlike sessionStartedAt, survives sessionId rotations. */
  createdAt?: number;
  /** Exact source generation and optional cut entry for an actual transcript-copy fork. */
  forkSource?: {
    sessionKey: string;
    sessionId: string;
    entryId?: string;
  };
  /** Session id of the prior transcript generation under this same session key. */
  previousSessionId?: string;
  /** Thread parent-seeding settled marker; also set when seeding is deliberately skipped. */
  forkedFromParent?: boolean;
  /** Subagent spawn depth (0 = main, 1 = sub-agent, 2 = sub-sub-agent). */
  spawnDepth?: number;
  /** Explicit role assigned at spawn time for subagent tool policy/control decisions. */
  subagentRole?: "orchestrator" | "leaf";
  /** Explicit control scope assigned at spawn time for subagent control decisions. */
  subagentControlScope?: "children" | "none";
  /** Version of the requester tool-policy snapshot captured when this child was spawned. */
  inheritedToolPolicyVersion?: 1;
  /** Session-scoped tool deny entries inherited from the caller that created this session. */
  inheritedToolDeny?: string[];
  /** Session-scoped tool allow entries inherited from the caller that created this session. */
  inheritedToolAllow?: string[];
  systemSent?: boolean;
  abortedLastRun?: boolean;
  /** Interrupted run generations whose late lifecycle events must be ignored. */
  restartRecoveryRuns?: RestartRecoveryRun[];
  /** Keeps automatic restart recovery limited to replay-safe tools until the run terminates. */
  restartRecoveryForceSafeTools?: true;
  /** Durable guard state for automatic subagent orphan recovery. */
  subagentRecovery?: SubagentRecoveryState;
  /** Quota cascade protection and state-aware failover status. */
  quotaSuspension?: QuotaSuspension;
  /** Core-owned durable goal state for this thread/session. */
  goal?: SessionGoal;
  /** Timestamp (ms) when the current sessionId first became active. */
  sessionStartedAt?: number;
  /** Stable usage lineage key for transcript-backed rollups across sessionId rotations. */
  usageFamilyKey?: string;
  /** Session ids known to belong to this usage lineage, including archived predecessors. */
  usageFamilySessionIds?: string[];
  /** Timestamp (ms) of the last user/channel interaction that should extend idle lifetime. */
  lastInteractionAt?: number;
  /** Stable first-run start time for subagent sessions, persisted after completion. */
  startedAt?: number;
  /** Latest completed run end time for subagent sessions, persisted after completion. */
  endedAt?: number;
  /** Accumulated runtime across subagent follow-up runs, persisted after completion. */
  runtimeMs?: number;
  /** Final persisted subagent run status, used after in-memory run archival. */
  status?: PersistedSessionRunStatus;
  /** Compact user-facing reason for the latest failed or timed-out run. */
  lastRunError?: string;
  /**
   * Session-level stop cutoff captured when /stop is received.
   * Messages at/before this boundary are skipped to avoid replaying
   * queued pre-stop backlog.
   */
  abortCutoffMessageSid?: string;
  /** Epoch ms cutoff paired with abortCutoffMessageSid when available. */
  abortCutoffTimestamp?: number;
  chatType?: SessionChatType;
  contextWindow?: string;
  thinkingLevel?: string;
  /**
   * Exact isolated-cron continuation policy. Only hidden `:run:` session rows
   * carry this while detached generated-media work may still wake the run.
   */
  cronRunContinuation?: {
    lifecycleRevision: string;
    phase: "running" | "ready" | "continuing";
    /** True only after this row's session changes were projected to the stable cron row. */
    basePersisted?: boolean;
    ownerRunId?: string;
    /** Gateway lifecycle generation that owns a continuing claim. */
    ownerLifecycleGeneration?: string;
    /** CLI backend whose native session must exist before media work detaches. */
    cliExecutionProvider?: string;
    toolsAllow?: string[];
    toolsAllowIsDefault?: boolean;
    /** Exact server-stamped authority provenance copied from the owning cron job. */
    scheduledToolPolicy?: CronScheduledToolPolicy;
    /** Restrict-only exec pin copied from the owning cron job's cap. */
    toolsAllowExecTarget?: CronToolsAllowExecTarget;
    /** Expected pin copied with the cap so detached continuation loss fails closed. */
    toolsAllowExecTargetRequirement?: CronToolsAllowExecTargetRequirement;
    /** Store-private origin paired with an account scheduled-tool policy. */
    scheduledToolCallerOrigin?: CronScheduledToolCallerOrigin;
    cliSessionBindingFacts?: {
      extraSystemPromptStatic?: string;
      sourceReplyDeliveryMode?: "automatic" | "message_tool_only";
      requireExplicitMessageTarget?: boolean;
    };
  };
  fastMode?: FastMode;
  toolOverrides?: SessionToolOverrides;
  /** Swarm group for collector-mode child sessions. */
  swarmGroupId?: string;
  /** Marks non-interactive collector-mode child sessions. */
  swarmCollector?: boolean;
  /** JSON Schema exposed through the synthetic structured_output tool. */
  swarmOutputSchema?: Record<string, unknown>;
  verboseLevel?: string;
  traceLevel?: string;
  reasoningLevel?: string;
  elevatedLevel?: string;
  ttsAuto?: TtsAutoMode;
  /** Hash of the latest assistant reply that was sent through `/tts latest`. */
  lastTtsReadLatestHash?: string;
  /** Timestamp (ms) when `/tts latest` last sent audio for this session. */
  lastTtsReadLatestAt?: number;
  execHost?: string;
  execNode?: string;
  /** Working directory interpreted only by the bound exec node. */
  execCwd?: string;
  responseUsage?: "on" | "off" | "tokens" | "full";
  providerOverride?: string;
  modelOverride?: string;
  /** Session-scoped agent runtime/harness override selected with the model picker. */
  agentRuntimeOverride?: string;
  /**
   * Tracks whether the persisted model selection came from an explicit user
   * action (`/model`, `sessions.patch`), a temporary runtime fallback, or an
   * explicit configured-default selection that blocks parent inheritance.
   */
  modelOverrideSource?: "auto" | "user" | "default";
  /** Present only when providerOverride/modelOverride are a canonical route pair. */
  modelOverrideRouteResolution?: "resolved";
  /** Selected model that produced the current auto fallback override. */
  modelOverrideFallbackOriginProvider?: string;
  modelOverrideFallbackOriginModel?: string;
  /** One-run rollback guard for a model selected by the agent sessions tool. */
  modelFallback?: AgentPatchedSessionModelFallback;
  authProfileOverride?: string;
  authProfileOverrideSource?: "auto" | "user" | "user-link";
  authProfileOverrideCompactionCount?: number;
  /**
   * Set on explicit user-driven session model changes (for example `/model`
   * and `sessions.patch`) during an active run. The embedded runner checks
   * this flag to decide whether to throw `LiveSessionModelSwitchError`.
   * System-initiated fallbacks (rate-limit retry rotation) never set this
   * flag, so they are never mistaken for user-initiated switches.
   */
  liveModelSwitchPending?: boolean;
  groupActivation?: "mention" | "always";
  groupActivationNeedsSystemIntro?: boolean;
  sendPolicy?: "allow" | "deny";
  queueMode?: QueueMode;
  queueDebounceMs?: number;
  queueCap?: number;
  queueDrop?: "old" | "new" | "summarize";
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  pendingFinalDelivery?: PendingFinalDeliveryState;
  pendingDeliveryNotice?: PendingDeliveryNoticeState;
  /**
   * Ordered durable backlog of delivered assistant finals that failed to
   * reach the canonical transcript. Session admission restores each item
   * before another turn can extend that transcript. Kept as a list so
   * independently admitted writers never overwrite an earlier reply.
   */
  pendingTranscriptRepair?: PendingTranscriptRepairState[];
  /**
   * Whether totalTokens reflects a fresh context snapshot for the latest run.
   * Undefined means legacy/unknown freshness; false forces consumers to treat
   * totalTokens as stale/unknown for context-utilization displays.
   */
  totalTokensFresh?: boolean;
  /** Version 1 records totalTokens as the current prompt/context snapshot only. */
  totalTokensVersion?: typeof SESSION_TOTAL_TOKENS_VERSION;
  estimatedCostUsd?: number;
  cacheRead?: number;
  cacheWrite?: number;
  modelProvider?: string;
  model?: string;
  /**
   * Prevents OpenClaw model changes and automatic maintenance eviction until
   * the owning harness explicitly retires the session.
   */
  modelSelectionLocked?: boolean;
  /**
   * Embedded agent harness selected for this session id.
   * Prevents config/env changes from moving an existing transcript between
   * incompatible runtime harnesses.
   */
  agentHarnessId?: string;
  fallbackNotice?: FallbackNoticeState;
  contextTokens?: number;
  /** Origin of the persisted context window; `resolved` is legacy/unverified. */
  contextTokensSource?: "runtime" | "runtime-configured" | "resolved" | "resolved-v1";
  contextBudgetStatus?: SessionContextBudgetStatus;
  compactionCount?: number;
  compactionCheckpoints?: SessionCompactionCheckpoint[];
  memoryFlush?: MemoryFlushState;
  cliSessionIds?: Record<string, string>;
  cliSessionBindings?: Record<string, CliSessionBinding>;
  /** Initialization fence for seeding canonical ACP metadata; cleared after creation. */
  acpSessionBinding?: AcpSessionBinding;
  claudeCliSessionId?: string;
  label?: string;
  /** Automatic device name; never claims a custom label or overrides a generated title. */
  autoLabel?: string;
  /** Persistent sidebar emoji, named glyph, or canonical SVG image data URL. */
  icon?: string;
  /** Named sidebar tint (SESSION_COLOR_IDS); palette mirrors Claude Code /color for import. */
  color?: string;
  /** User-defined organization bucket for session lists; unrelated to chat groupId/groupChannel. */
  category?: string;
  /** Preferred Control UI face when a caller opens this session without explicit face intent. */
  boardFace?: SessionBoardFace;
  /** Shared dashboard presentation default; absence uses the built-in split view. */
  boardPresentation?: NonNullable<SessionRow["boardPresentation"]>;
  displayName?: string;
  /** Canonical delivery state. Legacy delivery fields are migrated by `openclaw doctor --fix`. */
  delivery?: SessionDeliveryState;
  groupId?: string;
  subject?: string;
  /** Display-only topic name; subject remains the group name used for routing. */
  topicName?: string;
  groupChannel?: string;
  space?: string;
  /** Last ambient room message durably appended to this transcript, keyed by channel scope. */
  ambientTranscriptWatermarks?: Record<string, AmbientTranscriptWatermark>;
  skillsSnapshot?: SessionSkillSnapshot;
  /** Explicit authorized immutable library pins; current speakers never replace this selection. */
  skillLibrarySelections?: SkillLibrarySelection[];
  systemPromptReport?: SessionSystemPromptReport;
  /**
   * Generic plugin-owned runtime debug entries shown in verbose status surfaces.
   * Each plugin owns and may overwrite only its own entry between turns.
   */
  pluginDebugEntries?: SessionPluginDebugEntry[];
  acp?: SessionAcpMeta;
};
interface SessionEntry extends SessionEntryCore {}
/** Internal durable fields excluded from public/plugin session projections. */
type InternalSessionEntryCore = SessionEntryCore & {
  /** Transcript-wide account provenance; native binding replacement must not replace it. */
  cliHistoryBoundary?: CliHistoryBoundary;
  /** Explicit world-readable publication, bound to one transcript generation. */
  publicShare?: {
    id: string;
    sessionId: string;
    createdAt: number;
  };
  /** Run that owns the current non-terminal Gateway lifecycle projection. */
  lifecycleRunId?: string;
  /** Exact run that produced the latest terminal Gateway lifecycle projection. */
  lastRunId?: string;
  /** Run admitted by the session lane; overwritten at admission and checked by transcript writes. */
  activeWriterRunId?: string;
  /** Canonical remote repository awaiting preparation by this exact session generation. */
  pendingProjectGitUrl?: string;
  /** Authorized worktree intent awaiting preparation by an admitted turn. */
  pendingWorktree?: {
    workspace?: string;
    name?: string;
    baseRef?: string;
    /** Verified commit used for checkout while baseRef remains user-facing metadata. */
    baseCommit?: string;
    titleSource: string;
  };
  /** Suppresses repeated byte-triggered compaction after an oversized successor was observed. */
  transcriptByteCompactionLatch?: {
    activeBytes: number;
    sessionId: string;
    maxBytes: number;
  };
  /** Private per-generation ownership for the pre-runtime checkout baseline capture. */
  sessionDiffBaselineCapture?: SessionDiffBaselineCapture;
  mainRestartRecovery?: MainRestartRecoveryState;
};
interface InternalSessionEntry extends InternalSessionEntryCore {}
type GroupKeyResolution = {
  key: string;
  channel?: string;
  id?: string;
  chatType?: SessionChatType;
};
//#endregion
//#region src/routing/resolve-route.d.ts
type RoutePeer = {
  kind: ChatType;
  id: string;
};
type ResolveAgentRouteInput = {
  cfg: OpenClawConfig;
  channel: string;
  /** Known owner when no configured binding matches this route. */
  defaultAgentId?: string;
  accountId?: string | null;
  peer?: RoutePeer | null;
  dmScope?: DmScope;
  groupScope?: GroupScope;
  /** Parent peer for threads — used for binding inheritance when peer doesn't match directly. */
  parentPeer?: RoutePeer | null;
  guildId?: string | null;
  teamId?: string | null;
  /** Discord member role IDs — used for role-based agent routing. */
  memberRoleIds?: string[];
};
type ResolvedAgentRoute = {
  agentId: string;
  channel: string;
  accountId: string;
  /** Effective direct-message scope after a matching binding override. */
  dmScope?: DmScope;
  groupScope?: GroupScope;
  /** Internal session key used for persistence + concurrency. */
  sessionKey: string;
  /** Convenience alias for direct-chat collapse. */
  mainSessionKey: string;
  /** Which session should receive inbound last-route updates. */
  lastRoutePolicy: "main" | "session";
  /** Match description for debugging/logging. */
  matchedBy: "binding.peer" | "binding.peer.parent" | "binding.peer.wildcard" | "binding.guild+roles" | "binding.guild" | "binding.team" | "binding.account" | "binding.channel" | "default";
};
declare function buildAgentSessionKey(params: {
  agentId: string;
  mainKey?: string;
  channel: string;
  accountId?: string | null;
  peer?: RoutePeer | null;
  /** DM session scope. */
  dmScope?: DmScope;
  groupScope?: GroupScope;
  identityLinks?: Record<string, string[]>;
}): string;
declare function resolveAgentRoute(input: ResolveAgentRouteInput): ResolvedAgentRoute;
//#endregion
//#region src/agents/agent-scope-config.d.ts
declare function resolveAgentWorkspaceDir(cfg: OpenClawConfig, agentId: string, env?: NodeJS.ProcessEnv): string;
declare function resolveAgentDir(cfg: OpenClawConfig, agentId: string, env?: NodeJS.ProcessEnv): string;
//#endregion
//#region src/agents/agent-scope.d.ts
type ModelFallbackAvailability = {
  kind: "active";
  models: string[];
  source: "explicit" | "inherited";
} | {
  kind: "none_configured";
  source: "explicit" | "inherited";
} | {
  kind: "disabled_by_model_override";
} | {
  kind: "disabled_by_model_selection_lock";
};
//#endregion
export { PluginApprovalRequest as $, ToolsGitHubAuthorizeStartResult as $n, SkillLibraryFile as $r, QuestionResolveResult as $t, SupplementalContextFacts as A, SessionsCatalogArchiveParams as An, ToolExecutionMode as Ar, WorkerLiveEventResult as At, ReplyPayload as B, WorkerInferenceCancelResult as Bn, StructuredExtractionInput as Br, WizardNextResult as Bt, FinalizedMsgContext as C, UsersListModelAccountsResult as Cn, AgentMessage as Cr, GatewayClientName as Ct, MsgContext as D, AgentWaitParams as Dn, BashExecutionMessage as Dr, WorkerConnectParams as Dt, MentionSource as E, ChatAccountSelection as En, AgentToolUpdateCallback as Er, WorkerAdmissionHandshake as Et, TaskSuggestionDeliveryMode as F, SessionActivitySummary as Fn, PromptImageOrderEntry as Fr, WorkerSessionsSpawnParams as Ft, ReplyPayloadDelivery as G, WorkerInferenceStartResult as Gn, OAuthCredential as Gr, TerminalUploadResult as Gt, MessagePresentation as H, WorkerInferenceEventFrame as Hn, AuthProfileCredential as Hr, PortalOpenResult as Ht, TurnAdoptionLifecycle as I, SessionPermissionMode as In, MediaKind as Ir, WorkerTranscriptCommitErrorReason as It, ChannelApprovalKind as J, ApprovalPresentation as Jn, GatewayUiCommandTarget as Jr, SessionsCompanionAskResult as Jt, ReplyPayloadDeliveryPin as K, WorkerInferenceTerminalFrame as Kn, RuntimeAuthProfileStore as Kr, Snapshot as Kt, ReplyDeliveryContext as L, WorkerComputerParams as Ln, mediaKindFromMime as Lr, WorkerTranscriptCommitParams as Lt, BlockReplyContext as M, SessionsCatalogReadParams as Mn, PluginHookChannelContext as Mr, WorkerProtocolCloseReason as Mt, GetReplyOptions as N, SessionsCatalogReadResult as Nn, LegacyMediaContextKey as Nr, WorkerSessionToolResult as Nt, OriginatingChannelType as O, SessionCatalogHost as On, CustomMessage as Or, WorkerLiveEventErrorDetails as Ot, PartialReplyPayload as P, TasksHistoryResult as Pn, MediaFact as Pr, WorkerSessionsSendParams as Pt, SystemAgentApprovalResolved as Q, ToolsGitHubAuthorizePollResult as Qn, HookExternalContentSource as Qr, QuestionRecord as Qt, SessionWriterDeliveryAuthority as R, WorkerComputerResult as Rn, MediaUnderstandingDecision as Rr, WorkerTranscriptCommitResult as Rt, ResolvedSessionMaintenanceConfigInput as S, UsersListAuthLinksResult as Sn, InputProvenance as Sr, GatewayClientMode as St, InboundSourceModality as T, UsersUnlinkAuthProfileResult as Tn, AgentToolResult as Tr, WorkerAdmissionFailureReason as Tt, MessagePresentationAction as U, WorkerInferenceEventParams as Un, AuthProfileCredentialSource as Ur, PortalSummary as Ut, LegacyInteractiveReply as V, WorkerInferenceErrorReason as Vn, ApiKeyCredential as Vr, WizardStep as Vt, MessagePresentationButton as W, WorkerInferenceStartParams as Wn, AuthProfileStore as Wr, TerminalUploadPathStyle as Wt, SystemAgentApprovalRequest as X, ModelChoice as Xn, SessionCreatedActor as Xr, Question as Xt, SystemAgentApprovalApplicationStatus as Y, SessionApprovalReplay as Yn, InboundEventKind as Yr, SessionsCompanionStateResult as Yt, SystemAgentApprovalRequestPayload as Z, SkillsProposalRecordResult as Zn, SessionCreatedVia as Zr, QuestionAnswers as Zt, CronScheduledToolPolicy as _, PluginOrigin as _i, UsersAuthConnectStartResult as _n, AgentRunTimeoutPhase as _r, DeliveryContext as _t, buildAgentSessionKey as a, FastMode as ai, MentionsListResult as an, RequestFrame as ar, ExecApprovalRequestPayload as at, SessionTranscriptRuntimeTarget as b, RuntimeEnv as bi, UsersGitHubAuthorizeStartResult as bn, CommandTurnContext as br, TranscriptSenderIdentity as bt, GroupKeyResolution as c, PluginMetadataSnapshot as ci, ScopeUpgradeResult as cn, SessionPlacementMachine as cr, ExecHost as ct, SessionPluginJsonValue as d, Result as di, WorkerTunnelStatus as dn, TranscriptEntryAnchor as dr, ExecTarget as dt, SkillLibrarySelection as ei, QuestionResolvedEvent as en, GitHubPublicationPublisher as er, PluginApprovalRequestPayload as et, SessionToolOverrides as f, ConfigWriteAfterWrite as fi, CronJob as fn, TranscriptTurnAdmission as fr, CommandExplanationSummary as ft, CronScheduledToolCallerOrigin as g, PluginTrust as gi, UsersAuthConnectCatalogResult as gn, ExecutionIdentityAdmissionToken as gr, UserTurnTranscriptRecorder as gt, SourceInfo as h, PluginDependencyStatus as hi, PersonalGitHubStatus as hn, ExecutionIdentityAdmissionFacts as hr, UserTurnTranscriptAnnotation as ht, ResolvedAgentRoute as i, SkillsLibraryReceipt as ii, NodeSkillDescriptor as in, ErrorShape as ir, ExecApprovalRequest as it, TemplateContext as j, SessionsCatalogContinueParams as jn, ToolLoopWarning as jr, WorkerPortalParams as jt, SessionTranscriptContext as k, SessionCatalogShareRoute as kn, StreamFn as kr, WorkerLiveEventParams as kt, SessionContextBudgetStatus as l, PluginMetadataSnapshotOwnerMaps as li, DesktopAvailability as ln, SessionPlacementRunner as lr, ExecMode as lt, Skill as m, PluginManifestRegistry as mi, SystemAgentWizardCancel as mn, AgentPlanStep as mr, UserTurnTranscriptAdmissionReceipt as mt, resolveAgentDir as n, SkillsLibraryListResult as ni, NodeHostStatsPayload as nn, SessionGitHubPublishParams as nr, ApprovalScope as nt, resolveAgentRoute as o, ConfigReplaceResult as oi, UsersMentionableParams as on, SessionMoveTarget as or, ExecApprovalResolved as ot, SessionSystemPromptReport as p, PluginManifestRecord as pi, SystemAgentChatQuestion as pn, TranscriptTurnBoundary as pr, UserTurnInput as pt, ApprovalRequestInput as q, WorkerInferenceTerminalOutcome as qn, MediaUnderstandingOutput as qr, SessionObserverDigest as qt, resolveAgentWorkspaceDir as r, SkillsLibraryReadResult as ri, NodePluginToolDescriptor as rn, ConnectParams as rr, ExecApprovalDecision as rt, CliSessionBinding as s, PluginMetadataRegistryView as si, UsersMentionableResult as sn, SessionPlacementDiskSpace as sr, ExecAsk as st, ModelFallbackAvailability as t, SkillsLibraryActivateResult as ti, QuestionWaitAnswerResult as tn, SessionGitHubPublicationResult as tr, PluginApprovalResolved as tt, SessionEntry as u, PluginCompatCode as ui, WorkerEnvironmentState as un, SessionsReclaimParams as ur, ExecSecurity as ut, CronToolsAllowExecTarget as v, ChannelOwnedSetupContract as vi, UsersAuthConnectStatusResult as vn, HistoryEntry as vr, ChannelRouteRef as vt, FinalizedRuntimeMsgContext as w, UsersSelectModelAccountResult as wn, AgentTool as wr, WORKER_BUNDLE_PREWARM_VERSION as wt, TranscriptEvent as x, QueueMode as xi, UsersLinkAuthProfileResult as xn, CommandTurnKind as xr, GATEWAY_CLIENT_IDS as xt, CronToolsAllowExecTargetRequirement as y, ChannelSetupAdapter as yi, UsersGitHubAuthorizePollResult as yn, HistoryMediaEntry as yr, SourceReplyDeliveryMode as yt, ReplyMediaAttachment as z, WorkerInferenceCancelParams as zn, MediaUnderstandingProvider as zr, WizardAnswer as zt };