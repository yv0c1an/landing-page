import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withNextIntl(config); 