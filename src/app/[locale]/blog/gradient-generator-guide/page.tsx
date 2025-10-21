import { Blend, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { GradientTypes } from './sections/GradientTypes';
import { HowToCreate } from './sections/HowToCreate';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Gradient Generator — Create CSS Gradients Online',
  description: 'Create beautiful CSS gradients online. Linear, radial, and conic gradients. Copy CSS code instantly. Free gradient generator.',
  keywords: ['gradient generator', 'css gradient', 'linear gradient', 'radial gradient', 'gradient maker', 'css gradient generator'],
  publishDate: '2025-10-07',
  path: 'gradient-generator-guide',
});

const GradientGeneratorGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Gradient Generator — Create CSS Gradients Online',
        description: 'Complete guide to creating gradients',
        publishDate: '2025-10-07',
        readTime: '6',
        icon: Blend,
        iconBgClass: 'from-pink-500 to-rose-600',
        gradientClass: 'from-pink-50 to-rose-50',
      }}
    >
      <IntroSection />
      <GradientTypes />
      <HowToCreate />
      <FAQSection />

      <BlogCTA
        title="Ready to Create Gradients?"
        description="Generate beautiful CSS gradients. Linear, radial, conic. Copy code instantly. Free tool."
        buttonText="Create Gradient Now"
        buttonHref="/colors/gradients"
        icon={Zap}
        gradientClass="from-pink-600 to-rose-600"
      />
    </BlogShell>
  );
};

export default GradientGeneratorGuidePage;
