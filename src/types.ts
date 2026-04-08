/**
 * PowPow Channel 类型定义
 */

// 临时类型定义（当@openclaw/core 不可用时）
export interface ChannelMeta {
  name: string;
  description: string;
  icon: string;
  color?: string;
  docs?: {
    user: string;
    contributor: string;
  };
}

export interface ChannelCapabilities {
  supportsStreaming: boolean;
  supportsCards: boolean;
  supportsGroups: boolean;
  supportsMentions: boolean;
  supportsReactions: boolean;
  supportsThreads: boolean;
  supportsMedia: boolean;
  supportsLocation: boolean;
  maxMessageLength: number;
  maxMediaSizeMb: number;
  supportedMediaTypes: string[];
}

export interface ChannelPlugin {
  id: string;
  meta: ChannelMeta;
  capabilities: ChannelCapabilities;
  config?: {
    resolve: (ctx: any) => any;
  };
  gateway?: {
    start: (ctx: any) => Promise<any>;
    stop: (ctx: any) => Promise<void>;
  };
  outbound?: {
    sendText: (ctx: any, target: any, text: string) => Promise<void>;
    sendMedia: (ctx: any, target: any, media: any) => Promise<void>;
  };
  security?: {
    checkDmPolicy: (ctx: any, senderId: string) => Promise<boolean>;
  };
  messaging?: {
    normalizeTarget: (ctx: any, rawMessage: any) => Promise<any>;
  };
}


// PowPow 消息内容类型
export type PowPowContentType = 'text' | 'image' | 'voice' | 'video';

// PowPow 消息发送者类型
export type PowPowSenderType = 'user' | 'openclaw';

// PowPow 访问策略
export type PowPowPolicy = 'open' | 'allowlist' | 'blocklist';

// PowPow 消息接口
export interface PowPowMessage {
  id?: string;
  digitalHumanId: string;
  senderType: PowPowSenderType;
  senderId: string;
  senderName?: string;
  content: string;
  contentType?: PowPowContentType;
  mediaUrl?: string;
  duration?: number; // 语音/视频时长（秒）
  timestamp?: string;
  isRead?: boolean;
}

// PowPow WebSocket 消息类型
export type PowPowWsMessageType = 
  | 'chat_message'
  | 'chat_message_ack'
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'heartbeat';

// PowPow WebSocket 消息
export interface PowPowWsMessage {
  type: PowPowWsMessageType;
  digitalHumanId?: string;
  senderId?: string;
  content?: string;
  contentType?: PowPowContentType;
  mediaUrl?: string;
  duration?: number;
  timestamp?: number;
  messageId?: string;
  status?: 'sent' | 'delivered' | 'read' | 'failed';
  error?: {
    code: string;
    message: string;
  };
}

// PowPow 账号配置
export interface PowPowAccount {
  id: string;
  digitalHumanId: string;
  name: string;
  avatar?: string;
  wsUrl?: string;
  dmPolicy?: PowPowPolicy;
  allowFrom?: string[];
  messageType?: 'text' | 'markdown';
}

// PowPow 高级配置
export interface PowPowAdvancedConfig {
  pollInterval?: number; // 轮询间隔（毫秒）
  autoReconnect?: boolean; // 自动重连
  reconnectInterval?: number; // 重连间隔（毫秒）
  maxReconnectAttempts?: number; // 最大重连次数
  maxMessageLength?: number; // 最大消息长度
  enableStreaming?: boolean; // 启用流式输出
  enableCards?: boolean; // 启用 AI 卡片
  debug?: boolean; // 调试模式
}

// PowPow Channel 配置
export interface PowPowConfig {
  enabled: boolean;
  accounts: PowPowAccount[];
  advanced?: PowPowAdvancedConfig;
}

// PowPow Channel 元数据
export const powpowChannelMeta: ChannelMeta = {
  name: 'PowPow Map',
  description: 'PowPow 地图实时通信渠道',
  icon: 'map-marker',
  color: '#4A90E2',
  docs: {
    user: 'https://github.com/soimy/openclaw-channel-powpow/blob/main/docs/user/index.md',
    contributor: 'https://github.com/soimy/openclaw-channel-powpow/blob/main/docs/contributor/index.md',
  },
};

// PowPow Channel 能力
export const powpowChannelCapabilities: ChannelCapabilities = {
  supportsStreaming: true,
  supportsCards: true,
  supportsGroups: false,
  supportsMentions: false,
  supportsReactions: false,
  supportsThreads: false,
  supportsMedia: true,
  supportsLocation: true,
  maxMessageLength: 2000,
  maxMediaSizeMb: 30,
  supportedMediaTypes: ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'video/mp4'],
};


