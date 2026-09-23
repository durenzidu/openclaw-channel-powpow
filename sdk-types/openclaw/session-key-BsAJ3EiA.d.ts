//#region packages/session-url-contract/src/session-key.d.ts
declare const DEFAULT_MAIN_KEY = "main";
type ParsedAgentSessionKey = {
  agentId: string;
  rest: string;
};
declare function normalizeMainKey(value: string | undefined | null): string;
declare function buildAgentMainSessionKey(params: {
  agentId: string;
  mainKey?: string | undefined;
}): string;
//#endregion
//#region src/sessions/session-key-utils.d.ts
type ParsedThreadSessionSuffix = {
  baseSessionKey: string | undefined;
  threadId: string | undefined;
};
/**
 * Parse agent-scoped session keys in a canonical, case-insensitive way.
 * Returned values are canonicalized for stable comparisons/routing while
 * preserving provider-owned opaque peer IDs.
 */
declare function parseAgentSessionKey(sessionKey: string | undefined | null): ParsedAgentSessionKey | null;
declare function isCronSessionKey(sessionKey: string | undefined | null): boolean;
declare function isSubagentSessionKey(sessionKey: string | undefined | null): boolean;
declare function isAcpSessionKey(sessionKey: string | undefined | null): boolean;
declare function parseThreadSessionSuffix(sessionKey: string | undefined | null): ParsedThreadSessionSuffix;
//#endregion
//#region src/routing/session-key.d.ts
declare function resolveAgentIdFromSessionKey(sessionKey: string | undefined | null, configuredDefaultAgentId?: string): string;
declare function sanitizeAgentId(value: string | undefined | null): string;
declare function buildGroupHistoryKey(params: {
  channel: string;
  accountId?: string | null;
  peerKind: "group" | "channel";
  peerId: string;
}): string;
declare function resolveThreadSessionKeys(params: {
  baseSessionKey: string;
  threadId?: string | null;
  parentSessionKey?: string;
  useSuffix?: boolean;
  normalizeThreadId?: (threadId: string) => string;
}): {
  sessionKey: string;
  parentSessionKey?: string;
};
//#endregion
export { isAcpSessionKey as a, parseAgentSessionKey as c, buildAgentMainSessionKey as d, normalizeMainKey as f, sanitizeAgentId as i, parseThreadSessionSuffix as l, resolveAgentIdFromSessionKey as n, isCronSessionKey as o, resolveThreadSessionKeys as r, isSubagentSessionKey as s, buildGroupHistoryKey as t, DEFAULT_MAIN_KEY as u };