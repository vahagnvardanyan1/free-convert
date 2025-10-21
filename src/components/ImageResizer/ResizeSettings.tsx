import { Settings, Sliders, Maximize2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ToolSection } from '@/components/tooling/ToolSection';
import { presets } from '@/hooks/useImageResize';

import type { PresetSize } from '@/hooks/useImageResize';

interface ResizeSettingsProps {
  resizeMode: 'percentage' | 'pixels' | 'preset';
  percentage: number;
  customWidth: number;
  customHeight: number;
  maintainAspectRatio: boolean;
  selectedPreset: PresetSize | null;
  outputDimensions: { width: number; height: number } | null;
  onResizeModeChange: (mode: 'percentage' | 'pixels' | 'preset') => void;
  onPercentageChange: (value: number) => void;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onMaintainAspectChange: (value: boolean) => void;
  onPresetSelect: (preset: PresetSize) => void;
}

export const ResizeSettings = ({
  resizeMode,
  percentage,
  customWidth,
  customHeight,
  maintainAspectRatio,
  selectedPreset,
  outputDimensions,
  onResizeModeChange,
  onPercentageChange,
  onWidthChange,
  onHeightChange,
  onMaintainAspectChange,
  onPresetSelect,
}: ResizeSettingsProps) => {
  const t = useTranslations('resizer');

  return (
    <ToolSection title={`2. ${t('resizeSettings')}`}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('resizeMode')}:</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => onResizeModeChange('percentage')}
              className={`p-3 rounded-lg border-2 transition-all ${resizeMode === 'percentage' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Settings className="mx-auto mb-1" size={20} />
              <p className="text-sm font-medium">{t('percentage')}</p>
            </button>
            <button
              onClick={() => onResizeModeChange('pixels')}
              className={`p-3 rounded-lg border-2 transition-all ${resizeMode === 'pixels' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Sliders className="mx-auto mb-1" size={20} />
              <p className="text-sm font-medium">{t('pixels')}</p>
            </button>
            <button
              onClick={() => onResizeModeChange('preset')}
              className={`p-3 rounded-lg border-2 transition-all ${resizeMode === 'preset' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Maximize2 className="mx-auto mb-1" size={20} />
              <p className="text-sm font-medium">{t('preset')}</p>
            </button>
          </div>
        </div>

        {resizeMode === 'percentage' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('scale')}: {percentage}%
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={percentage}
              onChange={e => onPercentageChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10%</span>
              <span>200%</span>
            </div>
          </div>
        )}

        {resizeMode === 'pixels' && (
          <div className="space-y-3">
            <div className="flex items-center mb-2">
              <input type="checkbox" checked={maintainAspectRatio} onChange={e => onMaintainAspectChange(e.target.checked)} className="w-4 h-4 text-blue-600 rounded mr-2" />
              <label className="text-sm font-medium text-gray-700">{t('maintainAspect')}</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('width')} (px)</label>
                <input type="number" value={customWidth} onChange={e => onWidthChange(parseInt(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg" min="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('height')} (px)</label>
                <input type="number" value={customHeight} onChange={e => onHeightChange(parseInt(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg" min="1" />
              </div>
            </div>
          </div>
        )}

        {resizeMode === 'preset' && (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(presets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => onPresetSelect(key as PresetSize)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${selectedPreset === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <p className="font-medium text-gray-900">{preset.label}</p>
                <p className="text-xs text-gray-500">
                  {preset.width} × {preset.height}
                </p>
              </button>
            ))}
          </div>
        )}

        {outputDimensions && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900">
              {t('outputSize')}: {outputDimensions.width} × {outputDimensions.height}px
            </p>
          </div>
        )}
      </div>
    </ToolSection>
  );
};
