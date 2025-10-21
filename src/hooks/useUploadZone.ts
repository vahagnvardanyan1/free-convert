import { useState, useRef } from 'react';

import type { RefObject } from 'react';

interface UseUploadZoneOptions {
  onFilesSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

interface UseUploadZoneReturn {
  isDragOver: boolean;
  selectedFiles: File[];
  fileInputRef: RefObject<HTMLInputElement>;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
  clearFiles: () => void;
  removeFile: (index: number) => void;
  addFiles: (files: File[]) => void;
}

export const useUploadZone = ({ onFilesSelect, multiple = false }: UseUploadZoneOptions): UseUploadZoneReturn => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Only set dragOver to false if we're leaving the drop zone entirely
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const filesToAdd = multiple ? files : [files[0]];
      setSelectedFiles(filesToAdd);
      onFilesSelect(filesToAdd);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const filesToAdd = multiple ? files : [files[0]];
      setSelectedFiles(filesToAdd);
      onFilesSelect(filesToAdd);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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

  const addFiles = (files: File[]) => {
    const newFiles = multiple ? [...selectedFiles, ...files] : files;
    setSelectedFiles(newFiles);
    onFilesSelect(newFiles);
  };

  return {
    isDragOver,
    selectedFiles,
    fileInputRef: fileInputRef as React.RefObject<HTMLInputElement>,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    triggerFileInput,
    clearFiles,
    removeFile,
    addFiles,
  };
};
