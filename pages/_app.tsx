import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "../src/styles/globals.css";
import Head from 'next/head';
import { defaultLocale } from '@/config/i18n';

const inter = Inter({ subsets: ["latin"] });

type PageProps = {
  messages: Record<string, string>;
  locale: string;
};

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_DESCRIPTION }
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