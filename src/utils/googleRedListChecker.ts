import axios from 'axios';
import { extractDomain } from './urlValidator';
import type { GoogleCheckResponse } from '@/types/api';
import { GOOGLE_CHECK_CONFIG, LOG_CONFIG } from '@/config/urlChecker';

/**
 * 谷歌红名单检查器
 * 负责通过第三方 API 检查域名是否在谷歌红名单中
 */

/**
 * 检查域名是否在谷歌红名单中
 * @param url 要检查的 URL
 * @returns Promise<boolean> true 表示安全，false 表示在红名单中
 */
export async function checkGoogleRedList(url: string): Promise<boolean> {
  let lastError: any = null;
  
  // 重试机制
  for (let attempt = 1; attempt <= GOOGLE_CHECK_CONFIG.retries; attempt++) {
    try {
      // 从URL中提取域名
      const domain = extractDomain(url);
      
      const params = {
        APIKey: GOOGLE_CHECK_CONFIG.apiKey,
        ChinazVer: GOOGLE_CHECK_CONFIG.version,
        url: domain
      };

      if (LOG_CONFIG.enableDetailedLogs) {
        console.log(`Google check attempt ${attempt} for domain: ${domain}`);
      }

      const response = await axios.get<GoogleCheckResponse>(GOOGLE_CHECK_CONFIG.apiUrl, {
        params,
        timeout: GOOGLE_CHECK_CONFIG.timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        }
      });

      if (LOG_CONFIG.enableDetailedLogs) {
        console.log(`Google check result for ${domain}:`, response.data);
      }

      // 检查响应状态
      // code: "1001" 表示正常访问，"1002" 表示已被封禁
      return response.data.statu === 'true' && response.data.code === '1001';
      
    } catch (error: any) {
      lastError = error;
      
      if (LOG_CONFIG.enableDetailedLogs) {
        console.warn(`Google check attempt ${attempt} failed for ${url}:`, {
          message: error.message,
          code: error.code,
          status: error.response?.status
        });
      }

      // 如果不是最后一次尝试，等待一段时间后重试
      if (attempt < GOOGLE_CHECK_CONFIG.retries) {
        await new Promise(resolve => setTimeout(resolve, GOOGLE_CHECK_CONFIG.retryDelay * attempt)); // 递增延迟
      }
    }
  }

  // 所有重试都失败了
  if (LOG_CONFIG.enableDetailedLogs) {
    console.error(`Google red list check failed for ${url} after ${GOOGLE_CHECK_CONFIG.retries} attempts:`, lastError?.message);
  } else if (LOG_CONFIG.enableErrorLogs) {
    console.error('Google red list check failed after multiple attempts');
  }
  
  // 如果检查失败，默认认为是安全的（避免误杀）
  return true;
} 