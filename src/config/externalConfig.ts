// 外部链接配置
export const externalLinks = {
  sellerCenter: {
    url: 'https://seller.crossborder.com',
  },
  goShopping: {
    url: 'https://shop.crossborder.com',
  },
  contactUs: {
    url: 'https://support.crossborder.com',
  },
  login: {
    url: 'https://auth.crossborder.com/login',
  }
} as const;

export type ExternalLink = {
  url: string;
  redirectTitle: string;
};
