import { Locale } from '@/config/i18n';

// 语言文件缓存
const messageCache = new Map<string, any>();

// 静态导入实际存在的语言文件
import enMessages from '@/locales/en';
import zhMessages from '@/locales/zh';

// 创建静态消息映射
const messageMap = {
  en: enMessages,
  zh: zhMessages,
} as const;

/**
 * 动态加载语言文件
 * @param locale 语言代码
 * @returns 语言翻译对象
 */
export async function loadMessages(locale: Locale): Promise<any> {
  try {
    // 检查缓存
    if (messageCache.has(locale)) {
      return messageCache.get(locale);
    }

    // 获取对应的消息，如果不存在则回退到英语
    let messages = messageMap[locale as keyof typeof messageMap];
    
    if (!messages) {
      console.warn(`Language ${locale} not found, falling back to English`);
      messages = messageMap.en;
    }

    // 验证消息对象
    if (!messages || typeof messages !== 'object') {
      console.error(`Invalid messages object for locale ${locale}, using English fallback`);
      messages = messageMap.en;
    }

    // 缓存结果
    messageCache.set(locale, messages);
    
    return messages;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    
    // 最终回退
    const fallbackMessages = messageMap.en || {};
    messageCache.set(locale, fallbackMessages);
    return fallbackMessages;
  }
}

/**
 * 预加载指定语言文件
 * @param locales 要预加载的语言列表
 */
export async function preloadMessages(locales: Locale[]): Promise<void> {
  const loadPromises = locales.map(locale => loadMessages(locale));
  await Promise.allSettled(loadPromises);
}

/**
 * 清除语言文件缓存
 * @param locale 可选，指定要清除的语言，不传则清除所有
 */
export function clearMessageCache(locale?: Locale): void {
  if (locale) {
    messageCache.delete(locale);
  } else {
    messageCache.clear();
  }
}

/**
 * 获取缓存状态
 */
export function getCacheStatus(): { locale: string; cached: boolean }[] {
  const allLocales = Object.keys(messageMap) as Locale[];
  return allLocales.map(locale => ({
    locale,
    cached: messageCache.has(locale)
  }));
}

/**
 * 检查语言文件是否存在
 * @param locale 语言代码
 */
export function isLocaleSupported(locale: string): locale is Locale {
  return locale in messageMap;
}

/**
 * 获取所有支持的语言代码
 */
export function getSupportedLocales(): Locale[] {
  return Object.keys(messageMap) as Locale[];
} 