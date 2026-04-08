/**
 * PowPow Channel 主入口
 * 实现 OpenClaw Channel Plugin 接口
 */

import type { ChannelPlugin } from './types.js';
import { powpowChannelMeta, powpowChannelCapabilities } from './types.js';
import { loadConfig, getConfig, getEnabledAccounts } from './config.js';
import { createConnectionManager, type WebSocketConnectionManager } from './gateway/connection-manager.js';
import { normalizeIncomingMessage, shouldProcessMessage } from './messaging/inbound-handler.js';
import { logger } from './shared/logger.js';

// 存储连接管理器
const connectionManagers: Map<string, WebSocketConnectionManager> = new Map();

/**
 * PowPow Channel 插件定义
 */
export const powpowChannel: ChannelPlugin = {
  id: 'powpow',
  meta: powpowChannelMeta,
  capabilities: powpowChannelCapabilities,
  
  // 配置适配器
  config: {
    resolve: (ctx) => {
      logger.info('解析 PowPow Channel 配置...');
      
      try {
        const config = loadConfig(ctx.config);
        
        return {
          accounts: config.accounts.map(acc => ({
            id: acc.id,
            digitalHumanId: acc.digitalHumanId,
            name: acc.name,
            wsUrl: acc.wsUrl || 'wss://global.powpow.online:8080',
            dmPolicy: acc.dmPolicy || 'open',
            allowFrom: acc.allowFrom || [],
          })),
          advanced: config.advanced,
        };
      } catch (error) {
        logger.error('配置解析失败:', error);
        throw error;
      }
    },
  },
  
  // 网关：连接生命周期管理
  gateway: {
    start: async (ctx: any) => {
      logger.info('启动 PowPow Channel...');
      
      const accounts = getEnabledAccounts();
      const connections: Map<string, WebSocketConnectionManager> = new Map();
      
      for (const account of accounts) {
        try {
          logger.info(`为账号 ${account.id} 建立连接...`);
          
          const connection = createConnectionManager(account, {
            onConnected: () => {
              logger.info(`账号 ${account.id} 连接成功`);
            },
            onDisconnected: () => {
              logger.warn(`账号 ${account.id} 连接断开`);
            },
            onMessage: async (wsMessage) => {
              logger.debug(`收到账号 ${account.id} 的消息:`, wsMessage);
              
              // 标准化消息
              const normalized = normalizeIncomingMessage(wsMessage);
              if (!normalized) {
                return;
              }
              
              // 访问控制检查
              if (!shouldProcessMessage(normalized, account.allowFrom)) {
                logger.warn(`消息被拒绝：发送者 ${normalized.senderId} 不在白名单中`);
                return;
              }
              
              // 调用 OpenClaw 消息处理器
              if (ctx.onMessage) {
                await ctx.onMessage({
                  channelId: 'powpow',
                  accountId: account.id,
                  threadId: `dh:${account.digitalHumanId}`,
                  senderId: normalized.senderId,
                  senderName: normalized.senderName || normalized.senderId,
                  content: normalized.content,
                  contentType: normalized.contentType || 'text',
                  timestamp: normalized.timestamp ? new Date(normalized.timestamp).getTime() : Date.now(),
                  raw: normalized,
                });
              }
            },
            onError: (error) => {
              logger.error(`账号 ${account.id} 发生错误:`, error);
            },
            onReconnecting: (attempt) => {
              logger.info(`账号 ${account.id} 正在重连，尝试次数：${attempt}`);
            },
          });
          
          await connection.connect();
          connections.set(account.id, connection);
          connectionManagers.set(account.id, connection);
          
          logger.info(`账号 ${account.id} 启动成功`);
        } catch (error) {
          logger.error(`账号 ${account.id} 启动失败:`, error);
          // 继续处理其他账号
        }
      }
      
      if (connections.size === 0) {
        throw new Error('所有账号连接失败');
      }
      
      logger.info(`PowPow Channel 启动完成：${connections.size} 个账号`);
      return connections;
    },
    
    stop: async (_ctx: any) => {
      logger.info('停止 PowPow Channel...');
      
      for (const [accountId, connection] of connectionManagers.entries()) {
        try {
          logger.info(`断开账号 ${accountId} 的连接...`);
          connection.disconnect();
        } catch (error) {
          logger.error(`断开账号 ${accountId} 失败:`, error);
        }
      }
      
      connectionManagers.clear();
      logger.info('PowPow Channel 已停止');
    },
  },
  
  // 出站：消息发送适配器
  outbound: {
    sendText: async (_ctx: any, target: any, text: string) => {
      logger.debug(`发送文本消息到 ${target.threadId}:`, text);
      
      const connection = connectionManagers.get(target.accountId);
      if (!connection || !connection.isConnected()) {
        logger.error('连接不存在或未连接，无法发送消息');
        throw new Error('WebSocket 未连接');
      }
      
      const success = connection.send({
        type: 'chat_message',
        digitalHumanId: target.threadId.replace('dh:', ''),
        senderId: target.threadId.replace('dh:', ''),
        content: text,
        contentType: 'text',
        timestamp: Date.now(),
      });
      
      if (!success) {
        throw new Error('消息发送失败');
      }
    },
    
    sendMedia: async (_ctx: any, target: any, media: any) => {
      logger.debug(`发送媒体消息到 ${target.threadId}:`, media);
      
      const connection = connectionManagers.get(target.accountId);
      if (!connection || !connection.isConnected()) {
        logger.error('连接不存在或未连接，无法发送消息');
        throw new Error('WebSocket 未连接');
      }
      
      const contentType = media.type === 'image' ? 'image' : 
                         media.type === 'audio' ? 'voice' : 'video';
      
      const success = connection.send({
        type: 'chat_message',
        digitalHumanId: target.threadId.replace('dh:', ''),
        senderId: target.threadId.replace('dh:', ''),
        content: media.caption || '',
        contentType: contentType,
        mediaUrl: media.url,
        duration: media.duration,
        timestamp: Date.now(),
      });
      
      if (!success) {
        throw new Error('媒体消息发送失败');
      }
    },
  },
  
  // 安全：访问控制
  security: {
    checkDmPolicy: async (_ctx: any, senderId: string) => {
      const config = getConfig();
      if (!config) {
        return false;
      }
      
      // 检查所有账号的策略
      for (const account of config.accounts) {
        const policy = account.dmPolicy || 'open';
        
        if (policy === 'blocklist') {
          if (account.allowFrom?.includes(senderId)) {
            return false; // 在黑名单中
          }
        } else if (policy === 'allowlist') {
          if (!account.allowFrom?.includes(senderId)) {
            return false; // 不在白名单中
          }
        }
        // open 策略允许所有
      }
      
      return true;
    },
  },
};

// 导出 Channel 插件
export default powpowChannel;
