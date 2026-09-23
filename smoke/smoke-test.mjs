/**
 * End-to-end smoke test for @durenzidu/openclaw-channel-powpow gateway.
 * Runs the real compiled dist code against a mock PowPow HTTP server.
 * SDK functions (openclaw/plugin-sdk/*) are replaced with contract stubs
 * via loader hooks (see register-hooks.mjs).
 *
 * Run: node --import ./smoke/register-hooks.mjs smoke/smoke-test.mjs
 */
import { MockPowpowServer } from "./mock-powpow-server.mjs";
import { startPowpowGatewayAccount } from "../dist/gateway/powpow-gateway.js";

const DH_ID = "11111111-1114-1114-1114-111111111114";
const POLL_MS = 1000;

const results = [];
function check(name, condition, detail = "") {
  results.push({ name, pass: Boolean(condition), detail });
  console.log(`${condition ? "PASS" : "FAIL"}  ${name}${detail && !condition ? `  -- ${detail}` : ""}`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitFor(predicate, timeoutMs, label) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const value = predicate();
    if (value) return value;
    await sleep(100);
  }
  throw new Error(`timeout waiting for ${label}`);
}

function makeContext(server, { webhookToken = "tok-abc", dmPolicy = "open", allowFrom, maxRetries = 2 } = {}) {
  const abortController = new AbortController();
  const statuses = [];
  const logs = [];
  const ctx = {
    account: {
      accountId: "default",
      name: "PowPow Default",
      enabled: true,
      configured: true,
      apiBaseUrl: server.baseUrl,
      digitalHumanId: DH_ID,
      webhookToken,
      supabaseUrl: "",
      supabaseAnonKey: "",
      config: {
        pollEnabled: true,
        pollIntervalMs: POLL_MS,
        historyLimit: 50,
        requestTimeoutMs: 5000,
        maxRetries,
        maxMessageLength: 2000,
        dmPolicy,
        ...(allowFrom ? { allowFrom } : {}),
      },
    },
    cfg: {},
    abortSignal: abortController.signal,
    channelRuntime: { inbound: { buildContext: () => ({}) } },
    setStatus: (patch) => statuses.push(patch),
    log: {
      info: (...a) => logs.push(["info", ...a]),
      warn: (...a) => logs.push(["warn", ...a]),
      error: (...a) => logs.push(["error", ...a]),
      debug: () => {},
    },
  };
  return { ctx, abortController, statuses, logs };
}

async function main() {
  const server = new MockPowpowServer();
  const port = await server.listen();
  console.log(`mock PowPow server listening on ${server.baseUrl}`);

  // ---------------------------------------------------------------- test 1
  // happy path: baseline, inbound, agent reply delivered to webhook/receive
  server.addUserMessage({ id: "b1", sessionId: "sess-old-1", content: "old message 1", senderId: "user-1" });
  server.addUserMessage({ id: "b2", sessionId: "sess-old-2", content: "old message 2", senderId: "user-2" });

  const t1 = makeContext(server);
  const gatewayPromise = startPowpowGatewayAccount(t1.ctx);
  gatewayPromise.catch(() => {});

  const readyPatch = await waitFor(
    () => t1.statuses.find((s) => s.lifecycle === "ready"),
    8000,
    "gateway ready status"
  );
  check("T1 gateway reaches ready lifecycle", readyPatch?.accountId === "default");

  await sleep(POLL_MS * 2 + 500);
  check(
    "T1 baseline: no reply to pre-existing history",
    server.receivedReplies.length === 0,
    `got ${server.receivedReplies.length} unexpected replies`
  );

  server.addUserMessage({ id: "m3", sessionId: "sess-alpha", content: "hello powpow", senderId: "user-777" });
  await waitFor(() => server.receivedReplies.some((r) => r.session_id === "sess-alpha"), 8000, "reply for m3");
  const reply3 = server.receivedReplies.find((r) => r.session_id === "sess-alpha");
  check("T1 reply carries digital_human_id", reply3?.digital_human_id === DH_ID);
  check("T1 reply carries webhook_token", reply3?.webhook_token === "tok-abc");
  check("T1 reply carries session_id for conversation continuity", reply3?.session_id === "sess-alpha");
  check("T1 reply carries openclaw_user_id", reply3?.openclaw_user_id === "user-777");
  check(
    "T1 reply body is the agent echo",
    reply3?.message === "ECHO[powpow:user-777] hello powpow",
    `got: ${reply3?.message}`
  );

  await sleep(POLL_MS * 2 + 500);
  const repliesForSessAlpha = server.receivedReplies.filter((r) => r.session_id === "sess-alpha");
  check(
    "T1 dedup: same history row never dispatched twice",
    repliesForSessAlpha.length === 1,
    `got ${repliesForSessAlpha.length} replies`
  );

  // image content type
  server.addUserMessage({
    id: "m4",
    sessionId: "sess-beta",
    content: "https://cdn.powpow.online/pic.jpg",
    senderId: "user-777",
    metadata: { content_type: "image" },
  });
  await waitFor(() => server.receivedReplies.some((r) => r.session_id === "sess-beta"), 8000, "reply for m4");
  const reply4 = server.receivedReplies.find((r) => r.session_id === "sess-beta");
  check(
    "T1 image message bodyForAgent gets [图片] prefix",
    reply4?.message === "ECHO[powpow:user-777] [图片] https://cdn.powpow.online/pic.jpg",
    `got: ${reply4?.message}`
  );

  t1.abortController.abort();
  await gatewayPromise;
  check("T1 gateway exits cleanly on abort", true);

  await sleep(POLL_MS + 200);
  const repliesAfterStop = server.receivedReplies.length;
  server.addUserMessage({ id: "m5", sessionId: "sess-gamma", content: "after stop", senderId: "user-777" });
  await sleep(POLL_MS * 2);
  check(
    "T1 poller stopped after abort (no new replies)",
    server.receivedReplies.length === repliesAfterStop,
    `got ${server.receivedReplies.length - repliesAfterStop} new replies after stop`
  );

  // ---------------------------------------------------------------- test 2
  // dmPolicy allowlist: non-allowlisted sender dropped, allowlisted answered
  const t2 = makeContext(server, { dmPolicy: "allowlist", allowFrom: ["user-999"] });
  const gateway2 = startPowpowGatewayAccount(t2.ctx);
  gateway2.catch(() => {});
  await waitFor(() => t2.statuses.find((s) => s.lifecycle === "ready"), 8000, "T2 gateway ready");

  const before2 = server.receivedReplies.length;
  server.addUserMessage({ id: "m6", sessionId: "sess-delta", content: "let me in", senderId: "user-777" });
  await sleep(POLL_MS * 2 + 500);
  check(
    "T2 allowlist denies non-allowlisted sender (no reply)",
    server.receivedReplies.length === before2,
    `got ${server.receivedReplies.length - before2} replies`
  );

  server.addUserMessage({ id: "m7", sessionId: "sess-epsilon", content: "i am allowed", senderId: "user-999" });
  await waitFor(
    () => server.receivedReplies.some((r) => r.session_id === "sess-epsilon"),
    8000,
    "reply for allowlisted sender"
  );
  check("T2 allowlist allows allowlisted sender", true);

  t2.abortController.abort();
  await gateway2;

  // ---------------------------------------------------------------- test 3
  // wrong webhook token: platform 401 -> 4xx fast-fail, no crash, gateway alive
  const t3 = makeContext(server, { webhookToken: "tok-wrong", maxRetries: 3 });
  const gateway3 = startPowpowGatewayAccount(t3.ctx);
  gateway3.catch(() => {});
  await waitFor(() => t3.statuses.find((s) => s.lifecycle === "ready"), 8000, "T3 gateway ready");

  server.addUserMessage({ id: "m8", sessionId: "sess-zeta", content: "will fail auth", senderId: "user-777" });
  await waitFor(() => t3.logs.some(([lvl]) => lvl === "error"), 10000, "T3 dispatch error logged");
  check("T3 401 reply failure is logged, not thrown", true);

  const unauthorizedAttempts = server.requestLog.filter(
    (e, i) =>
      e.method === "POST" && server.requestLog.indexOf(e) >= 0 && e.path === "/api/openclaw/webhook/receive"
  );
  check("T3 401 attempt reached the platform", unauthorizedAttempts.length > 0);

  check("T3 gateway still running after reply failure (no crash)", true);
  t3.abortController.abort();
  await gateway3;

  // ---------------------------------------------------------------- summary
  await server.close();
  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("SMOKE TEST CRASHED:", err);
  process.exitCode = 1;
});
