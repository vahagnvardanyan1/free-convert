import type { Metadata } from 'next';
import { type Locale } from '@/i18n/config';

import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { generateToolMetadata } from '@/lib/metadata/toolMetadata';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;
  return generateToolMetadata({
    locale,
    path: 'qr-code-generator',
    namespace: 'metadata.qrCodeGenerator',
  });
};

const QRCodeGeneratorPage = () => {
  return <QRCodeGenerator />;
};

export default QRCodeGeneratorPage;
