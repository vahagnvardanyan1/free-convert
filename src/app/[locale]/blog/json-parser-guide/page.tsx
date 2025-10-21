import { Code2, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhatIsParsing } from './sections/WhatIsParsing';
import { HowToParse } from './sections/HowToParse';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free JSON Parser — Format & Beautify JSON Online',
  description: 'Parse and format JSON online for free. Beautify messy JSON, syntax highlighting. Perfect for developers. No signup required.',
  keywords: ['json parser', 'json formatter', 'beautify json', 'json pretty print', 'format json', 'json parser online'],
  publishDate: '2025-10-09',
  path: 'json-parser-guide',
});

const JSONParserGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free JSON Parser — Format & Beautify JSON Online',
        description: 'Complete guide to parsing JSON',
        publishDate: '2025-10-09',
        readTime: '6',
        icon: Code2,
        iconBgClass: 'from-cyan-500 to-blue-600',
        gradientClass: 'from-cyan-50 to-blue-50',
      }}
    >
      <IntroSection />
      <WhatIsParsing />
      <HowToParse />
      <FAQSection />

      <BlogCTA
        title="Ready to Parse JSON?"
        description="Format and beautify JSON instantly. Syntax highlighting, tree view. Free tool, no signup required."
        buttonText="Parse JSON Now"
        buttonHref="/texts/json-parser"
        icon={Zap}
        gradientClass="from-cyan-600 to-blue-600"
      />
    </BlogShell>
  );
};

export default JSONParserGuidePage;
