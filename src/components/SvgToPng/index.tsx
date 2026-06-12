/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { ToolShell, ToolTitleBanner } from '@/components/tooling/ToolShell';
import { ToolSection } from '@/components/tooling/ToolSection';
import { FileUploadZone } from '@/components/FileUploadZone';
import { useToast } from '@/components/ui/toast';
import { useUploadZone } from '@/hooks/useUploadZone';

const SCALES = [1, 2, 3, 4] as const;
const DEFAULT_SVG_SIZE = 512;

const isSvgFile = (file: File) => file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');

export const SvgToPng = () => {
  const t = useTranslations('svgToPng');
  const tCommon = useTranslations('common');
  const toast = useToast();

  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [baseSize, setBaseSize] = useState<{ width: number; height: number } | null>(null);
  const [scale, setScale] = useState<number>(2);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFilesSelect = (files: File[]) => {
    const file = files[0];
    if (!file || !isSvgFile(file)) {
      toast.error(t('invalidSvg'));
      return;
    }
    if (svgUrl) URL.revokeObjectURL(svgUrl);

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setBaseSize({
        width: img.naturalWidth || DEFAULT_SVG_SIZE,
        height: img.naturalHeight || DEFAULT_SVG_SIZE,
      });
      setSvgUrl(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      toast.error(t('invalidSvg'));
    };
    img.src = url;
  };

  const { isDragOver, selectedFiles, fileInputRef, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, triggerFileInput, clearFiles } = useUploadZone({
    onFilesSelect: handleFilesSelect,
    accept: 'image/svg+xml,.svg',
    multiple: false,
  });

  const handleReset = () => {
    if (svgUrl) URL.revokeObjectURL(svgUrl);
    setSvgUrl(null);
    setBaseSize(null);
    clearFiles();
  };

  const outputWidth = baseSize ? Math.round(baseSize.width * scale) : 0;
  const outputHeight = baseSize ? Math.round(baseSize.height * scale) : 0;

  const handleDownload = () => {
    const file = selectedFiles[0];
    if (!file || !svgUrl || !baseSize) return;

    setIsDownloading(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsDownloading(false);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${file.name.replace(/\.svg$/i, '')}.png`;
          link.click();
          URL.revokeObjectURL(link.href);
        }
        setIsDownloading(false);
      }, 'image/png');
    };
    img.onerror = () => {
      toast.error(t('invalidSvg'));
      setIsDownloading(false);
    };
    img.src = svgUrl;
  };

  return (
    <ToolShell header={{ backText: tCommon('backToHome') }}>
      <div className="space-y-6">
        <ToolSection title={`1. ${t('uploadSvg')}`}>
          <FileUploadZone
            isDragOver={isDragOver}
            selectedFiles={selectedFiles}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            fileInputRef={fileInputRef}
            onFileSelect={handleFileSelect}
            onClear={handleReset}
            accept="image/svg+xml,.svg"
            showPreview
            dragOverText={tCommon('dropFileHere')}
            defaultText={t('dragDropSvg')}
            browseText={tCommon('orClickBrowse')}
            releaseText={tCommon('releaseToUpload')}
            chooseFileText={tCommon('chooseFile')}
            removeText={tCommon('remove')}
            className={selectedFiles.length === 0 ? 'min-h-[320px] sm:min-h-[400px] flex flex-col items-center justify-center' : ''}
          />
        </ToolSection>

        {svgUrl && baseSize && (
          <ToolSection title={`2. ${t('convertAndDownload')}`}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="text-sm font-medium text-gray-700">{t('scale')}:</span>
              {SCALES.map(s => (
                <Button key={s} variant={scale === s ? 'default' : 'outline'} size="sm" onClick={() => setScale(s)}>
                  {s}x
                </Button>
              ))}
              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                {t('outputSize')}: {outputWidth} × {outputHeight}px
              </span>
            </div>

            <div
              className="flex items-center justify-center p-6 rounded-xl overflow-hidden mb-6 border border-gray-200"
              style={{
                backgroundImage:
                  'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              }}
            >
              <img src={svgUrl} alt={t('preview')} className="max-w-full max-h-[420px]" />
            </div>

            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              <Download className="mr-2" size={20} />
              {t('download')}
            </Button>
          </ToolSection>
        )}

        <ToolTitleBanner title={t('title')} description={t('description')} />
      </div>
    </ToolShell>
  );
};
