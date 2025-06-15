/**
 * API 相关的类型定义
 * 统一管理所有接口类型
 */

// 平台响应接口类型
export interface PlatformResponse {
  code: string;
  msg: string | null;
  data: {
    platform_name: string;
  };
}

// 谷歌验证红名单接口响应类型
export interface GoogleCheckResponse {
  msg: string;
  statu: string;
  url: string;
  code: string;
}

// URL 安全检查结果类型
export interface SecurityCheckResult {
  isSecure: boolean;
  isSafeBrowsingSecure: boolean;
  isGoogleSecure: boolean;
  isAvailable: boolean;
  url: string;
} 