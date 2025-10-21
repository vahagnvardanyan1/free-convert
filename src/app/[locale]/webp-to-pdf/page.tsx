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
  const t = await getTranslations({ locale, namespace: 'metadata.webpToPdf' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/webp-to-pdf`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${SITE_URL}/${locale}/webp-to-pdf`,
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

export default function WebpToPDFPage() {
  return (
    <PDFErrorBoundary>
      <PDFTool
        mode="images-to-pdf"
        title="WebP to PDF Converter"
        description="Convert your WebP images to PDF documents. Upload modern WebP files and create professional PDF documents with excellent compression and custom layouts."
      />
    </PDFErrorBoundary>
  );
}
