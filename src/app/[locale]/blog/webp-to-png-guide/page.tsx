import { FileImage, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhyConvert } from './sections/WhyConvert';
import { HowToConvert } from './sections/HowToConvert';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free WebP to PNG Converter — Convert WebP Images to PNG Online',
  description: 'Convert WebP to PNG online for free. Maintain quality and transparency. Perfect for compatibility with all software. No signup required.',
  keywords: ['webp to png', 'convert webp to png', 'webp converter', 'webp to png online', 'free webp converter', 'webp to png free', 'change webp to png'],
  publishDate: '2025-10-05',
  path: 'webp-to-png-guide',
});

const WebpToPngGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free WebP to PNG Converter — Convert Images Instantly',
        description: 'Complete guide to converting WebP to PNG format',
        publishDate: '2025-10-05',
        readTime: '6',
        icon: FileImage,
        iconBgClass: 'from-blue-500 to-purple-600',
        gradientClass: 'from-blue-50 to-purple-50',
      }}
    >
      <IntroSection />
      <WhyConvert />
      <HowToConvert />
      <FAQSection />

      <BlogCTA
        title="Ready to Convert WebP to PNG?"
        description="Use our free converter tool. Instant conversion with quality preservation. No signup required."
        buttonText="Convert WebP to PNG"
        buttonHref="/webp-to-png"
        icon={Zap}
        gradientClass="from-blue-600 to-purple-600"
      />
    </BlogShell>
  );
};

export default WebpToPngGuidePage;
