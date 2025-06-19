import { Html, Head, Main, NextScript } from 'next/document';
import { generateLocalesMeta } from '@/lib/env-config';

export default function Document() {
  const enabledLocales = generateLocalesMeta();
  
  return (
    <Html>
      <Head>
        <meta name="enabled-locales" content={enabledLocales} />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 