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
  title: 'Free JPG to WebP Converter — Optimize Images for Web',
  description: 'Convert JPG to WebP online for free. Reduce file size by 30% without quality loss. Perfect for website optimization. No signup required.',
  keywords: ['jpg to webp', 'convert jpg to webp', 'jpeg to webp', 'jpg converter', 'optimize jpg', 'jpg to webp online'],
  publishDate: '2025-10-04',
  path: 'jpg-to-webp-guide',
});

const JpgToWebpGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free JPG to WebP Converter — Optimize Images for Web',
        description: 'Complete guide to converting JPG to WebP',
        publishDate: '2025-10-04',
        readTime: '5',
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
        title="Ready to Convert JPG to WebP?"
        description="Optimize images for faster websites. 30% smaller files, same quality. Free, no signup required."
        buttonText="Convert JPG to WebP"
        buttonHref="/jpg-to-webp"
        icon={Zap}
        gradientClass="from-green-600 to-emerald-600"
      />
    </BlogShell>
  );
};

export default JpgToWebpGuidePage;
