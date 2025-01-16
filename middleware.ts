import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['zh', 'en', 'ja', 'th', 'ko'],
 
  // Used when no locale matches
  defaultLocale: 'zh',
  
  // Force a locale matching on all routes
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en|ja|th|ko)/:path*']
};