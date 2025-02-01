import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface CaseData {
  name: string;
  description: string;
  stats: {
    views: {
      value: string;
      label: string;
    };
    orders: {
      value: string;
      label: string;
    };
    gmv: {
      value: string;
      label: string;
    };
  };
}

const SellerCases = () => {
  const t = useTranslations("sellerCases");
  const [currentSlide, setCurrentSlide] = useState(0);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2); // 只有2个案例
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 获取翻译数据
  const casesData = t.raw("cases") as Record<string, CaseData>;
  const cases = Object.entries(casesData).map(([id, data]) => ({
    id,
    name: data.name,
    image: `/cases/case${id}.jpg`,
    description: data.description,
    stats: data.stats,
  }));

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
          <h2 className="text-4xl font-bold mb-4">{t("title")}</h2>
        </motion.div>

        <div className="relative">
          {/* 轮播图区域 */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {cases.map((case_) => (
                <div key={case_.id} className="w-full flex-shrink-0">
                  {/* 图片区域 */}
                  <div className="relative h-[400px]">
                    <Image
                      src={case_.image}
                      alt={case_.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* 内容区域 */}
                  <div className="bg-white p-8">
                    <h3 className="text-2xl font-bold mb-4">{case_.name}</h3>
                    <p className="text-gray-600 mb-8 text-left">
                      {case_.description}
                    </p>
                    
                    {/* 数据统计 */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <div className="text-xl font-bold text-primary-600">
                          {case_.stats.views.value}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {case_.stats.views.label}
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <div className="text-xl font-bold text-primary-600">
                          {case_.stats.orders.value}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {case_.stats.orders.label}
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <div className="text-xl font-bold text-primary-600">
                          {case_.stats.gmv.value}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {case_.stats.gmv.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 导航按钮 */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + 2) % 2)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
            aria-label={t("controls.prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % 2)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
            aria-label={t("controls.next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SellerCases;