import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { locales } from '@/config/i18n';
import { useExternalLink } from '@/hooks/useExternalLink';
import { RedirectModal } from '@/components/common/RedirectModal';
import { type ExternalLinkKey } from '@/hooks/useExternalLink';

const languageFlags: Record<string, string> = {
  en: "/flags/en.svg",
  zh: "/flags/zh.svg",
  ja: "/flags/ja.svg",
  ko: "/flags/ko.svg",
  th: "/flags/th.svg"
};

const Header = () => {
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [currentLocale, setCurrentLocale] = useState(locale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Thryza';

  const { handleExternalLink, showRedirectModal, setShowRedirectModal, selectedUrl } = useExternalLink();

  const handleLanguageChange = (locale: string) => {
    setCurrentLocale(locale);
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    router.replace(newPath);
  };

  const navItems: { key: ExternalLinkKey; label: string }[] = [
    { key: 'sellerCenter', label: t('sellerCenter') },
    { key: 'goShopping', label: t('goShopping') },
    { key: 'contactUs', label: t('contactUs') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold text-business">{appName}</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleExternalLink(item.key)}
                className="text-gray-600 hover:text-primary"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-[60px] px-2 h-9">
                  <Image
                    src={languageFlags[currentLocale]}
                    alt={currentLocale}
                    width={20}
                    height={20}
                    className="mr-1"
                  />
                  <span className="uppercase text-xs">{currentLocale}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[60px] p-0">
                {locales.map((locale) => (
                  <DropdownMenuItem
                    key={locale}
                    onClick={() => handleLanguageChange(locale)}
                    className="px-2 py-1.5 h-9 flex items-center justify-start"
                  >
                    <Image
                      src={languageFlags[locale]}
                      alt={locale}
                      width={20}
                      height={20}
                      className="mr-1"
                    />
                    <span className="uppercase text-xs">{locale}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => handleExternalLink('login')}
              >
                {t('login')}
              </Button>
              <Button
                onClick={() => handleExternalLink('register')}
              >
                {t('register')}
              </Button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <RedirectModal
        isOpen={showRedirectModal}
        onClose={() => setShowRedirectModal(false)}
        url={selectedUrl}
      />
    </header>
  );
};

export default Header;