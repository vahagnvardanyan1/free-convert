import { Upload, RefreshCw, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToConvert = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload HEIC Image',
      description: 'Select your HEIC file from iPhone or iPad.',
      icon: Upload,
    },
    {
      number: 2,
      title: 'Convert to WebP',
      description: 'The tool converts HEIC to WebP with optimal compression.',
      icon: RefreshCw,
    },
    {
      number: 3,
      title: 'Download WebP',
      description: 'Download your web-optimized WebP image.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Convert HEIC to WebP (3 Easy Steps)" steps={steps} numberBgClass="bg-green-600" />;
};
