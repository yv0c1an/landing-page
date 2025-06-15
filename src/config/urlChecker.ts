/**
 * URL 检查器配置
 * 统一管理所有 URL 检查相关的配置选项
 */

// 谷歌红名单检查配置
export const GOOGLE_CHECK_CONFIG = {
  apiUrl: 'https://openapi.chinaz.net/v1/1029/check_google',
  apiKey: 'apiuser_quantity_bdf393c36eaab9e9f597054cda226b13_3e8293b29ef94265b5f412d4098799ed',
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
  urlList: 'url.txt',
  redList: 'red_url.txt'
};

// 日志配置
export const LOG_CONFIG = {
  enableDetailedLogs: process.env.NODE_ENV == 'production',
  enableErrorLogs: true
}; 