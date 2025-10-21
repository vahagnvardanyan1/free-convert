import { FileText, Sparkles, Eye } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToParse = () => {
  const steps = [
    {
      number: 1,
      title: 'Paste JSON Data',
      description: 'Copy and paste your JSON text into the parser.',
      icon: FileText,
    },
    {
      number: 2,
      title: 'Auto-Format',
      description: 'The tool parses and beautifies JSON automatically.',
      icon: Sparkles,
    },
    {
      number: 3,
      title: 'View & Use',
      description: 'See formatted JSON with proper indentation and syntax highlighting.',
      icon: Eye,
    },
  ];

  return <BlogSteps title="How to Parse JSON (3 Easy Steps)" steps={steps} numberBgClass="bg-cyan-600" />;
};
