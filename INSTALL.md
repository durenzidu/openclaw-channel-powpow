# 🚀 快速安装指南

## 📦 包已准备就绪！

**文件位置**: `d:\github_powpow\openclaw-channel-powpow\soimy-openclaw-channel-powpow-1.0.0.tgz`

**版本**: v1.0.0  
**大小**: 21.4 kB  
**文件数**: 39 个

---

## ⚡ 三种安装方式

### 方式一：直接安装（推荐）

```bash
# 1. 进入包目录
cd d:\github_powpow\openclaw-channel-powpow

# 2. 安装到 OpenClaw
openclaw plugins install ./soimy-openclaw-channel-powpow-1.0.0.tgz

# 3. 验证安装
openclaw plugins list | grep powpow
```

### 方式二：发布到 ClawHub

```bash
# 1. 登录 ClawHub
openclaw login

# 2. 发布插件
openclaw plugins publish ./soimy-openclaw-channel-powpow-1.0.0.tgz

# 3. 等待审核通过后，任何人都可以安装
openclaw plugins install @soimy/openclaw-channel-powpow
```

### 方式三：本地链接（开发用）

```bash
# 1. 进入包目录
cd d:\github_powpow\openclaw-channel-powpow

# 2. 创建全局链接
npm link

# 3. 在 OpenClaw 中使用链接
openclaw plugins link @soimy/openclaw-channel-powpow
```

---

## 🎯 安装后配置

### 1. 配置 Channel

```bash
openclaw configure --section channels
```

选择 `powpow`，输入：
- 数字人 ID（从 PowPow 平台获取）
- 访问策略（open/allowlist/blocklist）

### 2. 重启 OpenClaw

```bash
openclaw gateway restart
```

### 3. 验证连接

```bash
openclaw logs | grep powpow
```

---

## 📋 配置示例

### 最小配置

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "channels": {
    "powpow": {
      "enabled": true,
      "accounts": [
        {
          "id": "dh_001",
          "digitalHumanId": "你的数字人 ID",
          "name": "AI 助手",
          "dmPolicy": "open"
        }
      ]
    }
  }
}
```

### 完整配置

```json
{
  "channels": {
    "powpow": {
      "enabled": true,
      "accounts": [
        {
          "id": "dh_main",
          "digitalHumanId": "你的数字人 ID",
          "name": "主数字人",
          "wsUrl": "wss://global.powpow.online:8080",
          "dmPolicy": "open",
          "messageType": "markdown"
        }
      ],
      "advanced": {
        "autoReconnect": true,
        "reconnectInterval": 3000,
        "maxReconnectAttempts": 10,
        "maxMessageLength": 2000,
        "enableStreaming": true,
        "enableCards": false,
        "debug": false
      }
    }
  }
}
```

---

## ✅ 验证安装

### 检查插件列表

```bash
openclaw plugins list
```

应该看到：
```
✓ @soimy/openclaw-channel-powpow v1.0.0
```

### 检查 Channel 状态

```bash
openclaw status
```

### 查看日志

```bash
openclaw logs -f | grep powpow
```

预期看到：
```
[INFO] 加载 PowPow Channel 配置...
[INFO] 配置加载成功：1 个账号
[INFO] 启动 PowPow Channel...
[INFO] 开始连接 WebSocket: wss://global.powpow.online:8080
[INFO] WebSocket 连接成功
[INFO] 账号 dh_001 连接成功
[INFO] PowPow Channel 启动完成：1 个账号
```

---

## 🐛 故障排查

### 问题 1: 插件未找到

**错误**: `Plugin not found`

**解决**:
```bash
# 确认文件存在
ls -la soimy-openclaw-channel-powpow-1.0.0.tgz

# 检查文件完整性
tar -tzf soimy-openclaw-channel-powpow-1.0.0.tgz | head
```

### 问题 2: 安装失败

**错误**: `Installation failed`

**解决**:
```bash
# 检查 OpenClaw 版本
openclaw --version

# 应该 >= 2026.3.24
# 如版本过低，请升级
openclaw update
```

### 问题 3: 连接失败

**错误**: `WebSocket connection failed`

**解决**:
```bash
# 检查配置
openclaw config get channels.powpow

# 检查网络
ping global.powpow.online

# 查看完整错误日志
openclaw logs | grep "error"
```

---

## 📚 完整文档

- **README.md**: 项目概述
- **docs/USER_GUIDE.md**: 详细使用指南
- **CLAWHUB_UPLOAD.md**: ClawHub 上传指南
- **PROJECT_COMPLETE.md**: 项目完成报告
- **TEST_PLAN.md**: 测试计划

---

## 🎉 安装完成！

安装成功后，你就可以：

1. ✅ 在 PowPow 地图上创建数字人
2. ✅ 通过 WebSocket 与用户实时通信
3. ✅ 使用 OpenClaw AI 自动回复消息
4. ✅ 支持文本、图片、语音、视频多种消息

**祝你使用愉快！** 🚀

---

## 📞 获取帮助

- GitHub Issues: https://github.com/soimy/openclaw-channel-powpow/issues
- ClawHub 文档: https://clawhub.ai/docs
- OpenClaw 文档: https://openclaw.ai/docs
