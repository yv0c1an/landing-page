import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const RegistrationSteps = () => {
  const t = useTranslations();

  const steps = [1, 2, 3, 4].map(num => ({
    number: t(`registrationSteps.steps.${num}.number`),
    title: t(`registrationSteps.steps.${num}.title`),
    description: t(`registrationSteps.steps.${num}.description`),
    details: t.raw(`registrationSteps.steps.${num}.details`) as string[],
  }));

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
            {t("registrationSteps.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("registrationSteps.subtitle")}
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
              <h3 className="text-2xl font-bold mb-4">{t("registrationSteps.contact.title")}</h3>
              {/* <div className="space-y-4">
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
                  <span>{t("registrationSteps.contact.phone")}</span>
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
                  <span>{t("registrationSteps.contact.email")}</span>
                </div>
              </div> */}
            </div>
            <div className="text-gray-600">
              <p className="mb-2">
                * {t("registrationSteps.contact.note1")}
              </p>
              <p>
                * {t("registrationSteps.contact.note2")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationSteps;