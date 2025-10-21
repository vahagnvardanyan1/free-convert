/**
 * HowTo Schema Generator
 * Creates Schema.org HowTo structured data for conversion processes
 */

import type { HowTo } from 'schema-dts';

import type { StructuredData, HowToStepData } from './types';

interface HowToConfig {
  name: string;
  description: string;
  url: string;
  steps: HowToStepData[];
  imageUrl?: string;
}

/**
 * Generate HowTo schema for conversion processes
 */
export const generateHowToSchema = ({ name, description, url, steps, imageUrl }: HowToConfig): StructuredData<HowTo> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url,
    image: imageUrl,
    totalTime: 'PT2M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Internet Connection',
      },
      {
        '@type': 'HowToSupply',
        name: 'Web Browser',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'ImageConverter Online Tool',
      },
    ],
    step: steps,
  };
};

/**
 * Generate steps for image format conversion
 */
export const generateImageConverterSteps = (from: string, to: string, baseUrl: string): HowToStepData[] => [
  {
    '@type': 'HowToStep',
    position: 1,
    name: `Upload ${from.toUpperCase()} File`,
    text: `Click the upload button or drag and drop your ${from.toUpperCase()} file into the converter area.`,
    image: `${baseUrl}/images/howto/${from}-to-${to}/step-upload.webp`,
  },
  {
    '@type': 'HowToStep',
    position: 2,
    name: 'Start Conversion',
    text: `Click the "Convert" button to begin the ${from.toUpperCase()} to ${to.toUpperCase()} conversion process.`,
    image: `${baseUrl}/images/howto/${from}-to-${to}/step-convert.webp`,
  },
  {
    '@type': 'HowToStep',
    position: 3,
    name: `Download ${to.toUpperCase()} File`,
    text: `Once conversion is complete, download your converted ${to.toUpperCase()} file instantly.`,
    image: `${baseUrl}/images/howto/${from}-to-${to}/step-download.webp`,
  },
];

/**
 * Generate steps for PDF conversion
 */
export const generatePDFConverterSteps = (format: string, baseUrl: string): HowToStepData[] => [
  {
    '@type': 'HowToStep',
    position: 1,
    name: 'Upload PDF File',
    text: 'Select and upload the PDF document you want to convert to images.',
    image: `${baseUrl}/images/howto/pdf-to-${format.toLowerCase()}/step-upload-pdf.webp`,
  },
  {
    '@type': 'HowToStep',
    position: 2,
    name: 'Choose Pages',
    text: 'Select which pages you want to convert or convert all pages.',
    image: `${baseUrl}/images/howto/pdf-to-${format.toLowerCase()}/step-select-pages.webp`,
  },
  {
    '@type': 'HowToStep',
    position: 3,
    name: 'Convert to Images',
    text: `Click convert to transform your PDF pages into high-quality ${format} images.`,
    image: `${baseUrl}/images/howto/pdf-to-${format.toLowerCase()}/step-convert-pdf.webp`,
  },
  {
    '@type': 'HowToStep',
    position: 4,
    name: 'Download Images',
    text: `Download individual ${format} images or get them all in a ZIP file.`,
    image: `${baseUrl}/images/howto/pdf-to-${format.toLowerCase()}/step-download-images.webp`,
  },
];

/**
 * Generate steps for image to PDF conversion
 */
export const generateImageToPDFSteps = (format: string, baseUrl: string): HowToStepData[] => {
  const folderName = format === 'Images' ? 'images-to-pdf' : `${format.toLowerCase()}-to-pdf`;

  return [
    {
      '@type': 'HowToStep',
      position: 1,
      name: `Select ${format} ${format === 'Images' ? 'Files' : 'Images'}`,
      text: `Upload ${format === 'Images' ? 'multiple images' : `your ${format} images`} you want to convert to PDF.`,
      image: `${baseUrl}/images/howto/${folderName}/step-select-images.webp`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Arrange Order',
      text: `${format === 'Images' ? 'Drag and drop images to arrange them in your preferred order.' : `Arrange your ${format} images in the desired order for the PDF.`}`,
      image: `${baseUrl}/images/howto/${folderName}/step-arrange-order.webp`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Create PDF',
      text: `Click create to convert ${format === 'Images' ? 'all images' : `your ${format} images`} into a PDF document.`,
      image: `${baseUrl}/images/howto/${folderName}/step-create-pdf.webp`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Download PDF',
      text: `Download your ${format} to PDF converted document instantly.`,
      image: `${baseUrl}/images/howto/${folderName}/step-download-pdf.webp`,
    },
  ];
};
