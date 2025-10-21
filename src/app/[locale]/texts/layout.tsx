'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Type, Smile, Hash, Home, FileJson, GitCompare, FileSearch } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TextsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations('textTools.layout');

  // Extract locale from pathname
  const pathSegments = pathname.split('/');
  const locale = pathSegments[1];

  const navigation = [
    { name: t('dashboard'), href: `/${locale}/texts`, icon: Home },
    { name: t('fonts'), href: `/${locale}/texts/fonts`, icon: Type },
    { name: t('emojis'), href: `/${locale}/texts/emojis`, icon: Smile },
    { name: t('symbols'), href: `/${locale}/texts/symbols`, icon: Hash },
    { name: t('jsonTools'), href: `/${locale}/texts/json-validator`, icon: FileJson, isGroup: true },
    { name: 'JSON Validator', href: `/${locale}/texts/json-validator`, icon: FileJson, isSubItem: true },
    { name: 'JSON Comparer', href: `/${locale}/texts/json-comparer`, icon: GitCompare, isSubItem: true },
    { name: 'JSON Parser', href: `/${locale}/texts/json-parser`, icon: FileSearch, isSubItem: true },
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
            {navigation
              .filter(item => !item.isSubItem)
              .map(item => {
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
