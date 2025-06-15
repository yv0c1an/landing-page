/**
 * URL 验证工具
 * 负责验证 URL 格式和清理路径
 */

/**
 * 验证 URL 格式是否有效
 * @param url 要验证的 URL
 * @returns 是否为有效的 HTTP/HTTPS URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

/**
 * 清理路径，防止路径遍历攻击
 * @param path 要清理的路径
 * @returns 清理后的安全路径
 */
export function sanitizePath(path: string): string {
  // 移除任何 ../ 序列，确保路径不会跳出预期目录
  let sanitized = path.replace(/\.\.\//g, '');
  // 确保路径以 / 开头
  if (!sanitized.startsWith('/')) {
    sanitized = '/' + sanitized;
  }
  return sanitized;
}

/**
 * 从 URL 中提取域名
 * @param url 完整的 URL
 * @returns 域名部分
 */
export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    // 如果解析失败，尝试简单的字符串处理
    return url.replace(/^https?:\/\//, '').split('/')[0];
  }
} 