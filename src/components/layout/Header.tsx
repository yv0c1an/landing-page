import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { locales } from '@/config/i18n';
import { externalLinks } from '@/config/externalConfig';
import { useExternalLink } from '@/hooks/useExternalLink';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RedirectModal } from '@/components/common/RedirectModal';

const languageFlags: Record<string, string> = {
  en: "/flags/en.svg",
  zh: "/flags/zh.svg",
  ja: "/flags/ja.svg",
  ko: "/flags/ko.svg",
  th: "/flags/th.svg"
};

export default function Header() {
  const router = useRouter();
  const t = useTranslations();
  const { locale, pathname, asPath, query } = router;
  const [currentLocale, setCurrentLocale] = useState(locale || 'en');
  const { handleExternalClick, handleRedirect, handleClose, isRedirectModalOpen, currentLink } = useExternalLink();

  useEffect(() => {
    setCurrentLocale(locale || 'en');
  }, [locale]);

  const languages = locales.map(lang => ({
    key: lang,
    label: t(`nav.languages.${lang}`),
    flag: languageFlags[lang]
  }));

  const handleLanguageChange = (newLocale: string) => {
    let cleanPath = asPath || pathname;
    locales.forEach(loc => {
      cleanPath = cleanPath.replace(`/${loc}`, '');
    });

    if (!cleanPath || cleanPath === '/') {
      cleanPath = '/';
    }

    const newPath = cleanPath === '/' ? `/${newLocale}` : `/${newLocale}${cleanPath}`;
    setCurrentLocale(newLocale);
    router.push(newPath);
  };

  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Thryza';

  const buttonClassName = "hover:border hover:border-blue-500 focus:border-blue-500 transition-colors";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gray-900">
              {appName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button
              color="ghost"
              className={buttonClassName}
              onClick={() => handleExternalClick('sellerCenter')}
            >
              {t('common.sellerCenter')}
            </Button>
            <Button
              color="ghost"
              className={buttonClassName}
              onClick={() => handleExternalClick('goShopping')}
            >
              {t('common.goShopping')}
            </Button>
            <Button
              color="ghost"
              className={buttonClassName}
              onClick={() => handleExternalClick('contactUs')}
            >
              {t('common.contactUs')}
            </Button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  color="ghost"
                  className={`flex items-center gap-2 ${buttonClassName}`}
                >
                  <Image
                    src={languageFlags[currentLocale]}
                    alt={`${currentLocale} flag`}
                    width={20}
                    height={15}
                    className="rounded"
                  />
                  <span className="hidden md:inline">
                    {t(`nav.languages.${currentLocale}`)}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.key}
                    onClick={() => handleLanguageChange(lang.key)}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={lang.flag}
                      alt={lang.key}
                      width={20}
                      height={15}
                      className="rounded"
                    />
                    <span>{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  color="ghost"
                  size="icon"
                  className={`md:hidden ${buttonClassName}`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{appName}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  <Button
                    color="ghost"
                    className={`justify-start ${buttonClassName}`}
                    onClick={() => handleExternalClick('sellerCenter')}
                  >
                    {t('common.sellerCenter')}
                  </Button>
                  <Button
                    color="ghost"
                    className={`justify-start ${buttonClassName}`}
                    onClick={() => handleExternalClick('goShopping')}
                  >
                    {t('common.goShopping')}
                  </Button>
                  <Button
                    color="ghost"
                    className={`justify-start ${buttonClassName}`}
                    onClick={() => handleExternalClick('contactUs')}
                  >
                    {t('common.contactUs')}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Redirect Modal */}
      <RedirectModal
        isOpen={isRedirectModalOpen}
        onClose={handleClose}
        onRedirect={handleRedirect}
        title={currentLink ? t(`common.redirectTitle`, { modalName: t(`common.${currentLink}`) }) : ''}
      />
    </header>
  );
}