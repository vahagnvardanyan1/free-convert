const SUPPORTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];

const SUPPORTED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.heic', '.heif'];

export const validateImageFile = (file: File): boolean => {
  // Check both file.type and file name extension for HEIC files
  // (sometimes HEIC files don't have the correct MIME type)
  const hasValidType = SUPPORTED_IMAGE_TYPES.includes(file.type);
  const fileName = file.name.toLowerCase();
  const hasValidExtension = SUPPORTED_IMAGE_EXTENSIONS.some(ext => fileName.endsWith(ext));

  return hasValidType || hasValidExtension;
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const normalizeImageFormat = (format: string): string => {
  return format.toUpperCase() === 'JPEG' ? 'JPG' : format.toUpperCase();
};

export const isHeicFile = (file: File): boolean => {
  const fileName = file.name.toLowerCase();
  return fileName.endsWith('.heic') || fileName.endsWith('.heif') || file.type === 'image/heic' || file.type === 'image/heif';
};
