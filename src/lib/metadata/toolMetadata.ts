import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SITE_URL } from '@/config/constants';
import { localeMap, type Locale } from '@/i18n/config';
import { generateAIMeta } from '@/lib/geoHelpers';
import { geoConfig } from '@/lib/geo.config';

// Common metadata keys that exist in all metadata namespaces
type MetadataKey = 'title' | 'description' | 'keywords' | 'ogTitle' | 'ogDescription' | 'ogImageAlt';

// Type for nested metadata namespaces (e.g., 'metadata.compressImage')
type MetadataNamespace = keyof IntlMessages['metadata'] extends infer K ? (K extends string ? `metadata.${K}` : never) : never;

interface ToolMetadataOptions {
  locale: Locale;
  path: string;
  namespace: MetadataNamespace | keyof IntlMessages;
  ogImage?: string;
}

export const generateToolMetadata = async ({ locale, path, namespace, ogImage = '/convert.webp' }: ToolMetadataOptions): Promise<Metadata> => {
  const t = await getTranslations(namespace);

  const pathname = `/${locale}/${path}`;
  const aiMeta = generateAIMeta(pathname);
  const canonicalUrl = `${SITE_URL}/${locale}/${path}`;

  // Helper to safely get metadata value
  // All metadata.* namespaces have these standard keys
  const getMeta = (key: MetadataKey): string => {
    return t(key);
  };

  return {
    title: getMeta('title'),
    description: getMeta('description'),
    keywords: getMeta('keywords'),
    authors: [{ name: geoConfig.author.name, url: geoConfig.author.url }],
    creator: geoConfig.author.name,
    publisher: geoConfig.author.name,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(geoConfig.languages.map(lang => [lang, `${SITE_URL}/${lang}/${path}`])),
    },
    openGraph: {
      title: getMeta('ogTitle'),
      description: getMeta('ogDescription'),
      url: canonicalUrl,
      siteName: 'ImageConvertors',
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      alternateLocale: geoConfig.languages.filter(lang => lang !== locale),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: getMeta('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: getMeta('ogTitle'),
      description: getMeta('ogDescription'),
      images: [ogImage],
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
    other: {
      ...aiMeta,
    },
  };
};
