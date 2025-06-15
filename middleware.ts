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
    const preferredLocale = getPreferredLocale(request);
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
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