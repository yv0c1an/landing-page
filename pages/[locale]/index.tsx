import { GetServerSideProps } from 'next';
import Home from '@/components/pages/Home';
import Head from 'next/head';
import { defaultLocale } from '@/config/i18n';

export default function LocalizedPage() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_DESCRIPTION} />
        
        {/* SEO tags */}
        <meta property="og:title" content={process.env.NEXT_PUBLIC_TITLE} />
        <meta property="og:description" content={process.env.NEXT_PUBLIC_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
        
        <meta name="keywords" content="your,keywords,here" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_API_URL} />
      </Head>
      <Home />
    </>
  );
}

// 使用 getServerSideProps 替代 getStaticProps
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const locale = (params?.locale as string) || defaultLocale;
  
  try {
    const messages = (await import(`@/locales/${locale}`)).default;
    
    return {
      props: {
        messages,
        locale
      }
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    
    // 如果加载失败，使用默认语言
    const defaultMessages = (await import(`@/locales/${defaultLocale}`)).default;
    return {
      props: {
        messages: defaultMessages,
        locale: defaultLocale
      }
    };
  }
};
