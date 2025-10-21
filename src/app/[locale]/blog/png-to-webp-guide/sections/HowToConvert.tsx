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
      description: 'The tool instantly converts PNG to WebP with optimal compression.',
      icon: RefreshCw,
    },
    {
      number: 3,
      title: 'Download WebP',
      description: 'Download your converted WebP image, now optimized for the web.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Convert PNG to WebP (3 Easy Steps)" steps={steps} numberBgClass="bg-green-600" />;
};
