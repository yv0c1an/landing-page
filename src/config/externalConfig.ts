import { UrlManager } from '@/utils/UrlManager';

// 外部链接配置
export const externalLinks = {
  sellerCenter: process.env.NEXT_PUBLIC_SELLER_URL || 'https://thryzae.com/',
  goShopping: process.env.NEXT_PUBLIC_SHOPPING_URL || 'https://thryzae.com/ww',
  contactUs: process.env.NEXT_PUBLIC_AUTH_URL || 'https://thryzae.com/wap/',
  login: process.env.NEXT_PUBLIC_AUTH_URL || 'https://thryzae.com/wap/',
  promote: process.env.NEXT_PUBLIC_PROMOTE || 'https://thryzae.com/promote/'
} as const;

export type ExternalLink = {
  url: string;
  redirectTitle: string;
};

// 初始默认值
const defaultUrls = {
  sellerCenter: 'https://thryzae.com/',
  goShopping: 'https://thryzae.com/ww',
  contactUs: 'https://thryzae.com/wap/',
  login: 'https://thryzae.com/wap/',
  promote: 'https://thryzae.com/promote/'
};

// 动态 URL 管理
class ExternalLinksManager {
  private static instance: ExternalLinksManager;
  private urls: typeof defaultUrls;

  private constructor() {
    this.urls = { ...defaultUrls };
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ExternalLinksManager();
    }
    return this.instance;
  }

  async updateUrls() {
    try {
      const safeUrl = await UrlManager.getRandomSafeUrl();
      if (safeUrl) {
        // 更新所有链接使用新的安全域名
        const urlObj = new URL(safeUrl);
        const domain = `${urlObj.protocol}//${urlObj.hostname}`;
        
        this.urls = {
          sellerCenter: `${domain}/`,
          goShopping: `${domain}/ww`,
          contactUs: `${domain}/wap/`,
          login: `${domain}/wap/`,
          promote: `${domain}/promote/`
        };
      }
    } catch (error) {
      console.error('Error updating URLs:', error);
    }
  }

  getUrls() {
    return this.urls;
  }
}

// 导出当前链接配置
export const externalLinksManager = ExternalLinksManager.getInstance().getUrls();

// 提供更新方法
export const updateExternalLinks = async () => {
  await ExternalLinksManager.getInstance().updateUrls();
  return ExternalLinksManager.getInstance().getUrls();
};
