import { Type, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhyPreview } from './sections/WhyPreview';
import { HowToPreview } from './sections/HowToPreview';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Font Preview Tool — Test & Compare Fonts Online',
  description: 'Preview hundreds of fonts with your own text. Compare fonts side-by-side. Free font preview tool for designers.',
  keywords: ['font preview', 'preview fonts', 'font tester', 'font comparison', 'google fonts preview', 'test fonts online'],
  publishDate: '2025-10-10',
  path: 'font-preview-guide',
});

const FontPreviewGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Font Preview Tool — Test & Compare Fonts Online',
        description: 'Complete guide to previewing fonts',
        publishDate: '2025-10-10',
        readTime: '7',
        icon: Type,
        iconBgClass: 'from-amber-500 to-orange-600',
        gradientClass: 'from-amber-50 to-orange-50',
      }}
    >
      <IntroSection />
      <WhyPreview />
      <HowToPreview />
      <FAQSection />

      <BlogCTA
        title="Ready to Preview Fonts?"
        description="Test hundreds of fonts with your own text. Compare and choose the perfect typeface. Free tool."
        buttonText="Preview Fonts Now"
        buttonHref="/fonts/preview"
        icon={Zap}
        gradientClass="from-amber-600 to-orange-600"
      />
    </BlogShell>
  );
};

export default FontPreviewGuidePage;
