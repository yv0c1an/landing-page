// 外部链接配置
export const externalLinks = {
  sellerCenter: {
    url: 'https://seller.crossborder.com',
    redirectTitle: '即将跳转到卖家中心...'
  },
  shopping: {
    url: 'https://shop.crossborder.com',
    redirectTitle: '即将跳转到购物平台...'
  },
  contactUs: {
    url: 'https://support.crossborder.com',
    redirectTitle: '即将跳转到客服中心...'
  },
  login: {
    url: 'https://auth.crossborder.com/login',
    redirectTitle: '即将跳转到登录页面...'
  }
} as const;

export type ExternalLink = {
  url: string;
  redirectTitle: string;
};
