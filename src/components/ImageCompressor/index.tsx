'use client';

import { Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { ToolShell, ToolGrid } from '@/components/tooling/ToolShell';
import { ToolSection } from '@/components/tooling/ToolSection';
import { FileUploadZone } from '@/components/FileUploadZone';
import { CompressionSettings } from './CompressionSettings';
import { CompressionResult } from './CompressionResult';
import { CompressorSidebar } from './CompressorSidebar';
import { useToast } from '@/components/ui/toast';
import { useUploadZone } from '@/hooks/useUploadZone';
import { useImageCompression } from '@/hooks/useImageCompression';
import { validateImageFile } from '@/utils/fileValidation';
import { getCompressionRatio } from '@/utils/imageProcessing';

export const ImageCompressor = () => {
  const t = useTranslations('compressor');
  const tCommon = useTranslations('common');
  const toast = useToast();

  const {
    originalSize,
    compressedUrl,
    compressedSize,
    isCompressing,
    compressionTarget,
    quality,
    targetFileSize,
    setCompressionTarget,
    setQuality,
    setTargetFileSize,
    loadImageFile,
    compress,
    downloadCompressed,
    reset,
  } = useImageCompression();

  const handleFilesSelect = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!validateImageFile(file)) {
      toast.error(tCommon('selectValidImage'));
      return;
    }
    loadImageFile(file);
  };

  const { isDragOver, selectedFiles, fileInputRef, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, triggerFileInput, clearFiles } = useUploadZone({
    onFilesSelect: handleFilesSelect,
    accept: 'image/*',
    multiple: false,
  });

  const handleCompress = async () => {
    if (selectedFiles.length === 0) return;
    await compress({ file: selectedFiles[0], options: { quality, targetFileSize, compressionTarget } });
  };

  const handleReset = () => {
    reset();
    clearFiles();
  };

  const handleDownload = () => {
    if (!selectedFiles[0]) return;
    const filename = `${selectedFiles[0].name.replace(/\.[^/.]+$/, '')}_compressed.jpg`;
    downloadCompressed(filename);
  };

  const compressionRatio = compressedSize ? getCompressionRatio({ originalSize, convertedSize: compressedSize }) : 0;

  return (
    <ToolShell header={{ title: t('title'), description: t('description'), backText: tCommon('backToHome') }}>
      <ToolGrid columns={2}>
        <div className="lg:col-span-1 space-y-6">
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
            />
          </ToolSection>

          {selectedFiles.length > 0 && (
            <CompressionSettings
              compressionTarget={compressionTarget}
              quality={quality}
              targetFileSize={targetFileSize}
              onCompressionTargetChange={setCompressionTarget}
              onQualityChange={setQuality}
              onTargetFileSizeChange={setTargetFileSize}
            />
          )}

          {selectedFiles.length > 0 && (
            <ToolSection title={`3. ${t('compressImage')}`}>
              <Button
                onClick={handleCompress}
                disabled={isCompressing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                {isCompressing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('compressing')}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Zap className="mr-2" size={20} />
                    {t('compressNow')}
                  </div>
                )}
              </Button>
            </ToolSection>
          )}

          {compressedUrl && compressedSize && (
            <CompressionResult
              compressedUrl={compressedUrl}
              originalSize={originalSize}
              compressedSize={compressedSize}
              compressionRatio={compressionRatio}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          )}
        </div>

        <CompressorSidebar />
      </ToolGrid>
    </ToolShell>
  );
};
