import { useState } from 'react';

import { SITE_URL } from '@/config/constants';

export type QRType = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'vcard';

export interface QRData {
  url?: string;
  text?: string;
  email?: string;
  phone?: string;
  sms?: { phone: string; message: string };
  wifi?: { ssid: string; password: string; encryption: string };
  location?: { lat: string; lng: string };
  vcard?: { name: string; phone: string; email: string; organization: string };
}

interface UseQRCodeReturn {
  qrType: QRType;
  qrValue: string;
  qrData: QRData;
  qrSize: number;
  fgColor: string;
  bgColor: string;
  setQrType: (type: QRType) => void;
  setQrSize: (size: number) => void;
  setFgColor: (color: string) => void;
  setBgColor: (color: string) => void;
  handleTypeChange: (type: QRType) => void;
  updateQRData: (field: string, value: string | { [key: string]: string }) => void;
  generateQRValue: (type: QRType, data: QRData) => string;
}

export const useQRCode = (): UseQRCodeReturn => {
  const [qrType, setQrType] = useState<QRType>('url');
  const [qrValue, setQrValue] = useState(SITE_URL);
  const [qrData, setQrData] = useState<QRData>({ url: SITE_URL });
  const [qrSize, setQrSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  const generateQRValue = (type: QRType, data: QRData): string => {
    switch (type) {
      case 'url':
        return data.url || '';
      case 'text':
        return data.text || '';
      case 'email':
        return `mailto:${data.email || ''}`;
      case 'phone':
        return `tel:${data.phone || ''}`;
      case 'sms':
        return `sms:${data.sms?.phone || ''}${data.sms?.message ? `?body=${encodeURIComponent(data.sms.message)}` : ''}`;
      case 'wifi':
        return `WIFI:T:${data.wifi?.encryption || 'WPA'};S:${data.wifi?.ssid || ''};P:${data.wifi?.password || ''};;`;
      case 'location':
        return `geo:${data.location?.lat || '0'},${data.location?.lng || '0'}`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${data.vcard?.name || ''}\nTEL:${data.vcard?.phone || ''}\nEMAIL:${data.vcard?.email || ''}\nORG:${data.vcard?.organization || ''}\nEND:VCARD`;
      default:
        return '';
    }
  };

  const handleTypeChange = (type: QRType) => {
    setQrType(type);
    const newData: QRData = {};

    switch (type) {
      case 'url':
        newData.url = SITE_URL;
        break;
      case 'text':
        newData.text = 'Hello World!';
        break;
      case 'email':
        newData.email = 'example@email.com';
        break;
      case 'phone':
        newData.phone = '+1234567890';
        break;
      case 'sms':
        newData.sms = { phone: '+1234567890', message: 'Hello!' };
        break;
      case 'wifi':
        newData.wifi = { ssid: 'MyNetwork', password: 'password123', encryption: 'WPA' };
        break;
      case 'location':
        newData.location = { lat: '40.7128', lng: '-74.0060' };
        break;
      case 'vcard':
        newData.vcard = { name: 'John Doe', phone: '+1234567890', email: 'john@example.com', organization: 'Company Inc.' };
        break;
    }

    setQrData(newData);
    setQrValue(generateQRValue(type, newData));
  };

  const updateQRData = (field: string, value: string | { [key: string]: string }) => {
    const newData = { ...qrData, [field]: value };
    setQrData(newData);
    setQrValue(generateQRValue(qrType, newData));
  };

  return {
    qrType,
    qrValue,
    qrData,
    qrSize,
    fgColor,
    bgColor,
    setQrType,
    setQrSize,
    setFgColor,
    setBgColor,
    handleTypeChange,
    updateQRData,
    generateQRValue,
  };
};
