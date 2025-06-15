import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { sanitizePath } from '@/utils/urlValidator';
import { readUrlsFromFile, updateUrlFiles } from '@/utils/urlFileManager';
import { performSecurityCheck } from '@/utils/urlSecurityChecker';
import { shuffleArray } from '@/utils/arrayUtils';
import { FILE_PATHS, LOG_CONFIG } from '@/config/urlChecker';

// 默认回退域名
const FALLBACK_URL = process.env.NEXT_PUBLIC_FALLBACK_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 设置安全响应头
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  // 获取客户端请求的目标路径
  const targetPath = req.query.path ? sanitizePath(req.query.path as string) : '/';

  try {
    // 文件路径配置
    const filePath = path.join(process.cwd(), FILE_PATHS.urlList);
    const redFilePath = path.join(process.cwd(), FILE_PATHS.redList);

    // 使用更安全的日志记录
    if (LOG_CONFIG.enableDetailedLogs) {
      console.log(`Reading from: ${filePath}`);
    } else {
      console.log(`Reading URL file`);
    }
    
    // 读取 URL 列表
    const urls = readUrlsFromFile(filePath);

    if (urls.length === 0) {
      // 如果没有有效URL，使用回退URL进行重定向
      res.redirect(302, `${FALLBACK_URL}${targetPath}`);
      return;
    }

    // 收集不安全的 URLs
    const unsafeUrls: string[] = [];
    // 随机打乱 URL 列表
    const shuffled = shuffleArray(urls);
    // 尝试查找安全可用的 URL
    for (const url of shuffled) {
      if (LOG_CONFIG.enableDetailedLogs) {
        console.log(`Checking URL: ${url}`);
      }
      
      // 执行完整的安全检查
      const securityResult = await performSecurityCheck(url);

      if (!securityResult.isSecure) {
        unsafeUrls.push(url);
        continue;
      }

      // 异步处理不安全 URLs，不阻塞响应
      if (unsafeUrls.length > 0) {
        Promise.allSettled([
          updateUrlFiles(filePath, redFilePath, unsafeUrls, urls)
        ]).catch(err => {
          if (LOG_CONFIG.enableErrorLogs) {
            console.error('Error in background processing:', err);
          }
        });
      }

      // 如果 URL 安全且可用，直接重定向
      res.redirect(302, `${url}${targetPath}`);
      return;
    }

    // 如果没有找到可用的 URL，使用回退URL重定向
    res.redirect(302, `${FALLBACK_URL}${targetPath}`);
    return;
    
  } catch (error) {
    // 使用更安全的错误日志
    if (LOG_CONFIG.enableDetailedLogs) {
      console.error('Error processing URLs:', error);
    } else if (LOG_CONFIG.enableErrorLogs) {
      console.error('Error in URL processing');
    }
    // 出错时使用回退URL重定向
    res.redirect(302, `${FALLBACK_URL}${targetPath}`);
    return;
  }
}