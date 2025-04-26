import { NextRequest } from 'next/server';
import { isbot } from 'isbot';
import { IncomingMessage, IncomingHttpHeaders } from 'http';

// 检查是否是搜索引擎机器人（使用isbot库）
export const isBotVisit = (userAgent: string | null): boolean => {
  if (!userAgent) return false;
  return isbot(userAgent);
};

// 检查是否来自谷歌搜索
export const isFromGoogleSearch = (referer: string | null): boolean => {
  if (!referer) return false;
  return referer.includes('google.com/search') || 
         referer.includes('google.co') || 
         referer.includes('.google.');
};

// 安全地获取请求中的头部信息
const getHeader = (request: NextRequest | IncomingMessage, name: string): string | null => {
  // NextRequest 类型
  if ('headers' in request && typeof request.headers.get === 'function') {
    return request.headers.get(name);
  }
  
  // Node.js IncomingMessage 类型
  if ('headers' in request) {
    const headers = request.headers as IncomingHttpHeaders;
    const key = name.toLowerCase();
    const value = headers[key];
    
    if (Array.isArray(value)) {
      return value[0] || null;
    }
    return value || null;
  }
  
  return null;
};

// 判断访问者类型
export const getVisitorType = (request: NextRequest | IncomingMessage) => {
  const userAgent = getHeader(request, 'user-agent');
  const referer = getHeader(request, 'referer');
  
  if (isBotVisit(userAgent)) {
    return 'bot';
  }
  
  if (isFromGoogleSearch(referer)) {
    return 'google';
  }
  
  return 'direct';
};

// 判断是否是有效客户（仅谷歌搜索来源为有效）
export const isValidVisitor = (request: NextRequest | IncomingMessage): boolean => {
  return getVisitorType(request) === 'google';
}; 