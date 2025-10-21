import { Card } from '../Card';

interface QRCustomizationProps {
  qrSize: number;
  fgColor: string;
  bgColor: string;
  onSizeChange: (size: number) => void;
  onFgColorChange: (color: string) => void;
  onBgColorChange: (color: string) => void;
}

export const QRCustomization = ({ qrSize, fgColor, bgColor, onSizeChange, onFgColorChange, onBgColorChange }: QRCustomizationProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Customize QR Code</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Size: {qrSize}px</label>
          <input type="range" min="128" max="512" step="32" value={qrSize} onChange={e => onSizeChange(Number(e.target.value))} className="w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foreground Color</label>
            <div className="flex items-center space-x-2">
              <input type="color" value={fgColor} onChange={e => onFgColorChange(e.target.value)} className="h-10 w-full rounded cursor-pointer" />
              <input type="text" value={fgColor} onChange={e => onFgColorChange(e.target.value)} className="px-2 py-1 border border-gray-300 rounded text-sm w-24" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
            <div className="flex items-center space-x-2">
              <input type="color" value={bgColor} onChange={e => onBgColorChange(e.target.value)} className="h-10 w-full rounded cursor-pointer" />
              <input type="text" value={bgColor} onChange={e => onBgColorChange(e.target.value)} className="px-2 py-1 border border-gray-300 rounded text-sm w-24" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
