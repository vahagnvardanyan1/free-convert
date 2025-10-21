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
      title: 'Automatic Conversion',
      description: 'The tool converts HEIC to JPG instantly.',
      icon: RefreshCw,
    },
    {
      number: 3,
      title: 'Download JPG',
      description: 'Download your converted JPG image, now universally compatible.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Convert HEIC to JPG (3 Easy Steps)" steps={steps} numberBgClass="bg-blue-600" />;
};
