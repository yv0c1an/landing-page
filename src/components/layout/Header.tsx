import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';
import { locales } from '@/config/i18n';

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = locales.map(lang => ({
    key: lang,
    label: t(`nav.languages.${lang}`)
  }));

  const handleLanguageChange = (lang: string) => {
    const newPathname = pathname.replace(/^\/[^\/]+/, '') || '/';
    const newUrl = `/${lang}${newPathname}`;
    router.push(newUrl);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="CrossBorder Logo"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="text-xl font-bold">CrossBorder</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/seller" className="text-gray-700 hover:text-primary">
              {t('common.sellerCenter')}
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-primary">
              {t('common.goShopping')}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary">
              {t('common.contactUs')}
            </Link>
            
            {/* Language Selector */}
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" className="capitalize">
                  {t(`nav.languages.${locale}`)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label={t('nav.selectLanguage')}
                selectionMode="single"
                selectedKeys={new Set([locale])}
                onSelectionChange={(keys) => {
                  const selectedLang = Array.from(keys)[0] as string;
                  if (selectedLang) {
                    handleLanguageChange(selectedLang);
                  }
                }}
              >
                {languages.map((lang) => (
                  <DropdownItem key={lang.key}>{lang.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* Login Button */}
            <Button color="primary" variant="flat">
              {t('common.login')}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            languages={languages}
            currentLocale={locale}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;