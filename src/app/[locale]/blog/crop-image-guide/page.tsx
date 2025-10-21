import { Crop, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhatIsCropping } from './sections/WhatIsCropping';
import { HowToCrop } from './sections/HowToCrop';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free Online Image Cropper — Crop & Resize Photos Perfectly | ImageConvertors',
  description: 'Learn how to crop images online for free. Master aspect ratios, framing techniques, and achieve perfect crops for social media, websites, and print. Professional results in seconds.',
  keywords: [
    'crop image online',
    'free image cropper',
    'how to crop images',
    'crop photos online free',
    'image crop tool',
    'crop pictures',
    'aspect ratio crop',
    'crop to size',
    'online image cropping',
    'crop for instagram',
    'crop for facebook',
    'photo cropper free',
    'crop image to square',
    'crop profile picture',
    'remove background by cropping',
  ],
  publishDate: '2025-10-08',
  path: 'crop-image-guide',
  ogImage: '/crop.webp',
});

const CropImageGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free Online Image Cropper — Crop & Resize Photos Perfectly',
        description: 'Complete guide to cropping images like a pro',
        publishDate: '2025-10-08',
        readTime: '10',
        icon: Crop,
        iconBgClass: 'from-blue-500 to-indigo-600',
        gradientClass: 'from-blue-50 to-indigo-50',
      }}
    >
      <IntroSection />
      <WhatIsCropping />
      <HowToCrop />
      <FAQSection />

      <BlogCTA
        title="Ready to Crop Your Images?"
        description="Try our free image cropper tool now. Crop to any aspect ratio, rotate, flip, and zoom. No signup required, 100% private and secure."
        buttonText="Start Cropping Images"
        buttonHref="/crop-image"
        icon={Zap}
        gradientClass="from-blue-600 to-indigo-600"
      />
    </BlogShell>
  );
};

export default CropImageGuidePage;
