'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { ArrowLeft, FileImage, Settings, Zap, AlertCircle, Upload, X } from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '@/components/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../Accordion';
import { ConversionResultModal } from '../ConversionResultModal';

import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useImageConversion } from '@/hooks/useImageConversion';

import { validateImageFile } from '@/utils/fileValidation';
import { formatFileSize } from '@/utils/imageProcessing';

import type { SupportedFormat } from '@/lib/imageConverter';

interface ConverterPageProps {
  from: string;
  to: string;
  title: string;
  description: string;
}

export const ConverterPage = ({ from, to, title, description }: ConverterPageProps) => {
  const t = useTranslations('converterPage');
  const tConverter = useTranslations('converter');
  const [outputFormat, setOutputFormat] = useState(to.toLowerCase());
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
      setValidationError(tConverter('selectValidImageFormats'));
      return;
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
    if (!selectedFile) return;

    await convert({
      file: selectedFile,
      targetFormat: outputFormat as SupportedFormat,
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
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getStep2Description = () => {
    const baseDesc = t('step2Description', { format: to });
    const formatDesc = to === 'WebP' ? t('step2DescWebP', { format: to }) : to === 'PNG' ? t('step2DescPNG', { format: to }) : t('step2DescJPG', { format: to });
    return `${baseDesc} ${formatDesc}`;
  };

  const formatSteps = [
    {
      number: 1,
      title: t('step1Title', { format: from }),
      description: t('step1Description', { format: from }),
    },
    {
      number: 2,
      title: t('step2Title', { format: to }),
      description: getStep2Description(),
    },
    {
      number: 3,
      title: t('step3Title'),
      description: t('step3Description', { from, to }),
    },
    {
      number: 4,
      title: t('step4Title'),
      description: t('step4Description', { format: to }),
    },
  ];

  const getConversionAnswer = () => {
    if (to === 'WebP') return t('whyConvertWebP', { from, to });
    if (to === 'PNG') return t('whyConvertPNG', { from, to });
    return t('whyConvertJPG', { from, to });
  };

  const getQualityAnswer = () => {
    if (to === 'WebP') return t('qualityAnswerWebP', { from, to });
    if (to === 'PNG') return t('qualityAnswerPNG', { from, to });
    return t('qualityAnswerJPG', { from, to });
  };

  const faqs = [
    {
      question: t('whyConvert', { from, to }),
      answer: getConversionAnswer(),
      icon: FileImage,
    },
    {
      question: t('qualityAffected'),
      answer: getQualityAnswer(),
      icon: Settings,
    },
    {
      question: t('fileSizeSupport'),
      answer: t('fileSizeAnswer', { format: from }),
      icon: Zap,
    },
  ];

  const error = validationError || conversionError;

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="mr-2" size={16} />
                {tConverter('backToHome')}
              </Button>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-600 hidden sm:block">{description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversion Tool - Compact Single Card */}
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6">
              {/* Compact Upload or File Display */}
              {!selectedFile ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200 cursor-pointer ${
                    isDragOver ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                >
                  <Upload className={`mx-auto mb-3 transition-all duration-200 ${isDragOver ? 'text-blue-500 scale-110' : 'text-gray-400'}`} size={40} />
                  <p className={`text-base sm:text-lg font-medium mb-1 transition-colors duration-200 ${isDragOver ? 'text-blue-600' : 'text-gray-900'}`}>
                    {isDragOver ? tConverter('dropFileHere') : tConverter('dragDropHere')}
                  </p>
                  <p className={`text-sm text-gray-500 mb-3 ${isDragOver ? 'text-blue-500' : ''}`}>{isDragOver ? tConverter('releaseToUpload') : tConverter('orClickBrowse')}</p>
                  {!isDragOver && (
                    <Button
                      variant="outline"
                      onClick={e => {
                        e.stopPropagation();
                        triggerFileInput();
                      }}
                      className="rounded-lg"
                    >
                      {tConverter('chooseFile')}
                    </Button>
                  )}
                  <input type="file" ref={fileInputRef} onChange={onFileInputChange} accept="image/*" className="hidden" />
                </div>
              ) : (
                <>
                  {/* Compact Selected File Display */}
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <FileImage className="text-green-600 flex-shrink-0" size={32} />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{selectedFile.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={clearFile} className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0 ml-2">
                      <X size={16} />
                    </Button>
                  </div>

                  {/* Format and Quality Controls - Inline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{tConverter('convertTo')}:</label>
                      <Select value={outputFormat} onValueChange={setOutputFormat}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="webp">{tConverter('formats.webpModern')}</SelectItem>
                          <SelectItem value="png">{tConverter('formats.pngLossless')}</SelectItem>
                          <SelectItem value="jpg">{tConverter('formats.jpgUniversal')}</SelectItem>
                          <SelectItem value="gif">{tConverter('formats.gifAnimation')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Quality Control - Only for JPG/WebP */}
                    {(outputFormat === 'jpg' || outputFormat === 'webp') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {tConverter('quality')}: {Math.round(quality * 100)}%
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
                          <span>{tConverter('lowerQuality')}</span>
                          <span>{tConverter('higherQuality')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Error Display */}
              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </Card>

            {/* Sticky Convert Button */}
            <div className="sticky bottom-4 mt-4 z-10">
              <Button
                onClick={handleConvert}
                disabled={!selectedFile || isConverting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 sm:py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg font-semibold"
              >
                {isConverting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {tConverter('converting')}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Zap className="mr-2" size={20} />
                    {selectedFile ? `${tConverter('convertTo')} ${outputFormat.toUpperCase()}` : tConverter('uploadYourImage')}
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar - Collapsible on Mobile */}
          <div className="space-y-4 sm:space-y-6">
            {/* How-To for this conversion */}
            <Card className="p-4 sm:p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">
                {t('howToConvert')} {from} {t('to')} {to}
              </h3>

              <Accordion type="single" collapsible className="w-full space-y-2">
                {formatSteps.map((step, index) => (
                  <AccordionItem
                    key={index}
                    value={`step-${index}`}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-1 data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50 data-[state=open]:to-purple-50"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-2 sm:py-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{step.number}</span>
                        </div>
                        <span className="font-medium text-gray-900 text-xs sm:text-sm">{step.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 sm:pb-3 ml-7 sm:ml-9">
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{step.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            {/* Format-specific FAQs */}
            <Card className="p-4 sm:p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">
                {from} {t('to')} {to} {t('faq')}
              </h3>

              <Accordion type="single" collapsible className="w-full space-y-2">
                {faqs.map((faq, index) => {
                  const IconComponent = faq.icon;
                  return (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-1 data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50 data-[state=open]:to-purple-50"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-2 sm:py-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <IconComponent className="text-white" size={12} />
                          </div>
                          <span className="font-medium text-gray-900 text-xs sm:text-sm">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 sm:pb-3 ml-7 sm:ml-9">
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Card>
          </div>
        </div>
      </div>

      {/* Conversion Result Modal */}
      <ConversionResultModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        result={conversionResult}
        originalFileName={selectedFile?.name}
        inputFormat={from}
        outputFormat={outputFormat}
        onConvertAnother={handleConvertAnother}
      />
    </>
  );
};
