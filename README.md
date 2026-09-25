# @durenzidu/openclaw-channel-powpow

PowPow 地图通信渠道插件 —— 让 OpenClaw 扮演 [PowPow](https://global.powpow.online) 地图上的数字人，与地图访客实时对话。

## 架构（v1.2.1，标准 OpenClaw channel 插件）

PowPow 平台运行于 Vercel serverless + Supabase 架构，不提供常驻 WebSocket 端点（旧版 `wss://global.powpow.online:8080` 已下线）。本插件按官方 channel plugin 规范（`@openclaw/nostr` 同款组装方式）实现：

```
用户（PowPow 地图聊天）
   │  POST /api/openclaw/chat/send（平台落库 digital_human_dialogues）
   ▼
┌─────────────────────────────────────────────┐
│ 收信：GET /api/openclaw/chat/history 轮询    │
│  · 默认 5s，可调至 2~3s（pollIntervalMs）     │
│  · 消息 ID 去重 + 重启基线                   │
│  · 基线未建立前不分发（防迟到回复风暴）       │
└─────────────────────────────────────────────┘
   │  dispatchInboundDirectDm → OpenClaw agent
   ▼
┌─────────────────────────────────────────────┐
│ 回信                                          │
│  POST /api/openclaw/webhook/receive           │
│  （webhook_token 鉴权，携带 session_id 续会话，│
│   失败指数退避重试，4xx 快速失败）              │
└─────────────────────────────────────────────┘
```

特点：
- **标准插件接口**：`defineBundledChannelEntry` 入口、`runPassiveAccountLifecycle` 账号生命周期、`resolveStableChannelMessageIngress` DM 访问控制、CLI setup 向导
- **无需公网端点**：agent 只发起出站 HTTPS 连接，本机/NAT 环境直接可用
- **访客身份访问控制**：平台落库 `metadata.sender_id`，插件据此识别发件人，`open` / `allowlist` / `pairing` / `disabled` 策略真实可用
- **重启安全**：启动时建立基线，不会回复历史消息；基线建立失败时自动退避重试，就绪前不分发

## 安装

```bash
openclaw plugins install @durenzidu/openclaw-channel-powpow
```

安装后按 CLI setup 向导配置（或直接编辑 `channels.powpow` 配置节）：

```
--digital-human-id <id>     PowPow 数字人 UUID
--webhook-token <token>     webhook token（敏感字段）
--use-env-token             改用环境变量 POWPOW_WEBHOOK_TOKEN
--api-base-url <url>        平台 API 地址（默认 https://global.powpow.online）
```

## 配置

```json
{
  "enabled": true,
  "apiBaseUrl": "https://global.powpow.online",
  "digitalHumanId": "<数字人 ID（UUID）>",
  "webhookToken": "<webhook token>",
  "dmPolicy": "open",
  "allowFrom": [],
  "pollEnabled": true,
  "pollIntervalMs": 5000,
  "historyLimit": 50,
  "requestTimeoutMs": 10000,
  "maxRetries": 3,
  "maxMessageLength": 2000
}
```

### 配置项从哪里拿

**推荐路径（配套 skill）**：安装 [powwow-agent](https://clawhub.ai/durenzidu/skills/powwow-agent)（ClawHub 配套管理 skill），用它的 create 命令创建数字人时会自动生成 webhookToken、自动配置占位 webhook，并直接给出本插件所需的全部配置项。

**手动路径**：

| 配置项 | 获取方式 |
|---|---|
| `digitalHumanId` | PowPow 平台个人中心 → 我的数字人；或平台数据库 `user_digital_humans.id` |
| `webhookToken` | 创建数字人时自行传入的 token（`digital_human_webhooks.webhook_token`）；自备 token 意味着它由你生成、你保管 |
| `apiBaseUrl` | 平台部署地址，默认 `https://global.powpow.online` |

## 平台侧前提条件

1. **webhook 已配置**：平台 `chat/send` 接口要求数字人存在 active 状态的 webhook 配置才会接受用户消息。本插件收信走轮询、不监听公网，webhookUrl 建议配置为平台官方占位端点 `https://global.powpow.online/api/openclaw/webhook/sink`——转发即时返回 2xx，访客发送消息不会等待重试
2. **数字人处于活跃状态**：`user_digital_humans.is_active = true`

## 已知限制

- **媒体消息以文本呈现**：平台会话表仅存文本内容，图片/语音/视频消息以描述文本进入 agent
- **不支持流式输出**：平台暂无流式回复接口
- **离线消息**：插件停止期间的消息不会补回复（重启基线会跳过历史消息）

## 从旧版本迁移

- **v1.0.x**：通过常驻 WebSocket（`wss://global.powpow.online:8080`）收发消息，该端点已随平台 serverless 化下线，**旧版本已完全失效**
- **v1.1.x**：仅实现通信层，未接入 OpenClaw plugin-sdk 接口层，无法被 OpenClaw 2026.9.5 运行时加载为 channel 插件
- **v1.2.0 → v1.2.1**：移除 Supabase Realtime 收信链路（平台从未启用 Realtime publication，链路不可用），删除 `supabaseUrl` / `supabaseAnonKey` / `realtimeEnabled` 三个配置字段，纯轮询收信
- 迁移步骤：

1. 升级插件到 1.2.1（`openclaw plugins update @durenzidu/openclaw-channel-powpow`）
2. 从 `channels.powpow` 配置节删除 `supabaseUrl` / `supabaseAnonKey` / `realtimeEnabled` 三个字段（配置 schema 为 `additionalProperties: false`，残留字段会导致校验失败）
3. 确认平台侧前提条件（见上）

## 开发

```bash
npm install
npm run build      # tsc 编译到 dist/
npm run type-check

# 冒烟测试（mock PowPow 服务端端到端，16 项检查）
node --import ./smoke/register-hooks.mjs smoke/smoke-test.mjs

# ClawHub 校验
clawhub package validate . --openclaw-version 2026.9.5
```

## License

MIT © durenzidu
