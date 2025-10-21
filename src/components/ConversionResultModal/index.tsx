'use client';
import { CheckCircle, Download, RotateCcw, ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Modal } from '../Modal';
import { formatFileSize, getCompressionRatio, downloadImage, type ConversionResult } from '../../lib/imageConverter';

interface ConversionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ConversionResult | null;
  originalFileName?: string;
  inputFormat?: string;
  outputFormat?: string;
  onConvertAnother: () => void;
}

export function ConversionResultModal({ isOpen, onClose, result, originalFileName, inputFormat, outputFormat, onConvertAnother }: ConversionResultModalProps) {
  if (!result) return null;

  const handleDownload = () => {
    downloadImage(result);
  };

  const handleConvertAnother = () => {
    onConvertAnother();
    onClose();
  };

  const compressionRatio = getCompressionRatio(result.originalSize, result.convertedSize);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-4 sm:p-6">
        {/* Success Header with Download Button */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Conversion Complete!</h3>
          <p className="text-sm text-gray-600 mb-4">Your image has been successfully converted</p>

          {/* Primary Download Button - Prominent Position */}
          <Button
            onClick={handleDownload}
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-base sm:text-lg font-semibold mb-4"
          >
            <Download className="mr-2" size={20} />
            Download {outputFormat?.toUpperCase() || result.format.toUpperCase()}
          </Button>
        </div>

        {/* Compact Stats */}
        <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-3 sm:p-4 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="text-center flex-1">
              <div className="text-xs text-gray-600 mb-1">Original</div>
              <div className="font-semibold text-gray-900">{inputFormat?.toUpperCase()}</div>
              <div className="text-xs text-gray-500">{formatFileSize(result.originalSize)}</div>
            </div>

            <div className="px-3">
              <ArrowDown className={`${compressionRatio > 0 ? 'text-green-600' : 'text-red-600'}`} size={20} />
            </div>

            <div className="text-center flex-1">
              <div className="text-xs text-gray-600 mb-1">Converted</div>
              <div className="font-semibold text-green-700">{outputFormat?.toUpperCase() || result.format.toUpperCase()}</div>
              <div className="text-xs text-gray-500">{formatFileSize(result.convertedSize)}</div>
            </div>

            {result.originalSize !== result.convertedSize && (
              <>
                <div className="px-3">
                  <div className={`text-2xl font-bold ${compressionRatio > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {compressionRatio > 0 ? '-' : '+'}
                    {Math.abs(compressionRatio)}%
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Compact Image Preview */}
        <div className="mb-4">
          <div className="bg-gray-50 rounded-lg p-2 sm:p-3 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.url} alt="Converted image preview" className="max-w-full max-h-48 sm:max-h-64 object-contain rounded shadow-sm" />
          </div>
          <div className="text-center mt-2">
            <p className="text-xs text-gray-500 truncate px-2" title={result.fileName}>
              {result.fileName}
            </p>
          </div>
        </div>

        {/* Compression Summary - Compact */}
        {result.originalSize !== result.convertedSize && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <p className="text-xs sm:text-sm text-gray-700 text-center">
              {compressionRatio > 0
                ? `✓ Reduced file size by ${compressionRatio}% (saved ${formatFileSize(result.originalSize - result.convertedSize)})`
                : `File size increased by ${Math.abs(compressionRatio)}% (${formatFileSize(result.convertedSize - result.originalSize)} larger)`}
            </p>
          </div>
        )}

        {/* Secondary Action Button */}
        <div className="flex justify-center">
          <Button onClick={handleConvertAnother} variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-xl border-2 hover:bg-gray-50 transition-all duration-200">
            <RotateCcw className="mr-2" size={18} />
            Convert Another Image
          </Button>
        </div>
      </div>
    </Modal>
  );
}
