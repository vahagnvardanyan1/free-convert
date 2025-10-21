import { Search, Copy, CheckCircle } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToUse = () => {
  const steps = [
    {
      number: 1,
      title: 'Browse or Search',
      description: 'Browse emoji categories or search by keyword.',
      icon: Search,
    },
    {
      number: 2,
      title: 'Click to Copy',
      description: 'Click any emoji to copy it to your clipboard instantly.',
      icon: Copy,
    },
    {
      number: 3,
      title: 'Paste Anywhere',
      description: 'Paste the emoji in messages, documents, or social media.',
      icon: CheckCircle,
    },
  ];

  return <BlogSteps title="How to Use Emojis (3 Easy Steps)" steps={steps} numberBgClass="bg-yellow-600" />;
};
