import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from '@/config/i18n';

// 创建 next-intl 的中间件
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

// 检测浏览器首选语言
function getPreferredLocale(request: NextRequest): string {
  // 获取 Accept-Language 头部
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // 检查是否包含中文语言代码 (zh, zh-CN, zh-TW 等)
  if (acceptLanguage.match(/^zh|,zh/i)) {
    return 'zh';
  }
  
  // 默认返回英文
  return 'en';
}

// 自定义中间件，只处理根路径重定向，其余交给 next-intl
export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  
  // 如果是根路径，根据浏览器语言重定向
  if (pathname === '/' || pathname === '') {
    const preferredLocale = getPreferredLocale(request);
    url.pathname = `/${preferredLocale}`;
    return NextResponse.redirect(url);
  }
  
  // 其他所有情况，直接交给next-intl处理
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};