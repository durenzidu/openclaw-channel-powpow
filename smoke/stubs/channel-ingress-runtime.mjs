/**
 * Stub of openclaw/plugin-sdk/channel-ingress-runtime
 * resolveStableChannelMessageIngress: DM access control decision per dmPolicy.
 * Contract: returns { senderAccess: { decision, allowed, reasonCode }, commandAccess }
 */
export async function resolveStableChannelMessageIngress(params) {
  const policy = params.dmPolicy ?? "open";
  const stableId = params.subject?.stableId ?? "";
  let decision = "allow";
  let reasonCode = "allowed";

  if (policy === "disabled") {
    decision = "deny";
    reasonCode = "channel-disabled";
  } else if (policy === "allowlist") {
    const allowFrom = (params.allowFrom ?? []).map((entry) =>
      typeof entry === "object" && entry !== null ? String(entry.id ?? entry.value ?? "") : String(entry)
    );
    if (!allowFrom.includes(stableId)) {
      decision = "deny";
      reasonCode = "not-in-allowlist";
    }
  } else if (policy === "pairing") {
    decision = "deny";
    reasonCode = "not-paired";
  }

  return {
    senderAccess: {
      decision,
      allowed: decision === "allow",
      reasonCode,
    },
    commandAccess: {
      requested: false,
      authorized: false,
    },
  };
}
