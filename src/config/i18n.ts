import { getEnabledLanguages } from '@/lib/env-config';

// 所有可用的语言
export const allLocales = ['en', 'zh', 'ja', 'ko', 'th', 'fr', 'de', 'es', 'it', 'ru', 'pt', 'br', 'ca', 'au', 'in', 'mx', 'gb', 'nl'] as const;

// 启用的语言（从环境变量获取）
export const locales = getEnabledLanguages();
export const defaultLocale = 'en' as const;

export type Locale = string;

// 语言元数据配置，方便后续扩展
export const languageConfig = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeZone: 'America/New_York'
  },
  zh: {
    name: 'Chinese',
    nativeName: '简体中文',
    flag: '🇨🇳',
    direction: 'ltr',
    currency: 'CNY',
    dateFormat: 'YYYY/MM/DD',
    timeZone: 'Asia/Shanghai'
  },
  ja: {
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    direction: 'ltr',
    currency: 'JPY',
    dateFormat: 'YYYY/MM/DD',
    timeZone: 'Asia/Tokyo'
  },
  ko: {
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    direction: 'ltr',
    currency: 'KRW',
    dateFormat: 'YYYY.MM.DD',
    timeZone: 'Asia/Seoul'
  },
  th: {
    name: 'Thai',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    direction: 'ltr',
    currency: 'THB',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Asia/Bangkok'
  },
  fr: {
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Europe/Paris'
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    direction: 'ltr',
    currency: 'EUR',
    dateFormat: 'DD.MM.YYYY',
    timeZone: 'Europe/Berlin'
  },
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Europe/Madrid'
  },
  it: {
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    direction: 'ltr',
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Europe/Rome'
  },
  ru: {
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    direction: 'ltr',
    currency: 'RUB',
    dateFormat: 'DD.MM.YYYY',
    timeZone: 'Europe/Moscow'
  },
  pt: {
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    direction: 'ltr',
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Europe/Lisbon'
  },
  br: {
    name: 'Portuguese (Brazil)',
    nativeName: 'Português (Brasil)',
    flag: '🇧🇷',
    direction: 'ltr',
    currency: 'BRL',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'America/Sao_Paulo'
  },
  ca: {
    name: 'English (Canada)',
    nativeName: 'English (Canada)',
    flag: '🇨🇦',
    direction: 'ltr',
    currency: 'CAD',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'America/Toronto'
  },
  au: {
    name: 'English (Australia)',
    nativeName: 'English (Australia)',
    flag: '🇦🇺',
    direction: 'ltr',
    currency: 'AUD',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Australia/Sydney'
  },
  in: {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    direction: 'ltr',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Asia/Kolkata'
  },
  mx: {
    name: 'Spanish (Mexico)',
    nativeName: 'Español (México)',
    flag: '🇲🇽',
    direction: 'ltr',
    currency: 'MXN',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'America/Mexico_City'
  },
  gb: {
    name: 'English (UK)',
    nativeName: 'English (UK)',
    flag: '🇬🇧',
    direction: 'ltr',
    currency: 'GBP',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Europe/London'
  },
  nl: {
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    direction: 'ltr',
    currency: 'EUR',
    dateFormat: 'DD-MM-YYYY',
    timeZone: 'Europe/Amsterdam'
  }
} as const;

// 语言检测映射，用于自动检测用户首选语言
export const languageDetectionMap = {
  'zh': ['zh', 'zh-CN', 'zh-TW', 'zh-HK'],
  'en': ['en', 'en-US', 'en-GB', 'en-AU'],
  'ja': ['ja', 'ja-JP'],
  'ko': ['ko', 'ko-KR'],
  'th': ['th', 'th-TH'],
  'fr': ['fr', 'fr-FR', 'fr-CA'],
  'de': ['de', 'de-DE', 'de-AT'],
  'es': ['es', 'es-ES', 'es-MX'],
  'it': ['it', 'it-IT'],
  'ru': ['ru', 'ru-RU'],
  'pt': ['pt', 'pt-PT', 'pt-BR'],
  'br': ['pt-BR'],
  'ca': ['en-CA'],
  'au': ['en-AU'],
  'in': ['hi', 'hi-IN'],
  'mx': ['es-MX'],
  'gb': ['en-GB'],
  'nl': ['nl', 'nl-NL']
} as const;

// 获取语言配置的工具函数
export function getLanguageConfig(locale: Locale) {
  return (languageConfig as any)[locale];
}

// 检测首选语言的工具函数
export function detectPreferredLocale(acceptLanguage: string): Locale {
  const languages = acceptLanguage.toLowerCase().split(',').map(lang => 
    lang.split(';')[0].trim()
  );

  for (const lang of languages) {
    for (const [locale, patterns] of Object.entries(languageDetectionMap)) {
      if (patterns.some(pattern => lang.startsWith(pattern)) && locales.includes(locale)) {
        return locale as Locale;
      }
    }
  }

  // 确保返回的语言在启用列表中，否则回退到英语
  return locales.includes(defaultLocale) ? defaultLocale : 'en';
}

// 获取启用的语言列表（用于客户端）
export function getEnabledLocales(): string[] {
  return [...locales];
}

// 检查语言是否已启用
export function isLocaleEnabled(locale: string): boolean {
  return locales.includes(locale);
} 