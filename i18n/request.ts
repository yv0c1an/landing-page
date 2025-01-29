import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '@/config/i18n';

export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`@/locales/${locale}`)).default;
  
  return {
    messages,
    timeZone: 'Asia/Shanghai',
    now: new Date()
  };
});
