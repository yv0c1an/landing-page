import {getRequestConfig} from 'next-intl/server';
import {locales} from './src/config/i18n';
 
export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) {
    return {
      messages: (await import(`./src/locales/zh`)).default
    };
  }
 
  return {
    messages: (await import(`./src/locales/${locale}`)).default
  };
}); 