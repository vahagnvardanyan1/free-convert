'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Copy, Check, Palette } from 'lucide-react';
import { convertColor, getContrastColor, copyToClipboard } from '@/lib/colorUtils';
import { Button } from '@/components/ui/button';
import { DynamicMetadata } from '@/components/DynamicMetadata';

const metadata = {
  title: 'Color Picker - Interactive Color Selector & Format Converter',
  description:
    'Pick colors and get instant format conversions. Interactive color picker with HEX, RGB, RGBA, HSL, HSLA, and HSV outputs. Perfect for web designers and developers. Free online color picker tool.',
  keywords: [
    'color picker',
    'pick color',
    'color selector',
    'HEX color picker',
    'RGB color picker',
    'color formats',
    'web colors',
    'design colors',
    'color tool',
    'HSL color picker',
    'RGBA color picker',
    'HSV color picker',
    'interactive color picker',
    'online color selector',
    'color code picker',
    'eyedropper tool',
  ],
};

export default function ColorPickerPage() {
  const [color, setColor] = useState('#3b82f6');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const colorFormats = convertColor(color);
  const contrastColor = getContrastColor(color);

  const handleCopy = async (text: string, field: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div>
      <DynamicMetadata title={metadata.title} description={metadata.description} keywords={metadata.keywords} />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Color Picker</h2>
        <p className="text-gray-600 dark:text-gray-400">Select a color and get instant format conversions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Picker Section */}
        <div className="space-y-6">
          {/* Color Picker */}
          <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <HexColorPicker color={color} onChange={setColor} style={{ width: '100%', maxWidth: '300px' }} />
          </div>

          {/* Color Preview */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
            <div className="h-32 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300" style={{ backgroundColor: color }}>
              <div className="text-center" style={{ color: contrastColor }}>
                <Palette className="w-12 h-12 mx-auto mb-2 opacity-80" />
                <p className="font-mono text-lg font-semibold">{color.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Color Formats Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Color Formats</h3>

          {colorFormats && (
            <div className="space-y-3">
              {Object.entries(colorFormats).map(([format, value]) => (
                <div key={format} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{format}</p>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">{value}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(value, format)} className="flex items-center gap-2">
                    {copiedField === format ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Color Information */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Quick Tip</h4>
            <p className="text-sm text-blue-800 dark:text-blue-400">Click any format to copy it to your clipboard. Use the format that best suits your project needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
