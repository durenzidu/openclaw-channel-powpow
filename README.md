# OpenClaw PowPow Channel Plugin

PowPow 地图实时通信渠道插件，用于 OpenClaw 与 PowPow 数字人的双向实时消息传递。

## 功能特性

- ✅ **实时通信** - 基于 WebSocket 的双向实时消息传输
- ✅ **流式输出** - 支持 AI 流式回复，实时传递
- ✅ **多媒体支持** - 文本、图片、语音、视频消息
- ✅ **自动重连** - 连接断开后自动重连（指数退避）
- ✅ **消息队列** - 离线时消息自动排队
- ✅ **多实例支持** - 支持多个数字人同时在线
- ✅ **访问控制** - 支持白名单/黑名单策略
- ✅ **Markdown 支持** - 支持 Markdown 格式回复

## 安装

```bash
openclaw plugins install @soimy/openclaw-channel-powpow
```

或者从源码安装：

```bash
git clone https://github.com/soimy/openclaw-channel-powpow.git
cd openclaw-channel-powpow
npm install
npm run build
openclaw plugins install -l .
```

## 快速开始

### 1. 使用 CLI 配置

```bash
openclaw configure --section channels
```

### 2. 手动配置

在 `~/.openclaw/openclaw.json` 中添加配置：

```json
{
  "channels": {
    "powpow": {
      "enabled": true,
      "accounts": [
        {
          "id": "account_001",
          "digitalHumanId": "your-digital-human-id",
          "name": "OpenClaw 助手",
          "wsUrl": "wss://global.powpow.online:8080",
          "dmPolicy": "open",
          "messageType": "markdown"
        }
      ],
      "advanced": {
        "autoReconnect": true,
        "reconnectInterval": 3000,
        "maxMessageLength": 2000,
        "enableStreaming": true,
        "debug": false
      }
    }
  }
}
```

### 3. 重启 OpenClaw

```bash
openclaw gateway restart
```

## 配置说明

### 账号配置 (accounts)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 账号唯一标识 |
| `digitalHumanId` | string | 是 | PowPow 数字人 ID |
| `name` | string | 是 | 账号名称 |
| `wsUrl` | string | 否 | WebSocket 地址，默认 `wss://global.powpow.online:8080` |
| `dmPolicy` | string | 否 | 私聊策略：`open`/`allowlist`/`blocklist`，默认 `open` |
| `allowFrom` | string[] | 否 | 白名单/黑名单用户 ID 列表 |
| `messageType` | string | 否 | 消息类型：`text`/`markdown`，默认 `markdown` |

### 高级配置 (advanced)

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `autoReconnect` | boolean | `true` | 自动重连 |
| `reconnectInterval` | number | `3000` | 重连间隔（毫秒） |
| `maxReconnectAttempts` | number | `10` | 最大重连次数 |
| `maxMessageLength` | number | `2000` | 最大消息长度 |
| `enableStreaming` | boolean | `true` | 启用流式输出 |
| `enableCards` | boolean | `false` | 启用 AI 卡片（实验性） |
| `debug` | boolean | `false` | 调试模式（详细日志） |

## 使用示例

### 单账号配置

```json
{
  "channels": {
    "powpow": {
      "enabled": true,
      "accounts": [
        {
          "id": "dh_main",
          "digitalHumanId": "your-digital-human-id",
          "name": "主数字人",
          "dmPolicy": "open"
        }
      ]
    }
  }
}
```

### 多账号配置

```json
{
  "channels": {
    "powpow": {
      "enabled": true,
      "accounts": [
        {
          "id": "dh_001",
          "digitalHumanId": "dh_id_001",
          "name": "客服助手",
          "dmPolicy": "open"
        },
        {
          "id": "dh_002",
          "digitalHumanId": "dh_id_002",
          "name": "导游助手",
          "dmPolicy": "allowlist",
          "allowFrom": ["user_vip_001", "user_vip_002"]
        }
      ]
    }
  }
}
```

### 白名单配置

```json
{
  "channels": {
    "powpow": {
      "enabled": true,
      "accounts": [
        {
          "id": "dh_vip",
          "digitalHumanId": "your-digital-human-id",
          "name": "VIP 专属助手",
          "dmPolicy": "allowlist",
          "allowFrom": ["user_001", "user_002", "user_003"]
        }
      ]
    }
  }
}
```

## 消息类型支持

| 类型 | 支持 | 说明 |
|------|------|------|
| 文本 | ✅ | 支持 Markdown 格式 |
| 图片 | ✅ | JPEG, PNG, GIF |
| 语音 | ✅ | MP3 格式 |
| 视频 | ✅ | MP4 格式 |
| AI 卡片 | 🚧 | 实验性支持 |

## 访问策略

### open（开放）
允许所有用户发送消息

### allowlist（白名单）
只允许指定用户发送消息

### blocklist（黑名单）
拒绝指定用户发送消息

## 故障排查

### 连接失败

**问题**: 无法连接到 WebSocket

**解决方案**:
1. 检查 `wsUrl` 配置是否正确
2. 确认网络连接正常
3. 检查防火墙设置
4. 查看日志：`openclaw logs | grep powpow`

### 消息发送失败

**问题**: 消息发送失败

**解决方案**:
1. 确认连接状态：`openclaw status`
2. 检查数字人 ID 是否正确
3. 查看错误日志

### 收不到消息

**问题**: 用户发送消息但没有响应

**解决方案**:
1. 确认 Channel 已启用
2. 检查访问策略配置
3. 查看 OpenClaw AI 是否正常工作
4. 检查 WebSocket 连接状态

## 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/soimy/openclaw-channel-powpow.git
cd openclaw-channel-powpow

# 安装依赖
npm install

# 构建
npm run build

# 类型检查
npm run type-check

# 监听模式
npm run dev
```

### 测试

```bash
# 运行测试
npm test
```

## 架构说明

```
┌─────────────────────────────────────────┐
│          OpenClaw Gateway               │
│    (会话管理、AI 路由、消息调度)          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         PowPow Channel Plugin           │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │  Gateway (WebSocket 连接管理)    │    │
│  │  - 连接建立/断开                 │    │
│  │  - 自动重连                      │    │
│  │  - 心跳机制                      │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  Messaging (消息处理)           │    │
│  │  - 入站消息标准化                │    │
│  │  - 出站消息发送                  │    │
│  │  - 访问控制                      │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  Config (配置管理)              │    │
│  │  - 配置加载/验证                 │    │
│  │  - 账号管理                      │    │
│  └─────────────────────────────────┘    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         PowPow 地图平台                  │
│    (WebSocket + REST API)               │
└─────────────────────────────────────────┘
```

## 与 Skill 的区别

| 功能 | Channel 插件 | Skill |
|------|------------|-------|
| **实时通信** | ✅ 负责 | ❌ 不负责 |
| **消息路由** | ✅ 负责 | ❌ 不负责 |
| **AI 回复** | ✅ 负责 | ❌ 不负责 |
| **数字人创建** | ❌ 不负责 | ✅ 负责 |
| **位置控制** | ❌ 不负责 | ✅ 负责 |
| **地图交互** | ❌ 不负责 | ✅ 负责 |

**简单说**：
- **Channel** = 通信员（负责传话）
- **Skill** = 管理员（负责管理数字人）

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- GitHub: dongtao@outlook.com
- 项目地址：https://github.com/soimy/openclaw-channel-powpow
