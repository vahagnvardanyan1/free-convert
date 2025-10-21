import { Palette, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhatIsPicker } from './sections/WhatIsPicker';
import { HowToUse } from './sections/HowToUse';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free Color Picker — Select Perfect Colors Online | HEX, RGB, HSL',
  description: 'Professional color picker tool. Select colors visually, get HEX, RGB, HSL codes instantly. Free for designers and developers.',
  keywords: ['color picker', 'hex color picker', 'rgb color picker', 'color selector', 'color chooser', 'pick color online', 'color tool'],
  publishDate: '2025-10-05',
  path: 'color-picker-guide',
});

const ColorPickerGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free Color Picker — Select Perfect Colors Online',
        description: 'Complete guide to using color pickers',
        publishDate: '2025-10-05',
        readTime: '6',
        icon: Palette,
        iconBgClass: 'from-pink-500 to-rose-600',
        gradientClass: 'from-pink-50 to-rose-50',
      }}
    >
      <IntroSection />
      <WhatIsPicker />
      <HowToUse />
      <FAQSection />

      <BlogCTA
        title="Ready to Pick Colors?"
        description="Select perfect colors with our free picker. Get HEX, RGB, and HSL codes instantly. No signup required."
        buttonText="Use Color Picker"
        buttonHref="/colors/picker"
        icon={Zap}
        gradientClass="from-pink-600 to-rose-600"
      />
    </BlogShell>
  );
};

export default ColorPickerGuidePage;
