import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, getLanguageConfig } from '@/config/i18n';
import { loadMessages } from '@/lib/i18n-loader';
import { getFallbackLanguage } from '@/lib/env-config';

export default getRequestConfig(async ({ locale }) => {
  // 获取回退语言（自动处理无效语言的情况）
  const validLocale = getFallbackLanguage(locale);
  
  try {
    // 获取语言配置
    const languageConfig = getLanguageConfig(validLocale as any);
    
    // 加载语言文件
    const messages = await loadMessages(validLocale as any);
    
    return {
      messages,
      timeZone: languageConfig?.timeZone || 'UTC',
      now: new Date()
    };
  } catch (error) {
    console.error(`Failed to load configuration for locale '${validLocale}':`, error);
    
    // 最后的回退：直接使用英语
    try {
      const fallbackConfig = getLanguageConfig('en' as any);
      const fallbackMessages = await loadMessages('en' as any);
      
      return {
        messages: fallbackMessages,
        timeZone: fallbackConfig?.timeZone || 'UTC',
        now: new Date()
      };
    } catch (fallbackError) {
      console.error('Failed to load fallback English configuration:', fallbackError);
      
      // 最小回退配置
      return {
        messages: {},
        timeZone: 'UTC',
        now: new Date()
      };
    }
  }
});
