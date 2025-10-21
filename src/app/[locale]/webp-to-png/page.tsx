import { Metadata } from 'next';
import { ConverterPage } from '@/components/ConverterPage';
import { getTranslations } from 'next-intl/server';

import { SITE_URL } from '@/config/constants';
import { localeMap, type Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.webpToPng' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/webp-to-png`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${SITE_URL}/${locale}/webp-to-png`,
      siteName: 'ImageConvertors',
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

export default async function WebpToPngPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'converterHeaders' });

  return <ConverterPage from="WebP" to="PNG" title={t('webpToPng.title')} description={t('webpToPng.description')} />;
}
