import { QrCode, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhatAreQRCodes } from './sections/WhatAreQRCodes';
import { HowToCreateQR } from './sections/HowToCreateQR';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free QR Code Generator — Create Custom QR Codes Instantly | ImageConvertors',
  description: 'Create QR codes online for free. Generate QR codes for URLs, WiFi, business cards, and more. Customize colors, download PNG or SVG. No signup required.',
  keywords: [
    'qr code generator',
    'create qr code',
    'free qr code',
    'qr code maker',
    'generate qr code online',
    'custom qr code',
    'wifi qr code',
    'vcard qr code',
    'url qr code',
    'qr code creator',
    'make qr code free',
    'qr code design',
    'download qr code',
    'business card qr code',
  ],
  publishDate: '2025-10-10',
  path: 'qr-code-generator-guide',
});

const QRCodeGeneratorGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free QR Code Generator — Create Custom QR Codes Instantly',
        description: 'Complete guide to creating professional QR codes',
        publishDate: '2025-10-10',
        readTime: '9',
        icon: QrCode,
        iconBgClass: 'from-indigo-500 to-purple-600',
        gradientClass: 'from-indigo-50 to-purple-50',
      }}
    >
      <IntroSection />
      <WhatAreQRCodes />
      <HowToCreateQR />
      <FAQSection />

      <BlogCTA
        title="Ready to Create Your QR Code?"
        description="Generate custom QR codes for URLs, WiFi, contact cards, and more. Customize colors, download PNG or SVG. 100% free and secure."
        buttonText="Create QR Code Now"
        buttonHref="/qr-code-generator"
        icon={Zap}
        gradientClass="from-indigo-600 to-purple-600"
      />
    </BlogShell>
  );
};

export default QRCodeGeneratorGuidePage;
