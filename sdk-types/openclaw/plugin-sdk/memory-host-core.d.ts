import { $u as MemoryPluginPublicArtifact, Qu as MemoryPluginCapability, dd as clearMemoryPluginState, fd as getMemoryCapabilityRegistration, hd as registerMemoryCorpusSupplement, md as registerMemoryCapability, pd as listActiveMemoryPublicArtifacts, td as MemoryPromptSectionBuilder, ud as buildMemoryPromptSection } from "../agent-harness-runtime-D1Ww9PgY.js";
import { r as OpenClawConfig } from "../types.openclaw-DRlyXvhd.js";
import { r as resolveSessionTranscriptsDirForAgent } from "../paths-B65mfFh-.js";
import "../config-CJdvsHqC.js";
import { f as resolveDefaultAgentId } from "../agent-scope-CeViFjsB.js";
import { t as resolveSessionAgentIdCompatibility } from "../agent-scope-runtime-PshTaJwr.js";
//#region src/plugin-sdk/memory-host-core.d.ts
/** Lists public memory artifacts across all configured memory workspaces. */
export declare function listMemoryHostPublicArtifacts(params: {
  cfg: OpenClawConfig;
}): Promise<MemoryPluginPublicArtifact[]>;
//#endregion
export { type MemoryPluginCapability, type MemoryPluginPublicArtifact, type MemoryPromptSectionBuilder, buildMemoryPromptSection as buildActiveMemoryPromptSection, clearMemoryPluginState, getMemoryCapabilityRegistration, listActiveMemoryPublicArtifacts, registerMemoryCapability, registerMemoryCorpusSupplement, resolveDefaultAgentId, resolveSessionAgentIdCompatibility as resolveSessionAgentId, resolveSessionTranscriptsDirForAgent };