'use client';
import Link from 'next/link';
import { Palette, Type, Smile, FileJson } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ToolsPreview = () => {
  const t = useTranslations('toolsPreview');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Color Tools Card */}
        <Link
          href="/colors"
          className="group block p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-blue-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">{t('colorTools')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('colorToolsDesc')}</p>
            </div>
          </div>
        </Link>

        {/* Font Tools Card */}
        <Link
          href="/texts/fonts"
          className="group block p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-purple-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Type className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">{t('fontTools')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('fontToolsDesc')}</p>
            </div>
          </div>
        </Link>

        {/* Text Tools Card */}
        <Link
          href="/texts"
          className="group block p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-green-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 shadow-lg">
              <Smile className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">{t('textTools')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('textToolsDesc')}</p>
            </div>
          </div>
        </Link>

        {/* JSON Tools Card */}
        <Link
          href="/texts/json-validator"
          className="group block p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-orange-200 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 shadow-lg">
              <FileJson className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors mb-2">{t('jsonTools')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('jsonToolsDesc')}</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ToolsPreview;
