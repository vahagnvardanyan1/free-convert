import { Search, Copy, CheckCircle } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToUse = () => {
  const steps = [
    {
      number: 1,
      title: 'Browse or Search',
      description: 'Browse symbol categories or search for specific symbols.',
      icon: Search,
    },
    {
      number: 2,
      title: 'Click to Copy',
      description: 'Click any symbol to copy it to your clipboard instantly.',
      icon: Copy,
    },
    {
      number: 3,
      title: 'Paste Anywhere',
      description: 'Paste the symbol in your document, message, or design.',
      icon: CheckCircle,
    },
  ];

  return <BlogSteps title="How to Use Symbols (3 Easy Steps)" steps={steps} numberBgClass="bg-slate-600" />;
};
