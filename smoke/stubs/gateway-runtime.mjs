/**
 * Stub of openclaw/plugin-sdk/gateway-runtime
 */
export function channelReadyPatch({ accountId }) {
  return { accountId, lifecycle: "ready" };
}
