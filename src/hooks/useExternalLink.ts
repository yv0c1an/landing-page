import { useState } from 'react';
import { externalLinks } from '@/config/externalConfig';

export const useExternalLink = () => {
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<keyof typeof externalLinks | null>(null);

  const handleExternalClick = (linkKey: keyof typeof externalLinks) => {
    setCurrentLink(linkKey);
    setIsRedirectModalOpen(true);
  };

  const handleRedirect = () => {
    if (currentLink) {
      window.location.href = externalLinks[currentLink].url;
    }
  };

  const handleClose = () => {
    setIsRedirectModalOpen(false);
    setCurrentLink(null);
  };

  return {
    isRedirectModalOpen,
    currentLink,
    handleExternalClick,
    handleRedirect,
    handleClose,
  };
};
