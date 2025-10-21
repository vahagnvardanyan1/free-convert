'use client';

import { useState } from 'react';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import { emojiCategories, type EmojiCategory, searchEmojis } from '@/lib/emojiData';
import { copyToClipboard } from '@/lib/colorUtils';
import { Search, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

const metadata = {
  title: 'Emoji Picker - Browse & Copy 500+ Emojis with Device Preview | ImageConvertors',
  description:
    'Browse and copy over 500 emojis instantly with device-specific rendering preview. Filter by category including smileys, animals, food, travel, activities, objects, symbols, and flags. See how emojis appear on Apple, Google, Microsoft, and Samsung devices. One-click copy to clipboard for easy use in your projects.',
  keywords: [
    'emoji picker',
    'emoji browser',
    'copy emoji',
    'emoji library',
    'emoji collection',
    'emoji search',
    'free emoji',
    'emoji keyboard',
    'device emoji preview',
    'Apple emoji',
    'Google emoji',
    'Microsoft emoji',
    'Samsung emoji',
    'emoji categories',
  ],
  openGraph: {
    title: 'Emoji Picker - Browse & Copy 500+ Emojis with Device Preview | ImageConvertors',
    description: 'Browse and copy over 500 emojis instantly with device-specific rendering preview.',
    images: ['/emoji.webp'],
  },
};

type DeviceType = 'native' | 'apple' | 'google' | 'microsoft' | 'samsung';

export default function EmojisPage() {
  const t = useTranslations('textTools.emojiPage');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EmojiCategory>('All');
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('native');
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);

  const filteredEmojis = searchEmojis(searchQuery, selectedCategory);

  const handleCopyEmoji = async (emoji: string) => {
    await copyToClipboard(emoji);
    setCopiedEmoji(emoji);
    setTimeout(() => setCopiedEmoji(null), 1500);
  };

  const deviceOptions: { id: DeviceType; label: string }[] = [
    { id: 'native', label: t('native') },
    { id: 'apple', label: t('apple') },
    { id: 'google', label: t('google') },
    { id: 'microsoft', label: t('microsoft') },
    { id: 'samsung', label: t('samsung') },
  ];

  const categoryLabels: Record<EmojiCategory, string> = {
    All: t('all'),
    'Smileys & People': t('smileys'),
    'Animals & Nature': t('animals'),
    'Food & Drink': t('food'),
    'Travel & Places': t('travel'),
    Activities: t('activities'),
    Objects: t('objects'),
    Symbols: t('symbols'),
    Flags: t('flags'),
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

        {/* Device Selection */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{t('devicePreview')}</span>
          <div className="flex gap-1.5 sm:gap-2">
            {deviceOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedDevice(option.id)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  selectedDevice === option.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {emojiCategories.map(category => (
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

      {/* Emoji Grid */}
      {filteredEmojis.length > 0 ? (
        <div>
          <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            {filteredEmojis.length} {t('totalEmojis')}
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
            {filteredEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleCopyEmoji(emoji.emoji)}
                className="group relative aspect-square rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:shadow-lg transition-all duration-200 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl"
                title={`${emoji.name} - ${t('clickToCopy')}`}
              >
                <span className="select-none">{emoji.emoji}</span>
                {copiedEmoji === emoji.emoji && (
                  <div className="absolute inset-0 bg-green-500 bg-opacity-90 rounded-lg flex items-center justify-center">
                    <Check className="text-white" size={24} />
                  </div>
                )}
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
