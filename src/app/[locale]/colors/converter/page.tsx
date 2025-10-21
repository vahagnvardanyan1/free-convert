'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { convertColor, copyToClipboard, getContrastColor } from '@/lib/colorUtils';
import { Button } from '@/components/ui/button';
import { DynamicMetadata } from '@/components/DynamicMetadata';

const metadata = {
  title: 'Color Converter - Convert Between HEX, RGB, HSL & Color Formats',
  description:
    'Convert colors between HEX, RGB, RGBA, HSL, HSLA, and HSV formats instantly. Supports color names and all CSS color formats. Perfect for cross-platform development. Free online color format converter.',
  keywords: [
    'color converter',
    'HEX to RGB',
    'RGB to HSL',
    'HSL to HEX',
    'color format converter',
    'convert colors',
    'CSS colors',
    'color transformation',
    'color code converter',
    'RGB to HEX',
    'HEX to HSL',
    'HSL to RGB',
    'color format tool',
    'RGBA converter',
    'HSLA converter',
    'color code conversion',
  ],
};

type ColorFormat = 'hex' | 'rgb' | 'hsl';

export default function ConverterPage() {
  const [inputFormat, setInputFormat] = useState<ColorFormat>('hex');
  const [inputValue, setInputValue] = useState('#3b82f6');
  const [convertedColors, setConvertedColors] = useState<ReturnType<typeof convertColor>>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const result = convertColor(inputValue);
    if (result) {
      setConvertedColors(result);
      setError(null);
    } else {
      setConvertedColors(null);
      setError('Invalid color format');
    }
  }, [inputValue]);

  const handleCopy = async (text: string, field: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatPlaceholders = {
    hex: '#3b82f6',
    rgb: 'rgb(59, 130, 246)',
    hsl: 'hsl(217, 91%, 60%)',
  };

  const commonColors = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Orange', hex: '#f97316' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Green', hex: '#22c55e' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Gray', hex: '#6b7280' },
  ];

  return (
    <div>
      <DynamicMetadata title={metadata.title} description={metadata.description} keywords={metadata.keywords} />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Color Converter</h2>
        <p className="text-gray-600 dark:text-gray-400">Convert colors between different formats (HEX, RGB, HSL, HSV)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Input Format</label>
            <div className="flex gap-2">
              {(['hex', 'rgb', 'hsl'] as ColorFormat[]).map(format => (
                <Button
                  key={format}
                  variant={inputFormat === format ? 'default' : 'outline'}
                  onClick={() => {
                    setInputFormat(format);
                    setInputValue(formatPlaceholders[format]);
                  }}
                  className="flex-1 uppercase"
                >
                  {format}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Color Value</label>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={formatPlaceholders[inputFormat]}
              className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono ${
                error ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          {/* Color Preview */}
          {convertedColors && (
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Preview</label>
              <div className="h-32 rounded-xl shadow-lg flex items-center justify-center" style={{ backgroundColor: convertedColors.hex }}>
                <div className="text-center font-mono font-bold text-lg" style={{ color: getContrastColor(convertedColors.hex) }}>
                  {convertedColors.hex.toUpperCase()}
                </div>
              </div>
            </div>
          )}

          {/* Common Colors */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Quick Select</label>
            <div className="grid grid-cols-4 gap-2">
              {commonColors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setInputValue(color.hex)}
                  className="aspect-square rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          </div>

          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Converted Formats</label>

          {convertedColors ? (
            <div className="space-y-3">
              {Object.entries(convertedColors).map(([format, value]) => (
                <div key={format} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{format}</p>
                    <p className="font-mono text-sm text-gray-900 dark:text-white break-all">{value}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(value, format)} className="flex items-center gap-2 shrink-0">
                    {copiedField === format ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">Enter a valid color to see conversions</p>
            </div>
          )}

          {/* Information Box */}
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
            <h4 className="text-sm font-semibold text-green-900 dark:text-green-300 mb-2">📋 Supported Formats</h4>
            <ul className="space-y-1 text-sm text-green-800 dark:text-green-400">
              <li>
                <strong>HEX:</strong> #RRGGBB or #RGB
              </li>
              <li>
                <strong>RGB:</strong> rgb(r, g, b) or rgba(r, g, b, a)
              </li>
              <li>
                <strong>HSL:</strong> hsl(h, s%, l%) or hsla(h, s%, l%, a)
              </li>
              <li>
                <strong>HSV:</strong> hsv(h, s%, v%)
              </li>
              <li>
                <strong>Names:</strong> red, blue, etc.
              </li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Quick Tip</h4>
            <p className="text-sm text-blue-800 dark:text-blue-400">
              You can paste any valid color format, and it will automatically detect and convert it to all other formats. Try pasting CSS color values directly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
