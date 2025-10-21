import { useState, useRef } from 'react';

import type { RefObject } from 'react';

interface UseMultiFileUploadOptions {
  onFilesSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

interface UseMultiFileUploadReturn {
  selectedFiles: File[];
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearFiles: () => void;
  removeFile: (index: number) => void;
  triggerFileInput: () => void;
}

export const useMultiFileUpload = ({ onFilesSelect }: UseMultiFileUploadOptions): UseMultiFileUploadReturn => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      onFilesSelect(fileArray);
    }
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelect(newFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return {
    selectedFiles,
    fileInputRef: fileInputRef as React.RefObject<HTMLInputElement>,
    handleFileSelect,
    clearFiles,
    removeFile,
    triggerFileInput,
  };
};
