import { Upload, Sparkles, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToRemove = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload Your Image',
      description: 'Click upload or drag & drop your image. Works with JPG, PNG, WebP, and HEIC formats.',
      icon: Upload,
    },
    {
      number: 2,
      title: 'AI Removes Background',
      description: 'Our AI automatically detects the subject and removes the background in seconds.',
      icon: Sparkles,
    },
    {
      number: 3,
      title: 'Download Result',
      description: 'Download your image with transparent background as PNG file.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Remove Background (3 Easy Steps)" steps={steps} numberBgClass="bg-purple-600" />;
};
