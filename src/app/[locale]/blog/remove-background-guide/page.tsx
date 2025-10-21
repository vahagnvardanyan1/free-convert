import { Eraser, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhyRemoveBG } from './sections/WhyRemoveBG';
import { HowToRemove } from './sections/HowToRemove';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free Background Remover — Remove Image Backgrounds Instantly | ImageConvertors',
  description: 'Remove background from images online for free with AI. Perfect for product photos, profile pictures, and designs. No signup required.',
  keywords: [
    'remove background',
    'background remover',
    'remove image background',
    'background eraser',
    'cut out image',
    'transparent background',
    'remove bg online free',
    'ai background removal',
    'product photo background',
    'background removal tool',
  ],
  publishDate: '2025-10-09',
  path: 'remove-background-guide',
});

const RemoveBackgroundGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free Background Remover — Remove Image Backgrounds Instantly',
        description: 'Complete guide to AI-powered background removal',
        publishDate: '2025-10-09',
        readTime: '8',
        icon: Eraser,
        iconBgClass: 'from-purple-500 to-pink-600',
        gradientClass: 'from-purple-50 to-pink-50',
      }}
    >
      <IntroSection />
      <WhyRemoveBG />
      <HowToRemove />
      <FAQSection />

      <BlogCTA
        title="Ready to Remove Backgrounds?"
        description="Use our free AI-powered background remover. Perfect cutouts in seconds. No signup required, 100% private."
        buttonText="Remove Background Now"
        buttonHref="/remove-background"
        icon={Zap}
        gradientClass="from-purple-600 to-pink-600"
      />
    </BlogShell>
  );
};

export default RemoveBackgroundGuidePage;
