/**
 * URL 检查器配置
 * 统一管理所有 URL 检查相关的配置选项
 * 配置值从环境变量中读取
 */

// 谷歌红名单检查配置
export const GOOGLE_CHECK_CONFIG = {
  apiUrl: process.env.GOOGLE_CHECK_API_URL || 'https://openapi.chinaz.net/v1/1029/check_google',
  apiKey: process.env.GOOGLE_CHECK_API_KEY || '',
  version: '1.0',
  timeout: 8000, // 8秒超时
  retries: 2, // 重试2次
  retryDelay: 1000 // 重试延迟基数（毫秒）
};

// URL 可用性检查配置
export const AVAILABILITY_CHECK_CONFIG = {
  timeout: 5000, // 5秒超时
  maxRedirects: 0, // 不跟随重定向
  retries: 1, // 重试1次
  retryDelay: 500 // 重试延迟（毫秒）
};

// SafeBrowsing 检查配置
export const SAFE_BROWSING_CONFIG = {
  timeout: 6000, // 6秒超时
  retries: 1 // 重试1次
};

// 文件路径配置
export const FILE_PATHS = {
  urlList: process.env.URL_LIST_FILE || 'url.txt',
  redList: process.env.RED_LIST_FILE || 'red_url.txt'
};

// 日志配置
export const LOG_CONFIG = {
  enableDetailedLogs: process.env.NODE_ENV === 'production',
  enableErrorLogs: true
};

// 验证必需的环境变量
export function validateConfig(): { isValid: boolean; missingVars: string[] } {
  const requiredVars = [
    'GOOGLE_CHECK_API_KEY'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  return {
    isValid: missingVars.length === 0,
    missingVars
  };
} 