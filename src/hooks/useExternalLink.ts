import { useState } from 'react';
import axios from 'axios';

// 安全的 URL 检查函数
function isSafeUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    // 确保只允许 http 和 https 协议
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

export const useExternalLink = () => {
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExternalClick = async (path: string) => {
    try {
      // 清理并验证路径
      const cleanPath = sanitizePath(path);

      setIsLoading(true);
      setCurrentPath(cleanPath);
      setIsRedirectModalOpen(true);
      setError(null);

      // 每次点击都实时获取最新URL
      const response = await axios.get('/api/urls');
      const safeUrl = response.data.url;

      if (safeUrl && isSafeUrl(safeUrl)) {
        // 使用 window.open 代替 location.href，并添加安全参数
        const link = document.createElement('a');
        link.href = `${safeUrl}${cleanPath}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // 关闭模态框
        setTimeout(() => {
          setIsRedirectModalOpen(false);
        }, 1000);
      } else {
        throw new Error('Invalid or unsafe URL received');
      }
    } catch (error) {
      console.error('Error fetching URL:', error);
      setError('无法获取可用的URL，请稍后再试');
      setIsLoading(false);
      // 3秒后自动关闭错误提示
      setTimeout(() => {
        setIsRedirectModalOpen(false);
        setError(null);
      }, 3000);
    }
  };

  const handleClose = () => {
    setIsRedirectModalOpen(false);
    setCurrentPath(null);
    setError(null);
  };

  return {
    handleExternalClick,
    handleClose,
    isRedirectModalOpen,
    currentPath,
    isLoading,
    error
  };
};
