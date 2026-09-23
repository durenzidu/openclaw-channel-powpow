# @durenzidu/openclaw-channel-powpow

PowPow 地图通信渠道插件 —— 让 OpenClaw 扮演 [PowPow](https://global.powpow.online) 地图上的数字人，与地图访客实时对话。

## 架构（v1.2.0，标准 OpenClaw channel 插件）

PowPow 平台运行于 Vercel serverless + Supabase 架构，不提供常驻 WebSocket 端点（旧版 `wss://global.powpow.online:8080` 已下线）。本插件按官方 channel plugin 规范（`@openclaw/nostr` 同款组装方式）实现：

```
用户（PowPow 地图聊天）
   │  POST /api/openclaw/chat/send（平台落库 digital_human_dialogues）
   ▼
┌─────────────────────────────────────────────┐
│ 收信（两条链路，消息 ID 去重）                  │
│  1. Supabase Realtime：订阅 digital_human_   │
│     dialogues INSERT（role='user'，毫秒级）   │
│  2. 轮询兜底：GET /api/openclaw/chat/history  │
│     （默认 5s，Realtime 断连时自动降级）        │
└─────────────────────────────────────────────┘
   │  dispatchInboundDirectDm → OpenClaw agent
   ▼
┌─────────────────────────────────────────────┐
│ 回信                                          │
│  POST /api/openclaw/webhook/receive           │
│  （webhook_token 鉴权，携带 session_id 续会话， │
│   失败指数退避重试，4xx 快速失败）               │
└─────────────────────────────────────────────┘
```

特点：
- **标准插件接口**：`defineBundledChannelEntry` 入口、`runPassiveAccountLifecycle` 账号生命周期、`resolveStableChannelMessageIngress` DM 访问控制、CLI setup 向导
- **无需公网端点**：agent 只发起出站连接（Supabase Realtime + 平台 HTTPS API），本机/NAT 环境直接可用
- **双链路收信**：Realtime 主链路毫秒级，轮询兜底保证 Realtime 故障时消息不丢
- **重启安全**：启动时建立基线，不会回复历史消息
- **DM 访问控制**：复用 OpenClaw 统一策略（`open` / `allowlist` / `pairing` / `disabled`）

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
--supabase-url <url>        Supabase 项目 URL（启用 Realtime 收信）
--supabase-anon-key <key>   Supabase anon key
```

## 配置

```json
{
  "enabled": true,
  "apiBaseUrl": "https://global.powpow.online",
  "digitalHumanId": "<数字人 ID（UUID）>",
  "webhookToken": "<平台为该数字人配置的 webhook token>",
  "supabaseUrl": "https://<你的 PowPow 平台 Supabase 项目>.supabase.co",
  "supabaseAnonKey": "<Supabase anon key>",
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

| 配置项 | 获取方式 |
|---|---|
| `digitalHumanId` | PowPow 平台个人中心 → 我的数字人；或平台数据库 `user_digital_humans.id` |
| `webhookToken` | PowPow 平台数字人 webhook 设置页；或平台数据库 `digital_human_webhooks.webhook_token` |
| `supabaseUrl` / `supabaseAnonKey` | PowPow 平台的 Supabase 控制台 → Settings → API（anon key 是公开密钥） |
| `apiBaseUrl` | 平台部署地址，默认 `https://global.powpow.online` |

## 平台侧前提条件

1. **Supabase Realtime 已启用**：`digital_human_dialogues` 表需加入 Realtime publication，且 RLS 策略允许订阅该表的 INSERT 事件（平台管理员在 Supabase 控制台操作）
2. **webhook 已配置**：平台 `chat/send` 接口要求数字人存在 active 状态的 webhook 配置才会接受用户消息（`digital_human_webhooks` 表有记录且 status='active'）。webhookUrl 指向何处不影响本插件收信（收信走 Realtime/轮询），但缺失会导致用户发消息直接被平台拒绝
3. **数字人处于活跃状态**：`user_digital_humans.is_active = true`

## 已知限制

- **媒体回复降级为文本**：平台 `webhook/receive` 接口以纯文本存储回复，图片/语音/视频回复会以 `[图片] url` 形式的文本发出
- **多媒体接收**：用户消息中的图片/语音/视频以描述文本呈现（平台会话表仅存文本内容）
- **不支持流式输出**：平台暂无流式回复接口，`supportsStreaming` 为 false
- **离线消息**：插件停止期间的消息不会补回复（重启基线会跳过历史消息）

## 从旧版本迁移

- **v1.0.x**：通过常驻 WebSocket（`wss://global.powpow.online:8080`）收发消息，该端点已随平台 serverless 化下线，**旧版本已完全失效**
- **v1.1.x**：仅实现通信层，未接入 OpenClaw plugin-sdk 接口层，无法被 OpenClaw 2026.9.5 运行时加载为 channel 插件
- 迁移步骤：

1. 升级插件到 1.2.0（`openclaw plugins update @durenzidu/openclaw-channel-powpow`）
2. 配置改为 `channels.powpow` 顶层单账号结构（删除 `accounts[]` / `advanced` / `wsUrl` 旧字段）
3. 确认平台侧前提条件（见上）

## 开发

```bash
npm install
npm run build      # tsc 编译到 dist/
npm run type-check

# 冒烟测试（mock PowPow 服务端端到端）
node --import ./smoke/register-hooks.mjs smoke/smoke-test.mjs

# ClawHub 校验
clawhub package validate . --openclaw-version 2026.9.5
```

## License

MIT © durenzidu
