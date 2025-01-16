import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from '@/config/i18n';
 
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/locales/${locale}`)).default,
  timeZone: 'Asia/Shanghai',
  defaultLocale
}));
