import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "../src/styles/globals.css";
import Head from 'next/head'
import { useEffect } from 'react';
import { updateExternalLinks } from '@/config/externalConfig';

const inter = Inter({ subsets: ["latin"] });

type PageProps = {
  messages: any;
};

export default function App({ Component, pageProps }: AppProps<PageProps & { locale: string }>) {
  useEffect(() => {
    // 应用启动时更新 URLs
    updateExternalLinks();
    
    // 设置定期更新
    const interval = setInterval(updateExternalLinks, 1000 * 60 * 60); // 每小时更新一次
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE || 'Default Title'}</title>
        <meta 
          name="description" 
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Default Description'} 
        />
      </Head>
      <NextIntlClientProvider 
        messages={pageProps.messages} 
        locale={pageProps.locale || 'zh'}
        timeZone="Asia/Shanghai"
        onError={(error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Translation error:', error);
          }
        }}
      >
        <NextUIProvider>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </NextUIProvider>
      </NextIntlClientProvider>
    </>
  );
} 