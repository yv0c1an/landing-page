import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useExternalLink } from '@/hooks/useExternalLink';
import { RedirectModal } from '@/components/common/RedirectModal';
import { Button } from '@/components/ui/button';
import {
  BadgeDollarSign,
  BarChart,
  Users,
  TruckIcon,
  Lightbulb,
  ShieldCheck,
  PiggyBank,
  GlobeIcon,
  Building2,
  UserCheck,
  Users2,
  Map
} from "lucide-react";



const SellerBenefits = () => {
  const {
    handleExternalClick,
    isRedirectModalOpen,
    handleClose,
    error
  } = useExternalLink();
  const t = useTranslations();

  const benefits = [
    {
      icon: <BadgeDollarSign className="w-5 h-5 text-green-500" />,
      key: "lowFee",
      iconColor: "bg-green-100 text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-white border-green-100",
    },
    {
      icon: <BarChart className="w-5 h-5 text-purple-500" />,
      key: "traffic",
      iconColor: "bg-purple-100 text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-white border-purple-100",
    },
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      key: "operation",
      iconColor: "bg-blue-100 text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-white border-blue-100",
    },
    {
      icon: <TruckIcon className="w-5 h-5 text-orange-500" />,
      key: "logistics",
      iconColor: "bg-orange-100 text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-white border-orange-100",
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
      key: "training",
      iconColor: "bg-yellow-100 text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-white border-yellow-100",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-red-500" />,
      key: "protection",
      iconColor: "bg-red-100 text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 to-white border-red-100",
    },
    {
      icon: <PiggyBank className="w-5 h-5 text-indigo-500" />,
      key: "funding",
      iconColor: "bg-indigo-100 text-indigo-600",
      bgColor: "bg-gradient-to-br from-indigo-50 to-white border-indigo-100",
    },
    {
      icon: <GlobeIcon className="w-5 h-5 text-teal-500" />,
      key: "localization",
      iconColor: "bg-teal-100 text-teal-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-white border-teal-100",
    }
  ];

  const stats = [
    {
      key: "logisticsPartners",
      icon: <Building2 className="w-8 h-8 text-blue-500" />,
      bgColor: "bg-gradient-to-br from-blue-50 to-white"
    },
    {
      key: "activeSellers",
      icon: <UserCheck className="w-8 h-8 text-green-500" />,
      bgColor: "bg-gradient-to-br from-green-50 to-white"
    },
    {
      key: "monthlyUsers",
      icon: <Users2 className="w-8 h-8 text-yellow-500" />,
      bgColor: "bg-gradient-to-br from-yellow-50 to-white"
    },
    {
      key: "countries",
      icon: <Map className="w-8 h-8 text-purple-500" />,
      bgColor: "bg-gradient-to-br from-purple-50 to-white"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 标题部分 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t("sellerBenefits.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t("sellerBenefits.subtitle")}
          </p>
        </motion.div>

        {/* 权益卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
              className={`group p-6 rounded-xl ${benefit.bgColor} border hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start mb-4">
                <div className={`p-3 rounded-full ${benefit.iconColor} mr-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-blue transition-colors">
                  {t(`sellerBenefits.benefits.${benefit.key}.title`)}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {t(`sellerBenefits.benefits.${benefit.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 中间分隔 */}
        <div className="flex justify-center my-16">
          <div className="h-px w-24 bg-gray-200"></div>
        </div>

        {/* 底部数据展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${stat.bgColor} p-6 rounded-xl border border-t-4 border-t-primary-blue relative overflow-hidden`}
            >
              <div className="absolute top-2 right-2 opacity-20">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 relative z-10">
                {t(`sellerBenefits.stats.${stat.key}.number`)}
              </div>
              <div className="text-gray-600 relative z-10">
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
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            * {t("sellerBenefits.disclaimer")}
          </p>
        </motion.div>

        {/* 按钮 */}
        <div className="mt-12 text-center">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg shadow-lg"
            onClick={() => handleExternalClick('/promote/')}
          >
            {t('sellerBenefits.startNow')}
          </Button>
        </div>
      </div>

      {/* RedirectModal */}
      <RedirectModal
        isOpen={isRedirectModalOpen}
        onClose={handleClose}
        title={t('common.redirecting')}
        error={error}
      />
    </section>
  );
};

export default SellerBenefits;