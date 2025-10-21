import { useState } from 'react';

import { convertPDFToImages, convertImagesToPDF, mergePDFs, splitPDF, getPDFInfo, cleanupUrls } from '@/lib/pdfConverter';

import type { PDFConversionOptions, ImageToPDFOptions, PDFConversionResult, PDFCreationResult, PDFMergeResult, PDFSplitResult } from '@/lib/pdfConverter';

export type PDFToolMode = 'pdf-to-images' | 'images-to-pdf' | 'merge-pdf' | 'split-pdf' | 'pdf-info';

type PDFResult = PDFConversionResult | PDFCreationResult | PDFMergeResult | PDFSplitResult | unknown;

interface UsePDFProcessingOptions {
  mode: PDFToolMode;
  onSuccess?: (result: PDFResult) => void;
  onError?: (error: Error) => void;
}

interface UsePDFProcessingReturn {
  isProcessing: boolean;
  result: PDFResult | null;
  error: string | null;
  processPDF: (params: ProcessPDFParams) => Promise<void>;
  reset: () => void;
  clearError: () => void;
}

interface ProcessPDFParams {
  files: File[];
  options?: PDFConversionOptions | ImageToPDFOptions;
  splitRanges?: Array<{ start: number; end: number; name?: string }>;
  pageNumbers?: number[];
}

export const usePDFProcessing = ({ mode, onSuccess, onError }: UsePDFProcessingOptions): UsePDFProcessingReturn => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<PDFResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processPDF = async ({ files, options = {}, splitRanges, pageNumbers }: ProcessPDFParams) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      let processedResult: PDFResult;

      switch (mode) {
        case 'pdf-to-images':
          processedResult = await convertPDFToImages(files[0], {
            ...(options as PDFConversionOptions),
            pageNumbers,
          });
          break;

        case 'images-to-pdf':
          processedResult = await convertImagesToPDF(files, options as ImageToPDFOptions);
          break;

        case 'merge-pdf':
          processedResult = await mergePDFs(files);
          break;

        case 'split-pdf':
          if (!splitRanges || splitRanges.length === 0) {
            throw new Error('Split ranges are required for splitting PDF');
          }
          processedResult = await splitPDF(files[0], splitRanges);
          break;

        case 'pdf-info':
          processedResult = await getPDFInfo(files[0]);
          break;

        default:
          throw new Error('Invalid PDF operation mode');
      }

      setResult(processedResult);
      onSuccess?.(processedResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'PDF processing failed';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    if (result && typeof result === 'object' && 'images' in result) {
      const urls = (result.images as Array<{ url: string }>).map(img => img.url);
      cleanupUrls(urls);
    } else if (result && typeof result === 'object' && 'url' in result) {
      cleanupUrls([result.url as string]);
    } else if (result && typeof result === 'object' && 'pdfs' in result) {
      const urls = (result.pdfs as Array<{ url: string }>).map(pdf => pdf.url);
      cleanupUrls(urls);
    }
    setResult(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isProcessing,
    result,
    error,
    processPDF,
    reset,
    clearError,
  };
};
