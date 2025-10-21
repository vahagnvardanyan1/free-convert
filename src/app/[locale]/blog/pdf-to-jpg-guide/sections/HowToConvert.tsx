import { Upload, Image as ImageIcon, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToConvert = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload PDF File',
      description: 'Select your PDF file to convert to JPG images.',
      icon: Upload,
    },
    {
      number: 2,
      title: 'Convert Pages',
      description: 'Each PDF page is converted to a high-quality JPG image.',
      icon: ImageIcon,
    },
    {
      number: 3,
      title: 'Download JPG Images',
      description: 'Download all converted images as separate JPG files.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Convert PDF to JPG (3 Easy Steps)" steps={steps} numberBgClass="bg-blue-600" />;
};
