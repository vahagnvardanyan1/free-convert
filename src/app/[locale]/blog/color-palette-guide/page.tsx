import { Droplet, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { PaletteTypes } from './sections/PaletteTypes';
import { HowToCreate } from './sections/HowToCreate';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free Color Palette Generator — Create Beautiful Color Schemes',
  description: 'Generate harmonious color palettes for your designs. Explore complementary, triadic, and analogous color schemes. Free tool.',
  keywords: ['color palette generator', 'color scheme', 'color combination', 'palette creator', 'color harmony', 'complementary colors'],
  publishDate: '2025-10-06',
  path: 'color-palette-guide',
});

const ColorPaletteGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free Color Palette Generator — Create Beautiful Color Schemes',
        description: 'Complete guide to creating color palettes',
        publishDate: '2025-10-06',
        readTime: '7',
        icon: Droplet,
        iconBgClass: 'from-pink-500 to-rose-600',
        gradientClass: 'from-pink-50 to-rose-50',
      }}
    >
      <IntroSection />
      <PaletteTypes />
      <HowToCreate />
      <FAQSection />

      <BlogCTA
        title="Ready to Create Color Palettes?"
        description="Generate beautiful, harmonious color schemes. Perfect for design projects. Free, no signup required."
        buttonText="Create Palette Now"
        buttonHref="/colors/palettes"
        icon={Zap}
        gradientClass="from-pink-600 to-rose-600"
      />
    </BlogShell>
  );
};

export default ColorPaletteGuidePage;
