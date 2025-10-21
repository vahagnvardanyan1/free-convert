import { Palette, Sparkles, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToCreate = () => {
  const steps = [
    {
      number: 1,
      title: 'Choose Base Color',
      description: 'Select a base color that represents your brand or theme.',
      icon: Palette,
    },
    {
      number: 2,
      title: 'Generate Palette',
      description: 'Our tool creates harmonious color schemes automatically.',
      icon: Sparkles,
    },
    {
      number: 3,
      title: 'Export Colors',
      description: 'Copy color codes in HEX, RGB, or HSL formats.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Create Color Palettes (3 Easy Steps)" steps={steps} numberBgClass="bg-pink-600" />;
};
