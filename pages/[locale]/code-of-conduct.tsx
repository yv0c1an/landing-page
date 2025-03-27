import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { defaultLocale } from '@/config/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CodeOfConduct() {
  const t = useTranslations('codeOfConduct');
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Thryza';

  return (
    <>
      <Head>
        <title>{t('title')} | {appName}</title>
        <meta name="description" content={t('subtitle')} />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-primary-blue mb-4">{t('title')}</h1>
              <p className="text-xl text-gray-600">{t('subtitle')}</p>
            </div>

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-primary-blue mb-4">{t('introduction.title')}</h2>
              <p className="text-gray-700">{t('introduction.content')}</p>
            </section>

            {/* Core Values */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-primary-blue mb-4">{t('coreValues.title')}</h2>
              <ul className="space-y-6">
                <li className="ml-6">
                  <h3 className="text-xl font-medium text-primary-blue">{t('coreValues.integrity.title')}</h3>
                  <p className="text-gray-700 mt-2">{t('coreValues.integrity.content')}</p>
                </li>
                <li className="ml-6">
                  <h3 className="text-xl font-medium text-primary-blue">{t('coreValues.respect.title')}</h3>
                  <p className="text-gray-700 mt-2">{t('coreValues.respect.content')}</p>
                </li>
                <li className="ml-6">
                  <h3 className="text-xl font-medium text-primary-blue">{t('coreValues.compliance.title')}</h3>
                  <p className="text-gray-700 mt-2">{t('coreValues.compliance.content')}</p>
                </li>
                <li className="ml-6">
                  <h3 className="text-xl font-medium text-primary-blue">{t('coreValues.fairness.title')}</h3>
                  <p className="text-gray-700 mt-2">{t('coreValues.fairness.content')}</p>
                </li>
              </ul>
            </section>

            {/* Ethical Business Practices */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-primary-blue mb-6">{t('business_practices.title')}</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('business_practices.fair_dealing.title')}</h3>
                  <p className="text-gray-700">{t('business_practices.fair_dealing.content')}</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('business_practices.anti_corruption.title')}</h3>
                  <p className="text-gray-700">{t('business_practices.anti_corruption.content')}</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('business_practices.conflict_of_interest.title')}</h3>
                  <p className="text-gray-700">{t('business_practices.conflict_of_interest.content')}</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('business_practices.confidentiality.title')}</h3>
                  <p className="text-gray-700">{t('business_practices.confidentiality.content')}</p>
                </div>
              </div>
            </section>

            {/* Marketplace Conduct */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-primary-blue mb-6">{t('marketplace_conduct.title')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('marketplace_conduct.product_quality.title')}</h3>
                  <p className="text-gray-700">{t('marketplace_conduct.product_quality.content')}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('marketplace_conduct.marketing.title')}</h3>
                  <p className="text-gray-700">{t('marketplace_conduct.marketing.content')}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('marketplace_conduct.fair_competition.title')}</h3>
                  <p className="text-gray-700">{t('marketplace_conduct.fair_competition.content')}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('marketplace_conduct.intellectual_property.title')}</h3>
                  <p className="text-gray-700">{t('marketplace_conduct.intellectual_property.content')}</p>
                </div>
              </div>
            </section>

            {/* Compliance and Reporting */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-primary-blue mb-6">{t('compliance.title')}</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">{t('compliance.laws.title')}</h3>
                  <p className="text-gray-700">{t('compliance.laws.content')}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">{t('compliance.reporting.title')}</h3>
                  <p className="text-gray-700">{t('compliance.reporting.content')}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">{t('compliance.investigation.title')}</h3>
                  <p className="text-gray-700">{t('compliance.investigation.content')}</p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="bg-primary-blue text-white p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">{t('conclusion.title')}</h2>
              <p>{t('conclusion.content')}</p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

// 使用 getServerSideProps 与项目其他页面保持一致
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