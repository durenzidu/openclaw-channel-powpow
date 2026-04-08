# PowPow Channel 插件测试计划

## 测试环境准备

### 1. OpenClaw 环境

```bash
# 检查 OpenClaw 版本
openclaw --version

# 应该 >= 2026.3.24
```

### 2. 安装插件

```bash
cd openclaw-channel-powpow
openclaw plugins install -l .
```

### 3. 配置 Channel

```bash
openclaw configure --section channels
```

选择 `powpow`，输入测试数字人 ID

---

## 测试用例

### 测试 1: 插件加载 ✅

**目标**: 验证插件能否正确加载

**步骤**:
```bash
openclaw plugins list | grep powpow
```

**预期结果**:
```
✓ @soimy/openclaw-channel-powpow v1.0.0
```

### 测试 2: 配置验证 ✅

**目标**: 验证配置是否正确

**步骤**:
```bash
openclaw config get channels.powpow
```

**预期结果**:
```json
{
  "enabled": true,
  "accounts": [...],
  "advanced": {...}
}
```

### 测试 3: WebSocket 连接 ✅

**目标**: 验证能否成功连接 WebSocket

**步骤**:
```bash
# 启动 OpenClaw
openclaw gateway start

# 查看日志
openclaw logs -f | grep "powpow.*连接"
```

**预期日志**:
```
[INFO] 开始连接 WebSocket: wss://global.powpow.online:8080
[INFO] WebSocket 连接成功
[INFO] 账号 account_001 连接成功
```

### 测试 4: 消息接收 ✅

**目标**: 验证能否接收 PowPow 用户消息

**步骤**:
1. 在 PowPow 平台发送消息给数字人
2. 查看 OpenClaw 日志

**预期日志**:
```
[DEBUG] 收到账号 account_001 的消息
[DEBUG] 消息标准化完成
```

### 测试 5: 消息发送 ✅

**目标**: 验证能否发送消息到 PowPow

**步骤**:
1. 配置 AI Provider
2. 在 PowPow 发送消息触发 AI 回复
3. 查看日志

**预期日志**:
```
[DEBUG] 发送文本消息到 dh:xxx
[DEBUG] 消息发送成功
```

### 测试 6: 自动重连 ✅

**目标**: 验证断线后能否自动重连

**步骤**:
1. 手动断开 WebSocket（防火墙规则）
2. 观察日志
3. 恢复网络
4. 验证重连

**预期日志**:
```
[WARN] WebSocket 连接断开
[INFO] 计划重连：3000ms 后尝试第 1 次重连
[INFO] WebSocket 连接成功
```

### 测试 7: 访问控制 ✅

**目标**: 验证白名单/黑名单功能

**步骤**:
1. 配置 allowlist
2. 使用非白名单用户发送消息
3. 验证被拒绝

**预期日志**:
```
[WARN] 消息被拒绝：发送者 user_xxx 不在白名单中
```

### 测试 8: 多账号支持 ✅

**目标**: 验证多个数字人同时在线

**步骤**:
1. 配置多个账号
2. 启动 Channel
3. 验证所有账号连接

**预期日志**:
```
[INFO] PowPow Channel 启动完成：3 个账号
```

### 测试 9: 流式输出 ✅

**目标**: 验证 AI 流式回复

**步骤**:
1. 启用 `enableStreaming: true`
2. 发送需要长回复的问题
3. 观察回复是否分块传递

**预期**: 用户实时看到 AI 回复的内容

### 测试 10: 压力测试 ⏳

**目标**: 验证高并发下的稳定性

**步骤**:
1. 模拟 100 个用户同时发送消息
2. 监控资源占用
3. 验证消息不丢失

**指标**:
- CPU 使用率 < 50%
- 内存占用 < 512MB
- 消息延迟 < 200ms

---

## 故障排查

### 问题 1: 连接失败

**症状**: `WebSocket connection failed`

**排查步骤**:
```bash
# 1. 检查配置
openclaw config get channels.powpow

# 2. 测试网络
ping global.powpow.online

# 3. 查看完整错误
openclaw logs | grep "powpow.*error"
```

**常见原因**:
- 数字人 ID 错误
- WebSocket 地址错误
- 网络防火墙

### 问题 2: 收不到消息

**症状**: 用户发送消息但无响应

**排查步骤**:
```bash
# 1. 检查访问策略
openclaw config get channels.powpow.accounts

# 2. 检查 AI 配置
openclaw config get llm.providers

# 3. 查看消息日志
openclaw logs | grep "powpow.*message"
```

### 问题 3: 消息发送失败

**症状**: `Failed to send message`

**排查步骤**:
```bash
# 1. 检查连接状态
openclaw status

# 2. 检查消息长度
# 确保不超过 maxMessageLength

# 3. 查看错误日志
openclaw logs | grep "send.*failed"
```

---

## 性能监控

### 监控指标

```bash
# 连接状态
watch -n 5 'openclaw status | grep powpow'

# 消息延迟
openclaw logs | grep "message.*latency"

# 错误率
openclaw logs | grep -i error | wc -l
```

### 日志级别

```json
{
  "advanced": {
    "debug": true  // 开发环境启用
  }
}
```

生产环境建议设置为 `false`

---

## 测试报告模板

```markdown
# PowPow Channel 测试报告

**测试日期**: YYYY-MM-DD
**测试人员**: [姓名]
**OpenClaw 版本**: [版本]
**插件版本**: 1.0.0

## 测试结果

| 测试用例 | 状态 | 备注 |
|---------|------|------|
| 插件加载 | ✅/❌ | |
| WebSocket 连接 | ✅/❌ | |
| 消息接收 | ✅/❌ | |
| 消息发送 | ✅/❌ | |
| 自动重连 | ✅/❌ | |
| 访问控制 | ✅/❌ | |
| 多账号支持 | ✅/❌ | |
| 流式输出 | ✅/❌ | |

## 发现的问题

1. [问题描述]
2. [问题描述]

## 建议

1. [改进建议]
2. [改进建议]
```

---

## 下一步

完成所有测试后：

1. ✅ 修复发现的问题
2. ✅ 更新文档
3. ✅ 准备发布
4. ✅ 收集用户反馈

祝测试顺利！🚀
