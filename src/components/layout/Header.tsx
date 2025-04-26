import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { locales, defaultLocale } from '@/config/i18n';
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
  zh: "/flags/zh.svg"
};

interface HeaderProps {
  restrictLinks?: boolean;
}

export default function Header({ restrictLinks = false }: HeaderProps) {
  const router = useRouter();
  const t = useTranslations();
  const { locale, pathname, asPath, query } = router;

  // 从 URL 路径中提取语言代码
  const extractLocaleFromPath = () => {
    const path = asPath || pathname || '';
    // 检查路径是否以语言代码开头
    for (const loc of locales) {
      if (path.startsWith(`/${loc}`)) {
        return loc;
      }
    }
    return locale || defaultLocale;
  };





  const pathLocale = extractLocaleFromPath();
  const [currentLocale, setCurrentLocale] = useState(pathLocale);
  const { handleExternalClick, handleClose, isRedirectModalOpen, error } = useExternalLink();
  console.log('defaultLocale', defaultLocale);
  console.log('pathLocale', pathLocale);
  useEffect(() => {
    // 优先使用 URL 路径中的语言
    const localeFromPath = extractLocaleFromPath();
    setCurrentLocale(localeFromPath);
  }, [locale, asPath, pathname]);

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

  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  const buttonClassName = "hover:bg-blue-700 hover:text-white focus:bg-blue-700 transition-colors text-white";

  return (
    <header className="sticky top-0 z-40 w-full bg-primary-blue backdrop-blur-md border-b border-blue-600">
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
            <span className="text-xl font-bold text-white">
              {appName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 ml-auto">
            {!restrictLinks && (
              <>
                <Button
                  color="ghost"
                  className={buttonClassName}
                  onClick={() => handleExternalClick('/ww/')}
                >
                  {t('common.sellerCenter')}
                </Button>
                <Button
                  color="ghost"
                  className={buttonClassName}
                  onClick={() => handleExternalClick('/')}
                >
                  {t('common.goShopping')}
                </Button>
                <Button
                  color="ghost"
                  className={buttonClassName}
                  onClick={() => handleExternalClick('/about.html')}
                >
                  {t('common.about')}
                </Button>
              </>
            )}

            <Link href={`/${currentLocale}/code-of-conduct`} passHref>
              <Button
                color="ghost"
                className={buttonClassName}
              >
                {t('common.codeOfConduct')}
              </Button>
            </Link>
            {!restrictLinks && (
              <Button
                color="ghost"
                className={buttonClassName}
                onClick={() => handleExternalClick('/promote/')}
              >
                {t('common.promote')}
              </Button>
            )}
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
                  className={`md:hidden  ${buttonClassName}`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{appName}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  {!restrictLinks && (
                    <>
                      <Button
                        color="default"
                        className={`justify-start ${buttonClassName}`}
                        onClick={() => handleExternalClick('/www/#/login')}
                      >
                        {t('common.sellerCenter')}
                      </Button>
                      <Button
                        color="default"
                        className={`justify-start ${buttonClassName}`}
                        onClick={() => handleExternalClick('/wap/#/home')}
                      >
                        {t('common.goShopping')}
                      </Button>
                    </>
                  )}
                  <Button
                    color="default"
                    className={`justify-start ${buttonClassName}`}
                    onClick={() => handleExternalClick('/about.html')}
                  >
                    {t('common.about')}
                  </Button>
                  <Link href={`/${currentLocale}/code-of-conduct`} passHref className='w-full'>
                    <Button
                      color="default"
                      className={`justify-start ${buttonClassName} w-full`}
                    >
                      {t('common.codeOfConduct')}
                    </Button>
                  </Link>
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
        title={t('common.redirecting')}
        error={error}
      />
    </header>
  );
}