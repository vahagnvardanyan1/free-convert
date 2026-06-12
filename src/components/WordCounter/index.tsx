'use client';

import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { ToolShell, ToolTitleBanner } from '@/components/tooling/ToolShell';
import { ToolSection } from '@/components/tooling/ToolSection';

const READING_WORDS_PER_MINUTE = 200;

const countStats = (text: string) => {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentences = trimmed ? (trimmed.match(/[.!?…]+(?=\s|$)/g)?.length ?? (words > 0 ? 1 : 0)) : 0;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n+/).filter(p => p.trim()).length : 0;

  return {
    words,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    sentences,
    paragraphs,
    readingMinutes: Math.max(words > 0 ? 1 : 0, Math.round(words / READING_WORDS_PER_MINUTE)),
  };
};

export const WordCounter = () => {
  const t = useTranslations('wordCounter');
  const tCommon = useTranslations('common');

  const [text, setText] = useState('');
  const stats = useMemo(() => countStats(text), [text]);

  const statCards = [
    { label: t('words'), value: stats.words },
    { label: t('characters'), value: stats.characters },
    { label: t('charactersNoSpaces'), value: stats.charactersNoSpaces },
    { label: t('sentences'), value: stats.sentences },
    { label: t('paragraphs'), value: stats.paragraphs },
    { label: t('readingTime'), value: t('minutes', { count: stats.readingMinutes }) },
  ];

  return (
    <ToolShell header={{ backText: tCommon('backToHome') }}>
      <div className="space-y-6">
        <ToolSection title={t('yourText')}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {statCards.map(stat => (
              <div key={stat.label} className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl text-center">
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={t('placeholder')}
            rows={12}
            className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:outline-none transition-colors resize-y min-h-[260px]"
          />

          {text && (
            <div className="mt-3 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setText('')} className="flex items-center gap-2">
                <Trash2 size={14} />
                {t('clear')}
              </Button>
            </div>
          )}
        </ToolSection>

        <ToolTitleBanner title={t('title')} description={t('description')} />
      </div>
    </ToolShell>
  );
};
