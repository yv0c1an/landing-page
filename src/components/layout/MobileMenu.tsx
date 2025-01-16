import { Modal, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { locales } from '@/config/i18n';

interface Language {
  key: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  onLanguageChange: (lang: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  locale, 
  onLanguageChange 
}: MobileMenuProps) => {
  const t = useTranslations();

  const languages = locales.map(lang => ({
    key: lang,
    label: t(`nav.languages.${lang}`)
  }));

  const menuItems = [
    { name: t('common.sellerCenter'), href: `/${locale}/seller` },
    { name: t('common.goShopping'), href: `/${locale}/shop` },
    { name: t('common.contactUs'), href: `/${locale}/contact` },
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="bg-white rounded-t-2xl"
      placement="bottom"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: 20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <div className="p-6">
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={item.href}
                className="block px-4 py-2 text-lg text-gray-700 hover:text-primary"
                onClick={onClose}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="space-y-4">
          <Link 
            href={`/${locale}/seller`} 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            {t('common.sellerCenter')}
          </Link>
          <Link 
            href={`/${locale}/shop`} 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            {t('common.goShopping')}
          </Link>
          <Link 
            href={`/${locale}/contact`} 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            {t('common.contactUs')}
          </Link>
          
          <div className="px-4 py-2">
            <p className="text-sm text-gray-500 mb-2">{t('nav.selectLanguage')}</p>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.key}
                  className={`w-full text-left px-3 py-2 rounded ${
                    locale === lang.key ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    onLanguageChange(lang.key);
                    onClose();
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-2">
            <Button color="primary" className="w-full">
              {t('common.login')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MobileMenu;