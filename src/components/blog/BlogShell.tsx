import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import type { LucideIcon } from 'lucide-react';

interface BlogHeaderProps {
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  icon: LucideIcon;
  iconBgClass?: string;
  gradientClass?: string;
  backHref?: string;
  backText?: string;
}

interface BlogShellProps {
  header: BlogHeaderProps;
  children: ReactNode;
}

export const BlogHeader = ({
  title,
  description,
  publishDate,
  readTime,
  icon: Icon,
  iconBgClass = 'from-blue-500 to-purple-600',
  gradientClass = 'from-blue-50 to-purple-50',
  backHref = '/blog',
  backText = 'Back to Blog',
}: BlogHeaderProps) => {
  return (
    <div className={`bg-gradient-to-r ${gradientClass} border-b border-gray-200`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href={backHref}>
          <Button variant="outline" className="mb-4 flex items-center">
            <ArrowLeft className="mr-2" size={16} />
            {backText}
          </Button>
        </Link>
        <div className="flex items-center mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${iconBgClass} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
            <Icon className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600 text-lg">{description}</p>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span>Published on {new Date(publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="mx-2">•</span>
          <span>{readTime} min read</span>
        </div>
      </div>
    </div>
  );
};

export const BlogShell = ({ header, children }: BlogShellProps) => {
  return (
    <>
      <BlogHeader {...header} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">{children}</div>
    </>
  );
};
