import { Upload, FileText, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToConvert = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload JPG Image',
      description: 'Select your JPG file or drag and drop.',
      icon: Upload,
    },
    {
      number: 2,
      title: 'Convert to PDF',
      description: 'The tool creates a PDF document from your JPG.',
      icon: FileText,
    },
    {
      number: 3,
      title: 'Download PDF',
      description: 'Download your PDF file ready to share.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Convert JPG to PDF (3 Easy Steps)" steps={steps} numberBgClass="bg-red-600" />;
};
