import createMiddleware from 'next-intl/middleware';
import { locales } from './config/i18n';
 
export default createMiddleware({
  locales,
  defaultLocale: 'zh',
  localePrefix: 'always'
});
 
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 