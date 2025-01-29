import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { useExternalLink } from '@/hooks/useExternalLink';
import { RedirectModal } from '@/components/common/RedirectModal';

const CTA = () => {
  const t = useTranslations();
  const { 
    handleExternalClick, 
    isRedirectModalOpen, 
    currentLink,
    handleRedirect,
    handleClose 
  } = useExternalLink();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('cta.subtitle')}
          </p>
          <Button 
            color="primary" 
            size="lg"
            onPress={() => handleExternalClick('promote')}
          >
            {t('cta.button')}
          </Button>
        </motion.div>

        {/* 添加 RedirectModal */}
        {currentLink && (
          <RedirectModal
            isOpen={isRedirectModalOpen}
            onClose={handleClose}
            onRedirect={handleRedirect}
            title={t(`common.redirectTitle`, { modalName: t(`common.${currentLink}`) })}
          />
        )}
      </div>
    </section>
  );
};

export default CTA; 