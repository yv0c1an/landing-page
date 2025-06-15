import axios from 'axios';
import { AVAILABILITY_CHECK_CONFIG, LOG_CONFIG } from '@/config/urlChecker';

/**
 * URL 可用性检查器
 * 负责检查 URL 是否可以正常访问
 */

/**
 * 检查 URL 可用性
 * @param url 要检查的 URL
 * @returns Promise<boolean> 是否可用
 */
export async function checkUrlAvailability(url: string): Promise<boolean> {
  let lastError: any = null;
  
  // 重试机制
  for (let attempt = 1; attempt <= AVAILABILITY_CHECK_CONFIG.retries; attempt++) {
    try {
      const response = await axios.get(url, {
        timeout: AVAILABILITY_CHECK_CONFIG.timeout,
        maxRedirects: AVAILABILITY_CHECK_CONFIG.maxRedirects,
        // 禁用 cookies
        withCredentials: false,
        headers: {
          'User-Agent': 'URL-Checker-Bot'
        },
        // 只获取头部信息，减少数据传输
        method: 'HEAD'
      });
      
      // 检查状态码是否表示成功
      return response.status >= 200 && response.status < 400;
      
    } catch (error: any) {
      lastError = error;
      
      // 如果是重定向错误（3xx），也认为是可用的
      if (error.response && error.response.status >= 300 && error.response.status < 400) {
        return true;
      }
      
      if (LOG_CONFIG.enableDetailedLogs) {
        console.warn(`URL availability check attempt ${attempt} failed for ${url}:`, {
          message: error.message,
          code: error.code,
          status: error.response?.status
        });
      }

      // 如果不是最后一次尝试，等待后重试
      if (attempt < AVAILABILITY_CHECK_CONFIG.retries) {
        await new Promise(resolve => setTimeout(resolve, AVAILABILITY_CHECK_CONFIG.retryDelay)); // 延迟
      }
    }
  }

  if (LOG_CONFIG.enableDetailedLogs) {
    console.error(`URL ${url} is not available after ${AVAILABILITY_CHECK_CONFIG.retries} attempts:`, lastError?.message);
  } else if (LOG_CONFIG.enableErrorLogs) {
    console.error(`URL availability check failed`);
  }
  
  return false;
} 