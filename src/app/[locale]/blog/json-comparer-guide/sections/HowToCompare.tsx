import { FileText, GitCompare, Eye } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToCompare = () => {
  const steps = [
    {
      number: 1,
      title: 'Paste JSON Files',
      description: 'Paste both JSON objects into the left and right panels.',
      icon: FileText,
    },
    {
      number: 2,
      title: 'Compare',
      description: 'The tool highlights all differences between the JSON files.',
      icon: GitCompare,
    },
    {
      number: 3,
      title: 'Review Differences',
      description: 'See added, removed, and modified values clearly highlighted.',
      icon: Eye,
    },
  ];

  return <BlogSteps title="How to Compare JSON (3 Easy Steps)" steps={steps} numberBgClass="bg-cyan-600" />;
};
