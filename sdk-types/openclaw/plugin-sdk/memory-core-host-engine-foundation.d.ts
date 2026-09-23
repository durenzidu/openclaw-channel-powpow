import { r as OpenClawConfig } from "../types.openclaw-DRlyXvhd.js";
import { ht as MemorySearchConfig } from "../types.channels-BVWycIjM.js";
import { a as onInternalSessionTranscriptUpdate, c as MemoryExtraPath, r as resolveSessionTranscriptsDirForAgent } from "../paths-B65mfFh-.js";
import "../config-CJdvsHqC.js";
import { t as resolveStateDir } from "../state-dir-CrCP_VLr.js";
import "../paths--sdQ5Voj.js";
import { o as resolveUserPath } from "../home-dir-zeNXGRsP.js";
import { n as truncateUtf16Safe } from "../utf16-slice-C5Uh1nl-.js";
import { n as createSubsystemLogger } from "../subsystem-RmDRaRJV.js";
import { V as root } from "../fs-safe-DBBalKLY.js";
import { c as resolveAgentContextLimits, l as resolveAgentDir, u as resolveAgentWorkspaceDir } from "../agent-scope-CeViFjsB.js";
import "@openclaw/fs-safe/advanced";
import "@openclaw/fs-safe/root";
import { isPathInside } from "@openclaw/fs-safe/path";
import "@openclaw/fs-safe/walk";
//#region packages/memory-host-sdk/src/host/multimodal.d.ts
declare const MEMORY_MULTIMODAL_SPECS: {
  readonly image: {
    readonly labelPrefix: "Image file";
    readonly extensions: readonly [".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".heif"];
  };
  readonly audio: {
    readonly labelPrefix: "Audio file";
    readonly extensions: readonly [".mp3", ".wav", ".ogg", ".opus", ".m4a", ".m2a", ".aac", ".flac"];
  };
};
/** Supported multimodal memory modality. */
type MemoryMultimodalModality = keyof typeof MEMORY_MULTIMODAL_SPECS;
/** Normalized multimodal memory ingestion settings. */
type MemoryMultimodalSettings = {
  enabled: boolean;
  modalities: MemoryMultimodalModality[];
  maxFileBytes: number;
};
//#endregion
//#region src/agents/memory-search.d.ts
type ProducedMemorySearchConfig = NonNullable<ReturnType<typeof produceMemorySearchConfig>>;
type ResolvedMemorySearchConfig = Omit<ProducedMemorySearchConfig, "cache" | "documentInputType" | "inputType" | "local" | "outputDimensionality" | "queryInputType" | "remote" | "store" | "sync"> & {
  inputType?: string;
  queryInputType?: string;
  documentInputType?: string;
  outputDimensionality?: number;
  cache: Omit<ProducedMemorySearchConfig["cache"], "maxEntries"> & {
    maxEntries?: number;
  };
  local: Omit<ProducedMemorySearchConfig["local"], "modelPath"> & {
    modelPath?: string;
    modelCacheDir?: string;
    contextSize?: number | "auto";
  };
  remote?: Omit<Partial<NonNullable<ProducedMemorySearchConfig["remote"]>>, "batch"> & {
    batch?: NonNullable<ProducedMemorySearchConfig["remote"]>["batch"];
    nonBatchConcurrency?: number;
  };
  store: Omit<ProducedMemorySearchConfig["store"], "vector"> & {
    vector: Omit<ProducedMemorySearchConfig["store"]["vector"], "extensionPath"> & {
      extensionPath?: string;
    };
  };
  sync: Omit<ProducedMemorySearchConfig["sync"], "embeddingBatchTimeoutSeconds"> & {
    embeddingBatchTimeoutSeconds: number | undefined;
  };
};
type ResolvedMemorySearchSyncConfig = ResolvedMemorySearchConfig["sync"];
declare function produceMemorySearchConfig(cfg: OpenClawConfig, agentId: string): {
  enabled: true;
  rememberAcrossConversations: boolean;
  sources: ("memory" | "sessions")[];
  searchSources: ("memory" | "sessions")[];
  extraPaths: MemoryExtraPath[];
  query: {
    maxResults: number;
    minScore: number;
    hybrid: {
      enabled: boolean;
      vectorWeight: number;
      textWeight: number;
      candidateMultiplier: number;
      mmr: {
        enabled: boolean;
        lambda: number;
      };
      temporalDecay: {
        enabled: boolean;
        halfLifeDays: number;
      };
    };
  };
  experimental: {
    sessionMemory: boolean;
  };
  sync: {
    onSessionStart: boolean;
    onSearch: boolean;
    watch: boolean;
    watchDebounceMs: number;
    intervalMinutes: number;
    embeddingBatchTimeoutSeconds: undefined;
    sessions: {
      deltaBytes: number;
      deltaMessages: number;
      postCompactionForce: boolean;
    };
  };
  multimodal: MemoryMultimodalSettings;
  provider: string;
  remote: {
    baseUrl: string | undefined;
    apiKey: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | {
      source: "store";
      provider: string;
      id: string;
    } | undefined;
    headers: Record<string, string> | undefined;
    batch: {
      enabled: boolean;
      wait: boolean;
      concurrency: number;
      pollIntervalMs: number;
      timeoutMinutes: number;
    };
  } | undefined;
  fallback: string;
  model: string;
  inputType: string | undefined;
  queryInputType: string | undefined;
  documentInputType: string | undefined;
  outputDimensionality: number | undefined;
  local: {
    modelPath: string | undefined;
  };
  store: {
    driver: "sqlite";
    databasePath: string;
    fts: {
      tokenizer: "trigram" | "unicode61";
    };
    vector: {
      enabled: boolean;
      extensionPath: string | undefined;
    };
  };
  chunking: {
    tokens: number;
    overlap: number;
  };
  cache: {
    enabled: boolean;
    maxEntries: number;
  };
} | null;
export declare function resolveMemorySearchConfig(cfg: OpenClawConfig, agentId: string): ResolvedMemorySearchConfig | null;
export declare function resolveMemorySearchSyncConfig(cfg: OpenClawConfig, agentId: string): ResolvedMemorySearchSyncConfig | null;
//#endregion
//#region src/shared/global-singleton.d.ts
type GlobalSingletonLifecycle = "close-and-restart" | "close-only" | "plugin-registry";
type GlobalSingletonReset<T> = (value: T) => void | Promise<void>;
/** Resolves a process-local singleton for caches and registries that tolerate helper lookup. */
export declare function resolveGlobalSingleton<T>(key: symbol, create: () => T, reset?: GlobalSingletonReset<T>, lifecycle?: GlobalSingletonLifecycle): T;
//#endregion
export { type MemorySearchConfig, type OpenClawConfig, type ResolvedMemorySearchConfig, createSubsystemLogger, isPathInside, onInternalSessionTranscriptUpdate, resolveAgentContextLimits, resolveAgentDir, resolveAgentWorkspaceDir, resolveSessionTranscriptsDirForAgent, resolveStateDir, resolveUserPath, root, truncateUtf16Safe };