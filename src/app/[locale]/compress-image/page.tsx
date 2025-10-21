import type { Metadata } from 'next';
import { type Locale } from '@/i18n/config';

import { ImageCompressor } from '@/components/ImageCompressor';
import { generateToolMetadata } from '@/lib/metadata/toolMetadata';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;
  return generateToolMetadata({
    locale,
    path: 'compress-image',
    namespace: 'metadata.compressImage',
  });
};

const CompressImagePage = () => {
  return <ImageCompressor />;
};

export default CompressImagePage;
