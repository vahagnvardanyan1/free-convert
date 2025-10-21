import { Upload, Move, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToCrop = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload Your Image',
      description: 'Click upload or drag & drop your image. We support JPG, PNG, WebP, GIF, and HEIC formats.',
      icon: Upload,
    },
    {
      number: 2,
      title: 'Adjust Crop Area',
      description: 'Select aspect ratio (1:1, 16:9, etc.), drag to position, rotate, flip, or zoom as needed.',
      icon: Move,
    },
    {
      number: 3,
      title: 'Download Cropped Image',
      description: 'Click crop & download to save your perfectly cropped image instantly.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Crop Images Online (3 Easy Steps)" steps={steps} numberBgClass="bg-blue-600" />;
};
