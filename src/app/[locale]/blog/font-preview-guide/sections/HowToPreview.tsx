import { Type, FileText, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToPreview = () => {
  const steps = [
    {
      number: 1,
      title: 'Enter Your Text',
      description: 'Type the text you want to preview in different fonts.',
      icon: FileText,
    },
    {
      number: 2,
      title: 'Browse Fonts',
      description: 'Scroll through hundreds of fonts and see instant previews.',
      icon: Type,
    },
    {
      number: 3,
      title: 'Choose & Use',
      description: 'Select your favorite font and use it in your project.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Preview Fonts (3 Easy Steps)" steps={steps} numberBgClass="bg-amber-600" />;
};
