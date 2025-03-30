import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { 
  Globe, 
  TruckIcon, 
  Languages, 
  ShieldCheck, 
  BarChart4, 
  Layers 
} from 'lucide-react';

const Features = () => {
  const t = useTranslations();

  const features = [
    {
      icon: <Globe className="w-12 h-12 text-primary-blue" />,
      titleKey: "features.items.1.title",
      descriptionKey: "features.items.1.description",
      bgColor: "from-blue-400 to-blue-600",
    },
    {
      icon: <TruckIcon className="w-12 h-12 text-primary-blue" />,
      titleKey: "features.items.2.title",
      descriptionKey: "features.items.2.description",
      bgColor: "from-green-400 to-green-600"
    },
    {
      icon: <Languages className="w-12 h-12 text-primary-blue" />,
      titleKey: "features.items.3.title",
      descriptionKey: "features.items.3.description",
      bgColor: "from-purple-400 to-purple-600"
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary-blue" />,
      titleKey: "features.items.4.title",
      descriptionKey: "features.items.4.description",
      bgColor: "from-red-400 to-red-600"
    },
    {
      icon: <BarChart4 className="w-12 h-12 text-primary-blue" />,
      titleKey: "features.items.5.title",
      descriptionKey: "features.items.5.description",
      bgColor: "from-yellow-400 to-yellow-600"
    },
    {
      icon: <Layers className="w-12 h-12 text-primary-blue" />,
      titleKey: "features.items.6.title",
      descriptionKey: "features.items.6.description",
      bgColor: "from-indigo-400 to-indigo-600"
    }
  ];


  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 relative inline-block">
            {t('features.title')}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-blue opacity-70"></span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {t('features.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${feature.bgColor}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end">
                  <div className="p-6">
                    <div className="bg-white rounded-full p-3 mb-3 inline-block shadow-md">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {t(feature.titleKey)}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-blue-100 text-primary-blue font-medium">
            <span className="px-4 py-2">{t('features.title')}</span>
            <span className="bg-primary-blue text-white px-4 py-2 rounded-full">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 