import { useState, useEffect } from 'react';
import { ExternalLink } from '@/config/externalConfig';
import { useUrlStore } from '@/store/urlStore';
import { linkPaths } from '@/config/externalConfig';

export const useExternalLink = () => {
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<ExternalLink | null>(null);
  const { safeUrl, initializeUrl } = useUrlStore();

  useEffect(() => {
    initializeUrl();
  }, []);

  const handleExternalClick = (linkKey: ExternalLink) => {
    setCurrentLink(linkKey);
    setIsRedirectModalOpen(true);
  };

  const handleRedirect = () => {
    if (currentLink && safeUrl) {
      const path = linkPaths[currentLink];
      window.location.href = `${safeUrl}${path}`;
    }
    setIsRedirectModalOpen(false);
  };

  const handleClose = () => {
    setIsRedirectModalOpen(false);
    setCurrentLink(null);
  };

  return {
    handleExternalClick,
    handleRedirect,
    handleClose,
    isRedirectModalOpen,
    currentLink
  };
};
