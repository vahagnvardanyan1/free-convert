import { FileText, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhyConvert } from './sections/WhyConvert';
import { HowToConvert } from './sections/HowToConvert';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free JPG to PDF Converter — Convert JPG Images to PDF Online',
  description: 'Convert JPG to PDF online for free. Create professional PDF documents from images. Instant conversion, no signup required.',
  keywords: ['jpg to pdf', 'convert jpg to pdf', 'jpeg to pdf', 'image to pdf', 'jpg to pdf converter', 'jpg to pdf online'],
  publishDate: '2025-10-03',
  path: 'jpg-to-pdf-guide',
});

const JpgToPdfGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free JPG to PDF Converter — Convert Images to PDF',
        description: 'Complete guide to converting JPG to PDF',
        publishDate: '2025-10-03',
        readTime: '5',
        icon: FileText,
        iconBgClass: 'from-red-500 to-orange-600',
        gradientClass: 'from-red-50 to-orange-50',
      }}
    >
      <IntroSection />
      <WhyConvert />
      <HowToConvert />
      <FAQSection />

      <BlogCTA
        title="Ready to Convert JPG to PDF?"
        description="Create professional PDF documents from JPG images. Free, instant, no signup required."
        buttonText="Convert JPG to PDF"
        buttonHref="/jpg-to-pdf"
        icon={Zap}
        gradientClass="from-red-600 to-orange-600"
      />
    </BlogShell>
  );
};

export default JpgToPdfGuidePage;
