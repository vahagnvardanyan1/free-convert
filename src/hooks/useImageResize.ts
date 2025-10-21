import { useState } from 'react';

import { loadImage } from '@/utils/imageProcessing';
import { downloadBlob } from '@/utils/download';

import type { Dimensions } from '@/utils/imageProcessing';

export type ResizeMode = 'percentage' | 'pixels' | 'preset';
export type PresetSize = 'thumbnail' | 'small' | 'medium' | 'large' | 'hd' | 'fullhd' | '4k';

interface PresetDimensions extends Dimensions {
  label: string;
  description: string;
}

export const presets: Record<PresetSize, PresetDimensions> = {
  thumbnail: { width: 150, height: 150, label: 'Thumbnail', description: '150×150' },
  small: { width: 640, height: 480, label: 'Small', description: '640×480' },
  medium: { width: 1280, height: 720, label: 'Medium (HD)', description: '1280×720' },
  large: { width: 1920, height: 1080, label: 'Large (Full HD)', description: '1920×1080' },
  hd: { width: 1280, height: 720, label: 'HD', description: '1280×720' },
  fullhd: { width: 1920, height: 1080, label: 'Full HD', description: '1920×1080' },
  '4k': { width: 3840, height: 2160, label: '4K', description: '3840×2160' },
};

interface UseImageResizeOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseImageResizeReturn {
  imageUrl: string | null;
  originalDimensions: Dimensions;
  resizeMode: ResizeMode;
  percentage: number;
  customWidth: number;
  customHeight: number;
  maintainAspectRatio: boolean;
  selectedPreset: PresetSize;
  isResizing: boolean;
  setImageUrl: (url: string | null) => void;
  setOriginalDimensions: (dimensions: Dimensions) => void;
  setResizeMode: (mode: ResizeMode) => void;
  setPercentage: (percentage: number) => void;
  setCustomWidth: (width: number) => void;
  setCustomHeight: (height: number) => void;
  setMaintainAspectRatio: (maintain: boolean) => void;
  setSelectedPreset: (preset: PresetSize) => void;
  handleWidthChange: (width: number) => void;
  handleHeightChange: (height: number) => void;
  handleResize: (params: { imageUrl: string; fileName?: string }) => Promise<void>;
  handleReset: () => void;
  getOutputDimensions: () => Dimensions;
}

export const useImageResize = ({ onSuccess, onError }: UseImageResizeOptions = {}): UseImageResizeReturn => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [resizeMode, setResizeMode] = useState<ResizeMode>('percentage');
  const [percentage, setPercentage] = useState(50);
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<PresetSize>('medium');
  const [isResizing, setIsResizing] = useState(false);

  const handleWidthChange = (width: number) => {
    setCustomWidth(width);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      setCustomHeight(Math.round(width * aspectRatio));
    }
  };

  const handleHeightChange = (height: number) => {
    setCustomHeight(height);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setCustomWidth(Math.round(height * aspectRatio));
    }
  };

  const getOutputDimensions = (): Dimensions => {
    if (resizeMode === 'percentage') {
      return {
        width: Math.round((originalDimensions.width * percentage) / 100),
        height: Math.round((originalDimensions.height * percentage) / 100),
      };
    } else if (resizeMode === 'preset') {
      return { width: presets[selectedPreset].width, height: presets[selectedPreset].height };
    }
    return { width: customWidth, height: customHeight };
  };

  const handleResize = async ({ imageUrl, fileName = 'image' }: { imageUrl: string; fileName?: string }) => {
    if (!imageUrl) return;

    setIsResizing(true);

    try {
      const outputDims = getOutputDimensions();

      // Create a canvas to resize the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      canvas.width = outputDims.width;
      canvas.height = outputDims.height;

      // Load and draw the image
      const img = await loadImage(imageUrl);

      // Use high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, outputDims.width, outputDims.height);

      // Convert to blob and download
      canvas.toBlob(
        blob => {
          if (blob) {
            const cleanFileName = fileName.replace(/\.[^/.]+$/, '');
            downloadBlob({
              blob,
              filename: `resized-${cleanFileName}.png`,
            });
            onSuccess?.();
          }
          setIsResizing(false);
        },
        'image/png',
        1.0,
      );
    } catch (error) {
      console.error('Error resizing image:', error);
      const err = error instanceof Error ? error : new Error('Failed to resize image');
      onError?.(err);
      setIsResizing(false);
    }
  };

  const handleReset = () => {
    setPercentage(50);
    setCustomWidth(originalDimensions.width);
    setCustomHeight(originalDimensions.height);
    setMaintainAspectRatio(true);
  };

  return {
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
    handleReset,
    getOutputDimensions,
  };
};
