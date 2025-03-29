import Link from 'next/link';
import Image from "next/image";
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();
  const appName = process.env.NEXT_PUBLIC_APP_NAME ;
  const description = process.env.NEXT_PUBLIC_SITEINFO || '';

  return (
    <footer className="bg-primary-blue py-16" aria-labelledby="footer-heading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* 左侧Logo和介绍 */}
          <div className="flex flex-col items-center md:items-start max-w-md">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-white.svg"
                width={40}
                height={40}
                alt={appName || ''}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-white">{appName}</span>
            </Link>
            <p className="mt-4 text-gray-300 text-center md:text-left leading-relaxed">
              {description}
            </p>
          </div>

          {/* 右侧链接和版权信息 */}
          <div className="flex flex-col items-center md:items-end">
            {/* <div className="flex items-center space-x-6 mb-4">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                {t('common.about')}
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                {t('common.privacy')}
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                {t('common.terms')}
              </Link>
            </div> */}
            <br/>
            <br/>
            <br/>
            <div className="text-gray-400 text-sm">
              © 1998 - {currentYear} {appName}. {t('common.allRightsReserved')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 