import React from 'react';

interface SimpleIconProps {
  className?: string;
  size?: number;
}

// 语言色彩映射
const languageColors = {
  en: '#1f2937', // 深灰色
  zh: '#dc2626', // 红色
  ja: '#dc2626', // 红色
  ko: '#2563eb', // 蓝色
  th: '#2563eb', // 蓝色
} as const;

// 语言简写映射
const languageShort = {
  en: 'EN',
  zh: '中',
  ja: '日',
  ko: '한',
  th: 'ไท',
} as const;

interface SimpleLanguageIconProps extends SimpleIconProps {
  locale: string;
  variant?: 'circle' | 'square' | 'text';
}

export function SimpleLanguageIcon({ 
  locale, 
  className = '', 
  size = 20,
  variant = 'circle'
}: SimpleLanguageIconProps) {
  const color = languageColors[locale as keyof typeof languageColors] || '#6b7280';
  const shortText = languageShort[locale as keyof typeof languageShort] || locale.toUpperCase();
  
  if (variant === 'text') {
    return (
      <span 
        className={`inline-flex items-center justify-center text-xs font-bold ${className}`}
        style={{ 
          width: size, 
          height: size,
          color: color
        }}
      >
        {shortText}
      </span>
    );
  }
  
  if (variant === 'square') {
    return (
      <div
        className={`inline-flex items-center justify-center text-white text-xs font-bold rounded ${className}`}
        style={{ 
          width: size, 
          height: size,
          backgroundColor: color
        }}
      >
        {shortText}
      </div>
    );
  }
  
  // 默认圆形变体
  return (
    <div
      className={`inline-flex items-center justify-center text-white text-xs font-bold rounded-full ${className}`}
      style={{ 
        width: size, 
        height: size,
        backgroundColor: color
      }}
    >
      {shortText}
    </div>
  );
} 