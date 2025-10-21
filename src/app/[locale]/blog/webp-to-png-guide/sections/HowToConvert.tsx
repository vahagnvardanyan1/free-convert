import { Upload, RefreshCw, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToConvert = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload WebP Image',
      description: 'Select your WebP file or drag and drop it into the converter.',
      icon: Upload,
    },
    {
      number: 2,
      title: 'Automatic Conversion',
      description: 'The tool instantly converts WebP to PNG format while preserving quality.',
      icon: RefreshCw,
    },
    {
      number: 3,
      title: 'Download PNG',
      description: 'Download your converted PNG image ready to use anywhere.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Convert WebP to PNG (3 Easy Steps)" steps={steps} numberBgClass="bg-blue-600" />;
};
