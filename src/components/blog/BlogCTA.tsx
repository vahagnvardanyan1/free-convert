import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/Card';

import type { LucideIcon } from 'lucide-react';

interface BlogCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  icon?: LucideIcon;
  gradientClass?: string;
}

export const BlogCTA = ({ title, description, buttonText, buttonHref, icon: Icon, gradientClass = 'from-blue-600 to-purple-600' }: BlogCTAProps) => {
  return (
    <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 text-center">
      {Icon && (
        <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
          <Icon className="text-white" size={32} />
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6 text-lg">{description}</p>
      <Link href={buttonHref}>
        <Button className={`bg-gradient-to-r ${gradientClass} hover:opacity-90 text-white px-8 py-3 rounded-xl shadow-lg`} size="lg">
          {buttonText}
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </Link>
    </Card>
  );
};
