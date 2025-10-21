interface FormatFileSizeResult {
  value: string;
  unit: string;
  formatted: string;
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatFileSizeDetailed = (bytes: number): FormatFileSizeResult => {
  if (bytes === 0) {
    return { value: '0', unit: 'Bytes', formatted: '0 Bytes' };
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = (bytes / Math.pow(k, i)).toFixed(2);

  return {
    value,
    unit: sizes[i],
    formatted: `${value} ${sizes[i]}`,
  };
};

export const getCompressionRatio = ({ originalSize, convertedSize }: { originalSize: number; convertedSize: number }): number => {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - convertedSize) / originalSize) * 100);
};

export interface Dimensions {
  width: number;
  height: number;
}

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

export const getImageDimensions = async (file: File): Promise<Dimensions> => {
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    return { width: img.width, height: img.height };
  } finally {
    URL.revokeObjectURL(url);
  }
};
