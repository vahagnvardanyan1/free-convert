'use client';

import { useMemo, useState, type ComponentType } from 'react';
import { Type, X, LayoutGrid, Sparkles, Feather, Bold, Snowflake, AArrowDown, Zap, Brackets, CaseSensitive, Terminal } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { copyToClipboard } from '@/lib/colorUtils';
import { useToast } from '@/components/ui/toast';
import { FONT_CATEGORIES, type FontCategory, type FontStyle, getFontsByCategory, isTextArt } from '@/lib/fontGeneratorData';

import { FontRow } from './FontRow';
import { AsciiFontRow } from './AsciiFontRow';

const DEFAULT_TEXT = 'Type something to start';
const LOAD_STEP = 24;

const CATEGORY_ICONS: Record<FontCategory, ComponentType<{ className?: string }>> = {
  all: LayoutGrid,
  fancy: Sparkles,
  cursive: Feather,
  bold: Bold,
  cool: Snowflake,
  small: AArrowDown,
  glitch: Zap,
  wrappers: Brackets,
  lettercase: CaseSensitive,
  textart: Terminal,
};

export function FontGenerator() {
  const t = useTranslations('fontGenerator');
  const toast = useToast();

  const [text, setText] = useState('');
  const [category, setCategory] = useState<FontCategory>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [visible, setVisible] = useState(LOAD_STEP);

  const previewText = text || DEFAULT_TEXT;
  const fonts = useMemo(() => getFontsByCategory(category), [category]);
  const shown = fonts.slice(0, visible);

  const categoryLabels: Record<FontCategory, string> = {
    all: t('categories.all'),
    fancy: t('categories.fancy'),
    cursive: t('categories.cursive'),
    bold: t('categories.bold'),
    cool: t('categories.cool'),
    small: t('categories.small'),
    glitch: t('categories.glitch'),
    wrappers: t('categories.wrappers'),
    lettercase: t('categories.lettercase'),
    textart: t('categories.textart'),
  };

  const handleCopy = async (font: FontStyle, value: string) => {
    try {
      await copyToClipboard(value);
      setCopiedId(font.id);
      toast.success(t('copiedToast'));
      window.setTimeout(() => setCopiedId(current => (current === font.id ? null : current)), 2000);
    } catch {
      toast.error(t('copyError'));
    }
  };

  const selectCategory = (next: FontCategory) => {
    setCategory(next);
    setVisible(LOAD_STEP);
  };

  return (
    <div>
      {/* Sticky input + category filters */}
      <div className="sticky top-16 z-10 -mx-4 px-4 pt-3 pb-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-gray-50 dark:bg-gray-800 shadow-md space-y-3">
        <div className="relative">
          <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={t('inputPlaceholder')}
            aria-label={t('inputLabel')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2.5 sm:py-3 pl-9 pr-10 text-sm sm:text-base text-gray-900 dark:text-white focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
          {text && (
            <button type="button" onClick={() => setText('')} aria-label={t('clear')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {FONT_CATEGORIES.map(cat => {
            const Icon = CATEGORY_ICONS[cat.id];
            return (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-all ${
                  category === cat.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {categoryLabels[cat.id]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div className="mt-4">
        <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          {fonts.length} {t('stylesCount')}
        </div>

        {fonts.length > 0 ? (
          <>
            <div className="space-y-2.5">
              {shown.map(font =>
                isTextArt(font) ? (
                  <AsciiFontRow key={font.id} font={font} text={previewText} isCopied={copiedId === font.id} onCopy={handleCopy} />
                ) : (
                  <FontRow key={font.id} font={font} text={previewText} isCopied={copiedId === font.id} onCopy={handleCopy} />
                ),
              )}
            </div>

            {visible < fonts.length && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible(v => v + LOAD_STEP)}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-md hover:bg-blue-700 transition-colors"
                >
                  {t('showMore')}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 py-16 text-center">
            <p className="mb-2 text-lg text-gray-500 dark:text-gray-400">{t('noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
