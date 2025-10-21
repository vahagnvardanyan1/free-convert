'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { Upload, FileText, Zap, Settings, Image as ImageIcon, Plus, X } from 'lucide-react';

import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { Card } from '../Card';
import { PDFResultModal } from '../PDFResultModal';
import { useToast } from '@/components/ui/toast';
import { useUploadZone } from '@/hooks/useUploadZone';
import { usePDFProcessing } from '@/hooks/usePDFProcessing';
import { usePDFToImagesOptions, useImagesToPDFOptions, useSplitPDFOptions } from '@/hooks/usePDFOptions';
import { validateFilesForMode, getAcceptedFileTypes, getAllowsMultiple } from '@/utils/pdfValidation';
import { formatFileSize } from '@/utils/imageProcessing';

import type { PDFToolMode } from '@/hooks/usePDFProcessing';

interface PDFToolProps {
  mode: PDFToolMode;
  title: string;
  description: string;
}

export const PDFTool = ({ mode, title, description }: PDFToolProps) => {
  const t = useTranslations('pdfTool');
  const tErrors = useTranslations('errors');
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // PDF Processing Hook
  const {
    isProcessing,
    result,
    error: processingError,
    processPDF,
    reset,
  } = usePDFProcessing({
    mode,
    onSuccess: () => setIsModalOpen(true),
  });

  // Mode-specific options hooks
  const pdfToImagesOptions = usePDFToImagesOptions();
  const imagesToPDFOptions = useImagesToPDFOptions();
  const splitPDFOptions = useSplitPDFOptions();

  // File validation and selection
  const handleFilesSelect = (files: File[]) => {
    const validation = validateFilesForMode({ files, mode });
    if (!validation.isValid && validation.errorKey) {
      toast.error(tErrors(validation.errorKey as keyof IntlMessages['errors']));
    }
  };

  // Unified upload hook
  const { isDragOver, selectedFiles, fileInputRef, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, triggerFileInput, clearFiles, removeFile } = useUploadZone({
    onFilesSelect: handleFilesSelect,
    accept: getAcceptedFileTypes(mode),
    multiple: getAllowsMultiple(mode),
  });

  // Process PDF
  const handleProcess = async () => {
    if (selectedFiles.length === 0) return;

    let pageNumbers: number[] | undefined;
    if (mode === 'pdf-to-images' && pdfToImagesOptions.pageRange) {
      const parsed = pdfToImagesOptions.parsePageRange(pdfToImagesOptions.pageRange);
      pageNumbers = parsed || undefined;
    }

    await processPDF({
      files: selectedFiles,
      options:
        mode === 'pdf-to-images'
          ? {
              format: pdfToImagesOptions.imageFormat,
              quality: pdfToImagesOptions.imageQuality,
              scale: pdfToImagesOptions.imageScale,
            }
          : mode === 'images-to-pdf'
            ? {
                pageSize: imagesToPDFOptions.pageSize,
                orientation: imagesToPDFOptions.orientation,
                margin: imagesToPDFOptions.margin,
                fitToPage: imagesToPDFOptions.fitToPage,
              }
            : undefined,
      splitRanges: mode === 'split-pdf' ? splitPDFOptions.splitRanges : undefined,
      pageNumbers,
    });
  };

  const handleReset = () => {
    reset();
    clearFiles();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Show processing errors as toasts
  useEffect(() => {
    if (processingError) {
      toast.error(processingError);
    }
  }, [processingError, toast]);

  const getUploadText = () => {
    if (isDragOver) return t('dropFilesHere');
    if (mode === 'images-to-pdf') return t('dragDropImages');
    if (mode === 'merge-pdf') return t('dragDropPdfFiles');
    return t('dragDropPdfFile');
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        <Card className="p-8 bg-white shadow-lg rounded-2xl">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-all duration-200 cursor-pointer ${
              isDragOver ? 'border-blue-500 bg-blue-50' : selectedFiles.length > 0 ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => selectedFiles.length === 0 && triggerFileInput()}
          >
            {selectedFiles.length > 0 ? (
              <div className="space-y-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-4">
                      {mode === 'images-to-pdf' ? <ImageIcon className="text-green-600" size={32} /> : <FileText className="text-green-600" size={32} />}
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    {getAllowsMultiple(mode) && (
                      <Button variant="outline" size="sm" onClick={() => removeFile(index)} className="ml-2">
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                {selectedFiles.length > 1 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedFiles.length} {t('filesSelected')}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <Upload className={`mx-auto mb-4 transition-all duration-200 ${isDragOver ? 'text-blue-500 scale-110' : 'text-gray-400'}`} size={48} />
                <p className={`text-lg font-medium mb-2 transition-colors duration-200 ${isDragOver ? 'text-blue-600' : 'text-gray-900'}`}>{getUploadText()}</p>
                <p className={`text-gray-500 mb-4 transition-colors duration-200 ${isDragOver ? 'text-blue-500' : 'text-gray-500'}`}>{isDragOver ? t('releaseToUpload') : t('orClickToBrowse')}</p>
                {!isDragOver && (
                  <Button
                    variant="outline"
                    onClick={e => {
                      e.stopPropagation();
                      triggerFileInput();
                    }}
                    className="rounded-lg"
                  >
                    {getAllowsMultiple(mode) ? t('chooseFiles') : t('chooseFile')}
                  </Button>
                )}
              </div>
            )}

            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept={getAcceptedFileTypes(mode)} multiple={getAllowsMultiple(mode)} className="hidden" />
          </div>

          {/* Options Panel */}
          {selectedFiles.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Settings className="mr-2" size={20} />
                <h3 className="font-semibold text-gray-900">{t('options')}</h3>
              </div>

              {/* PDF to Images Options */}
              {mode === 'pdf-to-images' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('outputFormat')}</label>
                    <Select value={pdfToImagesOptions.imageFormat} onValueChange={pdfToImagesOptions.setImageFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jpg">JPG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('quality')}: {Math.round(pdfToImagesOptions.imageQuality * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={pdfToImagesOptions.imageQuality}
                      onChange={e => pdfToImagesOptions.setImageQuality(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('scale')}: {pdfToImagesOptions.imageScale}x
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.5"
                      value={pdfToImagesOptions.imageScale}
                      onChange={e => pdfToImagesOptions.setImageScale(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('pageRange')}</label>
                    <input
                      type="text"
                      value={pdfToImagesOptions.pageRange}
                      onChange={e => pdfToImagesOptions.setPageRange(e.target.value)}
                      placeholder="e.g., 1,3,5-10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Images to PDF Options */}
              {mode === 'images-to-pdf' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('pageSize')}</label>
                    <Select value={imagesToPDFOptions.pageSize} onValueChange={imagesToPDFOptions.setPageSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A4">A4</SelectItem>
                        <SelectItem value="A3">A3</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('orientation')}</label>
                    <Select value={imagesToPDFOptions.orientation} onValueChange={imagesToPDFOptions.setOrientation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">{t('portrait')}</SelectItem>
                        <SelectItem value="landscape">{t('landscape')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('margin')}: {imagesToPDFOptions.margin}mm
                    </label>
                    <input type="range" min="0" max="50" step="5" value={imagesToPDFOptions.margin} onChange={e => imagesToPDFOptions.setMargin(parseInt(e.target.value))} className="w-full" />
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" checked={imagesToPDFOptions.fitToPage} onChange={e => imagesToPDFOptions.setFitToPage(e.target.checked)} className="w-4 h-4 text-blue-600 rounded mr-2" />
                    <label className="text-sm font-medium text-gray-700">{t('fitToPage')}</label>
                  </div>
                </div>
              )}

              {/* Split PDF Options */}
              {mode === 'split-pdf' && (
                <div className="space-y-4">
                  {splitPDFOptions.splitRanges.map((range, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        value={range.start}
                        onChange={e => splitPDFOptions.updateSplitRange({ index, field: 'start', value: parseInt(e.target.value) })}
                        placeholder={t('startPage')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        min="1"
                        value={range.end}
                        onChange={e => splitPDFOptions.updateSplitRange({ index, field: 'end', value: parseInt(e.target.value) })}
                        placeholder={t('endPage')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      {splitPDFOptions.splitRanges.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => splitPDFOptions.removeSplitRange(index)}>
                          <X size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={splitPDFOptions.addSplitRange}>
                    <Plus size={16} className="mr-2" />
                    {t('addRange')}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Process Button */}
          {selectedFiles.length > 0 && (
            <div className="text-center">
              <Button
                onClick={handleProcess}
                disabled={isProcessing}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                <Zap className={`mr-2 ${isProcessing ? 'animate-spin' : ''}`} size={20} />
                {isProcessing ? t('processing') : t('process')}
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Result Modal */}
      <PDFResultModal isOpen={isModalOpen} onClose={handleCloseModal} result={result} mode={mode} onProcessAnother={handleReset} />
    </section>
  );
};
