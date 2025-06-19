import { Locale } from '@/config/i18n';

// 语言文件缓存
const messageCache = new Map<string, any>();

// 预加载所有语言文件的动态导入
const localeModules = {
  en: () => import('@/locales/en'),
  zh: () => import('@/locales/zh'),
  ja: () => import('@/locales/ja'),
  ko: () => import('@/locales/ko'),
  th: () => import('@/locales/th'),
} as const;

/**
 * 动态加载语言文件
 * @param locale 语言代码
 * @returns 语言翻译对象
 */
export async function loadMessages(locale: Locale): Promise<any> {
  // 检查缓存
  if (messageCache.has(locale)) {
    return messageCache.get(locale);
  }

  try {
    // 动态导入语言文件
    const moduleLoader = localeModules[locale];
    if (!moduleLoader) {
      throw new Error(`Locale ${locale} is not supported`);
    }

    const module = await moduleLoader();
    const messages = module.default;

    // 缓存结果
    messageCache.set(locale, messages);
    
    return messages;
  } catch (error) {
    console.warn(`Failed to load messages for locale ${locale}:`, error);
    
    // 回退到默认语言
    if (locale !== 'en') {
      console.log(`Falling back to English for locale ${locale}`);
      return loadMessages('en');
    }
    
    // 如果连英文都加载失败，返回空对象
    return {};
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
  const allLocales = Object.keys(localeModules) as Locale[];
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
  return locale in localeModules;
}

/**
 * 获取所有支持的语言代码
 */
export function getSupportedLocales(): Locale[] {
  return Object.keys(localeModules) as Locale[];
} 