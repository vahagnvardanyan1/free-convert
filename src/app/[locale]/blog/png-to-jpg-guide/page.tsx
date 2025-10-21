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
  title: 'Free PNG to JPG Converter — Convert PNG Images to JPEG Online',
  description: 'Convert PNG to JPG online for free. Reduce file size for faster loading. Perfect for photos and web optimization. No signup required.',
  keywords: ['png to jpg', 'convert png to jpg', 'png to jpeg', 'png converter', 'png to jpg online', 'free png converter', 'change png to jpg'],
  publishDate: '2025-10-03',
  path: 'png-to-jpg-guide',
});

const PngToJpgGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free PNG to JPG Converter — Convert Images Instantly',
        description: 'Complete guide to converting PNG to JPG format',
        publishDate: '2025-10-03',
        readTime: '6',
        icon: Camera,
        iconBgClass: 'from-orange-500 to-red-600',
        gradientClass: 'from-orange-50 to-red-50',
      }}
    >
      <IntroSection />
      <WhyConvert />
      <HowToConvert />
      <FAQSection />

      <BlogCTA
        title="Ready to Convert PNG to JPG?"
        description="Reduce file sizes for faster loading. Free converter with quality preservation. No signup required."
        buttonText="Convert PNG to JPG"
        buttonHref="/png-to-jpg"
        icon={Zap}
        gradientClass="from-orange-600 to-red-600"
      />
    </BlogShell>
  );
};

export default PngToJpgGuidePage;
