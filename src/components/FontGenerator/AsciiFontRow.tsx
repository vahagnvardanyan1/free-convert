'use client';

import { useEffect, useState } from 'react';
import { Copy, Check, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { type FontStyle, renderAsciiArt } from '@/lib/fontGeneratorData';

interface AsciiFontRowProps {
  font: FontStyle;
  text: string;
  isCopied: boolean;
  onCopy: (font: FontStyle, value: string) => void;
}

export function AsciiFontRow({ font, text, isCopied, onCopy }: AsciiFontRowProps) {
  const t = useTranslations('fontGenerator');
  const [rendered, setRendered] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    renderAsciiArt(font.asciiFont!, text)
      .then(result => {
        if (active) {
          setRendered(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setRendered('');
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [font.asciiFont, text]);

  return (
    <div className="group relative rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:shadow-md transition-all">
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{font.name}</span>
        <button
          type="button"
          onClick={() => rendered && onCopy(font, rendered)}
          disabled={loading || !rendered}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors"
          aria-label={t('copy')}
        >
          {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {isCopied ? t('copied') : t('copy')}
        </button>
      </div>
      <div className="px-4 pb-3 pt-1 overflow-x-auto">
        {loading ? (
          <div className="flex items-center gap-2 py-4 text-gray-400 text-sm">
            <Loader2 size={16} className="animate-spin" />
            {t('rendering')}
          </div>
        ) : (
          <pre className={cn('text-[10px] leading-tight font-mono text-gray-900 dark:text-gray-100 whitespace-pre select-text')}>{rendered}</pre>
        )}
      </div>
    </div>
  );
}
