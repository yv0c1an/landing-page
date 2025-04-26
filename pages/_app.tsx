import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "../src/styles/globals.css";
import Head from 'next/head';
import { defaultLocale } from '@/config/i18n';
import { CookieConsentBanner } from '@/components/common/CookieConsent';

const inter = Inter({ subsets: ["latin"] });

type PageProps = {
  messages: Record<string, string>;
  locale: string;
};

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <>
      <NextIntlClientProvider
        messages={pageProps.messages}
        locale={pageProps.locale || defaultLocale}
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