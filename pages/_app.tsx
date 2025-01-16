import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "../src/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

type PageProps = {
  messages: any;
};

export default function App({ Component, pageProps }: AppProps<PageProps & { locale: string }>) {
  return (
    <NextIntlClientProvider 
      messages={pageProps.messages} 
      locale={pageProps.locale || 'zh'}
      timeZone="Asia/Shanghai"
    >
      <NextUIProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </NextIntlClientProvider>
  );
} 