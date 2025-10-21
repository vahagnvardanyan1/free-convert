'use client';

import { useState } from 'react';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import { fontScaleRatios, generateFontScale } from '@/lib/fontTools';
import { copyToClipboard } from '@/lib/colorUtils';
import { Button } from '@/components/ui/button';
import { Copy, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

const metadata = {
  title: 'Typographic Scale Generator - Create Harmonious Font Size Systems',
  description: 'Generate typographic scales using musical ratios. Create consistent font size hierarchies for your design system. Export CSS custom properties. Free type scale tool.',
  keywords: 'typographic scale, font scale, type scale, modular scale, font size system, design system, CSS variables, typography ratio, type hierarchy',
};

interface Preset {
  name: string;
  baseSize: number;
  ratioId: string;
  steps: number;
}

const presets: Preset[] = [
  { name: 'Editorial', baseSize: 18, ratioId: 'perfect-fourth', steps: 6 },
  { name: 'UI/App', baseSize: 16, ratioId: 'minor-third', steps: 6 },
  { name: 'Display/Marketing', baseSize: 20, ratioId: 'golden-ratio', steps: 6 },
  { name: 'Compact', baseSize: 14, ratioId: 'major-second', steps: 6 },
];

export default function FontScalesPage() {
  const t = useTranslations('textTools.fontScalesPage');
  const [baseSize, setBaseSize] = useState(16);
  const [selectedRatio, setSelectedRatio] = useState('minor-third');
  const [steps, setSteps] = useState(6);
  const [includeBody, setIncludeBody] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const currentRatio = fontScaleRatios.find(r => r.id === selectedRatio);
  const scale = generateFontScale(baseSize, currentRatio?.ratio || 1.2, steps);

  const handlePreset = (preset: Preset) => {
    setBaseSize(preset.baseSize);
    setSelectedRatio(preset.ratioId);
    setSteps(preset.steps);
  };

  const generateCSSVariables = () => {
    let css = '/* Typographic Scale */\n:root {\n';

    scale.forEach(item => {
      const varName = `--font-size-${item.label.toLowerCase().replace(/\s/g, '-')}`;
      css += `  ${varName}: ${item.rem}rem; /* ${item.px}px */\n`;
    });

    if (includeBody) {
      css += `  --font-size-body: ${baseSize / 16}rem; /* ${baseSize}px */\n`;
    }

    css += '}\n\n/* Usage Example */\n';
    scale.forEach(item => {
      const selector = item.label.toLowerCase().replace(/\s/g, '-');
      css += `${selector} {\n  font-size: var(--font-size-${selector});\n}\n\n`;
    });

    return css;
  };

  const handleCopyCSS = async () => {
    await copyToClipboard(generateCSSVariables());
    setCopiedField('css');
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div>
      <DynamicMetadata title={metadata.title} description={metadata.description} keywords={metadata.keywords} />

      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      {/* Quick Presets */}
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-100 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles size={20} />
          {t('quickPresets')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {presets.map(preset => (
            <button
              key={preset.name}
              onClick={() => handlePreset(preset)}
              className="px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg hover:border-blue-500 transition-all text-left"
            >
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                {preset.name === 'Editorial'
                  ? t('presets.editorial')
                  : preset.name === 'UI/App'
                    ? t('presets.uiApp')
                    : preset.name === 'Display/Marketing'
                      ? t('presets.displayMarketing')
                      : t('presets.compact')}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-words">
                {preset.baseSize}px • {fontScaleRatios.find(r => r.id === preset.ratioId)?.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Controls */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Scale Settings</h3>

            {/* Base Size */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Base Font Size (px)</label>
              <input
                type="number"
                min="10"
                max="32"
                value={baseSize}
                onChange={e => setBaseSize(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Ratio Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scale Ratio</label>
              <select
                value={selectedRatio}
                onChange={e => setSelectedRatio(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {fontScaleRatios.map(ratio => (
                  <option key={ratio.id} value={ratio.id}>
                    {ratio.label} ({ratio.ratio})
                  </option>
                ))}
              </select>
              {currentRatio && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{currentRatio.description}</p>}
            </div>

            {/* Number of Steps */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Steps: {steps}</label>
              <input type="range" min="4" max="10" value={steps} onChange={e => setSteps(Number(e.target.value))} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>4</span>
                <span>10</span>
              </div>
            </div>

            {/* Include Body Size */}
            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={includeBody} onChange={e => setIncludeBody(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Include body size variable</span>
              </label>
            </div>
          </div>

          {/* Scale Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated Scale</h3>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-sm min-w-[300px]">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left py-2 px-2 text-gray-700 dark:text-gray-300 font-semibold">Level</th>
                    <th className="text-right py-2 px-2 text-gray-700 dark:text-gray-300 font-semibold">Pixels</th>
                    <th className="text-right py-2 px-2 text-gray-700 dark:text-gray-300 font-semibold">REM</th>
                  </tr>
                </thead>
                <tbody>
                  {scale.map(item => (
                    <tr key={item.label} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <td className="py-3 px-2 text-gray-900 dark:text-white font-medium">{item.label}</td>
                      <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-400">{item.px}px</td>
                      <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-400">{item.rem}rem</td>
                    </tr>
                  ))}
                  {includeBody && (
                    <tr className="border-t-2 border-gray-200 dark:border-gray-600">
                      <td className="py-3 px-2 text-gray-900 dark:text-white font-medium">Body</td>
                      <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-400">{baseSize}px</td>
                      <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-400">{(baseSize / 16).toFixed(3)}rem</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Preview & CSS */}
        <div className="space-y-4 sm:space-y-6">
          {/* Visual Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visual Preview</h3>
            <div className="space-y-4">
              {scale.map((item, index) => (
                <div key={index} className="pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div className="text-gray-900 dark:text-white break-words overflow-hidden" style={{ fontSize: `${Math.min(item.px, 48)}px`, lineHeight: 1.2 }}>
                    {item.label}: The quick brown fox
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.px}px / {item.rem}rem
                  </div>
                </div>
              ))}
              {includeBody && (
                <div className="pt-3 border-t-2 border-gray-200 dark:border-gray-600">
                  <div className="text-gray-900 dark:text-white break-words" style={{ fontSize: `${baseSize}px`, lineHeight: 1.5 }}>
                    Body: Typography is the craft of endowing human language with a durable visual form. This is your base body text size that will be used for most content.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {baseSize}px / {(baseSize / 16).toFixed(3)}rem
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CSS Output */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">CSS Variables</h3>
              <Button onClick={handleCopyCSS} size="sm" className="w-full sm:w-auto">
                <Copy className="mr-2" size={16} />
                {copiedField === 'css' ? 'Copied!' : 'Copy CSS'}
              </Button>
            </div>
            <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto text-xs text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 max-h-[400px] sm:max-h-[500px] overflow-y-auto">
              <code>{generateCSSVariables()}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 border border-orange-100 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About Typographic Scales</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
            <span>Typographic scales create visual harmony by using consistent mathematical relationships between font sizes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 dark:text-red-400 font-bold">•</span>
            <span>Musical ratios like Perfect Fourth (1.333) and Golden Ratio (1.618) have been used in design for centuries</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
            <span>Smaller ratios (1.125-1.25) work well for UI with many text levels; larger ratios (1.5+) create dramatic hierarchy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 dark:text-red-400 font-bold">•</span>
            <span>Use CSS custom properties to maintain consistency and enable easy theme adjustments across your project</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
