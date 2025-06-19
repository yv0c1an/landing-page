// 环境变量配置管理工具

// 所有支持的语言列表
const ALL_SUPPORTED_LANGUAGES = ['en', 'zh', 'ja', 'ko', 'th', 'fr', 'de', 'es', 'it', 'ru', 'pt', 'br', 'ca', 'au', 'in', 'mx', 'gb', 'nl'];

// 实际存在的语言文件列表（需要与i18n-loader.ts中的existingLocaleModules保持一致）
const EXISTING_LANGUAGE_FILES = ['en', 'zh'];

// 检查语言文件是否存在（仅在服务端使用）
function checkLanguageFileExists(locale: string): boolean {
  if (typeof window !== 'undefined') return true; // 客户端无法检查文件，假设存在
  
  // 对于实际存在的语言文件，检查文件
  if (EXISTING_LANGUAGE_FILES.includes(locale)) {
    try {
      require.resolve(`@/locales/${locale}`);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // 对于其他语言，由于我们有回退机制，也认为是"存在"的
  return ALL_SUPPORTED_LANGUAGES.includes(locale);
}

// 过滤并验证语言列表
function filterValidLanguages(languages: string[]): string[] {
  return languages.filter(lang => {
    // 检查是否在支持列表中
    if (!ALL_SUPPORTED_LANGUAGES.includes(lang)) {
      console.warn(`Language '${lang}' is not supported`);
      return false;
    }
    
    // 检查语言文件是否存在
    if (!checkLanguageFileExists(lang)) {
      console.warn(`Language file for '${lang}' does not exist`);
      return false;
    }
    
    return true;
  });
}

// 获取启用的语言列表
export function getEnabledLanguages(): string[] {
  let enabledLocales: string[] = [];
  
  // 服务端环境
  if (typeof window === 'undefined') {
    const openLangs = process.env.OPEN_LANGS || 'en,zh,ja,ko,th';
    const rawLocales = openLangs.split(',').map(lang => lang.trim()).filter(Boolean);
    enabledLocales = filterValidLanguages(rawLocales);
  } else {
    // 客户端环境，从meta标签读取
    const metaContent = document.querySelector('meta[name="enabled-locales"]')?.getAttribute('content');
    if (metaContent) {
      try {
        const parsedLocales = JSON.parse(metaContent);
        enabledLocales = Array.isArray(parsedLocales) ? parsedLocales : [];
      } catch (e) {
        console.warn('Failed to parse enabled locales from meta tag:', e);
        enabledLocales = [];
      }
    }
  }
  
  // 确保至少有英语
  if (enabledLocales.length === 0 || !enabledLocales.includes('en')) {
    console.warn('No valid languages found or English missing, falling back to English only');
    return ['en'];
  }
  
  return enabledLocales;
}

// 检查语言是否有效并可用
export function isLanguageAvailable(locale: string): boolean {
  const enabledLanguages = getEnabledLanguages();
  return enabledLanguages.includes(locale);
}

// 获取回退语言（如果请求的语言不可用）
export function getFallbackLanguage(requestedLocale: string): string {
  if (isLanguageAvailable(requestedLocale)) {
    return requestedLocale;
  }
  
  console.warn(`Language '${requestedLocale}' is not available, falling back to English`);
  return 'en';
}

// 生成meta标签内容（在服务端使用）
export function generateLocalesMeta(): string {
  const enabledLocales = getEnabledLanguages();
  return JSON.stringify(enabledLocales);
} 