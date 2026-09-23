import { c as ConfigFileSnapshot, l as OpenClawConfig } from "./types-B16fzBZc.js";
import "./types-nrJGffNW.js";
import { f as RuntimeEnv } from "./plugin-metadata-snapshot-wDLgFxJr.js";
import { z } from "zod";
import "json5";
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
//#region src/flows/health-checks.d.ts
type HealthFindingSeverity = "info" | "warning" | "error";
/** Structured finding emitted by doctor health checks. */
interface HealthFinding {
  readonly checkId: string;
  readonly severity: HealthFindingSeverity;
  readonly message: string;
  readonly source?: string;
  readonly errorCode?: string;
  readonly path?: string;
  readonly line?: number;
  readonly column?: number;
  readonly ocPath?: string;
  readonly target?: string;
  readonly requirement?: string;
  readonly fixHint?: string;
}
type HealthCheckMode = "doctor" | "lint" | "fix";
/** Immutable runtime/config context passed to health check detection. */
interface HealthCheckContext {
  readonly mode: HealthCheckMode;
  readonly runtime: RuntimeEnv;
  readonly cfg: OpenClawConfig;
  readonly env?: NodeJS.ProcessEnv;
  readonly cwd?: string;
  readonly configPath?: string;
  readonly allowExecSecretRefs?: boolean;
}
/** Repair-capable health-check context; fixes may emit diffs or dry-run previews. */
interface HealthRepairContext extends Omit<HealthCheckContext, "mode"> {
  readonly mode: "fix";
  readonly dryRun?: boolean;
  readonly diff?: boolean;
}
/** Optional before/after detail for config or file repair output. */
interface HealthRepairDiff {
  readonly kind: "config" | "file";
  readonly path: string;
  readonly before?: string;
  readonly after?: string;
  readonly unifiedDiff?: string;
}
/** Side effect descriptor for repairs that touch services, processes, packages, or state. */
interface HealthRepairEffect {
  readonly kind: "config" | "file" | "service" | "process" | "package" | "state" | "other";
  readonly action: string;
  readonly target?: string;
  readonly dryRunSafe?: boolean;
}
/** Repair result returned by split health-check repair functions. */
interface HealthRepairResult {
  readonly status?: "repaired" | "skipped" | "failed";
  readonly reason?: string;
  readonly config?: OpenClawConfig;
  readonly changes: readonly string[];
  readonly warnings?: readonly string[];
  readonly diffs?: readonly HealthRepairDiff[];
  readonly effects?: readonly HealthRepairEffect[];
}
/** Narrow validation scope built from previous findings after a repair runs. */
interface HealthCheckScope {
  readonly findings?: readonly HealthFinding[];
  readonly paths?: readonly string[];
  readonly ocPaths?: readonly string[];
}
/** Split detect/repair health-check contract registered by core or plugins. */
interface HealthCheck {
  readonly id: string;
  readonly kind: "core" | "plugin";
  readonly description: string;
  readonly source?: string;
  detect(ctx: HealthCheckContext, scope?: HealthCheckScope): Promise<readonly HealthFinding[]>;
  repair?(ctx: HealthRepairContext, findings: readonly HealthFinding[]): Promise<HealthRepairResult>;
}
//#endregion
export { resolveAgentDir as a, ModelFallbackAvailability as i, ConfigReplaceResult as n, resolveAgentWorkspaceDir as o, ConfigWriteAfterWrite as r, HealthCheck as t };