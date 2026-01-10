import { Metadata } from 'next';
import { PDFTool } from '@/components/PDFTool';
import { PDFErrorBoundary } from '@/components/PDFErrorBoundary';
import { getTranslations } from 'next-intl/server';

import { locales, localeMap, type Locale } from '@/i18n/config';
import { getAlternateLanguages, getLocalizedUrl } from '@/lib/metadata/localizedUrl';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.pdfToPng' });

  const canonicalUrl = getLocalizedUrl({ locale, path: '/pdf-to-png' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages({ locales, path: '/pdf-to-png' }),
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

export default async function PDFToPNGPage({ params }: Props) {
  const { locale } = await params;
  const headers = await getTranslations({ locale, namespace: 'pdfToolHeaders' });
  return (
    <PDFErrorBoundary>
      <PDFTool mode="pdf-to-images" title={headers('pdfToPng.title')} description={headers('pdfToPng.description')} />
    </PDFErrorBoundary>
  );
}
