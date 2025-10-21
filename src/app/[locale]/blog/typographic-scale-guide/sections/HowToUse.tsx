import { Type, Calculator, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToUse = () => {
  const steps = [
    {
      number: 1,
      title: 'Set Base Size',
      description: 'Choose your base font size (typically 16px for body text).',
      icon: Type,
    },
    {
      number: 2,
      title: 'Select Ratio',
      description: 'Choose a modular scale ratio (e.g., 1.25, 1.5, 1.618 Golden Ratio).',
      icon: Calculator,
    },
    {
      number: 3,
      title: 'Apply to Design',
      description: 'Use the generated scale for headings, body text, and other typography.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Use Typographic Scales (3 Easy Steps)" steps={steps} numberBgClass="bg-amber-600" />;
};
