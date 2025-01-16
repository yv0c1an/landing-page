import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

const PlatformInfo = () => {
  const t = useTranslations();

  const features = [
    {
      icon: "🌍",
      titleKey: "features.items.1.title",
      descriptionKey: "features.items.1.description",
    },
    {
      icon: "🚀",
      titleKey: "features.items.2.title",
      descriptionKey: "features.items.2.description",
    },
    {
      icon: "💳",
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
        {/* 标题部分 */}
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

        {/* 平台特点 */}
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
              <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
              <p className="text-gray-600">{t(feature.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* 平台截图展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              强大的卖家后台管理系统
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  ✓
                </div>
                <p className="text-gray-600">
                  一站式店铺管理，轻松处理订单、库存和物流
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  ✓
                </div>
                <p className="text-gray-600">
                  智能定价系统，基于市场数据优化您的产品价格
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  ✓
                </div>
                <p className="text-gray-600">
                  多语言客服系统，高效处理买家咨询
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
                className="w-full"
                width={600}
                height={400}
              />
              {/* 装饰元素 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
            </div>
            {/* 浮动的小截图 */}
            <div className="absolute -bottom-6 -left-12 w-48 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/platform/mobile.png"
                alt="Mobile App"
                className="w-full"
                width={200}
                height={400}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlatformInfo; 