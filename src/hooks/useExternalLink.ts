import { useState } from 'react';
import axios from 'axios';

export const useExternalLink = () => {
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExternalClick = async (path: string) => {
    try {
      setIsLoading(true);
      setCurrentPath(path);
      setIsRedirectModalOpen(true);
      setError(null);
      
      // 每次点击都实时获取最新URL
      const response = await axios.get('/api/urls');
      const safeUrl = response.data.url;
      
      if (safeUrl) {
        window.location.href = `${safeUrl}${path}`;
      } else {
        throw new Error('No available URL found');
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
