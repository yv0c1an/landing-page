import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const Hero = () => {
  const t = useTranslations('Home');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/hero/slide1.jpg',
      title: t('hero.slides.0.title'),
      description: t('hero.slides.0.description'),
    },
    {
      image: '/hero/slide2.jpg',
      title: t('hero.slides.1.title'),
      description: t('hero.slides.1.description'),
    },
    {
      image: '/hero/slide3.jpg',
      title: t('hero.slides.2.title'),
      description: t('hero.slides.2.description'),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative bg-business-light">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10">123123123</div> */}
      
      <div className="container relative mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-business-dark">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-600 text-white"
              >
                {t('hero.primaryCTA')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary-50"
              >
                {t('hero.secondaryCTA')}
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-business-dark">200+</span>
                <span className="text-gray-600">{t('hero.stats.countries')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-business-dark">50K+</span>
                <span className="text-gray-600">{t('hero.stats.sellers')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-business-dark">1M+</span>
                <span className="text-gray-600">{t('hero.stats.products')}</span>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-2xl"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            ))}
            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-primary-500 w-4'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;