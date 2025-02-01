import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { IconGlobe, IconTruck, IconWallet, IconChart } from './icons';

const Features = () => {
  const t = useTranslations('features');

  const features = [
    {
      icon: <IconGlobe className="w-8 h-8 text-primary-500" />,
      title: t('items.1.title'),
      description: t('items.1.description'),
    },
    {
      icon: <IconTruck className="w-8 h-8 text-primary-500" />,
      title: t('items.2.title'),
      description: t('items.2.description'),
    },
    {
      icon: <IconWallet className="w-8 h-8 text-primary-500" />,
      title: t('items.3.title'),
      description: t('items.3.description'),
    },
    {
      icon: <IconChart className="w-8 h-8 text-primary-500" />,
      title: t('items.4.title'),
      description: t('items.4.description'),
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center space-y-3 pt-6">
                {feature.icon}
                <h3 className="text-xl font-semibold text-center">{feature.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;