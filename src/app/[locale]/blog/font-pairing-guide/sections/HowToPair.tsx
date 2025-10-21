import { Type, Sparkles, CheckCircle } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToPair = () => {
  const steps = [
    {
      number: 1,
      title: 'Choose Primary Font',
      description: 'Select a font for headings that matches your design style.',
      icon: Type,
    },
    {
      number: 2,
      title: 'Select Complementary Font',
      description: 'Choose a contrasting font for body text that pairs well.',
      icon: Sparkles,
    },
    {
      number: 3,
      title: 'Test & Refine',
      description: 'Preview the pairing and adjust until it feels right.',
      icon: CheckCircle,
    },
  ];

  return <BlogSteps title="How to Pair Fonts (3 Easy Steps)" steps={steps} numberBgClass="bg-amber-600" />;
};
