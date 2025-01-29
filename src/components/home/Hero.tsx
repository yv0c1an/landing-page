import { Button, Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slides = [
    {
      image: "/slides/slide1.jpg",
      title: t('hero.slides.1.title'),
      subtitle: t('hero.slides.1.subtitle'),
    },
    {
      image: "/slides/slide2.jpg",
      title: t('hero.slides.2.title'),
      subtitle: t('hero.slides.2.subtitle'),
    },
    {
      image: "/slides/slide3.jpg",
      title: t('hero.slides.3.title'),
      subtitle: t('hero.slides.3.subtitle'),
    },
  ];

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 处理触摸事件
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }

    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="relative h-[60vh] mt-16">
      {/* 轮播图 */}
      <div 
        className="absolute inset-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 登录注册框 */}
      {/*<div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[380px] bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl">*/}
      {/*  <div className="text-center mb-6">*/}
      {/*    <h2 className="text-2xl font-bold">{t('hero.registerTitle')}</h2>*/}
      {/*    <p className="text-gray-600 mt-2">{t('hero.registerSubtitle')}</p>*/}
      {/*  </div>*/}
      {/*  <form className="space-y-4">*/}
      {/*    <Input*/}
      {/*      type="email"*/}
      {/*      label={t('hero.email')}*/}
      {/*      placeholder={t('hero.emailPlaceholder')}*/}
      {/*      variant="bordered"*/}
      {/*    />*/}
      {/*    <Input*/}
      {/*      type="password"*/}
      {/*      label={t('hero.password')}*/}
      {/*      placeholder={t('hero.passwordPlaceholder')}*/}
      {/*      variant="bordered"*/}
      {/*    />*/}
      {/*    <Button color="primary" className="w-full">*/}
      {/*      {t('hero.registerButton')}*/}
      {/*    </Button>*/}
      {/*    <div className="text-center text-sm text-gray-600">*/}
      {/*      {t('hero.hasAccount')}*/}
      {/*      <Button variant="light" className="px-2">*/}
      {/*        {t('hero.loginButton')}*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  </form>*/}
      {/*</div>*/}

      {/* 轮播指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors hidden md:block"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors hidden md:block"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

export default Hero; 