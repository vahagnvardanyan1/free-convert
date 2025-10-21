import { BarChart3, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { ChartTypes } from './sections/ChartTypes';
import { HowToCreate } from './sections/HowToCreate';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free Chart Generator — Create Beautiful Charts & Graphs Online',
  description: 'Create charts and graphs online for free. Bar charts, line charts, pie charts, and more. Customize and download instantly.',
  keywords: ['chart generator', 'create charts', 'graph maker', 'online chart tool', 'bar chart generator', 'pie chart maker', 'data visualization'],
  publishDate: '2025-10-10',
  path: 'chart-generator-guide',
});

const ChartGeneratorGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free Chart Generator — Create Beautiful Charts & Graphs Online',
        description: 'Complete guide to creating professional charts',
        publishDate: '2025-10-10',
        readTime: '7',
        icon: BarChart3,
        iconBgClass: 'from-teal-500 to-cyan-600',
        gradientClass: 'from-teal-50 to-cyan-50',
      }}
    >
      <IntroSection />
      <ChartTypes />
      <HowToCreate />
      <FAQSection />

      <BlogCTA
        title="Ready to Create Charts?"
        description="Generate beautiful charts and graphs. Customize colors, download PNG or SVG. Free, no signup required."
        buttonText="Create Chart Now"
        buttonHref="/chart-generator"
        icon={Zap}
        gradientClass="from-teal-600 to-cyan-600"
      />
    </BlogShell>
  );
};

export default ChartGeneratorGuidePage;
