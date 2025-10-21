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
  title: 'Free PDF to JPG Converter — Convert PDF Pages to Images Online',
  description: 'Convert PDF to JPG online for free. Extract PDF pages as high-quality JPG images. No signup required, instant conversion.',
  keywords: ['pdf to jpg', 'convert pdf to jpg', 'pdf to jpeg', 'pdf to image', 'pdf to jpg converter', 'extract pdf pages'],
  publishDate: '2025-10-05',
  path: 'pdf-to-jpg-guide',
});

const PdfToJpgGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free PDF to JPG Converter — Convert PDF Pages to Images',
        description: 'Complete guide to converting PDF to JPG format',
        publishDate: '2025-10-05',
        readTime: '5',
        icon: FileText,
        iconBgClass: 'from-blue-500 to-indigo-600',
        gradientClass: 'from-blue-50 to-indigo-50',
      }}
    >
      <IntroSection />
      <WhyConvert />
      <HowToConvert />
      <FAQSection />

      <BlogCTA
        title="Ready to Convert PDF to JPG?"
        description="Extract PDF pages as high-quality images. Free, instant, no signup required."
        buttonText="Convert PDF to JPG"
        buttonHref="/pdf-to-jpg"
        icon={Zap}
        gradientClass="from-blue-600 to-indigo-600"
      />
    </BlogShell>
  );
};

export default PdfToJpgGuidePage;
