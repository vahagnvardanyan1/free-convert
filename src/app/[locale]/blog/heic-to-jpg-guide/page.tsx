import { Camera, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhyConvert } from './sections/WhyConvert';
import { HowToConvert } from './sections/HowToConvert';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free HEIC to JPG Converter — Convert iPhone Photos Online',
  description: 'Convert HEIC to JPG online for free. Make iPhone photos compatible with all devices. Instant conversion, no signup required.',
  keywords: ['heic to jpg', 'convert heic to jpg', 'heic converter', 'iphone photo converter', 'heic to jpeg', 'heic to jpg online'],
  publishDate: '2025-10-03',
  path: 'heic-to-jpg-guide',
});

const HeicToJpgGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free HEIC to JPG Converter — Convert iPhone Photos Online',
        description: 'Complete guide to converting HEIC to JPG',
        publishDate: '2025-10-03',
        readTime: '5',
        icon: Camera,
        iconBgClass: 'from-blue-500 to-indigo-600',
        gradientClass: 'from-blue-50 to-indigo-50',
      }}
    >
      <IntroSection />
      <WhyConvert />
      <HowToConvert />
      <FAQSection />

      <BlogCTA
        title="Ready to Convert HEIC to JPG?"
        description="Make iPhone photos compatible with all devices. Free, instant conversion. No signup required."
        buttonText="Convert HEIC to JPG"
        buttonHref="/heic-to-jpg"
        icon={Zap}
        gradientClass="from-blue-600 to-indigo-600"
      />
    </BlogShell>
  );
};

export default HeicToJpgGuidePage;
