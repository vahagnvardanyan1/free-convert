'use client';

import { Maximize2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { ToolShell, ToolGrid } from '@/components/tooling/ToolShell';
import { ToolSection } from '@/components/tooling/ToolSection';
import { FileUploadZone } from '@/components/FileUploadZone';
import { ResizeSettings } from './ResizeSettings';
import { ResizerSidebar } from './ResizerSidebar';
import { useToast } from '@/components/ui/toast';
import { useUploadZone } from '@/hooks/useUploadZone';
import { useImageResize } from '@/hooks/useImageResize';
import { validateImageFile } from '@/utils/fileValidation';
import { getImageDimensions } from '@/utils/imageProcessing';

import type { PresetSize } from '@/hooks/useImageResize';

export const ImageResizer = () => {
  const t = useTranslations('resizer');
  const tCommon = useTranslations('common');
  const tErrors = useTranslations('errors');
  const toast = useToast();

  const {
    imageUrl,
    originalDimensions,
    resizeMode,
    percentage,
    customWidth,
    customHeight,
    maintainAspectRatio,
    selectedPreset,
    isResizing,
    setImageUrl,
    setOriginalDimensions,
    setResizeMode,
    setPercentage,
    setCustomWidth,
    setCustomHeight,
    setMaintainAspectRatio,
    setSelectedPreset,
    handleWidthChange,
    handleHeightChange,
    handleResize,
    handleReset: resetResize,
    getOutputDimensions,
  } = useImageResize();

  const handleFilesSelect = async (files: File[]) => {
    const file = files[0];
    if (!file || !validateImageFile(file)) {
      toast.error(tCommon('selectValidImage'));
      return;
    }

    if (imageUrl) URL.revokeObjectURL(imageUrl);
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    try {
      const dimensions = await getImageDimensions(file);
      setOriginalDimensions(dimensions);
      setCustomWidth(dimensions.width);
      setCustomHeight(dimensions.height);
    } catch {
      toast.error(tErrors('loadImageFailed'));
    }
  };

  const { isDragOver, selectedFiles, fileInputRef, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, triggerFileInput, clearFiles } = useUploadZone({
    onFilesSelect: handleFilesSelect,
    accept: 'image/*',
    multiple: false,
  });

  const handleReset = () => {
    resetResize();
    clearFiles();
  };

  const handlePresetClick = (preset: PresetSize) => {
    setSelectedPreset(preset);
    setResizeMode('preset');
  };

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

            {imageUrl && originalDimensions && (
              <div className="mt-4">
                <img src={imageUrl} alt="Preview" className="max-w-full h-auto rounded-lg shadow-lg" />
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {t('originalSize')}: {originalDimensions.width} × {originalDimensions.height}px
                </p>
              </div>
            )}
          </ToolSection>

          {selectedFiles.length > 0 && (
            <>
              <ResizeSettings
                resizeMode={resizeMode}
                percentage={percentage}
                customWidth={customWidth}
                customHeight={customHeight}
                maintainAspectRatio={maintainAspectRatio}
                selectedPreset={selectedPreset}
                outputDimensions={getOutputDimensions()}
                onResizeModeChange={setResizeMode}
                onPercentageChange={setPercentage}
                onWidthChange={handleWidthChange}
                onHeightChange={handleHeightChange}
                onMaintainAspectChange={setMaintainAspectRatio}
                onPresetSelect={handlePresetClick}
              />

              <ToolSection title={`3. ${t('resizeImage')}`}>
                <Button
                  onClick={() => imageUrl && handleResize({ imageUrl })}
                  disabled={isResizing}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isResizing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {t('resizing')}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Maximize2 className="mr-2" size={20} />
                      {t('resizeNow')}
                    </div>
                  )}
                </Button>
              </ToolSection>
            </>
          )}
        </div>

        <ResizerSidebar />
      </ToolGrid>
    </ToolShell>
  );
};
