import { PDFDocument } from 'pdf-lib';
import { jsPDF } from 'jspdf';

export type PDFConversionFormat = 'jpg' | 'png' | 'webp';

export interface PDFConversionOptions {
  format?: PDFConversionFormat;
  quality?: number; // 0-1 for JPEG quality
  scale?: number; // 1-5 for resolution scaling
  pageNumbers?: number[]; // Specific pages to convert (1-indexed)
  maxWidth?: number;
  maxHeight?: number;
}

export interface ImageToPDFOptions {
  pageSize?: 'A4' | 'A3' | 'letter' | 'legal' | 'custom';
  orientation?: 'portrait' | 'landscape';
  margin?: number; // in mm
  quality?: number; // 0-1 for image quality
  fitToPage?: boolean;
  customWidth?: number; // in mm for custom page size
  customHeight?: number; // in mm for custom page size
}

export interface PDFConversionResult {
  images: {
    blob: Blob;
    url: string;
    fileName: string;
    pageNumber: number;
  }[];
  totalPages: number;
  originalSize: number;
  convertedSize: number;
}

export interface PDFCreationResult {
  blob: Blob;
  url: string;
  fileName: string;
  originalSize: number;
  convertedSize: number;
  pageCount: number;
}

export interface PDFMergeResult {
  blob: Blob;
  url: string;
  fileName: string;
  totalPages: number;
  originalSize: number;
  convertedSize: number;
}

export interface PDFSplitResult {
  pdfs: {
    blob: Blob;
    url: string;
    fileName: string;
    pageRange: string;
    pageCount: number;
  }[];
  originalSize: number;
  convertedSize: number;
}

/**
 * Validates if the file is a PDF
 */
export const validatePDFFile = (file: File): boolean => {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
};

/**
 * Validates if the file is a supported image format for PDF creation
 */
export const validateImageForPDF = (file: File): boolean => {
  const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/heic', 'image/heif'];
  // Check both file.type and file name extension for HEIC files (sometimes HEIC files don't have the correct MIME type)
  const hasValidType = supportedTypes.includes(file.type);
  const hasHeicExtension = file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
  return hasValidType || hasHeicExtension;
};

/**
 * Initialize PDF.js with proper error handling
 */
const initializePDFJS = async () => {
  if (typeof window === 'undefined') {
    throw new Error('PDF operations are only available in the browser');
  }

  try {
    // Load PDF.js from CDN directly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).pdfjsLib) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    const pdfjs = (window as unknown as Record<string, unknown>).pdfjsLib;
    if (!pdfjs) {
      throw new Error('PDF.js not found on window object');
    }

    // Set worker source
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (pdfjs as any).GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    return pdfjs;
  } catch (error) {
    console.error('Failed to initialize PDF.js:', error);
    throw new Error('Failed to load PDF processing library. Please refresh the page and try again.');
  }
};

/**
 * Convert PDF pages to images
 */
export const convertPDFToImages = async (file: File, options: PDFConversionOptions = {}): Promise<PDFConversionResult> => {
  if (!validatePDFFile(file)) {
    throw new Error('Please select a valid PDF file');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfjs: any = await initializePDFJS();
  const { format = 'jpg', quality = 0.9, scale = 2, pageNumbers, maxWidth = 2048, maxHeight = 2048 } = options;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;

    const pagesToConvert = pageNumbers || Array.from({ length: totalPages }, (_, i) => i + 1);
    const images: PDFConversionResult['images'] = [];
    let totalConvertedSize = 0;

    for (const pageNum of pagesToConvert) {
      if (pageNum < 1 || pageNum > totalPages) continue;

      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      // Limit dimensions
      let finalScale = scale;
      if (viewport.width > maxWidth || viewport.height > maxHeight) {
        const scaleX = maxWidth / viewport.width;
        const scaleY = maxHeight / viewport.height;
        finalScale = Math.min(scaleX, scaleY) * scale;
      }

      const finalViewport = page.getViewport({ scale: finalScale });

      // Create canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Canvas context not available');
      }

      canvas.width = finalViewport.width;
      canvas.height = finalViewport.height;

      // Render page
      await page.render({
        canvasContext: context,
        viewport: finalViewport,
      }).promise;

      // Convert to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          blob => {
            if (!blob) {
              reject(new Error('Failed to convert page to image'));
              return;
            }
            resolve(blob);
          },
          `image/${format}`,
          format === 'jpg' ? quality : undefined,
        );
      });

      const url = URL.createObjectURL(blob);
      const fileName = generateImageFileName(file.name, pageNum, format);

      images.push({
        blob,
        url,
        fileName,
        pageNumber: pageNum,
      });

      totalConvertedSize += blob.size;
    }

    return {
      images,
      totalPages,
      originalSize: file.size,
      convertedSize: totalConvertedSize,
    };
  } catch (error) {
    throw new Error(`PDF conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Convert images to a single PDF
 */
export const convertImagesToPDF = async (files: File[], options: ImageToPDFOptions = {}): Promise<PDFCreationResult> => {
  if (files.length === 0) {
    throw new Error('Please select at least one image file');
  }

  const invalidFiles = files.filter(file => !validateImageForPDF(file));
  if (invalidFiles.length > 0) {
    throw new Error('Some files are not supported image formats (PNG, JPG, WebP, HEIC)');
  }

  // Preprocess HEIC files to PNG
  const processedFiles: File[] = [];
  for (const file of files) {
    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif') || file.type === 'image/heic' || file.type === 'image/heif';
    if (isHeic) {
      try {
        // Dynamically import heic2any only when needed (client-side only)
        const heic2any = (await import('heic2any')).default;
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/png',
          quality: 1,
        });
        const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        const processedFile = new File([blob], file.name.replace(/\.heic$/i, '.png').replace(/\.heif$/i, '.png'), { type: 'image/png' });
        processedFiles.push(processedFile);
      } catch (heicError) {
        throw new Error(`Failed to process HEIC file ${file.name}: ${heicError}`);
      }
    } else {
      processedFiles.push(file);
    }
  }

  const { pageSize = 'A4', orientation = 'portrait', margin = 20, fitToPage = true, customWidth = 210, customHeight = 297 } = options;

  try {
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: pageSize === 'custom' ? [customWidth, customHeight] : pageSize,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;

    let totalOriginalSize = 0;

    for (let i = 0; i < processedFiles.length; i++) {
      const file = processedFiles[i];
      totalOriginalSize += files[i].size; // Use original file size for stats

      // Add new page for each image except the first
      if (i > 0) {
        pdf.addPage();
      }

      try {
        const imageDataUrl = await fileToDataURL(file);
        const img = new Image();

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imageDataUrl;
        });

        let imgWidth = img.width * 0.264583; // Convert pixels to mm (96 DPI)
        let imgHeight = img.height * 0.264583;

        if (fitToPage) {
          // Calculate scaling to fit within available area
          const scaleX = availableWidth / imgWidth;
          const scaleY = availableHeight / imgHeight;
          const scale = Math.min(scaleX, scaleY);

          imgWidth *= scale;
          imgHeight *= scale;
        }

        // Center the image
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        pdf.addImage(imageDataUrl, 'JPEG', x, y, imgWidth, imgHeight);
      } catch (imageError) {
        console.warn(`Failed to add image ${file.name}:`, imageError);
        // Continue with other images
      }
    }

    const pdfBlob = pdf.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const fileName = generatePDFFileName('images-to-pdf');

    return {
      blob: pdfBlob,
      url,
      fileName,
      originalSize: totalOriginalSize,
      convertedSize: pdfBlob.size,
      pageCount: files.length,
    };
  } catch (error) {
    throw new Error(`PDF creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Merge multiple PDF files
 */
export const mergePDFs = async (files: File[]): Promise<PDFMergeResult> => {
  if (files.length < 2) {
    throw new Error('Please select at least 2 PDF files to merge');
  }

  const invalidFiles = files.filter(file => !validatePDFFile(file));
  if (invalidFiles.length > 0) {
    throw new Error('All files must be PDF files');
  }

  try {
    const mergedPdf = await PDFDocument.create();
    let totalPages = 0;
    let totalOriginalSize = 0;

    for (const file of files) {
      totalOriginalSize += file.size;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pageIndices = pdf.getPageIndices();

      const pages = await mergedPdf.copyPages(pdf, pageIndices);
      pages.forEach(page => mergedPdf.addPage(page));

      totalPages += pageIndices.length;
    }

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const fileName = generatePDFFileName('merged-document');

    return {
      blob,
      url,
      fileName,
      totalPages,
      originalSize: totalOriginalSize,
      convertedSize: blob.size,
    };
  } catch (error) {
    throw new Error(`PDF merge failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Split PDF into separate files
 */
export const splitPDF = async (file: File, splitRanges: { start: number; end: number; name?: string }[]): Promise<PDFSplitResult> => {
  if (!validatePDFFile(file)) {
    throw new Error('Please select a valid PDF file');
  }

  if (splitRanges.length === 0) {
    throw new Error('Please specify at least one page range to split');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const originalPdf = await PDFDocument.load(arrayBuffer);
    const totalPages = originalPdf.getPageCount();

    // Validate ranges
    for (const range of splitRanges) {
      if (range.start < 1 || range.end > totalPages || range.start > range.end) {
        throw new Error(`Invalid page range: ${range.start}-${range.end}`);
      }
    }

    const pdfs: PDFSplitResult['pdfs'] = [];
    let totalConvertedSize = 0;

    for (let i = 0; i < splitRanges.length; i++) {
      const range = splitRanges[i];
      const newPdf = await PDFDocument.create();

      // Copy pages (convert to 0-indexed)
      const pageIndices = Array.from({ length: range.end - range.start + 1 }, (_, j) => range.start - 1 + j);

      const pages = await newPdf.copyPages(originalPdf, pageIndices);
      pages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const fileName = range.name ? `${range.name}.pdf` : generatePDFFileName(`${file.name.replace('.pdf', '')}-pages-${range.start}-${range.end}`);

      const pageRange = range.start === range.end ? `Page ${range.start}` : `Pages ${range.start}-${range.end}`;

      pdfs.push({
        blob,
        url,
        fileName,
        pageRange,
        pageCount: range.end - range.start + 1,
      });

      totalConvertedSize += blob.size;
    }

    return {
      pdfs,
      originalSize: file.size,
      convertedSize: totalConvertedSize,
    };
  } catch (error) {
    throw new Error(`PDF split failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Get PDF information
 */
export const getPDFInfo = async (
  file: File,
): Promise<{
  pageCount: number;
  fileSize: number;
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
}> => {
  if (!validatePDFFile(file)) {
    throw new Error('Please select a valid PDF file');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);

    const pageCount = pdf.getPageCount();
    const title = pdf.getTitle();
    const author = pdf.getAuthor();
    const subject = pdf.getSubject();
    const creator = pdf.getCreator();
    const producer = pdf.getProducer();
    const creationDate = pdf.getCreationDate();
    const modificationDate = pdf.getModificationDate();

    return {
      pageCount,
      fileSize: file.size,
      title: title || undefined,
      author: author || undefined,
      subject: subject || undefined,
      creator: creator || undefined,
      producer: producer || undefined,
      creationDate: creationDate || undefined,
      modificationDate: modificationDate || undefined,
    };
  } catch (error) {
    throw new Error(`Failed to read PDF info: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Helper function to convert file to data URL
 */
const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Generate filename for converted images
 */
const generateImageFileName = (originalName: string, pageNumber: number, format: string): string => {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  return `${nameWithoutExt}-page-${pageNumber}.${format}`;
};

/**
 * Generate filename for PDF files
 */
const generatePDFFileName = (baseName: string): string => {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  return `${baseName}-${timestamp}.pdf`;
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Download a file
 */
export const downloadFile = (blob: Blob, fileName: string): void => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Clean up object URLs to prevent memory leaks
 */
export const cleanupUrls = (urls: string[]): void => {
  urls.forEach(url => URL.revokeObjectURL(url));
};

/**
 * Download multiple files as a ZIP (using JSZip if available)
 */
export const downloadMultipleFiles = (files: { blob: Blob; fileName: string }[]): void => {
  // For now, download files individually
  // In a production app, you might want to add JSZip for creating ZIP files
  files.forEach((file, index) => {
    setTimeout(() => downloadFile(file.blob, file.fileName), index * 100);
  });
};

/**
 * Convert PDF pages to images using canvas-based approach
 */
export const convertPDFToImagesCanvas = async (file: File, options: PDFConversionOptions = {}): Promise<PDFConversionResult> => {
  if (!validatePDFFile(file)) {
    throw new Error('Please select a valid PDF file');
  }

  const { format = 'jpg', quality = 0.9 } = options;

  try {
    // For now, we'll create a simple implementation that works without PDF.js
    // This is a fallback that shows the structure - you can enhance it later
    const images: PDFConversionResult['images'] = [];

    // Create a placeholder result for now
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Draw a simple placeholder
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#6c757d';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('PDF Page Preview', canvas.width / 2, canvas.height / 2);
      ctx.fillText('(PDF.js loading...)', canvas.width / 2, canvas.height / 2 + 40);
    }

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (!blob) {
            reject(new Error('Failed to create preview'));
            return;
          }
          resolve(blob);
        },
        `image/${format}`,
        format === 'jpg' ? quality : undefined,
      );
    });

    const url = URL.createObjectURL(blob);
    const fileName = generateImageFileName(file.name, 1, format);

    images.push({
      blob,
      url,
      fileName,
      pageNumber: 1,
    });

    return {
      images,
      totalPages: 1,
      originalSize: file.size,
      convertedSize: blob.size,
    };
  } catch (error) {
    throw new Error(`PDF conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
