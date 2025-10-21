'use client';
import { Zap, Shield, FileImage, Heart } from 'lucide-react';
import { Card } from '../Card';
import { useTranslations } from 'next-intl';

export function Features() {
  const t = useTranslations('features');

  const features = [
    {
      icon: Zap,
      title: t('lightningFast'),
      description: t('lightningFastDesc'),
    },
    {
      icon: Shield,
      title: t('completelySecure'),
      description: t('completelySecureDesc'),
    },
    {
      icon: FileImage,
      title: t('multipleFormats'),
      description: t('multipleFormatsDesc'),
    },
    {
      icon: Heart,
      title: t('free'),
      description: t('freeDesc'),
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
                  <IconComponent className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">{t('imagesConverted')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-blue-100">{t('supportedFormats')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">{t('uptime')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
