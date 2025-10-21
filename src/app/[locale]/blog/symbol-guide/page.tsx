import { Hash, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { SymbolCategories } from './sections/SymbolCategories';
import { HowToUse } from './sections/HowToUse';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Special Symbols Library — Copy & Paste Symbols Online',
  description: 'Comprehensive library of special symbols, mathematical symbols, arrows, and more. Click to copy instantly. Free symbol library.',
  keywords: ['special symbols', 'copy paste symbols', 'unicode symbols', 'math symbols', 'arrow symbols', 'special characters', 'symbol library'],
  publishDate: '2025-10-07',
  path: 'symbol-guide',
});

const SymbolGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Special Symbols Library — Copy & Paste Symbols Online',
        description: 'Complete guide to using special symbols',
        publishDate: '2025-10-07',
        readTime: '7',
        icon: Hash,
        iconBgClass: 'from-slate-500 to-gray-600',
        gradientClass: 'from-slate-50 to-gray-50',
      }}
    >
      <IntroSection />
      <SymbolCategories />
      <HowToUse />
      <FAQSection />

      <BlogCTA
        title="Ready to Use Special Symbols?"
        description="Browse thousands of special symbols. Click to copy, paste anywhere. Free symbol library."
        buttonText="Browse Symbols"
        buttonHref="/texts/symbols"
        icon={Zap}
        gradientClass="from-slate-600 to-gray-600"
      />
    </BlogShell>
  );
};

export default SymbolGuidePage;
