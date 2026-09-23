import { Hn as createOpenClawCodingTools, Mr as AgentHarnessV2, X as createCodexAppServerToolResultExtensionRunner, Y as createAgentToolResultMiddlewareRunner, _i as resolveActiveEmbeddedRunSessionId, _l as SandboxToolPolicy, fu as AgentToolResultMiddlewareEvent, gu as OpenClawAgentToolResult, i as EmbeddedRunAttemptParamsV2, li as abortAndDrainEmbeddedAgentRun, or as AgentHarness, r as EmbeddedRunAttemptParams, ui as abortEmbeddedAgentRun, up as ScheduledToolPolicyContext, uu as AgentToolResultMiddleware, yt as disposeRegisteredAgentHarnesses, zl as TrustedSubagentCompletionHandoff } from "../agent-harness-runtime-D1Ww9PgY.js";
import { r as OpenClawConfig } from "../types.openclaw-DRlyXvhd.js";
import { Ut as InputProvenance } from "../templating-BzAleqvS.js";
import { n as AnyAgentTool } from "../common-BD98Zq2n.js";
//#region src/agents/web-search-tool-policy.d.ts
type WebSearchToolPolicyParams = {
  webSearchEnabled?: boolean;
  config?: OpenClawConfig;
  modelProvider?: string;
  modelId?: string;
  agentId?: string;
  sessionKey?: string;
  sessionId?: string;
  sandboxToolPolicy?: SandboxToolPolicy;
  messageProvider?: string;
  agentAccountId?: string | null;
  groupId?: string | null;
  groupChannel?: string | null;
  groupSpace?: string | null;
  spawnedBy?: string | null;
  senderId?: string | null;
  senderName?: string | null;
  senderUsername?: string | null;
  senderE164?: string | null;
  inputProvenance?: InputProvenance;
  trustedInternalHandoff?: TrustedSubagentCompletionHandoff;
  scheduledToolPolicy?: ScheduledToolPolicyContext;
  runtimeToolAllowlist?: string[];
};
type WebSearchToolPolicyResolution = {
  allowed: boolean;
  persistentAllowed: boolean;
};
/** Resolves current and sender-independent policy for the managed web_search tool. */
export declare function resolveWebSearchToolPolicy(params: WebSearchToolPolicyParams): WebSearchToolPolicyResolution;
//#endregion
export { type AgentHarness, type AgentHarnessV2, type AgentToolResultMiddleware, type AgentToolResultMiddlewareEvent, type AnyAgentTool, type EmbeddedRunAttemptParams, type EmbeddedRunAttemptParamsV2, type OpenClawAgentToolResult, abortEmbeddedAgentRun as abortAgentHarnessRun, abortAndDrainEmbeddedAgentRun as abortAndDrainAgentHarnessRun, createAgentToolResultMiddlewareRunner, createCodexAppServerToolResultExtensionRunner, createOpenClawCodingTools, disposeRegisteredAgentHarnesses, resolveActiveEmbeddedRunSessionId };