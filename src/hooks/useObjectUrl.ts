import { useState, useEffect, useCallback } from 'react';

interface UseObjectUrlReturn {
  url: string | null;
  createUrl: (blob: Blob | File) => string;
  revokeUrl: () => void;
  updateUrl: (blob: Blob | File) => string;
}

export const useObjectUrl = (): UseObjectUrlReturn => {
  const [url, setUrl] = useState<string | null>(null);

  const createUrl = useCallback((blob: Blob | File): string => {
    const objectUrl = URL.createObjectURL(blob);
    setUrl(objectUrl);
    return objectUrl;
  }, []);

  const revokeUrl = useCallback(() => {
    if (url) {
      URL.revokeObjectURL(url);
      setUrl(null);
    }
  }, [url]);

  const updateUrl = useCallback(
    (blob: Blob | File): string => {
      revokeUrl();
      return createUrl(blob);
    },
    [createUrl, revokeUrl],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  return {
    url,
    createUrl,
    revokeUrl,
    updateUrl,
  };
};

interface UseMultiObjectUrlReturn {
  urls: string[];
  createUrls: (blobs: (Blob | File)[]) => string[];
  addUrl: (blob: Blob | File) => string;
  removeUrl: (index: number) => void;
  revokeAll: () => void;
}

export const useMultiObjectUrl = (): UseMultiObjectUrlReturn => {
  const [urls, setUrls] = useState<string[]>([]);

  const createUrls = useCallback((blobs: (Blob | File)[]): string[] => {
    const objectUrls = blobs.map(blob => URL.createObjectURL(blob));
    setUrls(objectUrls);
    return objectUrls;
  }, []);

  const addUrl = useCallback((blob: Blob | File): string => {
    const objectUrl = URL.createObjectURL(blob);
    setUrls(prev => [...prev, objectUrl]);
    return objectUrl;
  }, []);

  const removeUrl = useCallback((index: number) => {
    setUrls(prev => {
      const url = prev[index];
      if (url) {
        URL.revokeObjectURL(url);
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const revokeAll = useCallback(() => {
    urls.forEach(url => URL.revokeObjectURL(url));
    setUrls([]);
  }, [urls]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [urls]);

  return {
    urls,
    createUrls,
    addUrl,
    removeUrl,
    revokeAll,
  };
};
