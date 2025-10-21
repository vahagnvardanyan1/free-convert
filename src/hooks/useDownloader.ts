import { useCallback } from 'react';

import { downloadResource } from '@/utils/download';

interface DownloadOptions {
  blob?: Blob;
  url?: string;
  filename: string;
}

interface UseDownloaderReturn {
  download: (options: DownloadOptions) => void;
  downloadBlob: (blob: Blob, filename: string) => void;
  downloadUrl: (url: string, filename: string) => void;
}

export const useDownloader = (): UseDownloaderReturn => {
  const download = useCallback((options: DownloadOptions) => {
    downloadResource(options);
  }, []);

  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    downloadResource({ blob, filename });
  }, []);

  const downloadUrl = useCallback((url: string, filename: string) => {
    downloadResource({ url, filename });
  }, []);

  return {
    download,
    downloadBlob,
    downloadUrl,
  };
};
