import { Maximize2, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhatIsResizing } from './sections/WhatIsResizing';
import { HowToResize } from './sections/HowToResize';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free Online Image Resizer — Resize & Scale Photos Instantly | ImageConvertors',
  description:
    'Learn how to resize images online for free with our comprehensive guide. Discover professional resizing techniques, dimensions, and tips for perfect image scaling. No software needed.',
  keywords: [
    'resize image online',
    'free image resizer',
    'how to resize images',
    'resize photos online free',
    'image resize tool',
    'scale images',
    'photo resizer online',
    'resize pictures free',
    'online image resizing tool',
    'resize image without losing quality',
    'batch image resize',
    'resize to specific dimensions',
    'free photo resizer',
    'resize images for web',
    'compress by resizing',
    'make image smaller',
    'reduce image size',
    'enlarge image online',
  ],
  publishDate: '2025-10-08',
  path: 'resize-image-guide',
  ogImage: '/resize.webp',
});

const ResizeImageGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free Online Image Resizer — Resize & Scale Photos Perfectly',
        description: 'Complete guide to resizing images like a pro',
        publishDate: '2025-10-08',
        readTime: '11',
        icon: Maximize2,
        iconBgClass: 'from-green-500 to-emerald-600',
        gradientClass: 'from-green-50 to-emerald-50',
      }}
    >
      <IntroSection />
      <WhatIsResizing />
      <HowToResize />
      <FAQSection />

      <BlogCTA
        title="Ready to Resize Your Images?"
        description="Try our free image resizer tool now. Resize to exact dimensions, percentages, or social media presets. No signup required, 100% private and secure."
        buttonText="Start Resizing Images"
        buttonHref="/resize-image"
        icon={Zap}
        gradientClass="from-green-600 to-emerald-600"
      />
    </BlogShell>
  );
};

export default ResizeImageGuidePage;
