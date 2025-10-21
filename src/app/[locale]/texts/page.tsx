import Link from 'next/link';
import { Type, Smile, Hash, FileJson, GitCompare, FileSearch } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SITE_URL } from '@/config/constants';
import { localeMap, type Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.texts' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/texts`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${SITE_URL}/${locale}/texts`,
      siteName: 'ImageConvertors',
      type: 'website',
      locale: localeMap[locale] || 'en_US',
    },
  };
}

export default async function TextsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'textTools' });

  const features = [
    {
      name: t('fontGenerator.name'),
      description: t('fontGenerator.description'),
      href: `/${locale}/texts/fonts`,
      icon: Type,
      color: 'from-blue-500 to-cyan-500',
      count: t('fontGenerator.count'),
      countLabel: t('fontGenerator.countLabel'),
    },
    {
      name: t('emojis.name'),
      description: t('emojis.description'),
      href: `/${locale}/texts/emojis`,
      icon: Smile,
      color: 'from-yellow-500 to-orange-500',
      count: t('emojis.count'),
      countLabel: t('emojis.countLabel'),
    },
    {
      name: t('symbols.name'),
      description: t('symbols.description'),
      href: `/${locale}/texts/symbols`,
      icon: Hash,
      color: 'from-purple-500 to-pink-500',
      count: t('symbols.count'),
      countLabel: t('symbols.countLabel'),
    },
    {
      name: t('jsonValidatorCard.name'),
      description: t('jsonValidatorCard.description'),
      href: `/${locale}/texts/json-validator`,
      icon: FileJson,
      color: 'from-green-500 to-emerald-500',
      count: t('jsonValidatorCard.count'),
      countLabel: t('jsonValidatorCard.countLabel'),
    },
    {
      name: t('jsonComparerCard.name'),
      description: t('jsonComparerCard.description'),
      href: `/${locale}/texts/json-comparer`,
      icon: GitCompare,
      color: 'from-indigo-500 to-blue-500',
      count: t('jsonComparerCard.count'),
      countLabel: t('jsonComparerCard.countLabel'),
    },
    {
      name: t('jsonParserCard.name'),
      description: t('jsonParserCard.description'),
      href: `/${locale}/texts/json-parser`,
      icon: FileSearch,
      color: 'from-teal-500 to-emerald-500',
      count: t('jsonParserCard.count'),
      countLabel: t('jsonParserCard.countLabel'),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('welcome')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('description')}</p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map(feature => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.name}
              href={feature.href}
              className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`flex-shrink-0 p-4 rounded-lg bg-gradient-to-br ${feature.color} shadow-lg mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">{feature.name}</h3>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{feature.count}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{feature.countLabel}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
          );
        })}
      </div>

      {/* Quick Tips Section */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 border border-blue-100 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('featuresOverview')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{t('fontTools.title')}</h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• {t('fontTools.features.livePreview')}</li>
              <li>• {t('fontTools.features.pairings')}</li>
              <li>• {t('fontTools.features.scales')}</li>
              <li>• {t('fontTools.features.styledText')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">{t('emojiBrowser.title')}</h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• {t('emojiBrowser.features.categoryFilters')}</li>
              <li>• {t('emojiBrowser.features.deviceRendering')}</li>
              <li>• {t('emojiBrowser.features.platforms')}</li>
              <li>• {t('emojiBrowser.features.copyClipboard')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">{t('specialSymbols.title')}</h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• {t('specialSymbols.features.math')}</li>
              <li>• {t('specialSymbols.features.arrows')}</li>
              <li>• {t('specialSymbols.features.currency')}</li>
              <li>• {t('specialSymbols.features.search')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">{t('jsonValidatorFeatures.title')}</h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• {t('jsonValidatorFeatures.features.validate')}</li>
              <li>• {t('jsonValidatorFeatures.features.format')}</li>
              <li>• {t('jsonValidatorFeatures.features.errors')}</li>
              <li>• {t('jsonValidatorFeatures.features.stats')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{t('jsonComparerFeatures.title')}</h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• {t('jsonComparerFeatures.features.compare')}</li>
              <li>• {t('jsonComparerFeatures.features.colorCoded')}</li>
              <li>• {t('jsonComparerFeatures.features.track')}</li>
              <li>• {t('jsonComparerFeatures.features.nested')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">{t('jsonParserFeatures.title')}</h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• {t('jsonParserFeatures.features.treeView')}</li>
              <li>• {t('jsonParserFeatures.features.dataTypes')}</li>
              <li>• {t('jsonParserFeatures.features.navigate')}</li>
              <li>• {t('jsonParserFeatures.features.copy')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
