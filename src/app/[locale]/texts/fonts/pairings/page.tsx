'use client';

import { useState, useEffect, useRef } from 'react';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import { fontPairings, getFontById } from '@/lib/fontTools';
import { copyToClipboard } from '@/lib/colorUtils';
import { Button } from '@/components/ui/button';
import { Copy, Sparkles } from 'lucide-react';

const metadata = {
  title: 'Font Pairings - Discover Perfect Typography Combinations',
  description: 'Browse curated font pairings for web design. Find complementary Google Font combinations with use case recommendations. Copy CSS instantly. Free font pairing tool.',
  keywords: 'font pairing, font combinations, typography pairing, Google Font pairs, complementary fonts, font matching, web typography, design fonts',
};

export default function FontPairingsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedPairing, setCopiedPairing] = useState<string | null>(null);
  const loadedFontsRef = useRef<Set<string>>(new Set());

  const categories = ['all', ...Array.from(new Set(fontPairings.map(p => p.category)))];

  const filteredPairings = selectedCategory === 'all' ? fontPairings : fontPairings.filter(p => p.category === selectedCategory);

  useEffect(() => {
    filteredPairings.forEach(pairing => {
      const primaryFont = getFontById(pairing.primaryFontId);
      const secondaryFont = getFontById(pairing.secondaryFontId);

      [primaryFont, secondaryFont].forEach(font => {
        if (font && !loadedFontsRef.current.has(font.id)) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = font.importUrl;
          document.head.appendChild(link);
          loadedFontsRef.current.add(font.id);
        }
      });
    });
  }, [filteredPairings]);

  const handleCopyPairing = async (pairing: (typeof fontPairings)[0]) => {
    const primaryFont = getFontById(pairing.primaryFontId);
    const secondaryFont = getFontById(pairing.secondaryFontId);

    if (!primaryFont || !secondaryFont) return;

    const css = `/* ${pairing.title} */
@import url('${primaryFont.importUrl}');
@import url('${secondaryFont.importUrl}');

/* Heading */
.heading {
  font-family: ${primaryFont.cssFamily};
  font-weight: 700;
}

/* Body Text */
.body {
  font-family: ${secondaryFont.cssFamily};
  font-weight: 400;
}`;

    await copyToClipboard(css);
    setCopiedPairing(pairing.id);
    setTimeout(() => setCopiedPairing(null), 2000);
  };

  return (
    <div>
      <DynamicMetadata title={metadata.title} description={metadata.description} keywords={metadata.keywords} />

      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Font Pairings</h2>
        <p className="text-gray-600 dark:text-gray-400">Discover curated font combinations for your projects</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 sm:mb-8 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category === 'all' ? 'All Pairings' : category}
          </button>
        ))}
      </div>

      {/* Pairings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredPairings.map(pairing => {
          const primaryFont = getFontById(pairing.primaryFontId);
          const secondaryFont = getFontById(pairing.secondaryFontId);

          if (!primaryFont || !secondaryFont) return null;

          return (
            <div key={pairing.id} className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300">
              {pairing.popular && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                  <span className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    <Sparkles size={12} />
                    Popular
                  </span>
                </div>
              )}

              <div className="p-4 sm:p-6">
                {/* Pairing Title */}
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 break-words">{pairing.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{pairing.description}</p>
                </div>

                {/* Category and Use Cases */}
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">{pairing.category}</span>
                  {pairing.useCases.map(useCase => (
                    <span key={useCase} className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                      {useCase}
                    </span>
                  ))}
                </div>

                {/* Font Preview */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-4 sm:p-6 mb-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 break-words overflow-hidden" style={{ fontFamily: primaryFont.cssFamily, fontWeight: 700 }}>
                    {pairing.sampleText.heading}
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed break-words" style={{ fontFamily: secondaryFont.cssFamily, fontWeight: 400 }}>
                    {pairing.sampleText.body}
                  </p>
                </div>

                {/* Font Names */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Heading: </span>
                    <span className="font-semibold text-gray-900 dark:text-white break-words">{primaryFont.name}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Body: </span>
                    <span className="font-semibold text-gray-900 dark:text-white break-words">{secondaryFont.name}</span>
                  </div>
                </div>

                {/* Copy Button */}
                <Button onClick={() => handleCopyPairing(pairing)} className="w-full" variant={copiedPairing === pairing.id ? 'default' : 'outline'}>
                  <Copy className="mr-2" size={16} />
                  {copiedPairing === pairing.id ? 'Copied!' : 'Copy CSS'}
                </Button>
              </div>

              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            </div>
          );
        })}
      </div>

      {filteredPairings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No pairings found in this category.</p>
        </div>
      )}

      {/* Info Panel */}
      <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-purple-100 dark:border-gray-600">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Typography Pairing Tips</h3>
        <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">•</span>
            <span>Contrast is key: pair serif with sans-serif or display with body fonts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-600 dark:text-pink-400 font-bold flex-shrink-0">•</span>
            <span>Use heavier weights for headings and regular weights for body text</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">•</span>
            <span>Consider the mood and personality of your brand when selecting fonts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-600 dark:text-pink-400 font-bold flex-shrink-0">•</span>
            <span>Test your pairings at different sizes and weights before finalizing</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
