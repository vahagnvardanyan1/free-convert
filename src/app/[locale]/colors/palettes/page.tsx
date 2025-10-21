'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Plus, Trash2, Copy, Check, Save } from 'lucide-react';
import { useColorStore } from '@/lib/colorStore';
import { generateComplementary, generateAnalogous, generateMonochromatic, copyToClipboard } from '@/lib/colorUtils';
import { Button } from '@/components/ui/button';
import { DynamicMetadata } from '@/components/DynamicMetadata';

const metadata = {
  title: 'Color Palette Generator - Create & Save Custom Color Schemes',
  description:
    'Generate beautiful color palettes with complementary, analogous, and monochromatic schemes. Save your favorite palettes locally. Browse predefined palettes or create custom color combinations. Free palette generator.',
  keywords: [
    'color palette',
    'palette generator',
    'color schemes',
    'complementary colors',
    'analogous colors',
    'monochromatic palette',
    'color combinations',
    'design palette',
    'color harmony',
    'color scheme generator',
    'custom palette',
    'save color palette',
    'triadic colors',
    'split complementary',
    'color wheel',
    'palette creator',
  ],
};

const predefinedPalettes = [
  { name: 'Ocean Breeze', colors: ['#0077be', '#00a8e8', '#00c9ff', '#84d2f6', '#afecfe'] },
  { name: 'Sunset Glow', colors: ['#ff6b35', '#f7931e', '#fdc830', '#f37335', '#c73e1d'] },
  { name: 'Forest Green', colors: ['#1a4d2e', '#2d6a4f', '#40916c', '#52b788', '#74c69d'] },
  { name: 'Purple Dream', colors: ['#4a148c', '#6a1b9a', '#7b1fa2', '#8e24aa', '#9c27b0'] },
  { name: 'Monochrome', colors: ['#000000', '#404040', '#808080', '#c0c0c0', '#ffffff'] },
];

export default function PalettesPage() {
  const { palettes, addPalette, removePalette } = useColorStore();
  const [newPaletteName, setNewPaletteName] = useState('');
  const [currentColor, setCurrentColor] = useState('#3b82f6');
  const [currentPaletteColors, setCurrentPaletteColors] = useState<string[]>([]);
  const [copiedPalette, setCopiedPalette] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleAddColorToPalette = () => {
    if (!currentPaletteColors.includes(currentColor)) {
      setCurrentPaletteColors([...currentPaletteColors, currentColor]);
    }
  };

  const handleRemoveColorFromPalette = (index: number) => {
    setCurrentPaletteColors(currentPaletteColors.filter((_, i) => i !== index));
  };

  const handleSavePalette = () => {
    if (newPaletteName.trim() && currentPaletteColors.length > 0) {
      addPalette({ name: newPaletteName, colors: currentPaletteColors });
      setNewPaletteName('');
      setCurrentPaletteColors([]);
    }
  };

  const handleGeneratePalette = (type: 'complementary' | 'analogous' | 'monochromatic') => {
    let colors: string[] = [];
    switch (type) {
      case 'complementary':
        colors = generateComplementary(currentColor);
        break;
      case 'analogous':
        colors = generateAnalogous(currentColor);
        break;
      case 'monochromatic':
        colors = generateMonochromatic(currentColor);
        break;
    }
    setCurrentPaletteColors(colors);
  };

  const handleCopyPalette = async (colors: string[], id: string) => {
    await copyToClipboard(colors.join(', '));
    setCopiedPalette(id);
    setTimeout(() => setCopiedPalette(null), 2000);
  };

  return (
    <div>
      <DynamicMetadata title={metadata.title} description={metadata.description} keywords={metadata.keywords} />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Color Palettes</h2>
        <p className="text-gray-600 dark:text-gray-400">Create and manage your color palettes</p>
      </div>

      {/* Create New Palette Section */}
      <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Palette</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Picker */}
          <div className="space-y-4">
            <Button variant="outline" onClick={() => setShowColorPicker(!showColorPicker)} className="w-full">
              {showColorPicker ? 'Hide Color Picker' : 'Show Color Picker'}
            </Button>

            {showColorPicker && (
              <div className="flex justify-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <HexColorPicker color={currentColor} onChange={setCurrentColor} />
              </div>
            )}

            <div className="flex gap-2">
              <div className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600" style={{ backgroundColor: currentColor }} />
              <div className="flex-1">
                <input
                  type="text"
                  value={currentColor}
                  onChange={e => setCurrentColor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                  placeholder="#000000"
                />
                <Button onClick={handleAddColorToPalette} className="w-full mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Color
                </Button>
              </div>
            </div>

            {/* Quick Generate Buttons */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Generate:</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => handleGeneratePalette('complementary')}>
                  Complementary
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleGeneratePalette('analogous')}>
                  Analogous
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleGeneratePalette('monochromatic')}>
                  Monochromatic
                </Button>
              </div>
            </div>
          </div>

          {/* Current Palette Preview */}
          <div className="space-y-4">
            <input
              type="text"
              value={newPaletteName}
              onChange={e => setNewPaletteName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Palette Name"
            />

            <div className="min-h-[120px] p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
              {currentPaletteColors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentPaletteColors.map((color, index) => (
                    <div key={index} className="relative group">
                      <div className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer" style={{ backgroundColor: color }} />
                      <button
                        onClick={() => handleRemoveColorFromPalette(index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <p className="text-xs text-center mt-1 font-mono text-gray-600 dark:text-gray-400">{color}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No colors added yet. Add colors to create a palette.</p>
              )}
            </div>

            <Button onClick={handleSavePalette} disabled={!newPaletteName.trim() || currentPaletteColors.length === 0} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Palette
            </Button>
          </div>
        </div>
      </div>

      {/* Predefined Palettes */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Predefined Palettes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {predefinedPalettes.map(palette => (
            <div key={palette.name} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{palette.name}</h4>
                <Button variant="ghost" size="sm" onClick={() => handleCopyPalette(palette.colors, palette.name)}>
                  {copiedPalette === palette.name ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="flex gap-1">
                {palette.colors.map((color, index) => (
                  <div key={index} className="flex-1 h-16 rounded transition-transform hover:scale-105" style={{ backgroundColor: color }} title={color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Palettes */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Saved Palettes ({palettes.length})</h3>
        {palettes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {palettes.map(palette => (
              <div key={palette.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{palette.name}</h4>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleCopyPalette(palette.colors, palette.id)}>
                      {copiedPalette === palette.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removePalette(palette.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-1">
                  {palette.colors.map((color, index) => (
                    <div key={index} className="flex-1 h-16 rounded transition-transform hover:scale-105" style={{ backgroundColor: color }} title={color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No saved palettes yet. Create your first palette above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
