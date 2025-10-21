import { ReactNode } from 'react';

import { Card } from '@/components/Card';

interface ToolSectionProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'card' | 'plain';
}

export const ToolSection = ({ children, title, className = '', variant = 'card' }: ToolSectionProps) => {
  const content = (
    <>
      {title && <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>}
      {children}
    </>
  );

  if (variant === 'plain') {
    return <div className={className}>{content}</div>;
  }

  return <Card className={`p-6 ${className}`}>{content}</Card>;
};

interface ToolSidebarProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
}

export const ToolSidebar = ({ children, className = '', sticky = true }: ToolSidebarProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className={sticky ? 'lg:sticky lg:top-4' : ''}>{children}</div>
    </div>
  );
};

interface ToolGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export const ToolGrid = ({ children, columns = 2, className = '' }: ToolGridProps) => {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 lg:grid-cols-3',
  }[columns];

  return <div className={`grid ${gridClass} gap-6 ${className}`}>{children}</div>;
};
