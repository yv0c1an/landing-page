import { useState } from 'react';
import { externalLinks } from '@/config/externalConfig';

export type ExternalLinkKey = keyof typeof externalLinks;

export const useExternalLink = () => {
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');

  const handleExternalLink = (linkKey: ExternalLinkKey) => {
    const url = externalLinks[linkKey];
    if (url) {
      setSelectedUrl(url);
      setShowRedirectModal(true);
    }
  };

  return {
    showRedirectModal,
    setShowRedirectModal,
    selectedUrl,
    handleExternalLink,
  };
};
