import fs from 'fs';
import { isValidUrl } from './urlValidator';

/**
 * URL 文件管理器
 * 负责读取、写入和管理 URL 文件
 */

/**
 * 读取 URL 文件并返回有效的 URL 列表
 * @param filePath 文件路径
 * @returns 有效的 URL 数组
 */
export function readUrlsFromFile(filePath: string): string[] {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    return fileContent.split('\n')
      .filter((domain: string) => domain.trim())
      .map((domain: string) => {
        // 检查域名是否已包含 http:// 或 https:// 前缀
        return domain.startsWith('http') ? domain.trim() : `https://${domain.trim()}`;
      })
      // 过滤掉无效格式的 URL
      .filter(url => isValidUrl(url));
  } catch (error) {
    console.error('Error reading URLs from file:', error);
    return [];
  }
}

/**
 * 将 URL 列表写入文件
 * @param filePath 文件路径
 * @param urls URL 数组
 */
export function writeUrlsToFile(filePath: string, urls: string[]): void {
  try {
    fs.writeFileSync(filePath, urls.join('\n'));
  } catch (error) {
    console.error('Error writing URLs to file:', error);
  }
}

/**
 * 更新 URL 文件，将不安全的 URL 移动到红名单
 * @param whiteListPath 白名单文件路径
 * @param redListPath 红名单文件路径
 * @param unsafeUrls 不安全的 URL 数组
 * @param allUrls 所有 URL 数组
 */
export async function updateUrlFiles(
  whiteListPath: string,
  redListPath: string,
  unsafeUrls: string[],
  allUrls: string[]
): Promise<void> {
  try {
    // 读取现有的红名单（如果存在）
    let existingRedUrls: string[] = [];
    if (fs.existsSync(redListPath)) {
      existingRedUrls = fs.readFileSync(redListPath, 'utf8')
        .split('\n')
        .filter(line => line.trim());
    }
    
    // 合并并去重
    const allRedUrls = Array.from(new Set([...existingRedUrls, ...unsafeUrls]));
    
    // 写入红名单
    writeUrlsToFile(redListPath, allRedUrls);
    
    // 更新白名单
    const safeUrls = allUrls.filter(u => !unsafeUrls.includes(u));
    writeUrlsToFile(whiteListPath, safeUrls);
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Moved ${unsafeUrls.length} unsafe URLs to red list`);
    } else {
      console.log(`Updated unsafe URLs list`);
    }
  } catch (error) {
    console.error('Error updating URL files:', error);
  }
} 