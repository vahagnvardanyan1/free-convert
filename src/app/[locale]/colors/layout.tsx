'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Palette, Droplet, Blend, ArrowLeftRight, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ColorsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations('colorTools.layout');

  // Extract locale from pathname
  const pathSegments = pathname.split('/');
  const locale = pathSegments[1];

  const navigation = [
    { name: t('dashboard'), href: `/colors`, icon: Home },
    { name: t('picker'), href: `/colors/picker`, icon: Droplet },
    { name: t('palettes'), href: `/colors/palettes`, icon: Palette },
    { name: t('gradients'), href: `/colors/gradients`, icon: Blend },
    { name: t('converter'), href: `/colors/converter`, icon: ArrowLeftRight },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
          </div>

          {/* Responsive Navigation */}
          <nav className="flex flex-wrap gap-2">
            {navigation.map(item => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                    isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'text-gray-700 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800',
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-0 sm:p-0">{children}</div>
      </div>
    </div>
  );
}
