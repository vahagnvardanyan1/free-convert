import { ReactNode } from 'react';

import { Card } from '@/components/Card';

import type { LucideIcon } from 'lucide-react';

interface BlogSectionProps {
  title?: string;
  children: ReactNode;
  icon?: LucideIcon;
  iconBgClass?: string;
  borderClass?: string;
  className?: string;
}

export const BlogSection = ({ title, children, icon: Icon, iconBgClass = 'bg-blue-100', borderClass, className = '' }: BlogSectionProps) => {
  return (
    <Card className={`p-8 mb-8 ${borderClass || ''} ${className}`}>
      {title && (
        <div className="flex items-center mb-6">
          {Icon && (
            <div className={`w-12 h-12 ${iconBgClass} rounded-xl flex items-center justify-center mr-4`}>
              <Icon className="text-blue-600" size={24} />
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
      )}
      {children}
    </Card>
  );
};

interface BlogProseProps {
  children: ReactNode;
  className?: string;
}

export const BlogProse = ({ children, className = '' }: BlogProseProps) => {
  return <div className={`prose prose-lg max-w-none mb-12 ${className}`}>{children}</div>;
};

interface BlogIntroProps {
  children: ReactNode;
}

export const BlogIntro = ({ children }: BlogIntroProps) => {
  return <div className="prose prose-lg max-w-none mb-12">{children}</div>;
};
