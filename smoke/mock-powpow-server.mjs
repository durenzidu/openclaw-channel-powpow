/**
 * Mock PowPow platform server for smoke tests.
 * Implements the two endpoints the plugin depends on:
 *   GET  /api/openclaw/chat/history?digitalHumanId=&limit=&offset=
 *   POST /api/openclaw/webhook/receive
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

  handle(req, res) {
    const url = new URL(req.url, "http://localhost");
    this.requestLog.push({ method: req.method, path: url.pathname });

    if (req.method === "GET" && url.pathname === "/api/openclaw/chat/history") {
      const digitalHumanId = url.searchParams.get("digitalHumanId");
      if (digitalHumanId !== DH_ID) {
        this.sendJson(res, 404, { success: false, error: "digital human not found" });
        return;
      }
      const limit = Number(url.searchParams.get("limit") ?? "50");
      const offset = Number(url.searchParams.get("offset") ?? "0");
      const total = this.messages.length;
      const page = this.messages.slice(
        offset,
        offset + limit
      );
      this.sendJson(res, 200, {
        success: true,
        data: {
          messages: page,
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
        if (body.webhook_token !== WEBHOOK_TOKEN) {
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
