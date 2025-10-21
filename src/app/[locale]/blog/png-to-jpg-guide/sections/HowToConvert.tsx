import { Upload, RefreshCw, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToConvert = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload PNG Image',
      description: 'Select your PNG file or drag and drop it into the converter.',
      icon: Upload,
    },
    {
      number: 2,
      title: 'Automatic Conversion',
      description: 'The tool converts PNG to JPG with optimal quality settings.',
      icon: RefreshCw,
    },
    {
      number: 3,
      title: 'Download JPG',
      description: 'Download your converted JPG image, now optimized and smaller.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Convert PNG to JPG (3 Easy Steps)" steps={steps} numberBgClass="bg-orange-600" />;
};
