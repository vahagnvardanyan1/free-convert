import { Shuffle, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { ColorFormats } from './sections/ColorFormats';
import { HowToConvert } from './sections/HowToConvert';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free Color Converter — Convert HEX, RGB, HSL, HSV Online',
  description: 'Convert colors between HEX, RGB, HSL, and HSV formats instantly. Free color converter for designers and developers.',
  keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl to rgb', 'color code converter', 'hex converter', 'rgb converter'],
  publishDate: '2025-10-07',
  path: 'color-converter-guide',
});

const ColorConverterGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free Color Converter — Convert HEX, RGB, HSL, HSV Online',
        description: 'Complete guide to color format conversion',
        publishDate: '2025-10-07',
        readTime: '6',
        icon: Shuffle,
        iconBgClass: 'from-pink-500 to-rose-600',
        gradientClass: 'from-pink-50 to-rose-50',
      }}
    >
      <IntroSection />
      <ColorFormats />
      <HowToConvert />
      <FAQSection />

      <BlogCTA
        title="Ready to Convert Colors?"
        description="Convert between HEX, RGB, HSL, and HSV instantly. Free tool for designers and developers."
        buttonText="Convert Colors Now"
        buttonHref="/colors/converter"
        icon={Zap}
        gradientClass="from-pink-600 to-rose-600"
      />
    </BlogShell>
  );
};

export default ColorConverterGuidePage;
