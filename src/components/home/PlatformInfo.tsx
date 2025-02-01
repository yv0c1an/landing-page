import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useExternalLink } from '@/hooks/useExternalLink';
import { RedirectModal } from '@/components/common/RedirectModal';
import { Globe, Truck, Wallet, BarChart } from 'lucide-react';
import Image from 'next/image';
import { motion } from "framer-motion";

const PlatformInfo = () => {
  const t = useTranslations();
  const { handleExternalLink, showRedirectModal, setShowRedirectModal, selectedUrl } = useExternalLink();

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-primary-500" />,
      title: t('features.items.1.title'),
      description: t('features.items.1.description'),
    },
    {
      icon: <Truck className="w-8 h-8 text-primary-500" />,
      title: t('features.items.2.title'),
      description: t('features.items.2.description'),
    },
    {
      icon: <Wallet className="w-8 h-8 text-primary-500" />,
      title: t('features.items.3.title'),
      description: t('features.items.3.description'),
    },
    {
      icon: <BarChart className="w-8 h-8 text-primary-500" />,
      title: t('features.items.4.title'),
      description: t('features.items.4.description'),
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('features.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              {t("platformInfo.sellerBackend.title")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  ✓
                </div>
                <p className="text-gray-600">
                  {t("platformInfo.sellerBackend.features.orderManagement")}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  ✓
                </div>
                <p className="text-gray-600">
                  {t("platformInfo.sellerBackend.features.pricingSystem")}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  ✓
                </div>
                <p className="text-gray-600">
                  {t("platformInfo.sellerBackend.features.customerService")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/platform/dashboard.png"
                alt="Platform Dashboard"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
                unoptimized
              />
              {/* */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
            </div>
            {/* */}
            <div className="absolute -bottom-6 -left-12 w-48 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/platform/mobile.png"
                alt="Mobile App"
                width={200}
                height={400}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          </motion.div>
        </div>

        <div className="text-center max-w-3xl mx-auto mt-16">
          <h2 className="text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('cta.subtitle')}
          </p>
          <Button 
            size="lg"
            onClick={() => handleExternalLink('promote')}
          >
            {t('cta.button')}
          </Button>
        </div>

        {showRedirectModal && selectedUrl && (
          <RedirectModal
            isOpen={showRedirectModal}
            onClose={() => setShowRedirectModal(false)}
            url={selectedUrl}
          />
        )}
        
      </div>
    </section>
  );
};

export default PlatformInfo;