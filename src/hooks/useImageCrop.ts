import { useState, useRef, useEffect } from 'react';

import type Cropper from 'cropperjs';

interface UseImageCropOptions {
  onCropComplete?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

interface UseImageCropReturn {
  imageUrl: string | null;
  cropper: Cropper | null;
  aspectRatio: number | undefined;
  isCropping: boolean;
  imageRef: React.RefObject<HTMLImageElement | null>;
  setImageUrl: (url: string | null) => void;
  setAspectRatio: (ratio: number | undefined) => void;
  setCropper: (cropper: Cropper | null) => void;
  initializeCropper: (params: { imageElement: HTMLImageElement; aspectRatio?: number }) => void;
  cropImage: (params: { filename?: string }) => void;
  resetCrop: () => void;
  rotateCrop: (degrees: number) => void;
  flipCrop: (direction: 'horizontal' | 'vertical') => void;
  zoomCrop: (ratio: number) => void;
  destroyCropper: () => void;
}

export const useImageCrop = ({ onCropComplete, onError }: UseImageCropOptions = {}): UseImageCropReturn => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [cropper, setCropper] = useState<Cropper | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [isCropping, setIsCropping] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Initialize cropper when image is loaded
  const initializeCropper = async ({ imageElement, aspectRatio: initialAspectRatio }: { imageElement: HTMLImageElement; aspectRatio?: number }) => {
    try {
      // Dynamically import cropperjs to avoid SSR issues
      const CropperJS = (await import('cropperjs')).default;

      const cropperInstance = new CropperJS(imageElement, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: initialAspectRatio,
        autoCropArea: 0.8,
        restore: false,
        guides: true,
        center: true,
        highlight: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
      });

      setCropper(cropperInstance);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to initialize cropper');
      onError?.(err);
    }
  };

  // Update aspect ratio when it changes
  useEffect(() => {
    if (cropper) {
      cropper.setAspectRatio(aspectRatio || NaN);
    }
  }, [aspectRatio, cropper]);

  // Crop and download the image
  const cropImage = ({ filename = 'cropped-image.png' }: { filename?: string }) => {
    if (!cropper) return;

    setIsCropping(true);
    try {
      cropper.getCroppedCanvas().toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          onCropComplete?.(blob);
        }
        setIsCropping(false);
      });
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to crop image');
      onError?.(err);
      setIsCropping(false);
    }
  };

  // Reset crop to original
  const resetCrop = () => {
    cropper?.reset();
  };

  // Rotate image
  const rotateCrop = (degrees: number) => {
    cropper?.rotate(degrees);
  };

  // Flip image
  const flipCrop = (direction: 'horizontal' | 'vertical') => {
    if (!cropper) return;

    if (direction === 'horizontal') {
      const scaleX = cropper.getData().scaleX || 1;
      cropper.scaleX(-scaleX);
    } else {
      const scaleY = cropper.getData().scaleY || 1;
      cropper.scaleY(-scaleY);
    }
  };

  // Zoom image
  const zoomCrop = (ratio: number) => {
    cropper?.zoom(ratio);
  };

  // Destroy cropper instance
  const destroyCropper = () => {
    if (cropper) {
      cropper.destroy();
      setCropper(null);
    }
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cropper) {
        cropper.destroy();
      }
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    imageUrl,
    cropper,
    aspectRatio,
    isCropping,
    imageRef,
    setImageUrl,
    setAspectRatio,
    setCropper,
    initializeCropper,
    cropImage,
    resetCrop,
    rotateCrop,
    flipCrop,
    zoomCrop,
    destroyCropper,
  };
};
