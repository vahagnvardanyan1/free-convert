import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export interface ToolHeaderProps {
  backHref?: string;
  backText?: string;
}

interface ToolShellProps {
  header: ToolHeaderProps;
  children: ReactNode;
  className?: string;
}

export const ToolTopBar = ({ backHref = '/', backText }: { backHref?: string; backText?: string }) => {
  const t = useTranslations('common');

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href={backHref}>
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2" size={16} />
            {backText || t('backToHome')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const ToolTitleBanner = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-3xl px-4 sm:px-6 lg:px-8 py-10 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
    </div>
  );
};

export const ToolShell = ({ header, children, className = '' }: ToolShellProps) => {
  return (
    <>
      <ToolTopBar backHref={header.backHref} backText={header.backText} />
      <div className={className || 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'}>{children}</div>
    </>
  );
};

// Re-export ToolGrid from ToolSection for convenience
export { ToolGrid } from './ToolSection';
