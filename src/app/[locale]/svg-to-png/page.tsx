import type { Metadata } from 'next';
import { type Locale } from '@/i18n/config';

import { SvgToPng } from '@/components/SvgToPng';
import { generateToolMetadata } from '@/lib/metadata/toolMetadata';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;
  return generateToolMetadata({
    locale,
    path: 'svg-to-png',
    namespace: 'metadata.svgToPng',
  });
};

const SvgToPngPage = () => {
  return <SvgToPng />;
};

export default SvgToPngPage;
