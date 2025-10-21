'use client';

import { useState, useEffect, useRef } from 'react';
import { Eye } from 'lucide-react';

import { QRTypeSelector } from './QRTypeSelector';
import { QRInputFields } from './QRInputFields';
import { QRCustomization } from './QRCustomization';
import { QRPreview } from './QRPreview';
import { useQRCode } from '@/hooks/useQRCode';
import { downloadQRCode } from '@/utils/qrDownload';

export const QRCodeGenerator = () => {
  const { qrType, qrValue, qrData, qrSize, fgColor, bgColor, setQrSize, setFgColor, setBgColor, handleTypeChange, updateQRData } = useQRCode();

  const [showScrollButton, setShowScrollButton] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const scrollToPreview = () => {
    previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setShowScrollButton(false);
  };

  const scrollToControls = () => {
    controlsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleUpdateQRData = (field: string, value: string | { [key: string]: string }) => {
    updateQRData(field, value);
    if (window.innerWidth < 1024) {
      setTimeout(scrollToPreview, 300);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024 || !previewRef.current || !controlsRef.current) {
        setShowScrollButton(false);
        return;
      }
      const previewTop = previewRef.current.getBoundingClientRect().top;
      const controlsBottom = controlsRef.current.getBoundingClientRect().bottom;
      setShowScrollButton(previewTop > window.innerHeight && controlsBottom < window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleDownloadQR = (format: 'svg' | 'png') => downloadQRCode({ format, qrSize, bgColor });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Free QR Code Generator</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Create custom QR codes for URLs, text, WiFi, contact cards, and more. Customize colors, download as PNG or SVG. 100% free and secure.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div ref={controlsRef} className="space-y-6">
          <QRTypeSelector selectedType={qrType} onTypeChange={handleTypeChange} />
          <QRInputFields qrType={qrType} qrData={qrData} onUpdate={handleUpdateQRData} />
          <QRCustomization qrSize={qrSize} fgColor={fgColor} bgColor={bgColor} onSizeChange={setQrSize} onFgColorChange={setFgColor} onBgColorChange={setBgColor} />
        </div>

        <div ref={previewRef}>
          <QRPreview qrValue={qrValue} qrSize={qrSize} fgColor={fgColor} bgColor={bgColor} onDownload={handleDownloadQR} onScrollToControls={scrollToControls} />
        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToPreview}
          className="lg:hidden fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 flex items-center space-x-2 animate-bounce"
          aria-label="View QR Code"
        >
          <Eye size={20} />
          <span className="font-semibold">View QR Code</span>
        </button>
      )}
    </div>
  );
};
