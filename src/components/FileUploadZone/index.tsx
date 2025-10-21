import { Upload, FileImage, X } from 'lucide-react';

import { Button } from '../ui/button';
import { formatFileSize } from '@/utils/imageProcessing';

interface FileUploadZoneProps {
  isDragOver: boolean;
  selectedFiles: File[];
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile?: (index: number) => void;
  onClear?: () => void;
  accept?: string;
  multiple?: boolean;
  showPreview?: boolean;
  showFileList?: boolean;
  dragOverText?: string;
  defaultText?: string;
  browseText?: string;
  releaseText?: string;
  chooseFileText?: string;
  removeText?: string;
  className?: string;
}

export const FileUploadZone = ({
  isDragOver,
  selectedFiles,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  fileInputRef,
  onFileSelect,
  onRemoveFile,
  onClear,
  accept = 'image/*',
  multiple = false,
  showPreview = false,
  showFileList = true,
  dragOverText = 'Drop file here',
  defaultText = 'Drag & drop your file here',
  browseText = 'or click to browse',
  releaseText = 'Release to upload',
  chooseFileText = 'Choose File',
  removeText = 'Remove',
  className = '',
}: FileUploadZoneProps) => {
  const hasFiles = selectedFiles?.length > 0;

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
        isDragOver ? 'border-blue-500 bg-blue-50 scale-105' : hasFiles ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
      } ${className}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => !hasFiles && onClick()}
    >
      {hasFiles && showFileList ? (
        <div className="space-y-3">
          {selectedFiles?.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                {showPreview && file.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(file)} alt={file.name} className="w-12 h-12 object-cover rounded flex-shrink-0" onLoad={e => URL.revokeObjectURL((e.target as HTMLImageElement).src)} />
                ) : (
                  <FileImage className="text-green-600 flex-shrink-0" size={48} />
                )}
                <div className="text-left min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              {(multiple && onRemoveFile) || onClear ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={e => {
                    e.stopPropagation();
                    if (multiple && onRemoveFile) {
                      onRemoveFile(index);
                    } else if (onClear) {
                      onClear();
                    }
                  }}
                  className="ml-2 flex-shrink-0"
                >
                  <X size={16} />
                  <span className="hidden sm:inline ml-1">{removeText}</span>
                </Button>
              ) : null}
            </div>
          ))}
          {selectedFiles.length > 1 && <p className="text-sm text-gray-600">{selectedFiles.length} files selected</p>}
        </div>
      ) : (
        <div>
          <Upload className={`mx-auto mb-4 transition-all duration-200 ${isDragOver ? 'text-blue-500 scale-110' : 'text-gray-400'}`} size={48} />
          <p className={`text-lg font-medium mb-2 transition-colors duration-200 ${isDragOver ? 'text-blue-600' : 'text-gray-900'}`}>{isDragOver ? dragOverText : defaultText}</p>
          <p className={`text-gray-500 mb-4 transition-colors duration-200 ${isDragOver ? 'text-blue-500' : 'text-gray-500'}`}>{isDragOver ? releaseText : browseText}</p>
          {!isDragOver && (
            <Button
              variant="outline"
              onClick={e => {
                e.stopPropagation();
                onClick();
              }}
              className="rounded-lg"
            >
              {chooseFileText}
            </Button>
          )}
        </div>
      )}

      <input type="file" ref={fileInputRef} onChange={onFileSelect} accept={accept} multiple={multiple} className="hidden" />
    </div>
  );
};
