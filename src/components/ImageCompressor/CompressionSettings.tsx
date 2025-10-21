import { Info, Zap, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ToolSection } from '@/components/tooling/ToolSection';

import type { CompressionTarget } from '@/hooks/useImageCompression';

interface CompressionSettingsProps {
  compressionTarget: CompressionTarget;
  quality: number;
  targetFileSize: number;
  onCompressionTargetChange: (target: CompressionTarget) => void;
  onQualityChange: (quality: number) => void;
  onTargetFileSizeChange: (size: number) => void;
}

const TARGET_SIZES = [20, 50, 100, 200] as const;

export const CompressionSettings = ({ compressionTarget, quality, targetFileSize, onCompressionTargetChange, onQualityChange, onTargetFileSizeChange }: CompressionSettingsProps) => {
  const t = useTranslations('compressor');

  return (
    <ToolSection title={`2. ${t('compressionSettings')}`}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('compressionMode')}:</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => onCompressionTargetChange('quality')}
              className={`p-3 rounded-lg border-2 transition-all ${compressionTarget === 'quality' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Settings className="mx-auto mb-1" size={20} />
              <p className="text-sm font-medium">{t('byQuality')}</p>
            </button>
            <button
              onClick={() => onCompressionTargetChange('filesize')}
              className={`p-3 rounded-lg border-2 transition-all ${compressionTarget === 'filesize' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Zap className="mx-auto mb-1" size={20} />
              <p className="text-sm font-medium">{t('byFileSize')}</p>
            </button>
            <button
              onClick={() => onCompressionTargetChange('custom')}
              className={`p-3 rounded-lg border-2 transition-all ${compressionTarget === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Info className="mx-auto mb-1" size={20} />
              <p className="text-sm font-medium">{t('custom')}</p>
            </button>
          </div>
        </div>

        {compressionTarget === 'quality' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('quality')}: {quality}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={e => onQualityChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{t('lowerQuality')}</span>
              <span>{t('higherQuality')}</span>
            </div>
          </div>
        )}

        {compressionTarget === 'filesize' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('targetFileSize')}:</label>
            <div className="flex space-x-4">
              {TARGET_SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => onTargetFileSizeChange(size)}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${targetFileSize === size ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  {size} KB
                </button>
              ))}
            </div>
            <div className="mt-3">
              <input
                type="number"
                value={targetFileSize}
                onChange={e => onTargetFileSizeChange(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                min="10"
                max="5000"
              />
              <p className="text-xs text-gray-500 mt-1">{t('customSizeKb')}</p>
            </div>
          </div>
        )}

        {compressionTarget === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('quality')}: {quality}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={e => onQualityChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}
      </div>
    </ToolSection>
  );
};
