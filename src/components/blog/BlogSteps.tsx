import { Card } from '@/components/Card';

import type { LucideIcon } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface BlogStepsProps {
  title?: string;
  steps: Step[];
  numberBgClass?: string;
}

export const BlogSteps = ({ title, steps, numberBgClass = 'bg-blue-600' }: BlogStepsProps) => {
  return (
    <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100">
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>}
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map(({ number, title: stepTitle, description, icon: Icon }) => (
          <div key={number}>
            <div className={`w-10 h-10 ${numberBgClass} text-white rounded-full flex items-center justify-center font-bold mb-3`}>{number}</div>
            {Icon && (
              <div className="mb-3">
                <Icon size={32} className="text-blue-600" />
              </div>
            )}
            <h3 className="font-semibold text-gray-900 mb-2">{stepTitle}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
