import { CheckCircle2, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { WhatIsJSON } from './sections/WhatIsJSON';
import { HowToValidate } from './sections/HowToValidate';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free JSON Validator — Validate & Check JSON Syntax Online',
  description: 'Validate JSON online for free. Check JSON syntax, find errors, and ensure proper formatting. Instant validation, no signup required.',
  keywords: ['json validator', 'validate json', 'json checker', 'json syntax', 'check json', 'json validator online', 'json syntax checker'],
  publishDate: '2025-10-08',
  path: 'json-validator-guide',
});

const JSONValidatorGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free JSON Validator — Validate & Check JSON Syntax Online',
        description: 'Complete guide to JSON validation',
        publishDate: '2025-10-08',
        readTime: '6',
        icon: CheckCircle2,
        iconBgClass: 'from-cyan-500 to-blue-600',
        gradientClass: 'from-cyan-50 to-blue-50',
      }}
    >
      <IntroSection />
      <WhatIsJSON />
      <HowToValidate />
      <FAQSection />

      <BlogCTA
        title="Ready to Validate JSON?"
        description="Check JSON syntax instantly. Find and fix errors fast. Free validator, no signup required."
        buttonText="Validate JSON Now"
        buttonHref="/texts/json-validator"
        icon={Zap}
        gradientClass="from-cyan-600 to-blue-600"
      />
    </BlogShell>
  );
};

export default JSONValidatorGuidePage;
