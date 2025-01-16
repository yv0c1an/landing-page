import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '@/config/i18n';
 
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    return {
      messages: (await import(`@/locales/${defaultLocale}`)).default,
      timeZone: 'Asia/Shanghai',
      defaultLocale
    };
  }
 
  return {
    messages: (await import(`@/locales/${locale}`)).default,
    timeZone: 'Asia/Shanghai',
    defaultLocale
  };
});
