import { Download, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { ToolSection } from '@/components/tooling/ToolSection';
import { formatFileSize } from '@/utils/imageProcessing';

interface CompressionResultProps {
  compressedUrl: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  onDownload: () => void;
  onReset: () => void;
}

export const CompressionResult = ({ compressedUrl, originalSize, compressedSize, compressionRatio, onDownload, onReset }: CompressionResultProps) => {
  const t = useTranslations('compressor');

  return (
    <ToolSection className="bg-gradient-to-r from-green-50 to-blue-50">
      <div className="flex items-center mb-4">
        <CheckCircle className="text-green-600 mr-2" size={24} />
        <h2 className="text-xl font-bold text-gray-900">{t('compressionComplete')}</h2>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-white rounded-lg">
          <p className="text-sm text-gray-600">{t('originalSize')}</p>
          <p className="text-lg font-bold text-gray-900">{formatFileSize(originalSize)}</p>
        </div>
        <div className="text-center p-3 bg-white rounded-lg">
          <p className="text-sm text-gray-600">{t('compressedSize')}</p>
          <p className="text-lg font-bold text-green-600">{formatFileSize(compressedSize)}</p>
        </div>
        <div className="text-center p-3 bg-white rounded-lg">
          <p className="text-sm text-gray-600">{t('savedSpace')}</p>
          <p className="text-lg font-bold text-blue-600">{compressionRatio}%</p>
        </div>
      </div>

      <img src={compressedUrl} alt="Compressed" className="max-w-full max-h-96 mx-auto rounded-lg mb-4" />

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={onDownload} className="w-full bg-green-600 hover:bg-green-700 text-white">
          <Download className="mr-2" size={20} />
          {t('downloadCompressed')}
        </Button>
        <Button onClick={onReset} variant="outline" className="w-full">
          {t('compressAnother')}
        </Button>
      </div>
    </ToolSection>
  );
};
