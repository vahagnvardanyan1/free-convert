import { useState } from 'react';

interface UsePDFToImagesOptions {
  imageFormat: 'jpg' | 'png' | 'webp';
  imageQuality: number;
  imageScale: number;
  pageRange: string;
  setImageFormat: (format: 'jpg' | 'png' | 'webp') => void;
  setImageQuality: (quality: number) => void;
  setImageScale: (scale: number) => void;
  setPageRange: (range: string) => void;
  parsePageRange: (range: string) => number[] | null;
}

interface UseImagesToPDFOptions {
  pageSize: 'A4' | 'A3' | 'letter' | 'legal';
  orientation: 'portrait' | 'landscape';
  margin: number;
  fitToPage: boolean;
  setPageSize: (size: 'A4' | 'A3' | 'letter' | 'legal') => void;
  setOrientation: (orientation: 'portrait' | 'landscape') => void;
  setMargin: (margin: number) => void;
  setFitToPage: (fit: boolean) => void;
}

interface UseSplitPDFOptions {
  splitRanges: Array<{ start: number; end: number; name?: string }>;
  setSplitRanges: (ranges: Array<{ start: number; end: number; name?: string }>) => void;
  addSplitRange: () => void;
  removeSplitRange: (index: number) => void;
  updateSplitRange: (params: { index: number; field: 'start' | 'end' | 'name'; value: number | string }) => void;
}

export const usePDFToImagesOptions = (): UsePDFToImagesOptions => {
  const [imageFormat, setImageFormat] = useState<'jpg' | 'png' | 'webp'>('jpg');
  const [imageQuality, setImageQuality] = useState(0.9);
  const [imageScale, setImageScale] = useState(2);
  const [pageRange, setPageRange] = useState('');

  const parsePageRange = (range: string): number[] | null => {
    if (!range.trim()) return null;

    try {
      const pages: number[] = [];
      const parts = range.split(',');

      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
          if (isNaN(start) || isNaN(end) || start > end) {
            throw new Error('Invalid range');
          }
          for (let i = start; i <= end; i++) {
            pages.push(i);
          }
        } else {
          const pageNum = parseInt(trimmed);
          if (isNaN(pageNum)) {
            throw new Error('Invalid page number');
          }
          pages.push(pageNum);
        }
      }

      return pages;
    } catch {
      return null;
    }
  };

  return {
    imageFormat,
    imageQuality,
    imageScale,
    pageRange,
    setImageFormat,
    setImageQuality,
    setImageScale,
    setPageRange,
    parsePageRange,
  };
};

export const useImagesToPDFOptions = (): UseImagesToPDFOptions => {
  const [pageSize, setPageSize] = useState<'A4' | 'A3' | 'letter' | 'legal'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState(20);
  const [fitToPage, setFitToPage] = useState(true);

  return {
    pageSize,
    orientation,
    margin,
    fitToPage,
    setPageSize,
    setOrientation,
    setMargin,
    setFitToPage,
  };
};

export const useSplitPDFOptions = (): UseSplitPDFOptions => {
  const [splitRanges, setSplitRanges] = useState<Array<{ start: number; end: number; name?: string }>>([{ start: 1, end: 1 }]);

  const addSplitRange = () => {
    setSplitRanges([...splitRanges, { start: 1, end: 1 }]);
  };

  const removeSplitRange = (index: number) => {
    setSplitRanges(splitRanges.filter((_, i) => i !== index));
  };

  const updateSplitRange = ({ index, field, value }: { index: number; field: 'start' | 'end' | 'name'; value: number | string }) => {
    const newRanges = [...splitRanges];
    if (field === 'name') {
      newRanges[index][field] = value as string;
    } else {
      newRanges[index][field] = value as number;
    }
    setSplitRanges(newRanges);
  };

  return {
    splitRanges,
    setSplitRanges,
    addSplitRange,
    removeSplitRange,
    updateSplitRange,
  };
};
