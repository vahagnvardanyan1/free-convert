'use client';

import { Copy, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { type FontStyle, convert } from '@/lib/fontGeneratorData';

interface FontRowProps {
  font: FontStyle;
  text: string;
  isCopied: boolean;
  onCopy: (font: FontStyle, value: string) => void;
}

export function FontRow({ font, text, isCopied, onCopy }: FontRowProps) {
  const t = useTranslations('fontGenerator');
  const value = convert(font, text);

  const handleClick = () => {
    // Don't hijack a click when the user is selecting text.
    if (typeof window !== 'undefined' && window.getSelection()?.toString()) return;
    if (value) onCopy(font, value);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex items-center justify-between gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium text-gray-400 dark:text-gray-500 mb-0.5">{font.name}</span>
        <p className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 break-words leading-snug select-text">{value || <span className="text-gray-400 italic text-base">{t('emptyRow')}</span>}</p>
      </div>
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          if (value) onCopy(font, value);
        }}
        className="flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
        aria-label={t('copy')}
      >
        {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        <span className="hidden sm:inline">{isCopied ? t('copied') : t('copy')}</span>
      </button>
    </div>
  );
}
