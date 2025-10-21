import { Upload, Settings, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToResize = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload Your Image',
      description: 'Click the upload button or drag and drop your image file. We support JPG, PNG, WebP, GIF, and HEIC formats.',
      icon: Upload,
    },
    {
      number: 2,
      title: 'Choose Resize Method',
      description: 'Select percentage scaling (e.g., 50% for half size), custom pixels (exact dimensions), or preset sizes for social media.',
      icon: Settings,
    },
    {
      number: 3,
      title: 'Download Resized Image',
      description: 'Click resize and download your perfectly scaled image. Compare dimensions and file size before downloading.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Resize Images Online (3 Easy Steps)" steps={steps} numberBgClass="bg-green-600" />;
};
