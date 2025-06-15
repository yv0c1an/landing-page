/**
 * URL 辅助工具
 * 提供URL相关的辅助功能
 */

import type { NextApiRequest } from 'next';

/**
 * 从请求对象中获取当前网站的根网址
 * @param req NextApiRequest 对象
 * @returns 当前网站的根网址 (例如: https://example.com)
 */
export function getCurrentSiteUrl(req: NextApiRequest): string {
  // 获取协议 - 优先使用代理头信息
  const forwardedProto = req.headers['x-forwarded-proto'] as string;
  const forwardedHost = req.headers['x-forwarded-host'] as string;
  const host = req.headers.host;
  
  // 确定协议
  let protocol = 'http';
  if (forwardedProto) {
    protocol = forwardedProto;
  } else if (host?.includes('localhost') || host?.includes('127.0.0.1')) {
    protocol = 'http'; // 本地开发默认使用 http
  } else {
    protocol = 'https'; // 生产环境默认使用 https
  }
  
  // 确定主机名
  const hostname = forwardedHost || host || 'localhost:3000';
  console.log(`hostname: ${hostname}`);
  return `${protocol}://${hostname}`;
}

/**
 * 构建完整的URL
 * @param req NextApiRequest 对象
 * @param path 路径 (例如: '/about')
 * @returns 完整的URL (例如: https://example.com/about)
 */
export function buildFullUrl(req: NextApiRequest, path: string = ''): string {
  const baseUrl = getCurrentSiteUrl(req);
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
} 