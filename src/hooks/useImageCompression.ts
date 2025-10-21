import { useState } from 'react';

import { loadImage } from '@/utils/imageProcessing';
import { downloadBlob } from '@/utils/download';

export type CompressionTarget = 'quality' | 'filesize' | 'custom';

interface CompressionOptions {
  quality: number;
  targetFileSize?: number;
  compressionTarget: CompressionTarget;
}

interface CompressionResult {
  url: string;
  blob: Blob;
  size: number;
  compressionRatio: number;
}

interface UseImageCompressionOptions {
  onSuccess?: (result: CompressionResult) => void;
  onError?: (error: Error) => void;
}

interface UseImageCompressionReturn {
  imageUrl: string | null;
  originalSize: number;
  compressedUrl: string | null;
  compressedSize: number | null;
  isCompressing: boolean;
  compressionTarget: CompressionTarget;
  quality: number;
  targetFileSize: number;
  setCompressionTarget: (target: CompressionTarget) => void;
  setQuality: (quality: number) => void;
  setTargetFileSize: (size: number) => void;
  loadImageFile: (file: File) => void;
  compress: (params: { file: File; options: CompressionOptions }) => Promise<void>;
  downloadCompressed: (filename?: string) => void;
  reset: () => void;
}

export const useImageCompression = ({ onSuccess, onError }: UseImageCompressionOptions = {}): UseImageCompressionReturn => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionTarget, setCompressionTarget] = useState<CompressionTarget>('quality');
  const [quality, setQuality] = useState(80);
  const [targetFileSize, setTargetFileSize] = useState(100);

  const loadImageFile = (file: File) => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl);
    }

    setOriginalSize(file.size);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCompressedUrl(null);
    setCompressedSize(null);
    setCompressedBlob(null);
  };

  const compress = async ({ file, options }: { file: File; options: CompressionOptions }) => {
    setIsCompressing(true);

    try {
      const img = await loadImage(URL.createObjectURL(file));

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to get canvas context');

      ctx.drawImage(img, 0, 0);

      let finalQuality = options.quality / 100;

      if (options.compressionTarget === 'filesize' && options.targetFileSize) {
        // Binary search for the right quality to achieve target file size
        finalQuality = await findOptimalQuality({
          canvas,
          targetBytes: options.targetFileSize * 1024,
          maxAttempts: 10,
        });
      }

      // Create final compressed image
      const blob = await new Promise<Blob | null>(resolve => {
        canvas.toBlob(b => resolve(b), 'image/jpeg', finalQuality);
      });

      if (!blob) throw new Error('Failed to create compressed image');

      const url = URL.createObjectURL(blob);
      const compressionRatio = ((file.size - blob.size) / file.size) * 100;

      setCompressedUrl(url);
      setCompressedSize(blob.size);
      setCompressedBlob(blob);

      onSuccess?.({
        url,
        blob,
        size: blob.size,
        compressionRatio,
      });
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Compression failed');
      onError?.(err);
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadCompressed = (filename?: string) => {
    if (compressedBlob) {
      downloadBlob({
        blob: compressedBlob,
        filename: filename || 'compressed-image.jpg',
      });
    }
  };

  const reset = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl);
    }
    setImageUrl(null);
    setOriginalSize(0);
    setCompressedUrl(null);
    setCompressedSize(null);
    setCompressedBlob(null);
  };

  return {
    imageUrl,
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
  };
};

// Helper function to find optimal quality for target file size
const findOptimalQuality = async ({ canvas, targetBytes, maxAttempts }: { canvas: HTMLCanvasElement; targetBytes: number; maxAttempts: number }): Promise<number> => {
  let minQuality = 0.1;
  let maxQuality = 1.0;
  let attempts = 0;
  let finalQuality = 0.5;

  while (attempts < maxAttempts) {
    const testQuality = (minQuality + maxQuality) / 2;
    const blob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(b => resolve(b), 'image/jpeg', testQuality);
    });

    if (!blob) break;

    if (Math.abs(blob.size - targetBytes) < targetBytes * 0.1) {
      // Within 10% of target
      finalQuality = testQuality;
      break;
    }

    if (blob.size > targetBytes) {
      maxQuality = testQuality;
    } else {
      minQuality = testQuality;
    }

    finalQuality = testQuality;
    attempts++;
  }

  return finalQuality;
};
