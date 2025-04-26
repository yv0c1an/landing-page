import { useTranslations } from 'next-intl';
import { Truck, RotateCcw, CreditCard, MessageCircle, Gift } from 'lucide-react';

interface ServiceFeaturesProps {
  restrictLinks?: boolean;
}

const ServiceFeatures = ({ restrictLinks = false }: ServiceFeaturesProps) => {
  const t = useTranslations('serviceFeatures');

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-primary-blue" />,
      title: t('freeDelivery.title'),
      description: t('freeDelivery.description')
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-primary-blue" />,
      title: t('returnPolicy.title'),
      description: t('returnPolicy.description')
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary-blue" />,
      title: t('securePayment.title'),
      description: t('securePayment.description')
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-primary-blue" />,
      title: t('support.title'),
      description: t('support.description')
    },
    {
      icon: <Gift className="w-8 h-8 text-primary-blue" />,
      title: t('giftService.title'),
      description: t('giftService.description')
    }
  ];

  return (
    <section className="py-4 border-b border-gray-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center p-4 gap-3"
            >
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures; 