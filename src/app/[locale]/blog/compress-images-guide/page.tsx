import { TrendingDown, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhyCompressionMatters } from './sections/WhyCompressionMatters';
import { HowToCompress } from './sections/HowToCompress';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'How to Compress Image to 20KB, 50KB, 100KB Without Losing Quality',
  description: 'Complete guide to compress images online free. Reduce image size to 20KB, 50KB, 100KB. Best image compressor tool for web, social media. No signup required.',
  keywords: [
    'compress image',
    'compress image online',
    'compress image to 20kb',
    'compress image to 50kb',
    'compress image to 100kb',
    'image compressor',
    'reduce image size',
    'compress image without losing quality',
    'image compression',
    'optimize images for web',
    'reduce photo size',
    'compress jpg',
    'compress png',
  ],
  publishDate: '2025-10-02',
  path: 'compress-images-guide',
});

const CompressImagesGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'How to Compress Image to 20KB, 50KB, 100KB Without Losing Quality',
        description: 'Complete guide to compress images online free with our image compressor tool',
        publishDate: '2025-10-02',
        readTime: '9',
        icon: TrendingDown,
        iconBgClass: 'from-emerald-500 to-teal-600',
        gradientClass: 'from-emerald-50 to-teal-50',
      }}
    >
      <IntroSection />
      <WhyCompressionMatters />
      <HowToCompress />
      <FAQSection />

      <BlogCTA
        title="Ready to Compress Your Images?"
        description="Try our free image compressor tool now. No signup required, 100% private and secure."
        buttonText="Start Compressing Images"
        buttonHref="/compress-image"
        icon={Zap}
        gradientClass="from-emerald-600 to-teal-600"
      />
    </BlogShell>
  );
};

export default CompressImagesGuidePage;
