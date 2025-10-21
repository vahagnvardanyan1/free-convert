import { Type, Sparkles, Download } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToGenerate = () => {
  const steps = [
    {
      number: 1,
      title: 'Enter Your Prompt',
      description: 'Describe the image you want to create. Be specific about style, colors, mood, and details.',
      icon: Type,
    },
    {
      number: 2,
      title: 'Generate Image',
      description: 'Click generate and watch as AI creates your image in seconds based on your description.',
      icon: Sparkles,
    },
    {
      number: 3,
      title: 'Download & Use',
      description: 'Download your AI-generated image and use it in your projects, social media, or anywhere else.',
      icon: Download,
    },
  ];

  return <BlogSteps title="How to Generate AI Images (3 Easy Steps)" steps={steps} numberBgClass="bg-violet-600" />;
};
