// 用于管理localStorage中的referrer信息
const GOOGLE_SOURCE_KEY = 'google_source_valid';
const EXPIRY_TIME_KEY = 'google_source_expires';
const EXPIRY_TIME_MS = 5 * 60 * 1000; // 5分钟

// 检查是否是客户端环境
const isClient = typeof window !== 'undefined';

// 检查是否来自Google搜索
export const isFromGoogleSearch = (referer: string | null): boolean => {
  if (!referer) return false;
  return referer.includes('google.com/search') || 
         referer.includes('google.co') || 
         referer.includes('.google.');
};

// 设置Google来源标记，带5分钟过期时间
export const setGoogleSourceValid = () => {
  if (!isClient) return;
  
  try {
    const expiryTime = Date.now() + EXPIRY_TIME_MS;
    localStorage.setItem(GOOGLE_SOURCE_KEY, 'true');
    localStorage.setItem(EXPIRY_TIME_KEY, expiryTime.toString());
  } catch (error) {
    console.error('无法写入localStorage:', error);
  }
};

// 检查Google来源标记是否有效
export const isGoogleSourceValid = (): boolean => {
  if (!isClient) return false;
  
  try {
    const isValid = localStorage.getItem(GOOGLE_SOURCE_KEY) === 'true';
    const expiryTimeStr = localStorage.getItem(EXPIRY_TIME_KEY);
    
    if (!isValid || !expiryTimeStr) return false;
    
    const expiryTime = parseInt(expiryTimeStr, 10);
    const isExpired = Date.now() > expiryTime;
    
    // 如果过期，清除localStorage
    if (isExpired) {
      localStorage.removeItem(GOOGLE_SOURCE_KEY);
      localStorage.removeItem(EXPIRY_TIME_KEY);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('无法读取localStorage:', error);
    return false;
  }
};

// 服务端用于检测来源
export const checkAndMarkGoogleReferrer = (referer: string | null): boolean => {
  return isFromGoogleSearch(referer);
}; 