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
    path: 'jpg-to-png',
    namespace: 'metadata.jpgToPng',
  });
};

const JpgToPngPage = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'converterHeaders' });
  return <ConverterPage from="JPG" to="PNG" title={t('jpgToPng.title')} description={t('jpgToPng.description')} />;
};

export default JpgToPngPage;
