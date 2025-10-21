import { Upload, FileText, Download } from 'lucide-react';

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
      title: 'Convert to PDF',
      description: 'The tool creates a PDF document from your PNG image.',
      icon: FileText,
    },
    {
      number: 3,
      title: 'Download PDF',
      description: 'Download your PDF file ready to share or print.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Convert PNG to PDF (3 Easy Steps)" steps={steps} numberBgClass="bg-red-600" />;
};
