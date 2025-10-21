'use client';

import { useState } from 'react';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import { symbolCategories, type SymbolCategory, searchSymbols } from '@/lib/symbolsData';
import { copyToClipboard } from '@/lib/colorUtils';
import { Search, Copy, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

const metadata = {
  title: 'Symbol Library - 300+ Unicode Symbols & Special Characters | ImageConvertors',
  description:
    'Explore and copy over 300 special Unicode symbols and characters instantly. Browse mathematical symbols, arrows, currency signs, punctuation marks, geometric shapes, Greek letters, technical symbols, and more. One-click copy to clipboard for easy use in documents, websites, and projects.',
  keywords: ['unicode symbols', 'special characters', 'copy symbols', 'symbol library', 'unicode characters', 'symbol picker', 'mathematical symbols', 'arrows symbols', 'currency symbols'],
  openGraph: {
    title: 'Symbol Library - 300+ Unicode Symbols & Special Characters | ImageConvertors',
    description: 'Explore and copy over 300 special Unicode symbols and characters instantly. Browse mathematical symbols, arrows, currency signs, and more.',
    images: ['/symbol.webp'],
  },
};

export default function SymbolsPage() {
  const t = useTranslations('textTools.symbolPage');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SymbolCategory>('All');
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  const filteredSymbols = searchSymbols(searchQuery, selectedCategory);

  const handleCopySymbol = async (symbol: string) => {
    await copyToClipboard(symbol);
    setCopiedSymbol(symbol);
    setTimeout(() => setCopiedSymbol(null), 1500);
  };

  const categoryLabels: Record<SymbolCategory, string> = {
    All: t('all'),
    Mathematics: t('math'),
    Arrows: t('arrows'),
    Currency: t('currency'),
    Punctuation: t('punctuation'),
    Shapes: t('shapes'),
    'Greek Letters': t('greek'),
    Technical: t('technical'),
    Miscellaneous: t('misc'),
  };

  return (
    <div>
      <DynamicMetadata title={metadata.title} description={metadata.description} keywords={metadata.keywords} openGraph={metadata.openGraph} />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-16 z-10 bg-gray-50 dark:bg-gray-800 pb-3 mb-4 space-y-2.5 sm:space-y-4 -mx-4 px-4 pt-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 shadow-md">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-3 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {symbolCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>

      {/* Symbols Grid */}
      {filteredSymbols.length > 0 ? (
        <div>
          <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            {filteredSymbols.length} {t('totalSymbols')}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {filteredSymbols.map((item, index) => (
              <button
                key={index}
                onClick={() => handleCopySymbol(item.symbol)}
                className="group relative p-3 sm:p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:shadow-lg transition-all duration-200"
                title={`${item.name} - ${t('clickToCopy')}`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl sm:text-4xl select-none">{item.symbol}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center line-clamp-2">{item.name}</span>
                  <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedSymbol === item.symbol ? <Check className="text-green-500" size={16} /> : <Copy className="text-gray-400" size={16} />}
                  </div>
                </div>
                {copiedSymbol === item.symbol && <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded">{t('copied')}</div>}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">{t('noResults')}</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">{t('tryDifferent')}</p>
        </div>
      )}
    </div>
  );
}
