'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { I18nUtils } from '@/lib/i18n-utils';
import { FlagIcon } from '@/components/icons/FlagIcons';
import { SimpleLanguageIcon } from '@/components/icons/SimpleLanguageIcons';
import type { Locale } from '@/config/i18n';

interface LanguageSwitcherProps {
  className?: string;
  showFlags?: boolean;
  variant?: 'dropdown' | 'buttons';
  iconType?: 'svg' | 'emoji' | 'simple';
}

export default function LanguageSwitcher({ 
  className = '',
  showFlags = true,
  variant = 'dropdown',
  iconType = 'svg'
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 获取语言切换数据
  const languages = I18nUtils.getLanguageSwitcherData(locale);
  const currentLanguage = languages.find(lang => lang.isActive);

  // 处理语言切换
  const handleLanguageChange = (newLocale: string) => {
    // 移除当前语言前缀，然后添加新语言前缀
    const segments = pathname.split('/');
    segments[1] = newLocale; // 替换语言段
    const newPath = segments.join('/');
    
    router.push(newPath);
    setIsOpen(false);
  };

  // 渲染国旗图标
  const renderFlag = (languageCode: string, className: string = '') => {
    if (!showFlags) return null;
    
    if (iconType === 'svg') {
      return <FlagIcon locale={languageCode} className={className} size={16} />;
    } else if (iconType === 'simple') {
      return <SimpleLanguageIcon locale={languageCode} className={className} size={16} variant="circle" />;
    } else {
      // 回退到表情符号
      return <span className={className}>{I18nUtils.getFlag(languageCode as Locale)}</span>;
    }
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`
              flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${language.isActive 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
            title={language.name}
          >
            {renderFlag(language.code, 'mr-1')}
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* 触发按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={t('selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {currentLanguage && renderFlag(currentLanguage.code)}
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage?.name || locale.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 下拉内容 */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1" role="menu">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                {t('selectLanguage')}
              </div>
              
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`
                    w-full text-left px-3 py-2 text-sm transition-colors
                    hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                    ${language.isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                  `}
                  role="menuitem"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {renderFlag(language.code)}
                      <span className="font-medium">{language.name}</span>
                    </div>
                    
                    {language.isActive && (
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  
                  {/* 显示货币和时区信息 */}
                  <div className="text-xs text-gray-400 mt-1">
                    {I18nUtils.getCurrency(language.code as Locale)} • {I18nUtils.getTimeZone(language.code as Locale)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// 使用示例组件
export function LanguageSwitcherExample() {
  const t = useTranslations('nav');
  
  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold">{t('selectLanguage')}</h3>
      
      {/* SVG图标版本 - 下拉式 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SVG国旗图标 - 下拉式切换器
        </label>
        <LanguageSwitcher variant="dropdown" showFlags={true} iconType="svg" />
      </div>
      
      {/* 简单圆形图标版本 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          简单圆形图标 - 下拉式切换器
        </label>
        <LanguageSwitcher variant="dropdown" showFlags={true} iconType="simple" />
      </div>
      
      {/* SVG图标版本 - 按钮式 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SVG国旗图标 - 按钮式切换器
        </label>
        <LanguageSwitcher variant="buttons" showFlags={true} iconType="svg" />
      </div>
      
      {/* 简单图标版本 - 按钮式 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          简单圆形图标 - 按钮式切换器
        </label>
        <LanguageSwitcher variant="buttons" showFlags={true} iconType="simple" />
      </div>
      
      {/* 表情符号版本 - 备选方案 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          表情符号版本（备选方案）
        </label>
        <LanguageSwitcher variant="dropdown" showFlags={true} iconType="emoji" />
      </div>
      
      {/* 不显示图标的简洁版本 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          无图标版本
        </label>
        <LanguageSwitcher variant="dropdown" showFlags={false} />
      </div>
    </div>
  );
} 