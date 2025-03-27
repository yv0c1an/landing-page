import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { useUrlStore } from '@/store/urlStore';
import "../src/styles/globals.css";
import Head from 'next/head';
import { useEffect } from 'react';
import { defaultLocale } from '@/config/i18n';

const inter = Inter({ subsets: ["latin"] });

type PageProps = {
  messages: Record<string, string>;
  locale: string;
};

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  const initializeUrl = useUrlStore(state => state.initializeUrl);
  
  useEffect(() => {
    initializeUrl();
  }, []);

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE || 'Thryza - 全球跨境电商平台'}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_DESCRIPTION || '连接全球买家和卖家，开启您的跨境贸易之旅'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <NextIntlClientProvider
        messages={pageProps.messages}
        locale={pageProps.locale || defaultLocale}
        timeZone="Asia/Shanghai"
      >
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </NextIntlClientProvider>
    </>
  );
}