import QRCodeSVG from 'react-qr-code';
import { Download, ChevronUp } from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '../Card';

interface QRPreviewProps {
  qrValue: string;
  qrSize: number;
  fgColor: string;
  bgColor: string;
  onDownload: (format: 'svg' | 'png') => void;
  onScrollToControls?: () => void;
}

export const QRPreview = ({ qrValue, qrSize, fgColor, bgColor, onDownload, onScrollToControls }: QRPreviewProps) => {
  return (
    <div className="space-y-6">
      {onScrollToControls && (
        <div className="lg:hidden mb-4">
          <Button onClick={onScrollToControls} variant="outline" className="w-full" size="lg">
            <ChevronUp className="mr-2" size={20} />
            Back to Edit
          </Button>
        </div>
      )}

      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Preview</h2>
        <div className="flex justify-center items-center bg-gray-50 rounded-lg p-8">
          {qrValue ? (
            <div id="qr-code-svg">
              <QRCodeSVG value={qrValue} size={qrSize} fgColor={fgColor} bgColor={bgColor} level="H" />
            </div>
          ) : (
            <p className="text-gray-400">Enter content to generate QR code</p>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Download QR Code</h2>
        <div className="space-y-3">
          <Button onClick={() => onDownload('png')} className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
            <Download className="mr-2" size={20} />
            Download PNG
          </Button>
          <Button onClick={() => onDownload('svg')} variant="outline" className="w-full" size="lg">
            <Download className="mr-2" size={20} />
            Download SVG
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">QR codes are generated locally in your browser. Your data is private and secure.</p>
      </Card>
    </div>
  );
};
