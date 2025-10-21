import { Metadata } from 'next';

import { SITE_URL } from '@/config/constants';
import { AnalyzePage } from '@/components/AnalyzePage';

export const metadata: Metadata = {
  title: 'Image Analyzer - Analyze Image Properties & Metadata | ImageConvertors',
  description: 'Analyze image properties, EXIF data, file size, dimensions, and format details. Free online image analyzer tool with detailed metadata extraction.',
  keywords: 'image analyzer, EXIF data, image properties, image metadata, file size analyzer, image dimensions',
  alternates: {
    canonical: `${SITE_URL}/analyze`,
  },
};

export default function ImageAnalyzePage() {
  return <AnalyzePage />;
}
