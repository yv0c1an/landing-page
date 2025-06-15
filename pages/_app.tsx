import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "../src/styles/globals.css";
import Head from 'next/head';
import { defaultLocale } from '@/config/i18n';
import { CookieConsentBanner } from '@/components/common/CookieConsent';

const inter = Inter({ subsets: ["latin"] });

type PageProps = {
  messages?: Record<string, string>;
  locale?: string;
};

// 默认的最小消息集合，确保CookieConsent能正常工作
const defaultMessages = {
  cookies: {
    message: "We use cookies to enhance your experience on our website. By continuing to use our site, you agree to our use of cookies in accordance with our Privacy Policy.",
    accept: "Accept",
    decline: "Decline",
  },
  common: {
    redirecting: "Redirecting..."
  }
};

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  // 如果没有messages，使用默认消息；如果有messages但缺少cookies部分，则合并
  const messages = pageProps.messages 
    ? { ...defaultMessages, ...pageProps.messages }
    : defaultMessages;
  const locale = pageProps.locale || defaultLocale;

  return (
    <>
      <NextIntlClientProvider
        messages={messages}
        locale={locale}
        timeZone="Asia/Shanghai"
      >
        <main className={inter.className}>
          <Component {...pageProps} />
          <CookieConsentBanner />
        </main>
      </NextIntlClientProvider>
    </>
  );
}