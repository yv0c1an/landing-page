import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { SafeBrowsingCheck } from '@/utils/SafeBrowsingCheck';
import fs from 'fs';
import path from 'path';

interface PlatformResponse {
  code: string;
  msg: string | null;
  data: {
    platform_name: string;
  };
}

// 验证 URL 格式
function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

// 清理路径，防止路径遍历攻击
function sanitizePath(path: string): string {
  // 移除任何 ../ 序列，确保路径不会跳出预期目录
  let sanitized = path.replace(/\.\.\//g, '');
  // 确保路径以 / 开头
  if (!sanitized.startsWith('/')) {
    sanitized = '/' + sanitized;
  }
  return sanitized;
}

// 检查 URL 可用性
async function checkUrlAvailability(url: string): Promise<boolean> {
  if (!isValidUrl(url)) {
    return false;
  }
  
  try {
    const response = await axios.get(url, {
      timeout: 3000,
      // 不跟随重定向
      maxRedirects: 0,
      // 禁用 cookies
      withCredentials: false,
      headers: {
        'User-Agent': 'URL-Checker-Bot'
      }
    });
    return response.status === 200;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
    console.error(`URL ${url} is not available:`, error);
    } else {
      console.error(`URL availability check failed`);
    }
    return false;
  }
}

// 从数组中随机选择一个元素
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// 默认回退域名
const FALLBACK_URL = process.env.NEXT_PUBLIC_FALLBACK_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 设置安全响应头
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 获取客户端请求的目标路径
  const targetPath = req.query.path ? sanitizePath(req.query.path as string) : '/';

  try {
    // 从本地文件读取 URL 列表
    const filePath = path.join(process.cwd(), 'url.txt');
    const redFilePath = path.join(process.cwd(), 'red_url.txt');

    // 使用更安全的日志记录
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Reading from: ${filePath}`);
    } else {
      console.log(`Reading URL file`);
    }

    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      // 如果文件不存在，使用回退URL进行重定向
      return res.redirect(302, `${FALLBACK_URL}${targetPath}`);
    }

    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('Reading URLs from local file');

    // 处理域名列表
    const urls = fileContent.split('\n')
      .filter((domain: string) => domain.trim())
      .map((domain: string) => {
        // 检查域名是否已包含 http:// 或 https:// 前缀
        return domain.startsWith('http') ? domain.trim() : `https://${domain.trim()}`;
      })
      // 过滤掉无效格式的 URL
      .filter(url => isValidUrl(url));

    if (urls.length === 0) {
      // 如果没有有效URL，使用回退URL进行重定向
      return res.redirect(302, `${FALLBACK_URL}${targetPath}`);
    }

    // 收集不安全的 URLs
    const unsafeUrls: string[] = [];

    // 随机打乱 URL 列表
    const shuffled = [...urls].sort(() => 0.5 - Math.random());

    // 尝试查找安全可用的 URL
    for (const url of shuffled) {
      // 使用更安全的日志记录
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Trying URL: ${url}`);
      } else {
        console.log(`Checking URL safety and availability`);
      }

      // 首先检查 URL 是否安全
      const isSafe = await SafeBrowsingCheck.checkUrl(url);
      
      // 使用更安全的日志记录
      if (process.env.NODE_ENV !== 'production') {
        console.log(`URL: ${url} safety status: ${isSafe}`);
      }
      
      if (!isSafe) {
        unsafeUrls.push(url);
        continue;
      } else {
      // 然后检查 URL 是否可用
      const isAvailable = await checkUrlAvailability(url);
      if (!isAvailable) continue;
      }
      // 异步处理不安全 URLs，不阻塞响应
      if (unsafeUrls.length > 0) {
        // 使用 Promise.allSettled 确保即使部分操作失败也能继续
        Promise.allSettled([
          (async () => {
            try {
              // 读取现有的红名单（如果存在）
              let existingRedUrls: string[] = [];
              if (fs.existsSync(redFilePath)) {
                existingRedUrls = fs.readFileSync(redFilePath, 'utf8')
                  .split('\n')
                  .filter(line => line.trim());
              }
              
              // 合并并去重
              const allRedUrls = Array.from(new Set([...existingRedUrls, ...unsafeUrls]));
              
              // 写入红名单
              fs.writeFileSync(redFilePath, allRedUrls.join('\n'));
              
              // 更新白名单
              const safeUrls = urls.filter(u => !unsafeUrls.includes(u));
              fs.writeFileSync(filePath, safeUrls.join('\n'));
              
              if (process.env.NODE_ENV !== 'production') {
                console.log(`Moved ${unsafeUrls.length} unsafe URLs to red_url.txt`);
              } else {
                console.log(`Updated unsafe URLs list`);
              }
            } catch (error) {
              console.error('Error updating URL files:', error);
            }
          })()
        ]).catch(err => console.error('Error in background processing:', err));
      }

      // 如果 URL 既安全又可用，直接重定向到目标URL
      return res.redirect(302, `${url}${targetPath}`);
    }

    // 如果没有找到可用的 URL，使用回退URL重定向
    return res.redirect(302, `${FALLBACK_URL}${targetPath}`);
  } catch (error) {
    // 使用更安全的错误日志
    if (process.env.NODE_ENV !== 'production') {
    console.error('Error processing URLs:', error);
    } else {
      console.error('Error in URL processing');
    }
    // 出错时使用回退URL重定向
    return res.redirect(302, `${FALLBACK_URL}${targetPath}`);
  }
}