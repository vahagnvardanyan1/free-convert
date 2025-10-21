import { Type, Palette, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToCreateQR = () => {
  const steps = [
    {
      number: 1,
      title: 'Select QR Type',
      description: 'Choose from URL, text, email, phone, SMS, WiFi, location, or contact card.',
      icon: Type,
    },
    {
      number: 2,
      title: 'Enter Content & Customize',
      description: 'Input your data and customize colors and size to match your brand.',
      icon: Palette,
    },
    {
      number: 3,
      title: 'Download QR Code',
      description: 'Download as PNG for digital use or SVG for print and large formats.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Create QR Codes (3 Easy Steps)" steps={steps} numberBgClass="bg-indigo-600" />;
};
