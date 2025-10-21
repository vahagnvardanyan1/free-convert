import { Globe, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhyWebP } from './sections/WhyWebP';
import { HowToConvert } from './sections/HowToConvert';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free PNG to WebP Converter — Optimize Images for Web',
  description: 'Convert PNG to WebP online for free. Reduce file size by 25-35% without quality loss. Perfect for website optimization. No signup required.',
  keywords: ['png to webp', 'convert png to webp', 'png converter', 'webp converter', 'png to webp online', 'optimize png', 'reduce png size'],
  publishDate: '2025-10-04',
  path: 'png-to-webp-guide',
});

const PngToWebpGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free PNG to WebP Converter — Optimize Images for Web',
        description: 'Complete guide to converting PNG to WebP format',
        publishDate: '2025-10-04',
        readTime: '7',
        icon: Globe,
        iconBgClass: 'from-green-500 to-emerald-600',
        gradientClass: 'from-green-50 to-emerald-50',
      }}
    >
      <IntroSection />
      <WhyWebP />
      <HowToConvert />
      <FAQSection />

      <BlogCTA
        title="Ready to Convert PNG to WebP?"
        description="Optimize your images for the web. 25-35% smaller files, same quality. Free converter, no signup required."
        buttonText="Convert PNG to WebP"
        buttonHref="/png-to-webp"
        icon={Zap}
        gradientClass="from-green-600 to-emerald-600"
      />
    </BlogShell>
  );
};

export default PngToWebpGuidePage;
