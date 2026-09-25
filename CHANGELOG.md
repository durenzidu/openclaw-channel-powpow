# Changelog

## 1.2.1（2026-09-25）

**变更：移除 Supabase Realtime 收信链路，纯轮询收信；配置字段减少三个。**

### 背景

平台侧经代码与线上实测核实：`digital_human_dialogues` 表从未加入 Realtime publication，RLS 亦不允许 anon 订阅，且 Supabase anon key 属平台私有凭证不应分发给插件用户——Realtime 链路自发布起即不可用，轮询始终是唯一收信路径。本版本删除该链路，使插件行为与文档描述一致；同时平台 `chat/send` 落库的 `metadata.sender_id` 已确认线上生效，轮询链路的访客身份（allowlist/pairing）真实可用。

### 变更

- 删除 RealtimeSubscriber（src/gateway/realtime-subscriber.ts）及 `@supabase/supabase-js` 依赖（产物瘦身）
- 配置面删除三个字段：`supabaseUrl` / `supabaseAnonKey` / `realtimeEnabled`（涉及 package.json setup 字段、openclaw.plugin.json schema、zod schema、types/account/channel-plugin-api 六处）
- CLI setup 向导参数从 6 个减至 4 个（--digital-human-id / --webhook-token / --use-env-token / --api-base-url）
- 入站处理删除 normalizeDbRow（仅 Realtime 路径使用）及 DialogueDbRow 类型
- README/manifest 描述与关键词修正：如实描述轮询收信，补充 communication/messaging/chat 关键词，配置获取改为 powwow-agent skill 引导链，平台前提条件改为官方占位端点（/api/openclaw/webhook/sink）

### 新增

- 轮询基线防护：history 首拉失败时不再"首次轮询全量分发"（迟到回复风暴风险），改为异步指数退避重试建立基线（封顶 30s），基线就绪前不分发任何消息

### 迁移

从 v1.2.0 升级：从 `channels.powpow` 配置节删除 `supabaseUrl` / `supabaseAnonKey` / `realtimeEnabled` 三个字段（schema 为 `additionalProperties: false`，残留字段会导致校验失败）。

## 1.2.0（2026-09-24）

**重大变更：插件按 OpenClaw 官方 channel plugin 规范（@openclaw/nostr 模式）完全重写，接入 plugin-sdk 接口层。配置字段与 v1.1.0 保持兼容。**

### 背景

v1.1.x 仅实现了通信层，未接入 OpenClaw plugin-sdk 接口层（ChannelPlugin / SetupAdapter / gateway 生命周期 / dispatchInboundDirectDm 派发链），无法被 OpenClaw 2026.9.5 运行时正确加载为 channel 插件。本版本对齐 @openclaw/nostr 官方插件的组装方式完全重写接口层。

### 新增

- `defineBundledChannelEntry` 标准入口（src/index.ts）+ `defineBundledChannelSetupEntry` setup 入口（src/setup-entry.ts）
- 完整 ChannelPlugin 组装（src/channel-plugin-api.ts）：meta/capabilities/configSchema/setupContract/config/messaging/gateway
- CLI setup 向导（6 字段：digitalHumanId / webhookToken / useEnvToken / apiBaseUrl / supabaseUrl / supabaseAnonKey），支持 `POWPOW_WEBHOOK_TOKEN` 环境变量注入
- gateway 生命周期接入 `runPassiveAccountLifecycle`：starting→ready→stopped 状态上报、启动基线防重放、跨链路 MessageDedup 去重、收信串行队列
- 入站派发接入 `resolveStableChannelMessageIngress` + `dispatchInboundDirectDm`：享受 OpenClaw 统一的 DM 访问控制（open/allowlist/pairing/disabled）、上下文绑定、agent 回复管线
- 出站适配器（ChannelOutboundAdapter）：`powpow:` 目标前缀、2000 字符分块、Markdown 清洗
- zod4 配置 schema（PowPowConfigSchema），复用 SDK 的 DmPolicySchema / AllowFromListSchema

### 变更

- 依赖：zod ^3 → ^4.5.4；peerDependencies 声明 openclaw >=2026.9.5（optional）
- `openclaw.plugin.json` 补充 channelConfigs.powpow.schema（JSON Schema draft-07 全字段）
- package.json 补充 openclaw 块（extensions / setupEntry / channel / compat / runtimeExtensions）
- dmPolicy 默认值改为 "open"（对齐 OpenClaw DM 策略语义）
- 删除旧接口层残留文件（src/channel.ts、src/config.ts）

## 1.1.0（2026-09-23）

**重大变更：通信层按 PowPow 平台现行架构完全重写，与 v1.0.x 配置不兼容。**

### 背景

PowPow 平台已迁移至 Vercel serverless + Supabase 架构，旧版依赖的常驻 WebSocket 端点（`wss://global.powpow.online:8080`）已下线，v1.0.x 无法收发任何消息。

### 新增

- Supabase Realtime 实时收信：订阅 `digital_human_dialogues` 表 INSERT 事件（filter `digital_human_id` + `role='user'`），毫秒级送达
- `chat/history` 轮询兜底：默认 5 秒间隔，Realtime 断连/订阅失败时自动承担全部收信，双链路消息 ID 去重
- webhook 回信走 `POST /api/openclaw/webhook/receive`：webhook_token 鉴权、携带 session_id 续接会话、指数退避重试、4xx 快速失败
- 启动基线机制：重启后不回复历史消息
- 回信会话追踪：回信自动携带最近一条用户消息的 session_id

### 变更

- 配置项变更：移除 `wsUrl`；新增 `supabaseUrl`、`supabaseAnonKey`、`accounts[].webhookToken`；`advanced` 新增 `realtimeEnabled`、`pollEnabled`、`pollIntervalMs`、`historyLimit`、`requestTimeoutMs`
- 依赖变更：移除 `ws`，新增 `@supabase/supabase-js`
- `capabilities.supportsStreaming` 改为 false（平台暂无流式回复接口）
- 媒体回复降级为文本描述（平台 `webhook/receive` 仅存文本）

### 修复

- OpenClaw 构建兼容性刷新（builtWithOpenClawVersion → 2026.9.1）
- 补充包内 `assets/icon.png`（ClawHub 商店图标）
- 补充本 CHANGELOG（v1.0.0/1.0.2 发布时缺失变更记录）

## 1.0.2（2026-04）

- 旧版 WebSocket 方案维护性更新（该版本所依赖的 8080 端点现已下线，请升级 1.1.0）

## 1.0.0（2026-04）

- 首个版本：常驻 WebSocket 双向通信、30 秒心跳、指数退避重连、多媒体消息、访问控制
