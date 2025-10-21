import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SITE_URL } from '@/config/constants';
import { Hero } from '@/components/Hero';
import { FormatGrid } from '@/components/FormatGrid';
import { HowTo } from '@/components/HowTo';
import { Features } from '@/components/Features';
import { BannerBlocks } from '@/components/BannerBlock';
import { FAQ } from '@/components/FAQ';
import ToolsPreview from '@/components/ToolsPreview';
import { localeMap, type Locale } from '@/i18n/config';
import { generateAIMeta } from '@/lib/geoHelpers';
import { geoConfig } from '@/lib/geo.config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  // Generate GEO-enhanced metadata
  const aiMeta = generateAIMeta('/');

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(geoConfig.languages.map(lang => [lang, `${SITE_URL}/${lang}`])),
    },
    keywords: t('keywords'),
    authors: [{ name: geoConfig.author.name, url: geoConfig.author.url }],
    creator: geoConfig.author.name,
    publisher: geoConfig.author.name,
    verification: {
      google: 'mM2oIIAyburPaxGWhln8gTGmHOappiXVfNebcrHusHE',
    },
    openGraph: {
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      alternateLocale: geoConfig.languages.filter(lang => lang !== locale),
      url: `${SITE_URL}/${locale}`,
      siteName: 'ImageConvertors',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: '/og-image.webp',
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
      images: ['/og-image.webp'],
      site: '@imageconverter',
      creator: '@imageconverter',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // GEO: Custom AI-readable meta tags
    other: {
      ...aiMeta,
    },
  };
}

export default function HomePage() {
  return (
    <>
      <FormatGrid />
      <Hero />
      <HowTo />
      <ToolsPreview />
      <Features />
      <BannerBlocks />
      <FAQ />
    </>
  );
}
