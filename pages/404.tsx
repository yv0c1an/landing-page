import { NextPage } from 'next';
import Head from 'next/head';

const Custom404: NextPage = () => {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || '';
  
  return (
    <>
      <Head>
        <title>{`Page Not Found | ${appName}`}</title>
        <meta name="description" content="Sorry, the page you are looking for does not exist." />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-primary-blue mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Sorry, the page you are looking for does not exist.
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

export default Custom404;