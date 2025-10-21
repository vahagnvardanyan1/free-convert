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
  const t = await getTranslations({ locale, namespace: 'metadata.jpgToPdf' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/jpg-to-pdf`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${SITE_URL}/${locale}/jpg-to-pdf`,
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

export default function JpgToPDFPage() {
  return (
    <PDFErrorBoundary>
      <PDFTool
        mode="images-to-pdf"
        title="JPG to PDF Converter"
        description="Convert your JPG/JPEG images to PDF documents. Upload JPEG files and create professional PDF documents with optimized quality and custom layouts."
      />
    </PDFErrorBoundary>
  );
}
