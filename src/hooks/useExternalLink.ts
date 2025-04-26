import { useState } from 'react';
import { useRouter } from 'next/router';



export const useExternalLink = () => {
  const router = useRouter();
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExternalClick = async (path: string) => {
    try {
      // 清理并验证路径
      setIsLoading(true);
      setIsRedirectModalOpen(true);
      setError(null);

      // 构造重定向URL，包含目标路径参数
      const redirectUrl = `/api/urls`;
      // 使用Next.js Router进行跳转
      router.push(redirectUrl);
      
    } catch (error) {
      console.error('Error in redirect process:', error);
      setError('无法进行重定向，请稍后再试');
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
