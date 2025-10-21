import { useTranslations } from 'next-intl';

import { Card } from '../Card';
import { QR_CODE_TYPES } from '@/config/qrCodeConfig';

import type { QRType } from '@/hooks/useQRCode';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onTypeChange: (type: QRType) => void;
}

export const QRTypeSelector = ({ selectedType, onTypeChange }: QRTypeSelectorProps) => {
  const t = useTranslations('qrcode');

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{t('selectType')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QR_CODE_TYPES.map(({ type, label, icon }) => {
          const Icon = icon;
          return (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`p-4 rounded-lg border-2 transition-all ${selectedType === type ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
            >
              <Icon className="mx-auto mb-2" size={24} />
              <p className="text-sm font-medium">{label}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
