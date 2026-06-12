import type { Metadata } from 'next';
import { type Locale } from '@/i18n/config';

import { ImageFlipper } from '@/components/ImageFlipper';
import { generateToolMetadata } from '@/lib/metadata/toolMetadata';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;
  return generateToolMetadata({
    locale,
    path: 'flip-image',
    namespace: 'metadata.flipImage',
  });
};

const FlipImagePage = () => {
  return <ImageFlipper />;
};

export default FlipImagePage;
