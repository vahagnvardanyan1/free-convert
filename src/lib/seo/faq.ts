/**
 * FAQ Schema Generator
 * Creates Schema.org FAQPage structured data
 */

import type { FAQPage } from 'schema-dts';

import type { StructuredData, FAQItemData } from './types';

/**
 * Common FAQ items used across multiple pages
 */
export const getCommonFAQs = (): FAQItemData[] => [
  {
    '@type': 'Question',
    name: 'Is ImageConverter free to use?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes, ImageConverter is completely free to use. There are no hidden fees, subscriptions, or watermarks on your converted files.',
    },
  },
  {
    '@type': 'Question',
    name: 'Are my files secure when using ImageConverter?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes, your files are completely secure. All conversions happen in your browser locally, and no files are uploaded to our servers. Your privacy is our priority.',
    },
  },
  {
    '@type': 'Question',
    name: 'What file formats does ImageConverter support?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'ImageConverter supports all major image formats including PNG, JPG/JPEG, WebP, GIF, and PDF. You can convert between any of these formats quickly and easily.',
    },
  },
  {
    '@type': 'Question',
    name: 'Is there a file size limit?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'ImageConverter can handle files of various sizes. Since processing happens in your browser, very large files may take longer to process depending on your device capabilities.',
    },
  },
  {
    '@type': 'Question',
    name: 'Do I need to install any software?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'No installation required! ImageConverter works directly in your web browser. Just visit our website and start converting your images immediately.',
    },
  },
];

/**
 * Get converter-specific FAQ items
 */
export const getConverterFAQs = (from: string, to: string): FAQItemData[] => [
  {
    '@type': 'Question',
    name: `How do I convert ${from.toUpperCase()} to ${to.toUpperCase()}?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `Converting ${from.toUpperCase()} to ${to.toUpperCase()} is easy: 1) Upload your ${from.toUpperCase()} file, 2) Click convert, 3) Download your ${to.toUpperCase()} file. The conversion happens instantly in your browser.`,
    },
  },
  {
    '@type': 'Question',
    name: `Will the quality be maintained when converting ${from.toUpperCase()} to ${to.toUpperCase()}?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `Yes, our ${from.toUpperCase()} to ${to.toUpperCase()} converter maintains high quality while optimizing file size. You can adjust quality settings if needed.`,
    },
  },
];

/**
 * Get compressor-specific FAQ items
 */
export const getCompressorFAQs = (): FAQItemData[] => [
  {
    '@type': 'Question',
    name: 'How to compress image to 20KB?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'To compress an image to 20KB: 1) Upload your image, 2) Select "Target File Size" mode, 3) Choose 20KB preset or enter 20 manually, 4) Click "Compress Now". Our tool will automatically optimize the image to reach approximately 20KB while maintaining the best possible quality.',
    },
  },
  {
    '@type': 'Question',
    name: 'How to compress image without losing quality?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'To compress images without losing quality: 1) Upload your image, 2) Select "By Quality" mode, 3) Set quality to 80-90%, 4) Click "Compress Now". This provides a good balance between file size reduction and visual quality. For web use, 80% quality is usually optimal.',
    },
  },
];

/**
 * Generate FAQ schema
 */
export const generateFAQSchema = ({ pathname, currentUrl, specificFAQs = [] }: { pathname: string; currentUrl: string; specificFAQs?: FAQItemData[] }): StructuredData<FAQPage> | null => {
  const isConverterPage = pathname !== '/' && (pathname.includes('-to-') || pathname.includes('pdf'));
  const isImageEditingTool = pathname === '/compress-image' || pathname === '/resize-image' || pathname === '/crop-image' || pathname === '/remove-background';

  if (pathname !== '/' && !isConverterPage && !isImageEditingTool) {
    return null;
  }

  const commonFAQs = getCommonFAQs();

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: currentUrl,
    mainEntity: [...specificFAQs, ...commonFAQs],
  };
};
