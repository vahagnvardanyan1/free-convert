import type { Metadata } from 'next';
import { type Locale } from '@/i18n/config';

import { ImageRotator } from '@/components/ImageRotator';
import { generateToolMetadata } from '@/lib/metadata/toolMetadata';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;
  return generateToolMetadata({
    locale,
    path: 'rotate-image',
    namespace: 'metadata.rotateImage',
  });
};

const RotateImagePage = () => {
  return <ImageRotator />;
};

export default RotateImagePage;
