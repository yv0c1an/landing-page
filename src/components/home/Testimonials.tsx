import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';

const Testimonials = () => {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      nameKey: "testimonials.items.1.author",
      roleKey: "testimonials.items.1.role",
      contentKey: "testimonials.items.1.content",
      avatar: "/avatars/avatar1.jpg",
    },
    {
      nameKey: "testimonials.items.2.author",
      roleKey: "testimonials.items.2.role",
      contentKey: "testimonials.items.2.content",
      avatar: "/avatars/avatar2.jpg",
    },
    {
      nameKey: "testimonials.items.3.author",
      roleKey: "testimonials.items.3.role",
      contentKey: "testimonials.items.3.content",
      avatar: "/avatars/avatar3.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
          <p className="text-gray-600">{t('testimonials.subtitle')}</p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="p-8 mx-4">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.avatar}
                        alt={t(testimonial.nameKey)}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="font-semibold">{t(testimonial.nameKey)}</div>
                        <div className="text-sm text-gray-500">{t(testimonial.roleKey)}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {t(testimonial.contentKey)}
                    </p>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 轮播控制按钮 */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 轮播指示器 */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-primary-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 