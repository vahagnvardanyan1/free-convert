'use client';

import { useState, useEffect, useRef } from 'react';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import { fontOptions, getFontById } from '@/lib/fontTools';
import { copyToClipboard } from '@/lib/colorUtils';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

const metadata = {
  title: 'Font Preview - Interactive Typography Playground with Google Fonts',
  description: 'Test Google Fonts with live preview. Customize font size, weight, spacing, and colors. Generate CSS code instantly. Free online font preview tool.',
  keywords: 'font preview, Google Fonts, typography playground, font tester, CSS fonts, web fonts, font customizer, font size, font weight',
};

type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
type TextAlign = 'left' | 'center' | 'right' | 'justify';

export default function FontPreviewPage() {
  const [selectedFont, setSelectedFont] = useState('inter');
  const [customText, setCustomText] = useState('The quick brown fox jumps over the lazy dog. Typography is the art and technique of arranging type.');
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textTransform, setTextTransform] = useState<TextTransform>('none');
  const [textAlign, setTextAlign] = useState<TextAlign>('left');
  const [textColor, setTextColor] = useState('#1f2937');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const loadedFontsRef = useRef<Set<string>>(new Set());

  const currentFont = getFontById(selectedFont);

  useEffect(() => {
    if (currentFont && !loadedFontsRef.current.has(currentFont.id)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = currentFont.importUrl;
      document.head.appendChild(link);
      loadedFontsRef.current.add(currentFont.id);
    }
  }, [currentFont]);

  const handleReset = () => {
    setSelectedFont('inter');
    setCustomText('The quick brown fox jumps over the lazy dog. Typography is the art and technique of arranging type.');
    setFontSize(24);
    setFontWeight(400);
    setLineHeight(1.5);
    setLetterSpacing(0);
    setTextTransform('none');
    setTextAlign('left');
    setTextColor('#1f2937');
    setBgColor('#ffffff');
  };

  const generateCSS = () => {
    if (!currentFont) return '';

    return `font-family: ${currentFont.cssFamily};
font-size: ${fontSize}px;
font-weight: ${fontWeight};
line-height: ${lineHeight};
letter-spacing: ${letterSpacing}px;
text-transform: ${textTransform};
text-align: ${textAlign};
color: ${textColor};
background-color: ${bgColor};`;
  };

  const handleCopyCSS = async () => {
    await copyToClipboard(generateCSS());
    setCopiedField('css');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const groupedFonts = fontOptions.reduce(
    (acc, font) => {
      if (!acc[font.category]) {
        acc[font.category] = [];
      }
      acc[font.category].push(font);
      return acc;
    },
    {} as Record<string, typeof fontOptions>,
  );

  return (
    <div>
      <DynamicMetadata title={metadata.title} description={metadata.description} keywords={metadata.keywords} />

      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Font Preview Playground</h2>
        <p className="text-gray-600 dark:text-gray-400">Test Google Fonts with live preview and customization options</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Controls */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Font Settings</h3>

            {/* Font Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Family</label>
              <select
                value={selectedFont}
                onChange={e => setSelectedFont(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(groupedFonts).map(([category, fonts]) => (
                  <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                    {fonts.map(font => (
                      <option key={font.id} value={font.id}>
                        {font.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size: {fontSize}px</label>
              <input type="range" min="12" max="120" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full" />
            </div>

            {/* Font Weight */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Weight</label>
              <select
                value={fontWeight}
                onChange={e => setFontWeight(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {currentFont?.weights.map(weight => (
                  <option key={weight} value={weight}>
                    {weight}
                  </option>
                ))}
              </select>
            </div>

            {/* Line Height */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Line Height: {lineHeight.toFixed(2)}</label>
              <input type="range" min="1" max="3" step="0.1" value={lineHeight} onChange={e => setLineHeight(Number(e.target.value))} className="w-full" />
            </div>

            {/* Letter Spacing */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Letter Spacing: {letterSpacing}px</label>
              <input type="range" min="-5" max="20" step="0.5" value={letterSpacing} onChange={e => setLetterSpacing(Number(e.target.value))} className="w-full" />
            </div>

            {/* Text Transform */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Transform</label>
              <select
                value={textTransform}
                onChange={e => setTextTransform(e.target.value as TextTransform)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">None</option>
                <option value="uppercase">Uppercase</option>
                <option value="lowercase">Lowercase</option>
                <option value="capitalize">Capitalize</option>
              </select>
            </div>

            {/* Text Align */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Align</label>
              <div className="grid grid-cols-2 sm:flex gap-2">
                {(['left', 'center', 'right', 'justify'] as TextAlign[]).map(align => (
                  <button
                    key={align}
                    onClick={() => setTextAlign(align)}
                    className={`flex-1 px-3 sm:px-4 py-2 rounded-lg border transition-colors text-sm ${
                      textAlign === align
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Color</label>
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowTextColorPicker(!showTextColorPicker);
                      setShowBgColorPicker(false);
                    }}
                    className="w-full h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: textColor }}
                  />
                  {showTextColorPicker && (
                    <div className="absolute z-10 mt-2 left-0 sm:left-auto">
                      <div className="fixed inset-0" onClick={() => setShowTextColorPicker(false)} />
                      <div className="relative">
                        <HexColorPicker color={textColor} onChange={setTextColor} />
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={textColor}
                  onChange={e => setTextColor(e.target.value)}
                  className="w-full mt-2 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background</label>
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowBgColorPicker(!showBgColorPicker);
                      setShowTextColorPicker(false);
                    }}
                    className="w-full h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: bgColor }}
                  />
                  {showBgColorPicker && (
                    <div className="absolute z-10 mt-2 left-0 sm:left-auto">
                      <div className="fixed inset-0" onClick={() => setShowBgColorPicker(false)} />
                      <div className="relative">
                        <HexColorPicker color={bgColor} onChange={setBgColor} />
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className="w-full mt-2 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-6">
              <Button onClick={handleReset} variant="outline" className="flex-1">
                <RotateCcw className="mr-2" size={16} />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Preview & CSS */}
        <div className="space-y-4 sm:space-y-6">
          {/* Live Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Preview</h3>
            <div className="mb-4">
              <textarea
                value={customText}
                onChange={e => setCustomText(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Enter custom text..."
              />
            </div>
            <div
              className="p-4 sm:p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 min-h-[200px] sm:min-h-[300px] overflow-auto break-words"
              style={{
                fontFamily: currentFont?.cssFamily,
                fontSize: `${fontSize}px`,
                fontWeight,
                lineHeight,
                letterSpacing: `${letterSpacing}px`,
                textTransform,
                textAlign,
                color: textColor,
                backgroundColor: bgColor,
              }}
            >
              {customText}
            </div>
          </div>

          {/* CSS Output */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated CSS</h3>
              <Button onClick={handleCopyCSS} size="sm">
                <Copy className="mr-2" size={16} />
                {copiedField === 'css' ? 'Copied!' : 'Copy CSS'}
              </Button>
            </div>
            <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              <code>{generateCSS()}</code>
            </pre>
            {currentFont && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Font Import:</p>
                <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-xs text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                  <code>{`<link href="${currentFont.importUrl}" rel="stylesheet">`}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
