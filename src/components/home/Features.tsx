import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

const Features = () => {
  const t = useTranslations();

  const features = [
    {
      icon: "🤖",
      titleKey: "features.items.1.title",
      descriptionKey: "features.items.1.description",
    },
    {
      icon: "☁️",
      titleKey: "features.items.2.title",
      descriptionKey: "features.items.2.description",
    },
    {
      icon: "🛠️",
      titleKey: "features.items.3.title",
      descriptionKey: "features.items.3.description",
    },
    {
      icon: "📊",
      titleKey: "features.items.4.title",
      descriptionKey: "features.items.4.description",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            {t('features.title')}
          </h2>
          <p className="text-gray-600">
            {t('features.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-gray-600">
                  {t(feature.descriptionKey)}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 