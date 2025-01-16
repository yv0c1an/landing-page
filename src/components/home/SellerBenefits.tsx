import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: "💰",
    title: "低费率政策",
    description: "平台佣金低至3%，新店铺还可享受3个月免佣金特权",
    color: "bg-blue-50",
  },
  {
    icon: "🎯",
    title: "精准流量扶持",
    description: "新店铺可获得平台首页推荐位展示，快速获取精准流量",
    color: "bg-green-50",
  },
  {
    icon: "🌟",
    title: "运营指导",
    description: "专业运营团队1对1指导，助您快速掌握跨境电商运营技巧",
    color: "bg-purple-50",
  },
  {
    icon: "🚚",
    title: "物流补贴",
    description: "与全球知名物流商合作，享受专属价格和运费补贴",
    color: "bg-orange-50",
  },
  {
    icon: "💡",
    title: "培训支持",
    description: "定期举办线上线下培训，分享行业趋势和运营经验",
    color: "bg-pink-50",
  },
  {
    icon: "🛡️",
    title: "店铺保护",
    description: "完善的知识产权保护机制，打造公平的经营环境",
    color: "bg-yellow-50",
  },
];

const SellerBenefits = () => {
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
            商家专属权益
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            加入我们的平台，享受全方位的商家扶持政策
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
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 底部数据展示 */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "200+", label: "合作物流商" },
            { number: "50万+", label: "活跃商家" },
            { number: "1亿+", label: "月活用户" },
            { number: "150+", label: "覆盖国家" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
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
            * 具体权益可能因店铺类型和地区不同而有所差异，详情请咨询客服
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SellerBenefits; 