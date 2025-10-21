import { FileText, Palette, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToCreate = () => {
  const steps = [
    {
      number: 1,
      title: 'Enter Your Data',
      description: 'Input your data points, labels, and values.',
      icon: FileText,
    },
    {
      number: 2,
      title: 'Customize Chart',
      description: 'Choose chart type, colors, and styling options.',
      icon: Palette,
    },
    {
      number: 3,
      title: 'Download Chart',
      description: 'Download your chart as PNG or SVG for use anywhere.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Create Charts (3 Easy Steps)" steps={steps} numberBgClass="bg-teal-600" />;
};
