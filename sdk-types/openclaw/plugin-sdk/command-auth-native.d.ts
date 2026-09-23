import { Al as formatFastModeStatusValue, Bc as resolveControlCommandGate, Dl as formatFastModeCommandOptions, Ol as formatFastModeCurrentStatus, Ur as AgentRuntimePolicyScope, kl as formatFastModeSourceSuffix, wl as resolveFastModeState, zc as resolveCommandAuthorizedFromAuthorizers } from "../agent-harness-runtime-D1Ww9PgY.js";
import { r as OpenClawConfig } from "../types.openclaw-DRlyXvhd.js";
import { j as SessionEntry } from "../templating-BzAleqvS.js";
import { n as CommandArgs, t as CommandArgValues } from "../commands-args.types-zglMcgeO.js";
import "../model-selection-CpOQi1Qo.js";
import { a as CommandArgsParsing, l as NativeCommandSpec, r as CommandArgDefinition, t as ChatCommandDefinition } from "../commands-registry.types-Brd35eIN.js";
import { i as shouldComputeCommandAuthorized, t as hasControlCommand } from "../command-detection-DaMSWpyw.js";
import { S as listChatCommands, a as findCommandByNativeName, c as listNativeCommandSpecs, d as parseCommandArgs, f as resolveCommandArgChoices, i as canResolveCommandArgMenu, l as listNativeCommandSpecsForConfig, m as serializeCommandArgs, o as formatCommandArgMenuTitle, p as resolveCommandArgMenu, r as buildCommandTextFromArgs, v as maybeResolveTextAlias, y as normalizeCommandBody } from "../commands-registry-BW713Hc2.js";
import { i as resolveCommandAuthorization, n as resolveStoredModelOverride, o as resolveNativeCommandSessionTargets, r as CommandAuthorization } from "../stored-model-overrides-CQDOpXlo.js";
import { n as ModelsProviderData } from "../commands-models-CxbjLRon.js";
import { t as listSkillCommandsForAgents } from "../chat-commands-Cdi1Jm1w.js";
import { n as listProviderPluginCommandSpecs } from "../command-specs-Fisi-ojh.js";
//#region src/agents/thinking-runtime.d.ts
/** Resolves an explicit session override before configured model/provider policy. */
export declare function resolveEffectiveAgentRuntime(params: {
  cfg: OpenClawConfig;
  provider: string;
  modelId: string;
  modelApi?: string | null;
  modelBaseUrl?: unknown;
  sessionEntry?: Pick<SessionEntry, "agentHarnessId" | "agentRuntimeOverride" | "modelSelectionLocked">;
} & AgentRuntimePolicyScope): string;
//#endregion
export { type ChatCommandDefinition, type CommandArgDefinition, type CommandArgValues, type CommandArgs, type CommandArgsParsing, type CommandAuthorization, type ModelsProviderData, type NativeCommandSpec, buildCommandTextFromArgs, canResolveCommandArgMenu, findCommandByNativeName, formatCommandArgMenuTitle, formatFastModeCommandOptions, formatFastModeCurrentStatus, formatFastModeSourceSuffix, formatFastModeStatusValue, hasControlCommand, listChatCommands, listNativeCommandSpecs, listNativeCommandSpecsForConfig, listProviderPluginCommandSpecs, listSkillCommandsForAgents, maybeResolveTextAlias, normalizeCommandBody, parseCommandArgs, resolveCommandArgChoices, resolveCommandArgMenu, resolveCommandAuthorization, resolveCommandAuthorizedFromAuthorizers, resolveControlCommandGate, resolveFastModeState, resolveNativeCommandSessionTargets, resolveStoredModelOverride, serializeCommandArgs, shouldComputeCommandAuthorized };