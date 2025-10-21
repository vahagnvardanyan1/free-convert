import { Download, Move, RotateCcw, RotateCw, FlipHorizontal, FlipVertical, ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { Card } from '@/components/Card';
import { ASPECT_RATIOS } from '@/config/cropperConfig';

interface MobileControlsProps {
  isBottomSheetOpen: boolean;
  aspectRatio: number | undefined;
  isCropping: boolean;
  onOpenSheet: () => void;
  onCloseSheet: () => void;
  onAspectRatioChange: (ratio: number | undefined) => void;
  onCrop: () => void;
  onReset: () => void;
  onRotate: (degrees: number) => void;
  onFlip: (direction: 'horizontal' | 'vertical') => void;
  onZoom: (ratio: number) => void;
}

export const MobileControls = ({ isBottomSheetOpen, aspectRatio, isCropping, onOpenSheet, onCloseSheet, onAspectRatioChange, onCrop, onReset, onRotate, onFlip, onZoom }: MobileControlsProps) => {
  const tCrop = useTranslations('cropper');
  const tCommon = useTranslations('common');

  return (
    <div className="lg:hidden">
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        <p className="font-medium mb-1">📱 {tCrop('mobileControls')}</p>
        <p className="text-xs">{tCrop('mobileHint')}</p>
      </div>

      <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3">
        <Button
          onClick={onCrop}
          className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-0"
          disabled={isCropping}
        >
          <Download size={24} />
        </Button>
        <Button onClick={onOpenSheet} className="h-14 w-14 rounded-full shadow-2xl bg-white hover:bg-gray-50 text-gray-900 p-0 border-2 border-gray-200">
          <Move size={24} />
        </Button>
      </div>

      {isBottomSheetOpen && <div className="fixed inset-0 bg-transparent z-50 transition-opacity" onClick={onCloseSheet} />}

      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ease-out ${isBottomSheetOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{tCrop('cropControls')}</h3>
            <button onClick={onCloseSheet} className="text-gray-500 hover:text-gray-700 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    onCrop();
                    onCloseSheet();
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                  disabled={isCropping}
                >
                  <Download className="mr-2" size={18} />
                  {isCropping ? tCrop('cropping') : tCrop('download')}
                </Button>
                <Button onClick={onReset} variant="outline" className="flex-1 border-2">
                  <RotateCcw className="mr-2" size={16} />
                  {tCommon('reset')}
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">{tCrop('aspectRatio')}</h4>
              <div className="grid grid-cols-3 gap-2">
                {ASPECT_RATIOS.map(ratio => (
                  <button
                    key={ratio.label}
                    onClick={() => {
                      onAspectRatioChange(ratio.value);
                      setTimeout(onCloseSheet, 300);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${aspectRatio === ratio.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">{tCrop('zoom')}</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => onZoom(0.1)} variant="outline" size="sm">
                  <ZoomIn className="mr-1" size={16} />
                  {tCrop('zoomIn')}
                </Button>
                <Button onClick={() => onZoom(-0.1)} variant="outline" size="sm">
                  <ZoomOut className="mr-1" size={16} />
                  {tCrop('zoomOut')}
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">{tCrop('transform')}</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => {
                    onRotate(-90);
                    setTimeout(onCloseSheet, 300);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="mr-1" size={16} />
                  {tCrop('rotateLeft')}
                </Button>
                <Button
                  onClick={() => {
                    onRotate(90);
                    setTimeout(onCloseSheet, 300);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <RotateCw className="mr-1" size={16} />
                  {tCrop('rotateRight')}
                </Button>
                <Button
                  onClick={() => {
                    onFlip('horizontal');
                    setTimeout(onCloseSheet, 300);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <FlipHorizontal className="mr-1" size={16} />
                  {tCrop('flipH')}
                </Button>
                <Button
                  onClick={() => {
                    onFlip('vertical');
                    setTimeout(onCloseSheet, 300);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <FlipVertical className="mr-1" size={16} />
                  {tCrop('flipV')}
                </Button>
              </div>
            </Card>

            <Button onClick={onCloseSheet} variant="outline" className="w-full mt-4">
              {tCrop('closeControls')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
