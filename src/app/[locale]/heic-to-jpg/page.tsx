import { Metadata } from 'next';
import { ConverterPage } from '@/components/ConverterPage';
import { getTranslations } from 'next-intl/server';

import { locales, localeMap, type Locale } from '@/i18n/config';
import { getAlternateLanguages, getLocalizedUrl } from '@/lib/metadata/localizedUrl';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.heicToJpg' });

  const canonicalUrl = getLocalizedUrl({ locale, path: '/heic-to-jpg' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages({ locales, path: '/heic-to-jpg' }),
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonicalUrl,
      siteName: 'FreeConvert',
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      images: [
        {
          url: '/convert.webp',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
  };
}

export default async function HeicToJpgPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'converterHeaders' });

  return <ConverterPage from="HEIC" to="JPG" title={t('heicToJpg.title')} description={t('heicToJpg.description')} />;
}
