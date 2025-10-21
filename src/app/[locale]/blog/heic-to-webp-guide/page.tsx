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
  title: 'Free HEIC to WebP Converter — Convert iPhone Photos to WebP',
  description: 'Convert HEIC to WebP online for free. Optimize iPhone photos for the web. Smaller files, faster loading. No signup required.',
  keywords: ['heic to webp', 'convert heic to webp', 'heic converter', 'iphone photo webp', 'heic to webp online'],
  publishDate: '2025-10-04',
  path: 'heic-to-webp-guide',
});

const HeicToWebpGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free HEIC to WebP Converter — Convert iPhone Photos to WebP',
        description: 'Complete guide to converting HEIC to WebP',
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
        title="Ready to Convert HEIC to WebP?"
        description="Optimize iPhone photos for the web. Smaller files, faster loading. Free, no signup required."
        buttonText="Convert HEIC to WebP"
        buttonHref="/heic-to-webp"
        icon={Zap}
        gradientClass="from-green-600 to-emerald-600"
      />
    </BlogShell>
  );
};

export default HeicToWebpGuidePage;
