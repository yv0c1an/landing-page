import {getRequestConfig} from 'next-intl/server';
import {locales} from './config/i18n';

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) {
    return {
      messages: (await import(`./locales/zh`)).default
    };
  }

  return {
    messages: (await import(`./locales/${locale}`)).default
  };
}); 