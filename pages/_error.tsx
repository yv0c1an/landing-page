import { NextPage } from 'next';
import Head from 'next/head';
import { defaultLocale } from '@/config/i18n';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <>
      <Head>
      <title>{`发生错误 | ${process.env.NEXT_PUBLIC_APP_NAME || ''}`}</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-primary-blue mb-4">
            {statusCode ? `Error ${statusCode}` : 'Error 404'}
          </h1>
          <p className="text-gray-600 mb-6">
            {statusCode
              ? `Server returned an error code ${statusCode}`
              : 'A client error occurred'}
          </p>
          <a
            href="/"
            className="inline-block bg-primary-blue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </>
  );
};

Error.getInitialProps = async ({ res, err, req }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  
  // 添加国际化支持
  const locale = defaultLocale; // 错误页面使用默认语言
  try {
    const messages = (await import(`@/locales/${locale}`)).default;
    return { 
      statusCode,
      messages,
      locale
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return { statusCode };
  }
};


export default Error; 