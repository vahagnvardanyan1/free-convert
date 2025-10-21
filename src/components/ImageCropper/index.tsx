'use client';

import { useEffect } from 'react';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { Card } from '@/components/Card';
import { ToolShell, ToolGrid } from '@/components/tooling/ToolShell';
import { FileUploadZone } from '@/components/FileUploadZone';
import { CropperControls } from './CropperControls';
import { CropperFeatures } from './CropperFeatures';
import { MobileControls } from './MobileControls';
import { useToast } from '@/components/ui/toast';
import { useUploadZone } from '@/hooks/useUploadZone';
import { useImageCrop } from '@/hooks/useImageCrop';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { validateImageFile } from '@/utils/fileValidation';

export const ImageCropper = () => {
  const tCommon = useTranslations('common');
  const tCrop = useTranslations('cropper');
  const toast = useToast();

  const { imageUrl, cropper, aspectRatio, isCropping, imageRef, setImageUrl, setAspectRatio, initializeCropper, cropImage, resetCrop, rotateCrop, flipCrop, zoomCrop, destroyCropper } = useImageCrop();
  const { isOpen: isBottomSheetOpen, open: openBottomSheet, close: closeBottomSheet } = useBottomSheet();

  const handleFilesSelect = (files: File[]) => {
    const file = files[0];
    if (!file || !validateImageFile(file)) {
      toast.error(tCommon('selectValidImage'));
      return;
    }
    destroyCropper();
    setImageUrl(URL.createObjectURL(file));
  };

  const { isDragOver, selectedFiles, fileInputRef, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, triggerFileInput, clearFiles } = useUploadZone({
    onFilesSelect: handleFilesSelect,
    accept: 'image/*',
    multiple: false,
  });

  useEffect(() => {
    if (imageRef.current && imageUrl && !cropper) {
      initializeCropper({ imageElement: imageRef.current, aspectRatio });
    }
  }, [imageUrl, imageRef, cropper, aspectRatio, initializeCropper]);

  useEffect(() => {
    document.body.style.overflow = isBottomSheetOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBottomSheetOpen]);

  const handleNewImage = () => {
    destroyCropper();
    clearFiles();
  };

  const handleCropClick = () => cropImage({ filename: selectedFiles[0] ? `cropped-${selectedFiles[0].name}` : 'cropped-image.png' });

  return (
    <ToolShell header={{ title: tCrop('title'), description: tCrop('description'), backText: tCommon('backToHome') }}>
      {!imageUrl ? (
        <>
          <Card className="mb-8">
            <FileUploadZone
              isDragOver={isDragOver}
              selectedFiles={selectedFiles}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              fileInputRef={fileInputRef}
              onFileSelect={handleFileSelect}
              accept="image/*"
              dragOverText={tCommon('dropFileHere')}
              defaultText={tCrop('uploadPrompt')}
              browseText={tCommon('orClickBrowse')}
              releaseText={tCommon('releaseToUpload')}
              chooseFileText={tCommon('chooseFile')}
              className="p-12"
            />
          </Card>
          <CropperFeatures />
        </>
      ) : (
        <>
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <Button onClick={handleNewImage} variant="outline" size="sm">
              <Upload className="mr-2" size={16} />
              {tCrop('uploadDifferent')}
            </Button>
            <p className="text-sm text-gray-600 hidden lg:block">{tCrop('controlsHint')}</p>
          </div>

          <ToolGrid columns={3}>
            <div className="lg:col-span-2">
              <Card className="p-4 sm:p-6">
                <div className="max-w-full overflow-hidden">
                  <img ref={imageRef} src={imageUrl} alt="Crop preview" className="max-w-full block" />
                </div>
              </Card>
            </div>

            <CropperControls
              aspectRatio={aspectRatio}
              isCropping={isCropping}
              onAspectRatioChange={setAspectRatio}
              onCrop={handleCropClick}
              onReset={resetCrop}
              onRotate={rotateCrop}
              onFlip={flipCrop}
              onZoom={zoomCrop}
            />
          </ToolGrid>

          <MobileControls
            isBottomSheetOpen={isBottomSheetOpen}
            aspectRatio={aspectRatio}
            isCropping={isCropping}
            onOpenSheet={openBottomSheet}
            onCloseSheet={closeBottomSheet}
            onAspectRatioChange={setAspectRatio}
            onCrop={handleCropClick}
            onReset={resetCrop}
            onRotate={rotateCrop}
            onFlip={flipCrop}
            onZoom={zoomCrop}
          />
        </>
      )}
    </ToolShell>
  );
};
