/**
 * 配置管理器
 * 负责加载、验证和管理配置
 */

import { parsePowPowConfig, type PowPowConfigSchema } from './config-schema.js';
import { logger } from './shared/logger.js';

// 配置存储
let currentConfig: PowPowConfigSchema | null = null;

/**
 * 加载配置
 */
export function loadConfig(config: unknown): PowPowConfigSchema {
  try {
    logger.info('加载 PowPow Channel 配置...');
    const validated = parsePowPowConfig(config);
    currentConfig = validated;
    logger.info(`配置加载成功：${validated.accounts.length} 个账号`);
    
    // 设置日志级别
    if (validated.advanced?.debug) {
      logger.setLevel('debug');
    }
    
    return validated;
  } catch (error) {
    logger.error('配置加载失败:', error);
    throw error;
  }
}

/**
 * 获取当前配置
 */
export function getConfig(): PowPowConfigSchema | null {
  return currentConfig;
}

/**
 * 获取账号配置
 */
export function getAccountConfig(accountId: string): PowPowConfigSchema['accounts'][0] | null {
  if (!currentConfig) {
    return null;
  }
  
  return currentConfig.accounts.find(acc => acc.id === accountId) || null;
}

/**
 * 获取所有启用的账号
 */
export function getEnabledAccounts(): PowPowConfigSchema['accounts'] {
  if (!currentConfig) {
    return [];
  }
  
  return currentConfig.accounts;
}

/**
 * 更新配置
 */
export function updateConfig(newConfig: unknown): PowPowConfigSchema {
  logger.info('更新 PowPow Channel 配置...');
  const validated = parsePowPowConfig(newConfig);
  currentConfig = validated;
  logger.info('配置更新成功');
  return validated;
}

/**
 * 验证配置完整性
 */
export function validateConfig(): boolean {
  if (!currentConfig) {
    logger.error('配置未加载');
    return false;
  }
  
  if (!currentConfig.enabled) {
    logger.warn('Channel 未启用');
    return false;
  }
  
  if (currentConfig.accounts.length === 0) {
    logger.error('没有配置任何账号');
    return false;
  }
  
  // 验证每个账号的配置
  for (const account of currentConfig.accounts) {
    if (!account.digitalHumanId) {
      logger.error(`账号 ${account.id} 缺少 digitalHumanId`);
      return false;
    }
  }
  
  logger.info('配置验证通过');
  return true;
}
