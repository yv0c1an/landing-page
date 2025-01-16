import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const cases = [
  {
    id: 1,
    name: "LOVEVOOK",
    image: "/cases/case1.jpg",
    description: "LOVEVOOK以成为全球最受欢迎的箱包品牌公司为愿景，深度耕耘欧美市场，而TikTok Shop加速了其品牌升级和全球化进程。2023年12月入驻后，凭借对TikTok Shop箱包市场的精准洞察，品牌推出既有箱包特产品快速占领市场，打造背包包类目销量第一的明星产品，2024年3月起成功跻身美区箱包类目GMV前三名。",
    stats: {
      views: ">3000万",
      orders: ">3.6万",
      gmv: ">150万美金",
    },
  },
  {
    id: 2,
    name: "优品数码",
    image: "/cases/case2.jpg",
    description: "专注高品质数码配件研发和生产，通过平台的全球化渠道，成功打入欧美及东南亚市场。凭借优质的产品质量和创新的设计，获得了大量海外用户的好评和认可。",
    stats: {
      views: ">2000万",
      orders: ">2.8万",
      gmv: ">120万美金",
    },
  },
  // 可以继续添加更多案例...
];

const SellerCases = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cases.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
          <h2 className="text-4xl font-bold mb-4">优秀商家案例</h2>
        </motion.div>

        <div className="relative">
          {/* 轮播图区域 */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {cases.map((case_, index) => (
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
                          {case_.stats.views}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">累计视频观看量</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <div className="text-xl font-bold text-primary-600">
                          {case_.stats.orders}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">累计订单总量</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <div className="text-xl font-bold text-primary-600">
                          {case_.stats.gmv}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">GMV总量</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 轮播控制按钮 */}
          <button
            className="absolute left-4 top-[200px] p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + cases.length) % cases.length)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-[200px] p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % cases.length)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 轮播指示器 */}
          <div className="flex justify-center mt-4 gap-2">
            {cases.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-primary-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerCases; 