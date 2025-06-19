import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react";
import { caseStudiesData } from "@/config/caseStudies"; // 使用相对路径导入

type LocaleType = 'zh' | 'en';

// 回退函数：如果当前语言没有数据，回退到英语，再回退到中文
const getContentWithFallback = (content: any, locale: string) => {
  if (content[locale as LocaleType]) {
    return content[locale as LocaleType];
  }
  if (content['en']) {
    return content['en'];
  }
  return content['zh'] || {};
};

interface SellerCasesProps {
  restrictLinks?: boolean;
}

const SellerCases = ({ restrictLinks = false }: SellerCasesProps) => {
  const t = useTranslations("sellerCases");
  const locale = useLocale();
  const [activeCase, setActiveCase] = useState(0);

  // 使用配置的案例数据
  const caseStudies = caseStudiesData;

  return (
    <section className="py-12 bg-blue-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold mb-4 text-primary-blue">{t("title")}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {caseStudies.map((caseItem, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg ${
                activeCase === index 
                  ? "border-2 border-primary-blue bg-blue-50" 
                  : "border border-gray-200 bg-white"
              }`}
              onClick={() => setActiveCase(index)}
            >
              <div className="relative h-48">
                <Image
                  src={`/cases/case${index+1}.jpg`}
                  alt={caseItem.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs px-2 py-1 bg-primary-blue rounded-full">
                        {getContentWithFallback(caseItem.content, locale).industry}
                      </span>
                      <span className="text-xs">{getContentWithFallback(caseItem.content, locale).location}</span>
                    </div>
                    <h3 className="text-xl font-bold">{caseItem.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3 line-clamp-2">{getContentWithFallback(caseItem.content, locale).description}</p>
                <div className="flex items-center text-primary-blue">
                  <span className="text-sm font-medium">{t("controls.details")}</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 详细案例信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg p-8 shadow-md mb-6"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary-blue mb-2">
                  {caseStudies[activeCase].name}
                </h3>
                <p className="text-gray-600">
                  {getContentWithFallback(caseStudies[activeCase].content, locale).description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-primary-blue">{t("challenges")}</h4>
                <ul className="space-y-2">
                  {getContentWithFallback(caseStudies[activeCase].content, locale).challenges?.map((challenge: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <div className="mt-1 mr-2 w-1.5 h-1.5 rounded-full bg-primary-blue flex-shrink-0"></div>
                      <span className="text-gray-600">{challenge}</span>
                    </li>
                  )) || []}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-primary-blue">{t("solutions")}</h4>
                <ul className="space-y-2">
                  {getContentWithFallback(caseStudies[activeCase].content, locale).solutions?.map((solution: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <div className="mt-1 mr-2 w-1.5 h-1.5 rounded-full bg-primary-blue flex-shrink-0"></div>
                      <span className="text-gray-600">{solution}</span>
                    </li>
                  )) || []}
                </ul>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3 text-primary-blue">{t("resultsTitle")}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-primary-blue mr-2" />
                      <span className="text-sm text-gray-600">{t("results.growth")}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary-blue">
                      {getContentWithFallback(caseStudies[activeCase].content, locale).results?.growth}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-primary-blue mr-2" />
                      <span className="text-sm text-gray-600">{t("results.revenue")}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary-blue">
                      {getContentWithFallback(caseStudies[activeCase].content, locale).results?.revenue}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-primary-blue mr-2" />
                      <span className="text-sm text-gray-600">{t("results.customers")}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary-blue">
                      {getContentWithFallback(caseStudies[activeCase].content, locale).results?.customers}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
                <h4 className="text-lg font-semibold mb-3 text-primary-blue">{t("quarterlyPerformance")}</h4>
                <div className="relative h-60">
                  <div className="absolute bottom-0 left-0 w-full h-40 flex items-end space-x-4 px-6">
                    {caseStudies[activeCase].quarterlyData && (
                      <>
                        <div className="w-1/4 bg-primary-blue h-[30%] rounded-t-md relative group" style={{ height: `${caseStudies[activeCase].quarterlyData?.q1 || 30}%` }}>
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary-blue invisible group-hover:visible">
                            Q1
                          </div>
                        </div>
                        <div className="w-1/4 bg-primary-blue/90 h-[55%] rounded-t-md relative group" style={{ height: `${caseStudies[activeCase].quarterlyData?.q2 || 55}%` }}>
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary-blue invisible group-hover:visible">
                            Q2
                          </div>
                        </div>
                        <div className="w-1/4 bg-primary-blue/80 h-[65%] rounded-t-md relative group" style={{ height: `${caseStudies[activeCase].quarterlyData?.q3 || 65}%` }}>
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary-blue invisible group-hover:visible">
                            Q3
                          </div>
                        </div>
                        <div className="w-1/4 bg-primary-blue/70 h-[85%] rounded-t-md relative group" style={{ height: `${caseStudies[activeCase].quarterlyData?.q4 || 85}%` }}>
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary-blue invisible group-hover:visible">
                            Q4
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full border-t border-blue-200"></div>
                </div>
                <div className="flex justify-between text-xs text-primary-blue font-medium mt-2">
                  <span>Q1</span>
                  <span>Q2</span>
                  <span>Q3</span>
                  <span>Q4</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SellerCases;