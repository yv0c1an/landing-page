import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "注册账号",
    description: "填写基本信息，创建跨境电商账号",
    details: [
      "企业/个人邮箱",
      "联系电话",
      "基本信息",
    ],
  },
  {
    number: "02",
    title: "资质认证",
    description: "上传必要的资质文件进行认证",
    details: [
      "营业执照",
      "法人身份证",
      "银行开户证明",
      "商标证书（如有）",
    ],
  },
  {
    number: "03",
    title: "店铺设置",
    description: "完善店铺信息和支付设置",
    details: [
      "店铺名称和LOGO",
      "经营类目选择",
      "支付账户设置",
    ],
  },
  {
    number: "04",
    title: "培训认证",
    description: "参加平台商家培训并通过考核",
    details: [
      "平台规则学习",
      "操作系统培训",
      "在线考核认证",
    ],
  },
];

const RegistrationSteps = () => {
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
            成为商家只需四步
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            简单快捷的入驻流程，专业的支持团队为您保驾护航
          </p>
        </motion.div>

        {/* 步骤展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow relative overflow-hidden">
                {/* 背景数字 */}
                <div className="absolute -right-4 -top-4 text-8xl font-bold text-gray-100">
                  {step.number}
                </div>
                
                <div className="relative z-10">
                  <div className="text-xl font-semibold mb-4">{step.title}</div>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 补充信息 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-white p-8 rounded-2xl shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">入驻咨询</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>咨询电话：400-888-8888</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>商务邮箱：business@crossborder.com</span>
                </div>
              </div>
            </div>
            <div className="text-gray-600">
              <p className="mb-2">
                * 平台将在收到完整申请材料后的3个工作日内完成审核
              </p>
              <p>
                * 审核通过后，运营团队将与您联系，协助完成后续店铺设置
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationSteps; 