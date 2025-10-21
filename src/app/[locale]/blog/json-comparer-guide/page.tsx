import { GitCompare, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhyCompare } from './sections/WhyCompare';
import { HowToCompare } from './sections/HowToCompare';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free JSON Comparer — Compare & Diff JSON Files Online',
  description: 'Compare JSON files online for free. Find differences, highlight changes. Perfect for API testing and debugging. No signup required.',
  keywords: ['json compare', 'json diff', 'compare json', 'json comparer', 'json difference', 'json compare online'],
  publishDate: '2025-10-09',
  path: 'json-comparer-guide',
});

const JSONComparerGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free JSON Comparer — Compare & Diff JSON Files Online',
        description: 'Complete guide to comparing JSON files',
        publishDate: '2025-10-09',
        readTime: '6',
        icon: GitCompare,
        iconBgClass: 'from-cyan-500 to-blue-600',
        gradientClass: 'from-cyan-50 to-blue-50',
      }}
    >
      <IntroSection />
      <WhyCompare />
      <HowToCompare />
      <FAQSection />

      <BlogCTA
        title="Ready to Compare JSON?"
        description="Find differences between JSON files instantly. Perfect for testing and debugging. Free, no signup required."
        buttonText="Compare JSON Now"
        buttonHref="/texts/json-comparer"
        icon={Zap}
        gradientClass="from-cyan-600 to-blue-600"
      />
    </BlogShell>
  );
};

export default JSONComparerGuidePage;
