import { Palette, Sliders, Copy } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToCreate = () => {
  const steps = [
    {
      number: 1,
      title: 'Choose Colors',
      description: 'Select two or more colors for your gradient.',
      icon: Palette,
    },
    {
      number: 2,
      title: 'Adjust Direction',
      description: 'Set gradient type (linear, radial) and direction angle.',
      icon: Sliders,
    },
    {
      number: 3,
      title: 'Copy CSS Code',
      description: 'Copy the generated CSS code and use in your project.',
      icon: Copy,
    },
  ];

  return <BlogSteps title="How to Create Gradients (3 Easy Steps)" steps={steps} numberBgClass="bg-pink-600" />;
};
