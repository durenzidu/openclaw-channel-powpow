/**
 * WebSocket 连接管理器
 * 负责建立、维护和管理 WebSocket 连接
 */

import WebSocket from 'ws';
import type { PowPowAccount, PowPowWsMessage } from '../types.js';
import { logger } from '../shared/logger.js';

// 连接状态枚举
export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  ERROR = 'error',
}

// 连接配置
export interface ConnectionConfig {
  wsUrl: string;
  digitalHumanId: string;
  autoReconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}

// 连接事件
export interface ConnectionEvents {
  onConnected?: () => void;
  onDisconnected?: () => void;
  onMessage?: (message: PowPowWsMessage) => void;
  onError?: (error: Error) => void;
  onReconnecting?: (attempt: number) => void;
  onStatusChange?: (status: ConnectionStatus) => void;
}

/**
 * WebSocket 连接管理器类
 */
export class WebSocketConnectionManager {
  private ws: WebSocket | null = null;
  private status: ConnectionStatus = ConnectionStatus.DISCONNECTED;
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private config: ConnectionConfig;
  private events: ConnectionEvents = {};

  constructor(config: ConnectionConfig, events?: ConnectionEvents) {
    this.config = {
      wsUrl: config.wsUrl || 'wss://global.powpow.online:8080',
      digitalHumanId: config.digitalHumanId,
      autoReconnect: config.autoReconnect ?? true,
      reconnectInterval: config.reconnectInterval ?? 3000,
      maxReconnectAttempts: config.maxReconnectAttempts ?? 10,
      heartbeatInterval: config.heartbeatInterval ?? 30000, // 30 秒
    };
    this.events = events || {};
  }

  /**
   * 获取当前连接状态
   */
  getStatus(): ConnectionStatus {
    return this.status;
  }

  /**
   * 判断是否已连接
   */
  isConnected(): boolean {
    return this.status === ConnectionStatus.CONNECTED;
  }

  /**
   * 建立 WebSocket 连接
   */
  async connect(): Promise<void> {
    if (this.isConnected()) {
      logger.debug('WebSocket 已连接，跳过连接');
      return;
    }

    if (this.status === ConnectionStatus.CONNECTING) {
      logger.debug('WebSocket 正在连接中，等待连接完成');
      return;
    }

    logger.info(`开始连接 WebSocket: ${this.config.wsUrl}`);
    this.updateStatus(ConnectionStatus.CONNECTING);

    try {
      const wsUrl = `${this.config.wsUrl}?digitalHumanId=${this.config.digitalHumanId}&client=openclaw`;
      
      this.ws = new WebSocket(wsUrl);
      
      this.ws.on('open', () => {
        this.handleOpen();
      });
      this.ws.on('message', (data) => {
        this.handleMessage(data);
      });
      this.ws.on('error', (error) => {
        this.handleError(error);
      });
      this.ws.on('close', (code, reason) => {
        this.handleClose(code, reason);
      });
      
      // 设置连接超时
      const connectTimeout = setTimeout(() => {
        if (!this.isConnected()) {
          logger.warn('连接超时，触发重连');
          this.ws?.terminate();
          this.scheduleReconnect();
        }
      }, 10000); // 10 秒超时

      // 清理超时定时器
      this.ws.once('open', () => clearTimeout(connectTimeout));
      this.ws.once('error', () => clearTimeout(connectTimeout));

    } catch (error) {
      logger.error('创建 WebSocket 连接失败:', error);
      this.updateStatus(ConnectionStatus.ERROR);
      this.scheduleReconnect();
    }
  }

  /**
   * 断开连接
   */
  disconnect(): void {
    logger.info('主动断开 WebSocket 连接');
    this.stopHeartbeat();
    this.stopReconnect();
    
    if (this.ws) {
      this.ws.removeAllListeners();
      this.ws.close(1000, 'Client disconnect');
      this.ws = null;
    }
    
    this.updateStatus(ConnectionStatus.DISCONNECTED);
  }

  /**
   * 发送消息
   */
  send(message: PowPowWsMessage): boolean {
    if (!this.isConnected() || !this.ws) {
      logger.warn('WebSocket 未连接，无法发送消息');
      return false;
    }

    try {
      const data = JSON.stringify(message);
      this.ws.send(data);
      logger.debug('发送消息:', message);
      return true;
    } catch (error) {
      logger.error('发送消息失败:', error);
      return false;
    }
  }

  /**
   * 处理连接打开
   */
  private handleOpen(): void {
    logger.info('WebSocket 连接成功');
    this.updateStatus(ConnectionStatus.CONNECTED);
    this.reconnectAttempts = 0;
    this.startHeartbeat();
    
    // 发送连接确认消息
    this.send({
      type: 'connected',
      timestamp: Date.now(),
    });

    this.events.onConnected?.();
  }

  /**
   * 处理接收到的消息
   */
  private handleMessage(data: WebSocket.Data): void {
    try {
      const message: PowPowWsMessage = JSON.parse(data.toString());
      logger.debug('收到消息:', message);

      // 处理心跳响应
      if (message.type === 'heartbeat') {
        return;
      }

      this.events.onMessage?.(message);
    } catch (error) {
      logger.error('解析消息失败:', error);
    }
  }

  /**
   * 处理错误
   */
  private handleError(error: Error): void {
    logger.error('WebSocket 错误:', error);
    this.updateStatus(ConnectionStatus.ERROR);
    this.events.onError?.(error);
  }

  /**
   * 处理连接关闭
   */
  private handleClose(code: number, reason: Buffer): void {
    logger.info(`WebSocket 连接关闭：code=${code}, reason=${reason.toString()}`);
    this.ws = null;
    this.stopHeartbeat();
    
    if (code !== 1000 && this.config.autoReconnect) {
      // 非正常关闭，尝试重连
      this.scheduleReconnect();
    } else {
      this.updateStatus(ConnectionStatus.DISCONNECTED);
      this.events.onDisconnected?.();
    }
  }

  /**
   * 安排重连
   */
  private scheduleReconnect(): void {
    if (!this.config.autoReconnect) {
      logger.info('自动重连已禁用，不再重连');
      return;
    }

    if (this.reconnectAttempts >= (this.config.maxReconnectAttempts || 10)) {
      logger.error(`达到最大重连次数 (${this.config.maxReconnectAttempts})，停止重连`);
      this.updateStatus(ConnectionStatus.ERROR);
      this.events.onError?.(new Error('达到最大重连次数'));
      return;
    }

    this.reconnectAttempts++;
    const delay = this.config.reconnectInterval! * Math.pow(2, this.reconnectAttempts - 1);
    
    logger.info(`计划重连：${delay}ms 后尝试第 ${this.reconnectAttempts} 次重连`);
    this.updateStatus(ConnectionStatus.RECONNECTING);
    this.events.onReconnecting?.(this.reconnectAttempts);

    this.stopReconnect();
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }

  /**
   * 停止重连
   */
  private stopReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /**
   * 启动心跳
   */
  private startHeartbeat(): void {
    this.stopHeartbeat();
    
    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected()) {
        this.send({
          type: 'heartbeat',
          timestamp: Date.now(),
        });
      }
    }, this.config.heartbeatInterval);

    logger.debug(`心跳已启动：间隔 ${this.config.heartbeatInterval}ms`);
  }

  /**
   * 停止心跳
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /**
   * 更新连接状态
   */
  private updateStatus(status: ConnectionStatus): void {
    const oldStatus = this.status;
    this.status = status;
    
    if (oldStatus !== status) {
      logger.debug(`连接状态变更：${oldStatus} -> ${status}`);
      this.events.onStatusChange?.(status);
    }
  }
}

/**
 * 创建 WebSocket 连接管理器
 */
export function createConnectionManager(
  account: PowPowAccount,
  events?: ConnectionEvents
): WebSocketConnectionManager {
  const config: ConnectionConfig = {
    wsUrl: account.wsUrl || 'wss://global.powpow.online:8080',
    digitalHumanId: account.digitalHumanId,
  };

  return new WebSocketConnectionManager(config, events);
}
