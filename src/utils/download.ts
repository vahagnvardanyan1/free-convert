import type { ConversionResult } from '@/lib/imageConverter';

interface DownloadFileOptions {
  url: string;
  filename: string;
}

interface DownloadBlobOptions {
  blob: Blob;
  filename: string;
}

interface DownloadResourceOptions {
  blob?: Blob;
  url?: string;
  filename: string;
}

export const downloadFile = ({ url, filename }: DownloadFileOptions): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadImage = (result: ConversionResult, filenameOverride?: string): void => {
  downloadFile({
    url: result.url,
    filename: filenameOverride || result.fileName,
  });
};

export const downloadBlob = ({ blob, filename }: DownloadBlobOptions): void => {
  const url = URL.createObjectURL(blob);
  downloadFile({ url, filename });
  URL.revokeObjectURL(url);
};

/**
 * Download a resource from either a blob or existing URL
 * Automatically handles object URL creation and cleanup
 */
export const downloadResource = ({ blob, url, filename }: DownloadResourceOptions): void => {
  if (blob) {
    downloadBlob({ blob, filename });
  } else if (url) {
    downloadFile({ url, filename });
  } else {
    throw new Error('Either blob or url must be provided');
  }
};
