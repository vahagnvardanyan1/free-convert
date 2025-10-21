export type ToolCategory = 'ai' | 'image' | 'pdf' | 'color' | 'text' | 'font' | 'json' | 'blog';

// Type-safe translation keys for header namespace
export type HeaderTranslationKey = keyof IntlMessages['header'];

export interface Tool {
  translationKey: HeaderTranslationKey;
  path: string;
  icon: string; // Icon name from lucide-react
  popular?: boolean;
  category: ToolCategory;
  from?: string; // For converters (display name)
  to?: string; // For converters (display name)
}

export interface ToolCategoryItem {
  key: ToolCategory;
  translationKey: HeaderTranslationKey;
  icon: string;
  tools: Tool[];
}

// AI Tools
export const AI_TOOLS: Tool[] = [
  { translationKey: 'aiImageGenerator', path: '/ai-image-generator', icon: 'Wand2', popular: true, category: 'ai' },
  { translationKey: 'removeBackground', path: '/remove-background', icon: 'Eraser', popular: true, category: 'ai' },
];

// Image Tools
export const IMAGE_TOOLS: Tool[] = [
  { translationKey: 'compressImage', path: '/compress-image', icon: 'Maximize2', popular: true, category: 'image' },
  { translationKey: 'cropImage', path: '/crop-image', icon: 'Crop', popular: true, category: 'image' },
  { translationKey: 'resizeImage', path: '/resize-image', icon: 'Maximize', popular: true, category: 'image' },
  { translationKey: 'imageAnalyzer', path: '/analyze', icon: 'ScanSearch', popular: true, category: 'image' },
  { translationKey: 'qrCodeGenerator', path: '/qr-code-generator', icon: 'QrCode', popular: true, category: 'image' },
  { translationKey: 'chartGenerator', path: '/chart-generator', icon: 'BarChart3', popular: true, category: 'image' },
];

// Image Converters
export const IMAGE_CONVERTERS: Tool[] = [
  { translationKey: 'pngToWebp', path: '/png-to-webp', icon: 'Globe', popular: true, category: 'image', from: 'PNG', to: 'WebP' },
  { translationKey: 'jpgToPng', path: '/jpg-to-png', icon: 'ImageIcon', popular: true, category: 'image', from: 'JPG', to: 'PNG' },
  { translationKey: 'jpgToWebp', path: '/jpg-to-webp', icon: 'Globe', popular: true, category: 'image', from: 'JPG', to: 'WebP' },
  { translationKey: 'webpToPng', path: '/webp-to-png', icon: 'FileImage', popular: false, category: 'image', from: 'WebP', to: 'PNG' },
  { translationKey: 'pngToJpg', path: '/png-to-jpg', icon: 'Camera', popular: false, category: 'image', from: 'PNG', to: 'JPG' },
  { translationKey: 'webpToJpg', path: '/webp-to-jpg', icon: 'Camera', popular: false, category: 'image', from: 'WebP', to: 'JPG' },
  { translationKey: 'heicToJpg', path: '/heic-to-jpg', icon: 'Camera', popular: true, category: 'image', from: 'HEIC', to: 'JPG' },
  { translationKey: 'heicToPng', path: '/heic-to-png', icon: 'ImageIcon', popular: false, category: 'image', from: 'HEIC', to: 'PNG' },
  { translationKey: 'heicToWebp', path: '/heic-to-webp', icon: 'Globe', popular: false, category: 'image', from: 'HEIC', to: 'WebP' },
];

// PDF Tools
export const PDF_TOOLS: Tool[] = [
  { translationKey: 'pdfToJpg', path: '/pdf-to-jpg', icon: 'FileText', popular: true, category: 'pdf', from: 'PDF', to: 'JPG' },
  { translationKey: 'pdfToPng', path: '/pdf-to-png', icon: 'FileText', popular: true, category: 'pdf', from: 'PDF', to: 'PNG' },
  { translationKey: 'imagesToPdf', path: '/images-to-pdf', icon: 'FileImage', popular: true, category: 'pdf', from: 'Images', to: 'PDF' },
  { translationKey: 'pngToPdf', path: '/png-to-pdf', icon: 'FileImage', popular: true, category: 'pdf', from: 'PNG', to: 'PDF' },
  { translationKey: 'jpgToPdf', path: '/jpg-to-pdf', icon: 'FileImage', popular: true, category: 'pdf', from: 'JPG', to: 'PDF' },
  { translationKey: 'heicToPdf', path: '/heic-to-pdf', icon: 'FileText', popular: false, category: 'pdf', from: 'HEIC', to: 'PDF' },
  { translationKey: 'webpToPdf', path: '/webp-to-pdf', icon: 'FileImage', popular: false, category: 'pdf', from: 'WebP', to: 'PDF' },
  { translationKey: 'mergePdf', path: '/merge-pdf', icon: 'Merge', popular: false, category: 'pdf', from: 'Merge', to: 'PDF' },
  { translationKey: 'splitPdf', path: '/split-pdf', icon: 'Split', popular: false, category: 'pdf', from: 'Split', to: 'PDF' },
  { translationKey: 'pdfInfo', path: '/pdf-info', icon: 'Info', popular: false, category: 'pdf' },
];

// Color Tools
export const COLOR_TOOLS: Tool[] = [
  { translationKey: 'colorPicker', path: '/colors/picker', icon: 'Palette', popular: true, category: 'color' },
  { translationKey: 'colorPalettes', path: '/colors/palettes', icon: 'Droplet', popular: true, category: 'color' },
  { translationKey: 'gradientGenerator', path: '/colors/gradients', icon: 'Blend', popular: true, category: 'color' },
  { translationKey: 'colorConverter', path: '/colors/converter', icon: 'Shuffle', popular: false, category: 'color' },
];

// Text Tools
export const TEXT_TOOLS: Tool[] = [
  { translationKey: 'emojis', path: '/texts/emojis', icon: 'Smile', popular: true, category: 'text' },
  { translationKey: 'symbols', path: '/texts/symbols', icon: 'Hash', popular: true, category: 'text' },
];

// JSON Tools
export const JSON_TOOLS: Tool[] = [
  { translationKey: 'jsonValidator', path: '/texts/json-validator', icon: 'CheckCircle2', popular: true, category: 'json' },
  { translationKey: 'jsonComparer', path: '/texts/json-comparer', icon: 'GitCompare', popular: true, category: 'json' },
  { translationKey: 'jsonParser', path: '/texts/json-parser', icon: 'Code2', popular: true, category: 'json' },
];

// Font Tools
export const FONT_TOOLS: Tool[] = [
  { translationKey: 'fontPreview', path: '/fonts/preview', icon: 'Type', popular: true, category: 'font' },
  { translationKey: 'fontPairings', path: '/fonts/pairings', icon: 'Columns2', popular: true, category: 'font' },
  { translationKey: 'typographicScale', path: '/fonts/scales', icon: 'Ruler', popular: true, category: 'font' },
];

// Blog Guides
export const BLOG_GUIDES: Tool[] = [
  { translationKey: 'aiImageGeneratorGuide', path: '/blog/ai-image-generator-guide', icon: 'BookOpen', popular: true, category: 'blog' },
  { translationKey: 'qrCodeGeneratorGuide', path: '/blog/qr-code-generator-guide', icon: 'BookOpen', popular: true, category: 'blog' },
  { translationKey: 'cropImageGuide', path: '/blog/crop-image-guide', icon: 'BookOpen', popular: true, category: 'blog' },
  { translationKey: 'resizeImageGuide', path: '/blog/resize-image-guide', icon: 'BookOpen', popular: true, category: 'blog' },
  { translationKey: 'removeBackgroundGuide', path: '/blog/remove-background-guide', icon: 'BookOpen', popular: true, category: 'blog' },
  { translationKey: 'pngToWebpGuide', path: '/blog/png-to-webp-guide', icon: 'BookOpen', popular: true, category: 'blog' },
  { translationKey: 'pngToJpgGuide', path: '/blog/png-to-jpg-guide', icon: 'BookOpen', popular: true, category: 'blog' },
  { translationKey: 'webpToPngGuide', path: '/blog/webp-to-png-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'pngToPdfGuide', path: '/blog/png-to-pdf-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'jpgToWebpGuide', path: '/blog/jpg-to-webp-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'jpgToPdfGuide', path: '/blog/jpg-to-pdf-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'pdfToJpgGuide', path: '/blog/pdf-to-jpg-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'heicToJpgGuide', path: '/blog/heic-to-jpg-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'heicToWebpGuide', path: '/blog/heic-to-webp-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'compressImagesGuide', path: '/blog/compress-images-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'colorPickerGuide', path: '/blog/color-picker-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'colorPaletteGuide', path: '/blog/color-palette-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'gradientGeneratorGuide', path: '/blog/gradient-generator-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'colorConverterGuide', path: '/blog/color-converter-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'fontPreviewGuide', path: '/blog/font-preview-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'fontPairingGuide', path: '/blog/font-pairing-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'typographicScaleGuide', path: '/blog/typographic-scale-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'emojiGuide', path: '/blog/emoji-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'symbolGuide', path: '/blog/symbol-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'jsonValidatorGuide', path: '/blog/json-validator-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'jsonComparerGuide', path: '/blog/json-comparer-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'jsonParserGuide', path: '/blog/json-parser-guide', icon: 'BookOpen', popular: false, category: 'blog' },
  { translationKey: 'chartGeneratorGuide', path: '/blog/chart-generator-guide', icon: 'BookOpen', popular: false, category: 'blog' },
];

// All tools combined
export const ALL_TOOLS = [...AI_TOOLS, ...IMAGE_TOOLS, ...IMAGE_CONVERTERS, ...PDF_TOOLS, ...COLOR_TOOLS, ...TEXT_TOOLS, ...JSON_TOOLS, ...FONT_TOOLS];

// Tool categories for navigation
export const TOOL_CATEGORIES: Record<ToolCategory, { translationKey: string; icon: string }> = {
  ai: { translationKey: 'aiTools', icon: 'Sparkles' },
  image: { translationKey: 'imageTools', icon: 'ImageIcon' },
  pdf: { translationKey: 'pdfTools', icon: 'FileText' },
  color: { translationKey: 'colorTools', icon: 'Palette' },
  text: { translationKey: 'textTools', icon: 'Type' },
  font: { translationKey: 'fontTools', icon: 'Type' },
  json: { translationKey: 'jsonTools', icon: 'Code2' },
  blog: { translationKey: 'blog', icon: 'BookOpen' },
};

// Helper functions
export const getToolsByCategory = (category: ToolCategory): Tool[] => {
  return ALL_TOOLS.filter(tool => tool.category === category);
};

export const getPopularTools = (category?: ToolCategory): Tool[] => {
  const tools = category ? getToolsByCategory(category) : ALL_TOOLS;
  return tools.filter(tool => tool.popular);
};

export const getToolByPath = (path: string): Tool | undefined => {
  return ALL_TOOLS.find(tool => tool.path === path || tool.path === `/${path}`);
};
