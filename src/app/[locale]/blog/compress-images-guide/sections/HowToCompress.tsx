import { Upload, Download, Gauge } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToCompress = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload Your Image',
      description: 'Click the upload button or drag & drop your image file (JPG, PNG, WebP, or HEIC).',
      icon: Upload,
    },
    {
      number: 2,
      title: 'Choose Compression Mode',
      description: 'Select quality-based compression for visual quality or file size target for specific sizes (20KB, 50KB, 100KB).',
      icon: Gauge,
    },
    {
      number: 3,
      title: 'Download Compressed Image',
      description: 'Click compress and download your optimized image. Compare the before/after sizes and quality.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Compress Images Online (3 Easy Steps)" steps={steps} numberBgClass="bg-emerald-600" />;
};
