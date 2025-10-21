'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Zap, AlertCircle } from 'lucide-react';

import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { Card } from '../Card';
import { ConversionResultModal } from '../ConversionResultModal';
import { FileUploadZone } from '../FileUploadZone';

import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useImageConversion } from '@/hooks/useImageConversion';

import { validateImageFile } from '@/utils/fileValidation';
import { getFileExtension, normalizeImageFormat } from '@/utils/fileValidation';

import type { SupportedFormat } from '@/lib/imageConverter';

export const ConversionTool = () => {
  const t = useTranslations('converter');
  const [inputFormat, setInputFormat] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [quality, setQuality] = useState(0.9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    isConverting,
    conversionResult,
    error: conversionError,
    convert,
    reset,
  } = useImageConversion({
    onSuccess: () => setIsModalOpen(true),
  });

  const handleFileSelect = (file: File) => {
    setValidationError(null);

    if (!validateImageFile(file)) {
      setValidationError(t('selectValidImage'));
      return;
    }

    const fileExtension = getFileExtension(file.name);
    if (fileExtension) {
      setInputFormat(normalizeImageFormat(fileExtension));
    }
  };

  const {
    selectedFile,
    fileInputRef,
    handleFileSelect: onFileInputChange,
    clearFile,
    triggerFileInput,
  } = useFileUpload({
    onFileSelect: handleFileSelect,
  });

  const { isDragOver, handleDragOver, handleDragLeave, handleDrop } = useDragAndDrop({
    onFilesDrop: files => {
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
  });

  const handleConvert = async () => {
    if (!selectedFile || !outputFormat) return;

    await convert({
      file: selectedFile,
      targetFormat: outputFormat.toLowerCase() as SupportedFormat,
      options: {
        quality,
        maxSizeMB: 10,
        maxWidthOrHeight: 4096,
        maintainAspectRatio: true,
      },
    });
  };

  const handleConvertAnother = () => {
    reset();
    clearFile();
    setInputFormat('');
    setOutputFormat('');
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const error = validationError || conversionError;

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('uploadYourImage')}</h2>
          <p className="text-gray-600">{t('chooseOutputFormat')}</p>
        </div>

        <Card className="p-8 bg-white shadow-lg rounded-2xl">
          {/* Drag and Drop Area */}
          <FileUploadZone
            isDragOver={isDragOver}
            selectedFiles={selectedFile ? [selectedFile] : []}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            fileInputRef={fileInputRef}
            onFileSelect={onFileInputChange}
            dragOverText={t('dropFileHere')}
            defaultText={t('dragDropHere')}
            browseText={t('orClickBrowse')}
            releaseText={t('releaseToUpload')}
            chooseFileText={t('chooseFile')}
          />

          {/* Format Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('inputFormat')}</label>
              <Select value={inputFormat} onValueChange={setInputFormat}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder={t('autoDetected')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PNG">PNG</SelectItem>
                  <SelectItem value="JPG">JPG</SelectItem>
                  <SelectItem value="JPEG">JPEG</SelectItem>
                  <SelectItem value="WEBP">WebP</SelectItem>
                  <SelectItem value="GIF">GIF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('outputFormat')}</label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder={t('chooseOutputFormat')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PNG">PNG</SelectItem>
                  <SelectItem value="JPG">JPG</SelectItem>
                  <SelectItem value="WEBP">WebP</SelectItem>
                  <SelectItem value="GIF">GIF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quality Control */}
          {(outputFormat === 'JPG' || outputFormat === 'WEBP') && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('quality')}: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={e => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{t('lowerQuality')}</span>
                <span>{t('higherQuality')}</span>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="text-red-500" size={20} />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Convert Button */}
          <div className="text-center mb-6">
            <Button
              onClick={handleConvert}
              disabled={!selectedFile || !outputFormat || isConverting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className={`mr-2 ${isConverting ? 'animate-spin' : ''}`} size={20} />
              {isConverting ? t('converting') : t('convertImage')}
            </Button>
          </div>
        </Card>
      </div>

      {/* Conversion Result Modal */}
      <ConversionResultModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        result={conversionResult}
        originalFileName={selectedFile?.name}
        inputFormat={inputFormat}
        outputFormat={outputFormat}
        onConvertAnother={handleConvertAnother}
      />
    </section>
  );
};
