import { Ruler, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhatIsScale } from './sections/WhatIsScale';
import { HowToUse } from './sections/HowToUse';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Typographic Scale Calculator — Create Perfect Font Hierarchies',
  description: 'Generate harmonious typographic scales for your designs. Calculate font sizes with modular ratios. Free tool, instant results.',
  keywords: ['typographic scale', 'modular scale', 'font scale', 'typography calculator', 'golden ratio typography', 'font size hierarchy'],
  publishDate: '2025-10-06',
  path: 'typographic-scale-guide',
});

const TypographicScaleGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Typographic Scale Calculator — Create Perfect Font Hierarchies',
        description: 'Complete guide to typographic scales',
        publishDate: '2025-10-06',
        readTime: '8',
        icon: Ruler,
        iconBgClass: 'from-amber-500 to-orange-600',
        gradientClass: 'from-amber-50 to-orange-50',
      }}
    >
      <IntroSection />
      <WhatIsScale />
      <HowToUse />
      <FAQSection />

      <BlogCTA
        title="Ready to Create Your Typographic Scale?"
        description="Generate perfect font size hierarchies for your designs. Free calculator with modular ratios."
        buttonText="Create Scale Now"
        buttonHref="/fonts/scales"
        icon={Zap}
        gradientClass="from-amber-600 to-orange-600"
      />
    </BlogShell>
  );
};

export default TypographicScaleGuidePage;
