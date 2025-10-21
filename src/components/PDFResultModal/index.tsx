'use client';
import { useState } from 'react';
import { Download, X, FileText, Image as ImageIcon, Info, Eye, Calendar, User, FileImage } from 'lucide-react';
import { Button } from '../ui/button';
import { Modal } from '../Modal';
import { downloadFile, downloadMultipleFiles, formatFileSize, type PDFConversionResult, type PDFCreationResult, type PDFMergeResult, type PDFSplitResult } from '../../lib/pdfConverter';
import { useTranslations } from 'next-intl';

interface PDFResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: unknown;
  mode: string;
  onReset?: () => void;
  onProcessAnother?: () => void;
}

export function PDFResultModal({ isOpen, onClose, result, mode, onReset, onProcessAnother }: PDFResultModalProps) {
  const t = useTranslations('pdfResult');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleReset = onProcessAnother || onReset || onClose;

  if (!result) return null;

  const handleDownload = (blob: Blob, fileName: string) => {
    downloadFile(blob, fileName);
  };

  const handleDownloadAll = () => {
    if (mode === 'pdf-to-images' && result && 'images' in (result as Record<string, unknown>)) {
      const files = (result as PDFConversionResult).images.map(img => ({
        blob: img.blob,
        fileName: img.fileName,
      }));
      downloadMultipleFiles(files);
    } else if (mode === 'split-pdf' && result && 'pdfs' in (result as Record<string, unknown>)) {
      const files = (result as PDFSplitResult).pdfs.map(pdf => ({
        blob: pdf.blob,
        fileName: pdf.fileName,
      }));
      downloadMultipleFiles(files);
    }
  };

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
  };

  const closePreview = () => {
    setPreviewUrl(null);
  };

  const renderPDFToImagesResult = (result: PDFConversionResult) => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('conversionComplete')}</h3>
        <p className="text-gray-600">{t('successfullyConverted', { count: result.images.length, plural: result.images.length !== 1 ? 's' : '' })}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">{t('originalSize')}</span>
            <span className="ml-2 font-medium">{formatFileSize(result.originalSize)}</span>
          </div>
          <div>
            <span className="text-gray-500">{t('totalConvertedSize')}</span>
            <span className="ml-2 font-medium">{formatFileSize(result.convertedSize)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {result.images.map((image, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <ImageIcon className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">{image.fileName}</p>
                <p className="text-sm text-gray-500">
                  {t('page')} {image.pageNumber} • {formatFileSize(image.blob.size)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => handlePreview(image.url)} variant="outline" size="sm">
                <Eye size={16} />
              </Button>
              <Button onClick={() => handleDownload(image.blob, image.fileName)} variant="outline" size="sm">
                <Download size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <Button onClick={handleDownloadAll} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Download className="mr-2" size={16} />
          {t('downloadAllImages')}
        </Button>
        <Button onClick={handleReset} variant="outline">
          {t('convertAnotherPdf')}
        </Button>
      </div>
    </div>
  );

  const renderImagesToPDFResult = (result: PDFCreationResult) => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('pdfCreated')}</h3>
        <p className="text-gray-600">{t('imagesHaveBeenCombined', { count: result.pageCount, plural: result.pageCount !== 1 ? 's' : '' })}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">{t('originalSize')}</span>
            <span className="ml-2 font-medium">{formatFileSize(result.originalSize)}</span>
          </div>
          <div>
            <span className="text-gray-500">{t('pdfSize')}</span>
            <span className="ml-2 font-medium">{formatFileSize(result.convertedSize)}</span>
          </div>
          <div>
            <span className="text-gray-500">{t('pages')}</span>
            <span className="ml-2 font-medium">{result.pageCount}</span>
          </div>
          <div>
            <span className="text-gray-500">{t('compression')}</span>
            <span className="ml-2 font-medium">
              {result.convertedSize < result.originalSize ? t('smaller', { percent: Math.round((1 - result.convertedSize / result.originalSize) * 100) }) : t('noCompression')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <FileText className="text-red-600" size={24} />
          <div>
            <p className="font-medium text-gray-900">{result.fileName}</p>
            <p className="text-sm text-gray-500">{formatFileSize(result.convertedSize)}</p>
          </div>
        </div>
        <Button onClick={() => handlePreview(result.url)} variant="outline" size="sm">
          <Eye size={16} />
        </Button>
      </div>

      <div className="flex justify-center space-x-4">
        <Button onClick={() => handleDownload(result.blob, result.fileName)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Download className="mr-2" size={16} />
          {t('downloadPdf')}
        </Button>
        <Button onClick={handleReset} variant="outline">
          {t('createAnotherPdf')}
        </Button>
      </div>
    </div>
  );

  const renderMergePDFResult = (result: PDFMergeResult) => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('pdfsMerged')}</h3>
        <p className="text-gray-600">{t('pdfsCombined', { count: result.totalPages })}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">{t('originalSize')}</span>
            <span className="ml-2 font-medium">{formatFileSize(result.originalSize)}</span>
          </div>
          <div>
            <span className="text-gray-500">{t('mergedSize')}</span>
            <span className="ml-2 font-medium">{formatFileSize(result.convertedSize)}</span>
          </div>
          <div>
            <span className="text-gray-500">{t('totalPages')}</span>
            <span className="ml-2 font-medium">{result.totalPages}</span>
          </div>
          <div>
            <span className="text-gray-500">{t('compression')}</span>
            <span className="ml-2 font-medium">
              {result.convertedSize < result.originalSize ? t('smaller', { percent: Math.round((1 - result.convertedSize / result.originalSize) * 100) }) : t('noCompression')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <FileText className="text-red-600" size={24} />
          <div>
            <p className="font-medium text-gray-900">{result.fileName}</p>
            <p className="text-sm text-gray-500">{formatFileSize(result.convertedSize)}</p>
          </div>
        </div>
        <Button onClick={() => handlePreview(result.url)} variant="outline" size="sm">
          <Eye size={16} />
        </Button>
      </div>

      <div className="flex justify-center space-x-4">
        <Button onClick={() => handleDownload(result.blob, result.fileName)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Download className="mr-2" size={16} />
          {t('downloadMergedPdf')}
        </Button>
        <Button onClick={handleReset} variant="outline">
          {t('mergeMorePdfs')}
        </Button>
      </div>
    </div>
  );

  const renderSplitPDFResult = (result: PDFSplitResult) => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('pdfSplit')}</h3>
        <p className="text-gray-600">{t('pdfSplitInto', { count: result.pdfs.length, plural: result.pdfs.length !== 1 ? 's' : '' })}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">{t('originalSize')}</span>
            <span className="ml-2 font-medium">{formatFileSize(result.originalSize)}</span>
          </div>
          <div>
            <span className="text-gray-500">{t('totalSplitSize')}</span>
            <span className="ml-2 font-medium">{formatFileSize(result.convertedSize)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {result.pdfs.map((pdf, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="text-red-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">{pdf.fileName}</p>
                <p className="text-sm text-gray-500">
                  {pdf.pageRange} • {formatFileSize(pdf.blob.size)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => handlePreview(pdf.url)} variant="outline" size="sm">
                <Eye size={16} />
              </Button>
              <Button onClick={() => handleDownload(pdf.blob, pdf.fileName)} variant="outline" size="sm">
                <Download size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <Button onClick={handleDownloadAll} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Download className="mr-2" size={16} />
          {t('downloadAllPdfs')}
        </Button>
        <Button onClick={handleReset} variant="outline">
          {t('splitAnotherPdf')}
        </Button>
      </div>
    </div>
  );

  const renderPDFInfoResult = (result: {
    pageCount: number;
    fileSize: number;
    title?: string;
    subject?: string;
    author?: string;
    creator?: string;
    producer?: string;
    creationDate?: Date;
    modificationDate?: Date;
  }) => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('pdfInformation')}</h3>
        <p className="text-gray-600">{t('detailedInfo')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Info className="mr-2" size={16} />
              {t('basicInformation')}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('pages')}</span>
                <span className="font-medium">{result.pageCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('fileSize')}</span>
                <span className="font-medium">{formatFileSize(result.fileSize)}</span>
              </div>
            </div>
          </div>

          {(result.title || result.subject) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <FileImage className="mr-2" size={16} />
                {t('documentDetails')}
              </h4>
              <div className="space-y-2 text-sm">
                {result.title && (
                  <div>
                    <span className="text-gray-500 block">{t('title')}</span>
                    <span className="font-medium">{result.title}</span>
                  </div>
                )}
                {result.subject && (
                  <div>
                    <span className="text-gray-500 block">{t('subject')}</span>
                    <span className="font-medium">{result.subject}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {(result.author || result.creator) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <User className="mr-2" size={16} />
                {t('authorInformation')}
              </h4>
              <div className="space-y-2 text-sm">
                {result.author && (
                  <div>
                    <span className="text-gray-500 block">{t('author')}</span>
                    <span className="font-medium">{result.author}</span>
                  </div>
                )}
                {result.creator && (
                  <div>
                    <span className="text-gray-500 block">{t('creator')}</span>
                    <span className="font-medium">{result.creator}</span>
                  </div>
                )}
                {result.producer && (
                  <div>
                    <span className="text-gray-500 block">{t('producer')}</span>
                    <span className="font-medium">{result.producer}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {(result.creationDate || result.modificationDate) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Calendar className="mr-2" size={16} />
                {t('dates')}
              </h4>
              <div className="space-y-2 text-sm">
                {result.creationDate && (
                  <div>
                    <span className="text-gray-500 block">{t('created')}</span>
                    <span className="font-medium">{new Date(result.creationDate).toLocaleString()}</span>
                  </div>
                )}
                {result.modificationDate && (
                  <div>
                    <span className="text-gray-500 block">{t('modified')}</span>
                    <span className="font-medium">{new Date(result.modificationDate).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleReset} variant="outline">
          {t('analyzeAnotherPdf')}
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (mode) {
      case 'pdf-to-images':
        return renderPDFToImagesResult(result as PDFConversionResult);
      case 'images-to-pdf':
        return renderImagesToPDFResult(result as PDFCreationResult);
      case 'merge-pdf':
        return renderMergePDFResult(result as PDFMergeResult);
      case 'split-pdf':
        return renderSplitPDFResult(result as PDFSplitResult);
      case 'pdf-info':
        return renderPDFInfoResult(
          result as {
            pageCount: number;
            fileSize: number;
            title?: string;
            subject?: string;
            author?: string;
            creator?: string;
            producer?: string;
            creationDate?: Date;
            modificationDate?: Date;
          },
        );
      default:
        return <div>{t('unknownResultType')}</div>;
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('processingComplete')}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          {renderContent()}
        </div>
      </Modal>

      {/* Preview Modal */}
      {previewUrl && (
        <Modal isOpen={!!previewUrl} onClose={closePreview} size="xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{t('preview')}</h3>
              <button onClick={closePreview} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="text-center">
              {previewUrl.includes('image') ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="Preview" className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg" />
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <FileText className="mx-auto mb-4 text-gray-400" size={64} />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{t('pdfPreview')}</h4>
                    <p className="text-gray-600 mb-4">
                      {t('pdfPreviewNotAvailable')}
                      <br />
                      {t('pleaseDownloadToView')}
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = previewUrl;
                          link.target = '_blank';
                          link.rel = 'noopener noreferrer';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        variant="outline"
                      >
                        {t('openInNewTab')}
                      </Button>
                      <Button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = previewUrl;
                          link.download = 'preview.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {t('downloadPdfFile')}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
