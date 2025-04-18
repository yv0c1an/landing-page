import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from '@/config/i18n';

// 创建 next-intl 的中间件
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

// 自定义中间件，先处理根路径，然后交给 next-intl
export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  
  // 如果是根路径，直接重定向到英文
  if (pathname === '/' || pathname === '') {
    url.pathname = '/en';
    return NextResponse.redirect(url);
  }
  
  // 其他路径交给 next-intl 处理
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};