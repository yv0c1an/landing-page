import { Modal, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { locales } from '@/config/i18n';
import { externalLinks } from '@/config/externalConfig';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  onLanguageChange: (lang: string) => void;
  onExternalClick: (linkKey: keyof typeof externalLinks) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  locale, 
  onLanguageChange,
  onExternalClick
}) => {
  const t = useTranslations();

  const languages = locales.map(lang => ({
    key: lang,
    label: t(`nav.languages.${lang}`)
  }));

  const menuItems = [
    { key: 'sellerCenter', name: t('common.sellerCenter') },
    { key: 'shopping', name: t('common.goShopping') },
    { key: 'contactUs', name: t('common.contactUs') },
  ] as const;

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
              key={item.key}
              whileTap={{ scale: 0.98 }}
            >
              <button
                className="block w-full px-4 py-2 text-lg text-left text-gray-700 hover:text-primary"
                onClick={() => {
                  onExternalClick(item.key);
                  onClose();
                }}
              >
                {item.name}
              </button>
            </motion.div>
          ))}
        </nav>

        <div className="mt-6 space-y-4">
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
            <Button 
              color="primary" 
              className="w-full"
              onPress={() => {
                onExternalClick('login');
                onClose();
              }}
            >
              {t('common.login')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MobileMenu;