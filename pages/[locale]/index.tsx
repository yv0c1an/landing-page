import { GetServerSideProps } from 'next';
import Home from '@/components/pages/Home';
import Head from 'next/head'

export default function LocalizedPage() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_APP_DESCRIPTION} />
        
        {/* SEO tags */}
        <meta property="og:title" content={process.env.NEXT_PUBLIC_APP_TITLE} />
        <meta property="og:description" content={process.env.NEXT_PUBLIC_APP_DESCRIPTION} />
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
  const locale = params?.locale as string;
  
  return {
    props: {
      messages: (await import(`@/locales/${locale}`)).default
    }
  };
};
