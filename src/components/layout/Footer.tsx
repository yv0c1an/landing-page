import Link from 'next/link';
import Image from "next/image";
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Thryza';
  return (
    <footer className="bg-gray-900 py-8" aria-labelledby="footer-heading">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo-white.svg"
              width={40}
              height={40}
              alt={appName}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-white">{appName}</span>
          </Link>
        </div>
        <div className="mt-4 text-center text-gray-400">
          <p>© {currentYear} {appName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 