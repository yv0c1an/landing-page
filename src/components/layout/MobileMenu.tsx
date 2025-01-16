import { Modal, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

interface Language {
  key: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  languages: Language[];
  currentLocale: string;
  onLanguageChange: (lang: string) => void;
}

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  languages,
  currentLocale, 
  onLanguageChange 
}: MobileMenuProps) => {
  const t = useTranslations();

  const menuItems = [
    { name: t('common.sellerCenter'), href: "/seller" },
    { name: t('common.goShopping'), href: "/shop" },
    { name: t('common.contactUs'), href: "/contact" },
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
                className="block py-2 text-lg text-gray-700 hover:text-primary"
                onClick={onClose}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* 语言选择 */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm text-gray-500 mb-3">{t('nav.selectLanguage')}</h3>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.key}
                variant={currentLocale === lang.key ? "solid" : "light"}
                color={currentLocale === lang.key ? "primary" : "default"}
                className="w-full"
                onPress={() => {
                  onLanguageChange(lang.key);
                  onClose();
                }}
              >
                {lang.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 登录按钮 */}
        <div className="mt-6 pt-6 border-t">
          <Button
            color="primary"
            className="w-full"
            size="lg"
            onPress={onClose}
          >
            {t('common.login')}/{t('common.register')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MobileMenu; 