/**
 * PowPow Channel Plugin for OpenClaw
 * 
 * @packageDocumentation
 */

export { powpowChannel } from './channel.js';
export { powpowChannelMeta, powpowChannelCapabilities } from './types.js';
export type {
  PowPowConfig,
  PowPowAccount,
  PowPowMessage,
  PowPowContentType,
  PowPowPolicy,
} from './types.js';
export { validatePowPowConfig, parsePowPowConfig } from './config-schema.js';
export type { PowPowConfigSchema } from './config-schema.js';
export {
  loadConfig,
  getConfig,
  updateConfig,
  validateConfig,
} from './config.js';
export {
  WebSocketConnectionManager,
  ConnectionStatus,
  createConnectionManager,
} from './gateway/connection-manager.js';
export type { ConnectionConfig, ConnectionEvents } from './gateway/connection-manager.js';
export {
  normalizeIncomingMessage,
  extractMessageContent,
  shouldProcessMessage,
} from './messaging/inbound-handler.js';
export {
  sendMessage,
  sendTextMessage,
  sendImageMessage,
  sendVoiceMessage,
  sendVideoMessage,
} from './messaging/send-service.js';
export { logger } from './shared/logger.js';
