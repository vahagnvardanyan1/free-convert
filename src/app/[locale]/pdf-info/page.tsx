import { Metadata } from 'next';
import { PDFTool } from '@/components/PDFTool';
import { PDFErrorBoundary } from '@/components/PDFErrorBoundary';
import { getTranslations } from 'next-intl/server';

import { SITE_URL } from '@/config/constants';
import { localeMap, type Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.pdfInfo' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/pdf-info`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${SITE_URL}/${locale}/pdf-info`,
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

export default async function PDFInfoPage({ params }: Props) {
  const { locale } = await params;
  const headers = await getTranslations({ locale, namespace: 'pdfToolHeaders' });

  return (
    <PDFErrorBoundary>
      <PDFTool mode="pdf-info" title={headers('pdfInfo.title')} description={headers('pdfInfo.description')} />
    </PDFErrorBoundary>
  );
}
