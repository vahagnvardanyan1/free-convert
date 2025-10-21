import { Pipette, Sliders, Copy } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToUse = () => {
  const steps = [
    {
      number: 1,
      title: 'Select Color',
      description: 'Click on the color spectrum or enter a color code.',
      icon: Pipette,
    },
    {
      number: 2,
      title: 'Adjust Values',
      description: 'Fine-tune hue, saturation, and lightness to get the perfect shade.',
      icon: Sliders,
    },
    {
      number: 3,
      title: 'Copy Color Code',
      description: 'Copy the color in your preferred format (HEX, RGB, HSL).',
      icon: Copy,
    },
  ];

  return <BlogSteps title="How to Use Color Picker (3 Easy Steps)" steps={steps} numberBgClass="bg-pink-600" />;
};
