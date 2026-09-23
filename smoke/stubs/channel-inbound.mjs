/**
 * Stub of openclaw/plugin-sdk/channel-inbound
 * dispatchInboundDirectDm: re-resolves ingress, then simulates the agent
 * pipeline by replying with an echo of bodyForAgent, delivered through the
 * plugin's deliver() callback. Contract per SDK d.ts.
 */
export async function dispatchInboundDirectDm(params) {
  let ingress;
  try {
    ingress = await params.resolveChannelIngress(undefined);
  } catch (err) {
    params.onDispatchError?.(err, { kind: "ingress" });
    return;
  }
  if (!ingress?.senderAccess?.allowed) {
    return;
  }

  const replyText = `ECHO[${params.channel}:${params.senderId}] ${params.bodyForAgent}`;
  try {
    await params.deliver({ text: replyText });
  } catch (err) {
    params.onDispatchError?.(err, { kind: "reply" });
  }
}
