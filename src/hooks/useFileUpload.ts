import { useState, useRef } from 'react';

import type { RefObject } from 'react';

interface UseFileUploadOptions {
  onFileSelect: (file: File) => void;
  accept?: string;
}

interface UseFileUploadReturn {
  selectedFile: File | null;
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearFile: () => void;
  triggerFileInput: () => void;
}

export const useFileUpload = ({ onFileSelect }: UseFileUploadOptions): UseFileUploadReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return {
    selectedFile,
    fileInputRef: fileInputRef as React.RefObject<HTMLInputElement>,
    handleFileSelect,
    clearFile,
    triggerFileInput,
  };
};
