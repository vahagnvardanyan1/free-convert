import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

import { BlogSteps } from '@/components/blog/BlogSteps';

export const HowToValidate = () => {
  const steps = [
    {
      number: 1,
      title: 'Paste JSON Code',
      description: 'Copy and paste your JSON data into the validator.',
      icon: FileText,
    },
    {
      number: 2,
      title: 'Instant Validation',
      description: 'The tool checks syntax and highlights any errors found.',
      icon: AlertCircle,
    },
    {
      number: 3,
      title: 'Fix & Verify',
      description: 'Correct errors and re-validate until JSON is perfect.',
      icon: CheckCircle,
    },
  ];

  return <BlogSteps title="How to Validate JSON (3 Easy Steps)" steps={steps} numberBgClass="bg-cyan-600" />;
};
