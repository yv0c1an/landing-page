import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

const CTA = () => {
  const router = useRouter();
  const t = useTranslations();

  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-400">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t('cta.subtitle')}
          </p>
          <Button
            size="lg"
            color="default"
            variant="solid"
            className="bg-white text-primary-500 hover:bg-gray-100"
            onPress={() => router.push("/seller/register")}
          >
            {t('cta.button')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA; 