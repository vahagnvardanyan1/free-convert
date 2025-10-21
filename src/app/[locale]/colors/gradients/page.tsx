'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { generateGradient, copyToClipboard } from '@/lib/colorUtils';
import { Button } from '@/components/ui/button';
import { DynamicMetadata } from '@/components/DynamicMetadata';

const metadata = {
  title: 'Gradient Generator - Create CSS & Tailwind Gradients Online',
  description:
    'Generate stunning gradients between colors with instant CSS and Tailwind code. Customize direction, steps, and colors. Preview gradients in real-time. Copy code directly to your project. Free gradient generator.',
  keywords: [
    'gradient generator',
    'CSS gradient',
    'Tailwind gradient',
    'linear gradient',
    'color gradient',
    'gradient maker',
    'web gradient',
    'gradient tool',
    'gradient CSS code',
    'gradient creator',
    'background gradient',
    'gradient background',
    'CSS gradient generator',
    'Tailwind CSS gradient',
    'gradient code',
    'online gradient tool',
  ],
};

type GradientDirection = 'to right' | 'to left' | 'to bottom' | 'to top' | 'to bottom right' | 'to bottom left';

export default function GradientsPage() {
  const [startColor, setStartColor] = useState('#3b82f6');
  const [endColor, setEndColor] = useState('#8b5cf6');
  const [steps, setSteps] = useState(5);
  const [direction, setDirection] = useState<GradientDirection>('to right');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeColorPicker, setActiveColorPicker] = useState<'start' | 'end' | null>(null);

  const gradientColors = generateGradient(startColor, endColor, steps);
  const cssGradient = `linear-gradient(${direction}, ${startColor}, ${endColor})`;
  const tailwindGradient = `bg-gradient-${direction.replace('to ', '')} from-[${startColor}] to-[${endColor}]`;

  const handleCopy = async (text: string, field: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSwapColors = () => {
    const temp = startColor;
    setStartColor(endColor);
    setEndColor(temp);
  };

  const directions: { value: GradientDirection; label: string; rotate: string }[] = [
    { value: 'to right', label: 'Right', rotate: 'rotate-0' },
    { value: 'to bottom', label: 'Bottom', rotate: 'rotate-90' },
    { value: 'to left', label: 'Left', rotate: 'rotate-180' },
    { value: 'to top', label: 'Top', rotate: 'rotate-270' },
    { value: 'to bottom right', label: 'Bottom Right', rotate: 'rotate-45' },
    { value: 'to bottom left', label: 'Bottom Left', rotate: 'rotate-135' },
  ];

  return (
    <div>
      <DynamicMetadata title={metadata.title} description={metadata.description} keywords={metadata.keywords} />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gradient Generator</h2>
        <p className="text-gray-600 dark:text-gray-400">Create beautiful gradients and get CSS code</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Section */}
        <div className="space-y-6">
          {/* Color Pickers */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Start Color</label>
                <Button variant="outline" size="sm" onClick={() => setActiveColorPicker(activeColorPicker === 'start' ? null : 'start')}>
                  {activeColorPicker === 'start' ? 'Hide Picker' : 'Show Picker'}
                </Button>
              </div>
              <div className="flex gap-2">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                  style={{ backgroundColor: startColor }}
                  onClick={() => setActiveColorPicker('start')}
                />
                <input
                  type="text"
                  value={startColor}
                  onChange={e => setStartColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                />
              </div>
              {activeColorPicker === 'start' && (
                <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg flex justify-center">
                  <HexColorPicker color={startColor} onChange={setStartColor} />
                </div>
              )}
            </div>

            <Button variant="outline" onClick={handleSwapColors} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Swap Colors
            </Button>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">End Color</label>
                <Button variant="outline" size="sm" onClick={() => setActiveColorPicker(activeColorPicker === 'end' ? null : 'end')}>
                  {activeColorPicker === 'end' ? 'Hide Picker' : 'Show Picker'}
                </Button>
              </div>
              <div className="flex gap-2">
                <div className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer" style={{ backgroundColor: endColor }} onClick={() => setActiveColorPicker('end')} />
                <input
                  type="text"
                  value={endColor}
                  onChange={e => setEndColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                />
              </div>
              {activeColorPicker === 'end' && (
                <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg flex justify-center">
                  <HexColorPicker color={endColor} onChange={setEndColor} />
                </div>
              )}
            </div>
          </div>

          {/* Steps Control */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Steps: {steps}</label>
            <input type="range" min="2" max="10" value={steps} onChange={e => setSteps(Number(e.target.value))} className="w-full" />
          </div>

          {/* Direction Control */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Direction</label>
            <div className="grid grid-cols-3 gap-2">
              {directions.map(dir => (
                <Button key={dir.value} variant={direction === dir.value ? 'default' : 'outline'} onClick={() => setDirection(dir.value)} className="text-xs">
                  {dir.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Steps Preview */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Color Steps</label>
            <div className="flex gap-1">
              {gradientColors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1 h-16 rounded transition-transform hover:scale-105 cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={color}
                  onClick={() => handleCopy(color, `step-${index}`)}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Click any color to copy</p>
          </div>
        </div>

        {/* Preview & Code Section */}
        <div className="space-y-6">
          {/* Gradient Preview */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Preview</label>
            <div className="h-64 rounded-xl shadow-lg" style={{ background: cssGradient }} />
          </div>

          {/* CSS Code */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">CSS Code</label>
            <div className="relative">
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{`background: ${cssGradient};`}</code>
              </pre>
              <Button variant="outline" size="sm" onClick={() => handleCopy(`background: ${cssGradient};`, 'css')} className="absolute top-2 right-2">
                {copiedField === 'css' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Tailwind Code */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Tailwind CSS (with arbitrary values)</label>
            <div className="relative">
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono break-all whitespace-pre-wrap">
                <code>{tailwindGradient}</code>
              </pre>
              <Button variant="outline" size="sm" onClick={() => handleCopy(tailwindGradient, 'tailwind')} className="absolute top-2 right-2">
                {copiedField === 'tailwind' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Quick Presets</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setStartColor('#667eea');
                  setEndColor('#764ba2');
                }}
                className="p-2 rounded text-xs text-white font-medium"
                style={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }}
              >
                Purple Dream
              </button>
              <button
                onClick={() => {
                  setStartColor('#f093fb');
                  setEndColor('#f5576c');
                }}
                className="p-2 rounded text-xs text-white font-medium"
                style={{ background: 'linear-gradient(to right, #f093fb, #f5576c)' }}
              >
                Pink Passion
              </button>
              <button
                onClick={() => {
                  setStartColor('#4facfe');
                  setEndColor('#00f2fe');
                }}
                className="p-2 rounded text-xs text-white font-medium"
                style={{ background: 'linear-gradient(to right, #4facfe, #00f2fe)' }}
              >
                Ocean Blue
              </button>
              <button
                onClick={() => {
                  setStartColor('#43e97b');
                  setEndColor('#38f9d7');
                }}
                className="p-2 rounded text-xs text-white font-medium"
                style={{ background: 'linear-gradient(to right, #43e97b, #38f9d7)' }}
              >
                Fresh Mint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
