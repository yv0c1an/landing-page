import { NextPage } from 'next';
import Head from 'next/head';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>发生错误 | {process.env.NEXT_PUBLIC_APP_NAME || ''}</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-primary-blue mb-4">
            {statusCode ? `Error ${statusCode}` : 'Error 404'}
          </h1>
          <p className="text-gray-600 mb-6">
            {statusCode
              ? `服务器返回了错误代码 ${statusCode}`
              : '客户端发生了一个错误'}
          </p>
          <a
            href="/"
            className="inline-block bg-primary-blue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            返回主页
          </a>
        </div>
      </div>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 