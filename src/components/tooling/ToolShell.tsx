import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export interface ToolHeaderProps {
  title: string;
  description: string;
  backHref?: string;
  backText?: string;
  heroContent?: ReactNode;
}

interface ToolShellProps {
  header: ToolHeaderProps;
  children: ReactNode;
  className?: string;
}

export const ToolHeader = ({ title, description, backHref = '/', backText, heroContent }: ToolHeaderProps) => {
  const t = useTranslations('common');
  const displayBackText = backText || t('backToHome');

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-4">
          <Link href={backHref}>
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2" size={16} />
              {displayBackText}
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        {heroContent && <div className="mt-6">{heroContent}</div>}
      </div>
    </div>
  );
};

export const ToolShell = ({ header, children, className = '' }: ToolShellProps) => {
  return (
    <>
      <ToolHeader {...header} />
      <div className={className || 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'}>{children}</div>
    </>
  );
};

// Re-export ToolGrid from ToolSection for convenience
export { ToolGrid } from './ToolSection';
