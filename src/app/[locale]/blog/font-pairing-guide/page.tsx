import { Columns2, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { PairingPrinciples } from './sections/PairingPrinciples';
import { HowToPair } from './sections/HowToPair';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Font Pairing Guide — Create Perfect Font Combinations',
  description: 'Learn how to pair fonts like a pro. Discover beautiful font combinations for your designs. Free font pairing tool.',
  keywords: ['font pairing', 'font combinations', 'typography pairing', 'font matching', 'typeface pairing', 'google fonts pairing'],
  publishDate: '2025-10-09',
  path: 'font-pairing-guide',
});

const FontPairingGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Font Pairing Guide — Create Perfect Font Combinations',
        description: 'Complete guide to pairing fonts',
        publishDate: '2025-10-09',
        readTime: '8',
        icon: Columns2,
        iconBgClass: 'from-amber-500 to-orange-600',
        gradientClass: 'from-amber-50 to-orange-50',
      }}
    >
      <IntroSection />
      <PairingPrinciples />
      <HowToPair />
      <FAQSection />

      <BlogCTA
        title="Ready to Pair Fonts?"
        description="Discover beautiful font combinations. Preview pairings and find the perfect match for your design."
        buttonText="Explore Font Pairings"
        buttonHref="/fonts/pairings"
        icon={Zap}
        gradientClass="from-amber-600 to-orange-600"
      />
    </BlogShell>
  );
};

export default FontPairingGuidePage;
