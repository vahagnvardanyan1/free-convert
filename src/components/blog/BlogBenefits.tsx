import { Card } from '@/components/Card';

import type { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  colorClass?: string;
}

interface BlogBenefitsProps {
  title?: string;
  benefits: Benefit[];
}

export const BlogBenefits = ({ title, benefits }: BlogBenefitsProps) => {
  return (
    <div className="mb-12">
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>}
      <div className="grid md:grid-cols-2 gap-6">
        {benefits.map(({ icon: Icon, title: benefitTitle, description, colorClass = 'border-blue-500' }) => (
          <Card key={benefitTitle} className={`p-6 border-l-4 ${colorClass}`}>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Icon className={colorClass.replace('border-', 'text-')} size={20} />
              <span className="ml-2">{benefitTitle}</span>
            </h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
