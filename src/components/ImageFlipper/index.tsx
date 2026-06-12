/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Download, FlipHorizontal2, FlipVertical2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { ToolShell, ToolTitleBanner } from '@/components/tooling/ToolShell';
import { ToolSection } from '@/components/tooling/ToolSection';
import { FileUploadZone } from '@/components/FileUploadZone';
import { useToast } from '@/components/ui/toast';
import { useUploadZone } from '@/hooks/useUploadZone';
import { validateImageFile } from '@/utils/fileValidation';

const OUTPUT_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export const ImageFlipper = () => {
  const t = useTranslations('flipper');
  const tCommon = useTranslations('common');
  const toast = useToast();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFilesSelect = (files: File[]) => {
    const file = files[0];
    if (!file || !validateImageFile(file)) {
      toast.error(tCommon('selectValidImage'));
      return;
    }
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setFlipH(false);
    setFlipV(false);
  };

  const { isDragOver, selectedFiles, fileInputRef, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, triggerFileInput, clearFiles } = useUploadZone({
    onFilesSelect: handleFilesSelect,
    accept: 'image/*',
    multiple: false,
  });

  const handleReset = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setFlipH(false);
    setFlipV(false);
    clearFiles();
  };

  const handleDownload = () => {
    const file = selectedFiles[0];
    if (!file || !imageUrl) return;

    setIsDownloading(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsDownloading(false);
        return;
      }
      ctx.translate(flipH ? canvas.width : 0, flipV ? canvas.height : 0);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, 0, 0);

      const mimeType = OUTPUT_MIME_TYPES.includes(file.type) ? file.type : 'image/png';
      const extension = mimeType.split('/')[1].replace('jpeg', 'jpg');
      canvas.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `flipped-${file.name.replace(/\.[^/.]+$/, '')}.${extension}`;
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
          <ToolSection title={`2. ${t('flipAndDownload')}`}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Button variant={flipH ? 'default' : 'outline'} onClick={() => setFlipH(prev => !prev)} className="flex items-center gap-2">
                <FlipHorizontal2 size={18} />
                {t('flipHorizontal')}
              </Button>
              <Button variant={flipV ? 'default' : 'outline'} onClick={() => setFlipV(prev => !prev)} className="flex items-center gap-2">
                <FlipVertical2 size={18} />
                {t('flipVertical')}
              </Button>
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-xl overflow-hidden mb-6">
              <img
                src={imageUrl}
                alt={t('preview')}
                className="max-w-full max-h-[420px] rounded-lg shadow transition-transform duration-300"
                style={{ transform: `scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})` }}
              />
            </div>

            <Button
              onClick={handleDownload}
              disabled={isDownloading || (!flipH && !flipV)}
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
