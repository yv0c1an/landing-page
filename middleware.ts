import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { detectPreferredLocale } from '@/config/i18n';
import { getEnabledLanguages, getFallbackLanguage } from '@/lib/env-config';

// 创建 next-intl 的中间件
const intlMiddleware = createMiddleware({
  locales: getEnabledLanguages(),
  defaultLocale: 'en',
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 跳过静态文件和 API 路由
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || // 包含点的文件（如 favicon.ico, robots.txt）
    pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }
  
  // 处理根路径重定向
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLocale = detectPreferredLocale(acceptLanguage);
    const validLocale = getFallbackLanguage(preferredLocale);
    return NextResponse.redirect(new URL(`/${validLocale}`, request.url));
  }
  
  // 使用 next-intl 中间件处理其他路由
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // 匹配所有路径，除了以下开头的：
    '/((?!_next|api|static|.*\\..*).*)',
  ]
};