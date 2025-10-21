import { Pipette, RefreshCw, Copy } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToConvert = () => {
  const steps = [
    {
      number: 1,
      title: 'Enter Color',
      description: 'Input your color in any format (HEX, RGB, HSL, or HSV).',
      icon: Pipette,
    },
    {
      number: 2,
      title: 'View All Formats',
      description: 'See the color converted to all formats instantly.',
      icon: RefreshCw,
    },
    {
      number: 3,
      title: 'Copy & Use',
      description: 'Click to copy the format you need for your project.',
      icon: Copy,
    },
  ];

  return <BlogSteps title="How to Convert Colors (3 Easy Steps)" steps={steps} numberBgClass="bg-pink-600" />;
};
