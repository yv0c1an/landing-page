import { SafeBrowsingCheck } from './SafeBrowsingCheck';
import { checkGoogleRedList } from './googleRedListChecker';
import { checkUrlAvailability } from './urlAvailabilityChecker';
import type { SecurityCheckResult } from '@/types/api';
import { LOG_CONFIG } from '@/config/urlChecker';

/**
 * URL 安全检查器
 * 整合所有安全检查功能
 */

/**
 * 执行完整的 URL 安全检查
 * @param url 要检查的 URL
 * @returns Promise<SecurityCheckResult> 检查结果
 */
export async function performSecurityCheck(url: string): Promise<SecurityCheckResult> {
  const result: SecurityCheckResult = {
    isSecure: false,
    isSafeBrowsingSecure: false,
    isGoogleSecure: false,
    isAvailable: false,
    url
  };

  try {
    // 1. SafeBrowsing 检查 (暂时注释掉，根据原代码)
    // result.isSafeBrowsingSecure = await SafeBrowsingCheck.checkUrl(url);
    result.isSafeBrowsingSecure = true; // 暂时设为 true
    
    if (LOG_CONFIG.enableDetailedLogs) {
      console.log(`URL: ${url} SafeBrowsing status: ${result.isSafeBrowsingSecure}`);
    }

    // 2. 谷歌红名单检查
    result.isGoogleSecure = await checkGoogleRedList(url);
    
    if (LOG_CONFIG.enableDetailedLogs) {
      console.log(`URL: ${url} Google red list status: ${result.isGoogleSecure}`);
    }

    // 3. URL 可用性检查
    result.isAvailable = await checkUrlAvailability(url);

    if (LOG_CONFIG.enableDetailedLogs) {
      console.log(`URL: ${url} availability status: ${result.isAvailable}`);
    }

    // 综合判断是否安全
    result.isSecure = result.isSafeBrowsingSecure && result.isGoogleSecure && result.isAvailable;

    if (LOG_CONFIG.enableDetailedLogs) {
      console.log(`URL: ${url} final security status: ${result.isSecure}`);
    }

    return result;
  } catch (error) {
    if (LOG_CONFIG.enableErrorLogs) {
      console.error(`Security check failed for ${url}:`, error);
    }
    return result;
  }
} 