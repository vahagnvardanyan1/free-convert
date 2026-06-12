/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Download, RotateCcw, RotateCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { ToolShell, ToolTitleBanner } from '@/components/tooling/ToolShell';
import { ToolSection } from '@/components/tooling/ToolSection';
import { FileUploadZone } from '@/components/FileUploadZone';
import { useToast } from '@/components/ui/toast';
import { useUploadZone } from '@/hooks/useUploadZone';
import { validateImageFile } from '@/utils/fileValidation';

type Rotation = 0 | 90 | 180 | 270;

const OUTPUT_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export const ImageRotator = () => {
  const t = useTranslations('rotator');
  const tCommon = useTranslations('common');
  const toast = useToast();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState<Rotation>(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFilesSelect = (files: File[]) => {
    const file = files[0];
    if (!file || !validateImageFile(file)) {
      toast.error(tCommon('selectValidImage'));
      return;
    }
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setRotation(0);
  };

  const { isDragOver, selectedFiles, fileInputRef, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, triggerFileInput, clearFiles } = useUploadZone({
    onFilesSelect: handleFilesSelect,
    accept: 'image/*',
    multiple: false,
  });

  const handleReset = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setRotation(0);
    clearFiles();
  };

  const rotateLeft = () => setRotation(prev => ((prev + 270) % 360) as Rotation);
  const rotateRight = () => setRotation(prev => ((prev + 90) % 360) as Rotation);

  const handleDownload = () => {
    const file = selectedFiles[0];
    if (!file || !imageUrl) return;

    setIsDownloading(true);
    const img = new Image();
    img.onload = () => {
      const swapped = rotation === 90 || rotation === 270;
      const canvas = document.createElement('canvas');
      canvas.width = swapped ? img.naturalHeight : img.naturalWidth;
      canvas.height = swapped ? img.naturalWidth : img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsDownloading(false);
        return;
      }
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

      const mimeType = OUTPUT_MIME_TYPES.includes(file.type) ? file.type : 'image/png';
      const extension = mimeType.split('/')[1].replace('jpeg', 'jpg');
      canvas.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `rotated-${file.name.replace(/\.[^/.]+$/, '')}.${extension}`;
          link.click();
          URL.revokeObjectURL(link.href);
        }
        setIsDownloading(false);
      }, mimeType);
    };
    img.onerror = () => {
      toast.error(tCommon('selectValidImage'));
      setIsDownloading(false);
    };
    img.src = imageUrl;
  };

  return (
    <ToolShell header={{ backText: tCommon('backToHome') }}>
      <div className="space-y-6">
        <ToolSection title={`1. ${t('uploadImage')}`}>
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
            accept="image/*"
            showPreview
            dragOverText={tCommon('dropFileHere')}
            defaultText={tCommon('dragDropHere')}
            browseText={tCommon('orClickBrowse')}
            releaseText={tCommon('releaseToUpload')}
            chooseFileText={tCommon('chooseFile')}
            removeText={tCommon('remove')}
            className={selectedFiles.length === 0 ? 'min-h-[320px] sm:min-h-[400px] flex flex-col items-center justify-center' : ''}
          />
        </ToolSection>

        {imageUrl && (
          <ToolSection title={`2. ${t('rotateAndDownload')}`}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Button variant="outline" onClick={rotateLeft} className="flex items-center gap-2">
                <RotateCcw size={18} />
                {t('rotateLeft')}
              </Button>
              <Button variant="outline" onClick={rotateRight} className="flex items-center gap-2">
                <RotateCw size={18} />
                {t('rotateRight')}
              </Button>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">{rotation}°</span>
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-xl overflow-hidden mb-6">
              <img src={imageUrl} alt={t('preview')} className="max-w-full max-h-[420px] rounded-lg shadow transition-transform duration-300" style={{ transform: `rotate(${rotation}deg)` }} />
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
