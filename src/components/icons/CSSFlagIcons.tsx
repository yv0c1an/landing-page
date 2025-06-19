import React from 'react';
import '@/styles/flag-icons.css';

interface CSSFlagIconProps {
  locale: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  round?: boolean;
}

export function CSSFlagIcon({ 
  locale, 
  className = '', 
  size = 'md',
  round = false 
}: CSSFlagIconProps) {
  const sizeClass = size !== 'md' ? `flag-icon-${size}` : '';
  const roundClass = round ? 'flag-icon-round' : '';
  
  return (
    <span 
      className={`flag-icon flag-icon-${locale} ${sizeClass} ${roundClass} ${className}`}
      title={locale.toUpperCase()}
    />
  );
} 