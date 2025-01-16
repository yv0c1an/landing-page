const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@nextui-org/react'],
  i18n: {
    locales: ['zh', 'en', 'ja', 'th', 'ko'],
    defaultLocale: 'zh'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = withNextIntl(config); 