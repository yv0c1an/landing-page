import { UrlManager } from '@/utils/UrlManager';

// 外部链接类型
export type ExternalLink = 'sellerCenter' | 'goShopping' | 'contactUs' | 'login' | 'promote';

// 链接路径配置
export const linkPaths: Record<ExternalLink, string> = {
  sellerCenter: '/ww',
  goShopping: '/',
  contactUs: '/',
  login: '/#/login',
  promote: '/promote'
};

// 初始默认值
const defaultUrls = {
  sellerCenter: '/ww',
  goShopping: '/',
  contactUs: '/',
  login: '/#/login',
  promote: '/promote/'
};

// 动态 URL 管理
class ExternalLinksManager {
  private static instance: ExternalLinksManager;
  private urls: typeof defaultUrls;
  private initialized: boolean = false;

  private constructor() {
    this.urls = { ...defaultUrls };
  }

  public static getInstance(): ExternalLinksManager {
    if (!ExternalLinksManager.instance) {
      ExternalLinksManager.instance = new ExternalLinksManager();
    }
    return ExternalLinksManager.instance;
  }

  // 更新 URLs
  public async updateUrls(safeUrl: string | null): Promise<void> {
    if (!safeUrl || this.initialized) return;

    try {
      const urlObj = new URL(safeUrl);
      const domain = `${urlObj.protocol}//${urlObj.hostname}`;
      
      // 更新 URLs
      this.urls = {
        sellerCenter: `${domain}/ww`,
        goShopping: `${domain}/`,
        contactUs: `${domain}/`,
        login: `${domain}/#/login`,
        promote: `${domain}/promote/`
      };

      // 更新 externalLinks 对象
      Object.keys(this.urls).forEach((key) => {
        (linkPaths as any)[key as ExternalLink] = this.urls[key as keyof typeof defaultUrls];
      });

      this.initialized = true;
    } catch (error) {
      console.error('Error updating URLs:', error);
    }
  }

  // 获取 URL
  public getUrl(key: ExternalLink): string {
    return this.urls[key] || defaultUrls[key];
  }

  // 获取所有 URLs
  public getAllUrls(): typeof defaultUrls {
    return { ...this.urls };
  }

  // 重置为默认值
  public reset(): void {
    this.urls = { ...defaultUrls };
    this.initialized = false;
  }
}

export const urlManager = ExternalLinksManager.getInstance();
