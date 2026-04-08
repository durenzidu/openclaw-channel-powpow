# PowPow Channel 使用指南

## 快速开始

### 第一步：安装插件

```bash
# 方式一：从 NPM 安装（推荐）
openclaw plugins install @soimy/openclaw-channel-powpow

# 方式二：从源码安装
cd openclaw-channel-powpow
npm install
npm run build
openclaw plugins install -l .
```

### 第二步：配置 Channel

#### 使用交互式配置（推荐）

```bash
openclaw configure --section channels
```

按提示选择 `powpow`，然后输入：
- 数字人 ID（从 PowPow 平台获取）
- 访问策略（open/allowlist/blocklist）
- 其他可选配置

#### 手动编辑配置文件

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "channels": {
    "powpow": {
      "enabled": true,
      "accounts": [
        {
          "id": "my_digital_human",
          "digitalHumanId": "从 PowPow 平台获取的数字人 ID",
          "name": "我的 AI 助手",
          "dmPolicy": "open",
          "messageType": "markdown"
        }
      ],
      "advanced": {
        "autoReconnect": true,
        "reconnectInterval": 3000,
        "debug": false
      }
    }
  }
}
```

### 第三步：重启 OpenClaw

```bash
openclaw gateway restart
```

### 第四步：验证连接

```bash
# 查看日志
openclaw logs | grep powpow

# 查看状态
openclaw status
```

## 配置详解

### 基础配置

```json
{
  "channels": {
    "powpow": {
      "enabled": true,          // 是否启用
      "accounts": [             // 账号列表（最多支持多个）
        {
          "id": "account_001",  // 账号唯一标识
          "digitalHumanId": "dh_xxx", // 数字人 ID（必填）
          "name": "AI 助手",     // 账号名称
          "wsUrl": "wss://global.powpow.online:8080", // WebSocket 地址
          "dmPolicy": "open",   // 私聊策略
          "allowFrom": [],      // 白名单/黑名单
          "messageType": "markdown" // 消息类型
        }
      ]
    }
  }
}
```

### 访问策略配置

#### 1. 开放模式（open）

允许所有用户发送消息：

```json
{
  "dmPolicy": "open"
}
```

#### 2. 白名单模式（allowlist）

只允许指定用户发送消息：

```json
{
  "dmPolicy": "allowlist",
  "allowFrom": ["user_001", "user_002", "user_003"]
}
```

#### 3. 黑名单模式（blocklist）

拒绝指定用户发送消息：

```json
{
  "dmPolicy": "blocklist",
  "allowFrom": ["spam_user_001", "spam_user_002"]
}
```

### 高级配置

```json
{
  "advanced": {
    "autoReconnect": true,              // 自动重连
    "reconnectInterval": 3000,          // 重连间隔（毫秒）
    "maxReconnectAttempts": 10,         // 最大重连次数
    "maxMessageLength": 2000,           // 最大消息长度
    "enableStreaming": true,            // 启用流式输出
    "enableCards": false,               // 启用 AI 卡片（实验性）
    "debug": false                      // 调试模式
  }
}
```

## 多账号配置

支持同时运行多个数字人：

```json
{
  "channels": {
    "powpow": {
      "enabled": true,
      "accounts": [
        {
          "id": "customer_service",
          "digitalHumanId": "dh_cs_001",
          "name": "客服助手",
          "dmPolicy": "open"
        },
        {
          "id": "tour_guide",
          "digitalHumanId": "dh_tg_001",
          "name": "导游助手",
          "dmPolicy": "allowlist",
          "allowFrom": ["vip_user_001", "vip_user_002"]
        },
        {
          "id": "sales",
          "digitalHumanId": "dh_sales_001",
          "name": "销售助手",
          "dmPolicy": "open"
        }
      ]
    }
  }
}
```

## 与 OpenClaw AI 集成

### 配置 AI Provider

确保在 `~/.openclaw/openclaw.json` 中配置了 AI Provider：

```json
{
  "llm": {
    "providers": [
      {
        "id": "claude",
        "provider": "anthropic",
        "apiKey": "sk-xxx",
        "defaultModel": "claude-sonnet-4-5-20250929"
      }
    ]
  },
  "agents": {
    "default": {
      "provider": "claude",
      "model": "claude-sonnet-4-5-20250929",
      "systemPrompt": "你是一个友好的 AI 助手，通过 PowPow 地图与用户交流。"
    }
  }
}
```

### 设置 Agent 系统提示

为 PowPow Channel 设置专用的系统提示：

```json
{
  "agents": {
    "powpow": {
      "provider": "claude",
      "model": "claude-sonnet-4-5-20250929",
      "systemPrompt": "你是一个 PowPow 地图上的 AI 数字人助手。你的回复应该：\n1. 简洁友好\n2. 使用 Markdown 格式\n3. 适合地图场景的对话\n4. 提供实用的建议和信息"
    }
  }
}
```

## 消息格式

### 文本消息

支持 Markdown 格式：

```markdown
**粗体**
*斜体*
[链接](https://example.com)
- 列表项
1. 有序列表
> 引用
`代码`
```

### 多媒体消息

#### 图片消息

```json
{
  "contentType": "image",
  "content": "这是一张美丽的风景照片",
  "mediaUrl": "https://example.com/image.jpg"
}
```

#### 语音消息

```json
{
  "contentType": "voice",
  "content": "你好，我是 AI 助手",
  "mediaUrl": "https://example.com/voice.mp3",
  "duration": 5
}
```

## 故障排查

### 查看日志

```bash
# 实时查看日志
openclaw logs -f | grep powpow

# 查看最近的日志
openclaw logs --tail 100 | grep powpow
```

### 常见问题

#### 1. 连接失败

**错误**: `WebSocket connection failed`

**原因**:
- 网络问题
- WebSocket 地址错误
- 数字人 ID 错误

**解决**:
```bash
# 检查配置
openclaw config get channels.powpow

# 测试网络连接
ping global.powpow.online

# 查看完整错误日志
openclaw logs | grep "powpow.*error"
```

#### 2. 消息发送失败

**错误**: `Failed to send message`

**原因**:
- WebSocket 未连接
- 消息长度超限
- 权限不足

**解决**:
```bash
# 检查连接状态
openclaw status

# 检查消息长度
# 确保不超过 maxMessageLength 配置
```

#### 3. 收不到消息

**错误**: 用户发送消息但没有响应

**原因**:
- 访问策略限制
- AI Provider 未配置
- 消息处理错误

**解决**:
```bash
# 检查访问策略
openclaw config get channels.powpow.accounts

# 检查 AI 配置
openclaw config get llm.providers

# 查看消息处理日志
openclaw logs | grep "powpow.*message"
```

## 性能优化

### 调整重连策略

```json
{
  "advanced": {
    "reconnectInterval": 5000,      // 增加重连间隔
    "maxReconnectAttempts": 5       // 减少最大重连次数
  }
}
```

### 启用调试模式

```json
{
  "advanced": {
    "debug": true
  }
}
```

### 监控连接状态

定期检查连接状态：

```bash
# 每 5 秒检查一次
watch -n 5 'openclaw status | grep powpow'
```

## 最佳实践

### 1. 使用环境变量

敏感信息使用环境变量：

```json
{
  "channels": {
    "powpow": {
      "accounts": [
        {
          "digitalHumanId": "${POWPOW_DIGITAL_HUMAN_ID}"
        }
      ]
    }
  }
}
```

### 2. 配置备份

定期备份配置：

```bash
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.backup.$(date +%Y%m%d)
```

### 3. 监控告警

设置监控告警（需要额外工具）：

```bash
# 示例：监控日志中的错误
tail -f $(openclaw logs --path) | grep -i error | mail -s "PowPow Error" admin@example.com
```

## 升级指南

### 升级插件

```bash
# 从 NPM 升级
openclaw plugins update powpow

# 从源码升级
cd openclaw-channel-powpow
git pull
npm install
npm run build
openclaw plugins install -l .
```

### 检查版本

```bash
openclaw plugins list | grep powpow
```

## 卸载

```bash
# 禁用 Channel
openclaw config set channels.powpow.enabled false

# 卸载插件
openclaw plugins uninstall powpow

# 删除配置
openclaw config delete channels.powpow
```

## 获取帮助

```bash
# 查看帮助文档
openclaw help channels.powpow

# 查看配置帮助
openclaw help config
```

## 社区支持

- GitHub Issues: https://github.com/soimy/openclaw-channel-powpow/issues
- 讨论区：https://github.com/soimy/openclaw-channel-powpow/discussions
