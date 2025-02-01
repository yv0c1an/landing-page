import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const benefits = [
  {
    icon: "💰",
    key: "lowFee",
    color: "bg-blue-50",
  },
  {
    icon: "🎯",
    key: "traffic",
    color: "bg-green-50",
  },
  {
    icon: "🌟",
    key: "operation",
    color: "bg-purple-50",
  },
  {
    icon: "🚚",
    key: "logistics",
    color: "bg-orange-50",
  },
  {
    icon: "💡",
    key: "training",
    color: "bg-pink-50",
  },
  {
    icon: "🛡️",
    key: "protection",
    color: "bg-yellow-50",
  },
];

const stats = [
  { key: "logisticsPartners" },
  { key: "activeSellers" },
  { key: "monthlyUsers" },
  { key: "countries" },
];

const SellerBenefits = () => {
  const t = useTranslations();

  return (
    <section className="py-20">
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
            {t("sellerBenefits.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("sellerBenefits.subtitle")}
          </p>
        </motion.div>

        {/* 权益卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`p-6 h-full ${benefit.color} hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{benefit.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t(`sellerBenefits.benefits.${benefit.key}.title`)}
                    </h3>
                    <p className="text-gray-600">
                      {t(`sellerBenefits.benefits.${benefit.key}.description`)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 底部数据展示 */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {t(`sellerBenefits.stats.${stat.key}.number`)}
              </div>
              <div className="text-gray-600">
                {t(`sellerBenefits.stats.${stat.key}.label`)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 补充说明 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            * {t("sellerBenefits.disclaimer")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SellerBenefits;