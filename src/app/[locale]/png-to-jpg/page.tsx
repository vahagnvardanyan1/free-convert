import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/config';

import { ConverterPage } from '@/components/ConverterPage';
import { generateToolMetadata } from '@/lib/metadata/toolMetadata';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;
  return generateToolMetadata({
    locale,
    path: 'png-to-jpg',
    namespace: 'metadata.pngToJpg',
  });
};

const PngToJpgPage = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'converterHeaders' });
  return <ConverterPage from="PNG" to="JPG" title={t('pngToJpg.title')} description={t('pngToJpg.description')} />;
};

export default PngToJpgPage;
