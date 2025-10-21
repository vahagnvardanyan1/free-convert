import { useState } from 'react';

import { convertImage, cleanupImageUrl } from '@/lib/imageConverter';

import type { ConversionResult, SupportedFormat, ConversionOptions } from '@/lib/imageConverter';

interface UseImageConversionOptions {
  onSuccess?: (result: ConversionResult) => void;
  onError?: (error: Error) => void;
}

interface UseImageConversionReturn {
  isConverting: boolean;
  conversionResult: ConversionResult | null;
  error: string | null;
  convert: (params: { file: File; targetFormat: SupportedFormat; options?: ConversionOptions }) => Promise<void>;
  reset: () => void;
  clearError: () => void;
}

export const useImageConversion = ({ onSuccess, onError }: UseImageConversionOptions = {}): UseImageConversionReturn => {
  const [isConverting, setIsConverting] = useState(false);
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = async ({ file, targetFormat, options = {} }: { file: File; targetFormat: SupportedFormat; options?: ConversionOptions }) => {
    setIsConverting(true);
    setError(null);
    setConversionResult(null);

    try {
      const result = await convertImage(file, targetFormat, options);
      setConversionResult(result);
      onSuccess?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsConverting(false);
    }
  };

  const reset = () => {
    if (conversionResult) {
      cleanupImageUrl(conversionResult.url);
    }
    setConversionResult(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isConverting,
    conversionResult,
    error,
    convert,
    reset,
    clearError,
  };
};
