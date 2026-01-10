import { Metadata } from 'next';
import { AIImageGenerator } from '@/components/AIImageGenerator';
import { getTranslations } from 'next-intl/server';

import { locales, localeMap, type Locale } from '@/i18n/config';
import { getAlternateLanguages, getLocalizedUrl } from '@/lib/metadata/localizedUrl';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.aiImageGenerator' });

  const canonicalUrl = getLocalizedUrl({ locale, path: '/ai-image-generator' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages({ locales, path: '/ai-image-generator' }),
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
          url: '/t2i.webp',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/t2i.webp'],
    },
  };
}

export default function AIImageGeneratorPage() {
  return <AIImageGenerator />;
}
