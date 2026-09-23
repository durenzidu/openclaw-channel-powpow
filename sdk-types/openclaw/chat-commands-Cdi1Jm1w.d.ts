import { Ml as ExecPolicyOverrides, Nl as ExecSessionDefaults } from "./agent-harness-runtime-D1Ww9PgY.js";
import { r as OpenClawConfig } from "./types.openclaw-DRlyXvhd.js";
import { y as PluginMetadataSnapshot } from "./io-BLJj5WUL.js";
import { j as SessionEntry } from "./templating-BzAleqvS.js";
import { n as SkillCommandSpec } from "./types-C7DkTXEA.js";
//#region src/skills/discovery/chat-command-invocation.d.ts
/** Lists slash command names reserved by built-in chat commands and callers. */
declare function listReservedChatSlashCommandNames(extraNames?: string[]): Set<string>;
declare function resolveSkillCommandInvocation(params: {
  commandBodyNormalized: string;
  skillCommands: SkillCommandSpec[];
}): {
  command: SkillCommandSpec;
  args?: string;
  inline?: boolean;
} | null;
//#endregion
//#region src/skills/discovery/chat-commands.d.ts
declare function listSkillCommandsForWorkspace(params: {
  workspaceDir: string;
  cfg: OpenClawConfig;
  agentId?: string;
  skillFilter?: string[];
  sessionEntry?: ExecSessionDefaults & Pick<SessionEntry, "skillLibrarySelections" | "skillsSnapshot">;
  sessionKey?: string;
  execOverrides?: ExecPolicyOverrides;
  includeAllowlistHidden?: boolean;
  pluginMetadataSnapshot?: PluginMetadataSnapshot;
}): SkillCommandSpec[];
type AgentSkillCommandParams = {
  cfg: OpenClawConfig;
  agentIds?: string[];
  sessionEntry?: ExecSessionDefaults & Pick<SessionEntry, "skillLibrarySelections" | "skillsSnapshot">;
  sessionKey?: string;
  execOverrides?: ExecPolicyOverrides;
};
/** Synchronous public SDK contract for native command consumers. */
declare function listSkillCommandsForAgents(params: AgentSkillCommandParams): SkillCommandSpec[];
//#endregion
export { resolveSkillCommandInvocation as i, listSkillCommandsForWorkspace as n, listReservedChatSlashCommandNames as r, listSkillCommandsForAgents as t };