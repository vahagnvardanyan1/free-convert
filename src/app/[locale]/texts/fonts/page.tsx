import Link from 'next/link';
import { Type, Sparkles, Ruler } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SITE_URL } from '@/config/constants';
import { localeMap, type Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.fonts' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/texts/fonts`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${SITE_URL}/${locale}/texts/fonts`,
      siteName: 'ImageConvertors',
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      images: ['/font-generator.webp'],
    },
  };
}

export default async function FontToolsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'textTools.fontPage' });

  const features = [
    {
      name: t('fontPreview.name'),
      description: t('fontPreview.description'),
      href: `/${locale}/texts/fonts/preview`,
      icon: Type,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: t('fontPairings.name'),
      description: t('fontPairings.description'),
      href: `/${locale}/texts/fonts/pairings`,
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: t('typographicScale.name'),
      description: t('typographicScale.description'),
      href: `/${locale}/texts/fonts/scales`,
      icon: Ruler,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      {/* Desktop Layout: Image on left, Links on right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left: Featured Image */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 max-h-[500px]">
          <img src="/font-generator.webp" alt="Font Tools Preview" className="w-full h-full object-cover" />
        </div>

        {/* Right: Feature Links */}
        <div className="grid grid-cols-1 gap-6">
          {features.map(feature => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.name}
                href={feature.href}
                className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${feature.color} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{feature.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 border border-blue-100 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('quickTips')}</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
            <span>{t('tips.tip1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
            <span>{t('tips.tip2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
            <span>{t('tips.tip3')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
