/**
 * Mock PowPow platform server for smoke tests.
 * Implements the two endpoints the plugin depends on:
 *   GET  /api/openclaw/chat/history?digitalHumanId=&limit=&offset=&order=&since=
 *   POST /api/openclaw/webhook/receive
 *
 * Mirrors the hardened platform contract (v1.2.2+):
 *   - history requires X-Webhook-Token header -> 401 otherwise
 *   - expired digital human -> 410 { code: 'DH_EXPIRED' } (see expireDigitalHuman())
 *   - order=desc returns newest first; since=<cursor> filters strictly newer
 *   - data.cursor echoes the incremental cursor (newest timestamp, or since when empty)
 *   - failReceiveWith401 = true forces webhook/receive to answer 401 (outbound failure tests)
 */
import { createServer } from "node:http";

const DH_ID = "11111111-1114-1114-1114-111111111114";
const WEBHOOK_TOKEN = "tok-abc";

export class MockPowpowServer {
  constructor() {
    this.messages = [];
    this.receivedReplies = [];
    this.requestLog = [];
    this.seq = 0;
    this.expired = false;
    this.failReceiveWith401 = false;
    this.server = createServer((req, res) => this.handle(req, res));
  }

  listen() {
    return new Promise((resolve) => {
      this.server.listen(0, "127.0.0.1", () => {
        resolve(this.server.address().port);
      });
    });
  }

  close() {
    return new Promise((resolve) => this.server.close(() => resolve()));
  }

  get baseUrl() {
    const addr = this.server.address();
    return `http://127.0.0.1:${addr.port}`;
  }

  addUserMessage({ id, sessionId, content, senderId, metadata }) {
    const msg = {
      id,
      role: "user",
      content,
      sessionId,
      digitalHumanId: DH_ID,
      timestamp: new Date().toISOString(),
      metadata: { sender_id: senderId, ...(metadata ?? {}) },
    };
    this.messages.push(msg);
    return msg;
  }

  expireDigitalHuman() {
    this.expired = true;
  }

  handle(req, res) {
    const url = new URL(req.url, "http://localhost");
    this.requestLog.push({
      method: req.method,
      path: url.pathname,
      query: url.search,
      token: req.headers["x-webhook-token"] ?? null,
    });

    if (req.method === "GET" && url.pathname === "/api/openclaw/chat/history") {
      const digitalHumanId = url.searchParams.get("digitalHumanId");
      if (digitalHumanId !== DH_ID) {
        this.sendJson(res, 404, { success: false, error: "digital human not found" });
        return;
      }
      if (this.expired) {
        this.sendJson(res, 410, {
          success: false,
          code: "DH_EXPIRED",
          error: "数字人已过期，请到 powpow 续费（1 徽章 = 30 天）",
        });
        return;
      }
      const token = req.headers["x-webhook-token"];
      if (token !== WEBHOOK_TOKEN) {
        this.sendJson(res, 401, { success: false, error: "Authentication required" });
        return;
      }
      const limit = Number(url.searchParams.get("limit") ?? "50");
      const offset = Number(url.searchParams.get("offset") ?? "0");
      const order = url.searchParams.get("order") ?? "asc";
      const since = url.searchParams.get("since");
      let list = this.messages;
      if (since) {
        list = list.filter((m) => new Date(m.timestamp) > new Date(since));
      }
      const total = list.length;
      let page = list.slice(offset, offset + limit);
      if (order === "desc") {
        page = page.slice().reverse();
      }
      // Incremental cursor: newest timestamp across the filtered set; echoes since when empty
      let cursor = since;
      for (const m of list) {
        if (!cursor || new Date(m.timestamp) > new Date(cursor)) {
          cursor = m.timestamp;
        }
      }
      this.sendJson(res, 200, {
        success: true,
        data: {
          messages: page,
          cursor,
          pagination: { total, limit, offset },
        },
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/openclaw/webhook/receive") {
      const chunks = [];
      req.on("data", (c) => chunks.push(c));
      req.on("end", () => {
        let body = {};
        try {
          body = JSON.parse(Buffer.concat(chunks).toString("utf-8"));
        } catch {
          this.sendJson(res, 400, { success: false, error: "invalid json" });
          return;
        }
        if (this.failReceiveWith401 || body.webhook_token !== WEBHOOK_TOKEN) {
          this.sendJson(res, 401, { success: false, error: "unauthorized: invalid webhook token" });
          return;
        }
        if (body.digital_human_id !== DH_ID) {
          this.sendJson(res, 404, { success: false, error: "digital human not found" });
          return;
        }
        const sessionId = body.session_id || `session-${++this.seq}`;
        const record = { ...body, sessionId, at: Date.now() };
        this.receivedReplies.push(record);
        const messageId = `reply-${++this.seq}`;
        this.messages.push({
          id: messageId,
          role: "assistant",
          content: body.message,
          sessionId,
          digitalHumanId: DH_ID,
          timestamp: new Date().toISOString(),
          metadata: { openclaw_user_id: body.openclaw_user_id ?? null },
        });
        this.sendJson(res, 200, {
          success: true,
          data: { message_id: messageId, session_id: sessionId, status: "stored" },
        });
      });
      return;
    }

    this.sendJson(res, 404, { success: false, error: "not found" });
  }

  sendJson(res, status, payload) {
    const body = JSON.stringify(payload);
    res.writeHead(status, {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    });
    res.end(body);
  }
}
