import { Wand2, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhatIsAI } from './sections/WhatIsAI';
import { HowToGenerate } from './sections/HowToGenerate';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free AI Image Generator — Create Stunning Images from Text | ImageConvertors',
  description: 'Generate AI images from text descriptions for free. Create stunning visuals, art, and designs with AI. No signup required, unlimited use.',
  keywords: [
    'ai image generator',
    'ai art generator',
    'text to image',
    'ai image creation',
    'free ai art',
    'generate images from text',
    'ai artwork',
    'artificial intelligence images',
    'ai generated art',
    'free ai image generator',
    'ai photo generator',
    'dall-e alternative',
  ],
  publishDate: '2025-10-09',
  path: 'ai-image-generator-guide',
});

const AIImageGeneratorGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free AI Image Generator — Create Stunning Images from Text',
        description: 'Complete guide to AI-powered image generation',
        publishDate: '2025-10-09',
        readTime: '10',
        icon: Wand2,
        iconBgClass: 'from-violet-500 to-purple-600',
        gradientClass: 'from-violet-50 to-purple-50',
      }}
    >
      <IntroSection />
      <WhatIsAI />
      <HowToGenerate />
      <FAQSection />

      <BlogCTA
        title="Ready to Create AI Images?"
        description="Transform text into stunning visuals with our free AI image generator. No signup required, unlimited creations."
        buttonText="Generate AI Images"
        buttonHref="/ai-image-generator"
        icon={Zap}
        gradientClass="from-violet-600 to-purple-600"
      />
    </BlogShell>
  );
};

export default AIImageGeneratorGuidePage;
