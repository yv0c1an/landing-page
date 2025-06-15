import type { NextApiRequest, NextApiResponse } from 'next';
import { sanitizePath } from '@/utils/urlValidator';
import { readUrlsFromFile, updateUrlFiles } from '@/utils/urlFileManager';
import { performSecurityCheck } from '@/utils/urlSecurityChecker';
import { shuffleArray } from '@/utils/arrayUtils';
import { FILE_PATHS, LOG_CONFIG, validateConfig } from '@/config/urlChecker';
import { getCurrentSiteUrl } from '@/utils/urlHelper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 验证配置
  const configValidation = validateConfig();
  if (!configValidation.isValid) {
    console.error('Missing required environment variables:', configValidation.missingVars);
    if (LOG_CONFIG.enableErrorLogs) {
      console.error('Please check your .env.local or .env.production file');
    }
    // 仍然继续执行，但可能会有功能限制
  }

  // 设置安全响应头
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  // 获取客户端请求的目标路径
  const targetPath = req.query.path ? sanitizePath(req.query.path as string) : '/';
  
  // 动态获取当前网站的根网址作为回退URL
  const fallbackUrl = getCurrentSiteUrl(req);

  try {
    // 直接使用配置中的文件路径
    const filePath = FILE_PATHS.urlList;
    const redFilePath = FILE_PATHS.redList;

    // 使用更安全的日志记录
    if (LOG_CONFIG.enableDetailedLogs) {
      console.log(`Reading from: ${filePath}`);
      console.log(`Fallback URL: ${fallbackUrl}`);
    } else {
      console.log(`Reading URL file`);
    }
    
    // 读取 URL 列表
    const urls = readUrlsFromFile(filePath);

    if (urls.length === 0) {
      // 如果没有有效URL，使用当前网站根网址进行重定向
      res.redirect(302, `${fallbackUrl}${targetPath}`);
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

    // 如果没有找到可用的 URL，使用当前网站根网址重定向
    res.redirect(302, `${fallbackUrl}${targetPath}`);
    return;
    
  } catch (error) {
    // 使用更安全的错误日志
    if (LOG_CONFIG.enableDetailedLogs) {
      console.error('Error processing URLs:', error);
    } else if (LOG_CONFIG.enableErrorLogs) {
      console.error('Error in URL processing');
    }
    // 出错时使用当前网站根网址重定向
    res.redirect(302, `${fallbackUrl}${targetPath}`);
    return;
  }
}