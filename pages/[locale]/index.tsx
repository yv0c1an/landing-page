import { GetServerSideProps } from 'next';
import Home from '@/components/pages/Home';
import Head from 'next/head';
import Script from 'next/script';
import { defaultLocale } from '@/config/i18n';
import { getEnabledLanguages, getFallbackLanguage } from '@/lib/env-config';
import { getVisitorType, isValidVisitor } from '@/utils/referrerCheck';
import { checkAndMarkGoogleReferrer } from '@/utils/referrerStorage';

export default function LocalizedPage({ 
  isValid, 
  visitorType, 
  isGoogleSource 
}: { 
  isValid: boolean, 
  visitorType: string,
  isGoogleSource: boolean
}) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE || ''}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_DESCRIPTION ||''} />
        {/* SEO tags */}
        <meta property="og:title" content={process.env.NEXT_PUBLIC_TITLE || ''} />
        <meta property="og:description" content={process.env.NEXT_PUBLIC_DESCRIPTION || ''} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL ||''} />
        
        <meta name="keywords" content={process.env.NEXT_PUBLIC_KEYWORDS ||''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      
      {/* 如果来自Google，注入脚本设置localStorage */}
      {isGoogleSource && (
        <Script id="set-google-source" strategy="afterInteractive">
          {`
            try {
              const expiryTime = Date.now() + ${5 * 60 * 1000};
              localStorage.setItem('google_source_valid', 'true');
              localStorage.setItem('google_source_expires', expiryTime.toString());
              console.log('已设置Google来源标记，过期时间:', new Date(expiryTime).toLocaleString());
            } catch (error) {
              console.error('无法写入localStorage:', error);
            }
          `}
        </Script>
      )}
      
      <Home isValid={isValid} visitorType={visitorType} />
    </>
  );
}

// 使用 getServerSideProps 替代 getStaticProps
export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const requestedLocale = (params?.locale as string) || defaultLocale;
  
  // 获取回退语言（如果请求的语言不可用，会自动回退到英语）
  const locale = getFallbackLanguage(requestedLocale);
  
  // 如果回退后的语言与请求的语言不同，重定向到正确的语言
  if (locale !== requestedLocale) {
    return {
      redirect: {
        destination: `/${locale}`,
        permanent: false,
      },
    };
  }
  
  // 检查访问来源
  const visitorType = getVisitorType(req as any);
  const isValid = isValidVisitor(req as any);
  
  // 检查并标记是否来自Google
  const referer = req.headers.referer || req.headers.referrer;
  const isGoogleSource = checkAndMarkGoogleReferrer(referer as string);
  
  try {
    const messages = (await import(`@/locales/${locale}`)).default;
    
    return {
      props: {
        messages,
        locale,
        isValid,
        visitorType,
        isGoogleSource
      }
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    
    // 如果加载失败，强制使用英语
    try {
      const fallbackMessages = (await import(`@/locales/en`)).default;
      return {
        props: {
          messages: fallbackMessages,
          locale: 'en',
          isValid,
          visitorType,
          isGoogleSource
        }
      };
    } catch (fallbackError) {
      console.error('Failed to load fallback English messages:', fallbackError);
      return {
        notFound: true,
      };
    }
  }
};
