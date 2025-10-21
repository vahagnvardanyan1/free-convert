import { validatePDFFile, validateImageForPDF } from '@/lib/pdfConverter';

export type PDFToolMode = 'pdf-to-images' | 'images-to-pdf' | 'merge-pdf' | 'split-pdf' | 'pdf-info';

interface ValidateFilesForModeParams {
  files: File[];
  mode: PDFToolMode;
}

interface ValidationResult {
  isValid: boolean;
  errorKey?: string; // Translation key for error message
}

export const validateFilesForMode = ({ files, mode }: ValidateFilesForModeParams): ValidationResult => {
  switch (mode) {
    case 'pdf-to-images':
    case 'pdf-info':
    case 'split-pdf':
      if (files.length !== 1) {
        return { isValid: false, errorKey: 'selectExactlyOnePdf' };
      }
      if (!validatePDFFile(files[0])) {
        return { isValid: false, errorKey: 'selectValidPdf' };
      }
      break;

    case 'images-to-pdf':
      if (files.length === 0) {
        return { isValid: false, errorKey: 'selectAtLeastOneImage' };
      }
      const invalidImageFiles = files.filter(file => !validateImageForPDF(file));
      if (invalidImageFiles.length > 0) {
        return { isValid: false, errorKey: 'allFilesMustBeImages' };
      }
      break;

    case 'merge-pdf':
      if (files.length < 2) {
        return { isValid: false, errorKey: 'selectAtLeastTwoPdfs' };
      }
      const invalidPdfFiles = files.filter(file => !validatePDFFile(file));
      if (invalidPdfFiles.length > 0) {
        return { isValid: false, errorKey: 'allFilesMustBePdfs' };
      }
      break;

    default:
      return { isValid: false, errorKey: 'invalidOperationMode' };
  }

  return { isValid: true };
};

export const getAcceptedFileTypes = (mode: PDFToolMode): string => {
  switch (mode) {
    case 'images-to-pdf':
      return 'image/*';
    case 'pdf-to-images':
    case 'merge-pdf':
    case 'split-pdf':
    case 'pdf-info':
      return 'application/pdf,.pdf';
    default:
      return '*';
  }
};

export const getAllowsMultiple = (mode: PDFToolMode): boolean => {
  return mode === 'images-to-pdf' || mode === 'merge-pdf';
};
