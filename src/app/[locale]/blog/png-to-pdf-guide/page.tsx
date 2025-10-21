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
  title: 'Free PNG to PDF Converter — Convert PNG Images to PDF Online',
  description: 'Convert PNG to PDF online for free. Create professional PDF documents from images. No signup required, instant conversion.',
  keywords: ['png to pdf', 'convert png to pdf', 'png to pdf converter', 'image to pdf', 'png to pdf online', 'free png to pdf'],
  publishDate: '2025-10-04',
  path: 'png-to-pdf-guide',
});

const PngToPdfGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free PNG to PDF Converter — Convert Images to PDF',
        description: 'Complete guide to converting PNG to PDF format',
        publishDate: '2025-10-04',
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
        title="Ready to Convert PNG to PDF?"
        description="Create professional PDF documents from your PNG images. Free, instant, no signup required."
        buttonText="Convert PNG to PDF"
        buttonHref="/png-to-pdf"
        icon={Zap}
        gradientClass="from-red-600 to-orange-600"
      />
    </BlogShell>
  );
};

export default PngToPdfGuidePage;
