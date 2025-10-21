import { Download, RotateCcw, RotateCw, FlipHorizontal, FlipVertical, ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { Card } from '@/components/Card';
import { ToolSection, ToolSidebar } from '@/components/tooling/ToolSection';
import { ASPECT_RATIOS } from '@/config/cropperConfig';

interface CropperControlsProps {
  aspectRatio: number | undefined;
  isCropping: boolean;
  onAspectRatioChange: (ratio: number | undefined) => void;
  onCrop: () => void;
  onReset: () => void;
  onRotate: (degrees: number) => void;
  onFlip: (direction: 'horizontal' | 'vertical') => void;
  onZoom: (ratio: number) => void;
}

export const CropperControls = ({ aspectRatio, isCropping, onAspectRatioChange, onCrop, onReset, onRotate, onFlip, onZoom }: CropperControlsProps) => {
  const tCrop = useTranslations('cropper');
  const tCommon = useTranslations('common');

  return (
    <ToolSidebar className="hidden lg:block">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <div className="flex flex-col gap-2">
          <Button onClick={onCrop} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" disabled={isCropping}>
            <Download className="mr-2" size={18} />
            {isCropping ? tCrop('cropping') : tCrop('cropDownload')}
          </Button>
          <Button onClick={onReset} variant="outline" className="border-2">
            <RotateCcw className="mr-2" size={16} />
            {tCommon('reset')}
          </Button>
        </div>
      </Card>

      <ToolSection title={tCrop('aspectRatio')}>
        <div className="grid grid-cols-3 gap-2">
          {ASPECT_RATIOS.map(ratio => (
            <button
              key={ratio.label}
              onClick={() => onAspectRatioChange(ratio.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${aspectRatio === ratio.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {ratio.label}
            </button>
          ))}
        </div>
      </ToolSection>

      <ToolSection title={tCrop('zoom')}>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => onZoom(0.1)} variant="outline" className="w-full" size="sm">
            <ZoomIn className="mr-1" size={16} />
            {tCrop('in')}
          </Button>
          <Button onClick={() => onZoom(-0.1)} variant="outline" className="w-full" size="sm">
            <ZoomOut className="mr-1" size={16} />
            {tCrop('out')}
          </Button>
        </div>
      </ToolSection>

      <ToolSection title={tCrop('transform')}>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => onRotate(-90)} variant="outline" className="w-full" size="sm">
            <RotateCcw className="mr-1" size={16} />
            {tCrop('left')}
          </Button>
          <Button onClick={() => onRotate(90)} variant="outline" className="w-full" size="sm">
            <RotateCw className="mr-1" size={16} />
            {tCrop('right')}
          </Button>
          <Button onClick={() => onFlip('horizontal')} variant="outline" className="w-full" size="sm">
            <FlipHorizontal className="mr-1" size={16} />
            {tCrop('hFlip')}
          </Button>
          <Button onClick={() => onFlip('vertical')} variant="outline" className="w-full" size="sm">
            <FlipVertical className="mr-1" size={16} />
            {tCrop('vFlip')}
          </Button>
        </div>
      </ToolSection>
    </ToolSidebar>
  );
};
