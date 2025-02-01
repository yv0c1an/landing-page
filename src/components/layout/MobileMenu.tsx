import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { locales } from '@/config/i18n';
import { externalLinks } from '@/config/externalConfig';
import Image from "next/image";
import Link from "next/link";
import { useExternalLink } from "@/hooks/useExternalLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const languageFlags: Record<string, string> = {
  en: "/flags/en.svg",
  zh: "/flags/zh.svg",
  ja: "/flags/ja.svg",
  ko: "/flags/ko.svg",
  th: "/flags/th.svg"
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const t = useTranslations('common');
  const { handleExternalLink } = useExternalLink();

  const menuItems = [
    { label: t('sellerCenter'), href: "#" },
    { label: t('goShopping'), href: "#" },
    { label: t('contactUs'), href: "#" },
  ];

  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[100dvh] max-w-[100vw] mt-0 rounded-none sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t('nav.menu')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg px-4 py-2 hover:bg-accent rounded-md"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 mt-4">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                handleExternalLink(externalLinks.login);
                onClose();
              }}
            >
              {t('login')}
            </Button>
            <Button
              className="w-full justify-start"
              onClick={() => {
                handleExternalLink(externalLinks.register);
                onClose();
              }}
            >
              {t('register')}
            </Button>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">{t('nav.languages.title')}</h3>
            <div className="grid grid-cols-3 gap-2">
              {locales.map((locale) => (
                <Button
                  key={locale}
                  variant="ghost"
                  className="h-9 px-2 min-w-[60px]"
                  onClick={() => {
                    const segments = window.location.pathname.split('/');
                    segments[1] = locale;
                    window.location.pathname = segments.join('/');
                  }}
                >
                  <Image
                    src={languageFlags[locale]}
                    alt={locale}
                    width={20}
                    height={20}
                    className="mr-1"
                  />
                  <span className="uppercase text-xs">{locale}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileMenu;