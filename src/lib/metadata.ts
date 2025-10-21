/**
 * Metadata Configuration & SEO
 * Central configuration for site metadata and structured data
 */

import type { Metadata } from 'next';

import { SITE_URL } from '@/config/constants';

// Re-export SEO functions from the SEO module
export { generateStructuredData, generateBreadcrumbStructuredData, generateFAQStructuredData, generateHowToStructuredData } from './seo';

// Re-export types
export type { StructuredData, FAQItemData, HowToStepData, BreadcrumbItemData } from './seo';

// Base configuration for the application
export const siteConfig = {
  name: 'FreeConvert',
  title: 'Free Online Tools: Image, Fonts & Colors | FreeConvert',
  description: 'Free online image converter & font generator. Convert PNG/JPG/WebP images, create fancy text, and design color schemes—all without installing any software.',
  url: SITE_URL,
  ogImage: '/og-image.webp',
  twitterImage: '/og-image.webp',
  keywords: [
    'free image converter',
    'online image tools',
    'font generator',
    'fancy text',
    'color palette generator',
    'color picker',
    'PNG to JPG',
    'WebP converter',
    'free online tools',
    'image converter',
    'image analyzer',
    'PNG to WebP',
    'JPG to PNG',
    'WebP to PNG',
    'image format converter',
    'online image tool',
    'image analysis',
    'image properties',
    'EXIF data',
    'image metadata',
    'batch image converter',
    'image optimizer',
    'image quality checker',
    'gradient generator',
    'color converter',
    'HEX to RGB',
    'color tools',
    'font tools',
    'typography',
    'font preview',
    'font pairing',
    'typographic scale',
    'Google Fonts',
    'Unicode fonts',
    'Instagram fonts',
    'emoji picker',
    'emoji browser',
    'unicode symbols',
    'special characters',
    'text tools',
  ],
  author: {
    name: 'FreeConvert',
    url: SITE_URL,
    twitter: '@imageconverter',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

// Route-specific metadata configuration
export const routeMetadata: Record<string, Partial<Metadata>> = {
  '/': {
    title: 'Free Online Tools: Image, Fonts & Colors | FreeConvert',
    description: 'Free online image converter & font generator. Convert PNG/JPG/WebP images, create fancy text, and design color schemes—all without installing any software.',
    keywords: siteConfig.keywords.join(', '),
  },
  '/analyze': {
    title: 'Image Analyzer - Analyze Image Properties, Size, Format & Quality',
    description:
      'Analyze your images instantly. Get detailed information about image format, dimensions, file size, color depth, compression, EXIF data, and quality metrics. Free online image analysis tool.',
    keywords: 'image analyzer, image analysis, image properties, image metadata, EXIF data, image dimensions, file size analyzer, image quality checker, image format detector, online image inspector',
  },
  '/png-to-webp': {
    title: 'PNG to WebP Converter - Convert PNG Images to WebP Format',
    description: 'Convert PNG images to WebP format online for free. Reduce file size by up to 80% while maintaining quality. Fast, secure PNG to WebP conversion tool.',
    keywords: 'PNG to WebP, PNG converter, WebP converter, image compression, reduce file size, optimize images',
  },
  '/jpg-to-png': {
    title: 'JPG to PNG Converter - Convert JPEG Images to PNG Format',
    description: 'Convert JPG/JPEG images to PNG format online for free. Preserve transparency and quality. Fast, secure JPG to PNG conversion tool.',
    keywords: 'JPG to PNG, JPEG to PNG, JPG converter, PNG converter, image format converter, transparency support',
  },
  '/webp-to-png': {
    title: 'WebP to PNG Converter - Convert WebP Images to PNG Format',
    description: 'Convert WebP images to PNG format online for free. Maintain quality and transparency. Fast, secure WebP to PNG conversion tool.',
    keywords: 'WebP to PNG, WebP converter, PNG converter, image format converter, transparency support',
  },
  '/jpg-to-webp': {
    title: 'JPG to WebP Converter - Convert JPEG Images to WebP Format',
    description: 'Convert JPG/JPEG images to WebP format online for free. Reduce file size significantly while maintaining quality. Fast, secure JPG to WebP conversion tool.',
    keywords: 'JPG to WebP, JPEG to WebP, JPG converter, WebP converter, image compression, optimize images',
  },
  '/png-to-jpg': {
    title: 'PNG to JPG Converter - Convert PNG Images to JPEG Format',
    description: 'Convert PNG images to JPG/JPEG format online for free. Optimize for web use and reduce file size. Fast, secure PNG to JPG conversion tool.',
    keywords: 'PNG to JPG, PNG to JPEG, PNG converter, JPG converter, image optimization, web images',
  },
  '/webp-to-jpg': {
    title: 'WebP to JPG Converter - Convert WebP Images to JPEG Format',
    description: 'Convert WebP images to JPG/JPEG format online for free. Ensure compatibility across all devices and browsers. Fast, secure WebP to JPG conversion tool.',
    keywords: 'WebP to JPG, WebP to JPEG, WebP converter, JPG converter, image compatibility, browser support',
  },
  '/privacy-policy': {
    title: 'Privacy Policy - ImageConverter',
    description: 'Learn how ImageConverter protects your privacy and handles your data. We prioritize user privacy and data security in our image conversion services.',
    keywords: 'privacy policy, data protection, user privacy, image converter privacy',
  },
  '/terms-of-use': {
    title: 'Terms of Use - ImageConverter',
    description: 'Read the terms of use for ImageConverter. Understand your rights and responsibilities when using our free online image conversion services.',
    keywords: 'terms of use, terms of service, user agreement, image converter terms',
  },
  '/cookie-policy': {
    title: 'Cookie Policy - ImageConverter',
    description: 'Learn about how ImageConverter uses cookies to improve your experience. Understand our cookie usage and privacy practices.',
    keywords: 'cookie policy, cookies, website cookies, privacy, data collection',
  },
  '/png-to-pdf': {
    title: 'PNG to PDF Converter - Convert PNG Images to PDF Online Free',
    description:
      'Convert PNG images to PDF documents instantly. Maintain transparency and high quality. Customize page size, orientation, and margins. Fast, secure, and completely free PNG to PDF conversion tool.',
    keywords: 'PNG to PDF, convert PNG to PDF, PNG PDF converter, PNG to PDF online, PNG to PDF free, PNG transparency PDF',
  },
  '/jpg-to-pdf': {
    title: 'JPG to PDF Converter - Convert JPEG Images to PDF Online Free',
    description:
      'Convert JPG/JPEG images to PDF documents instantly. Maintain high quality and optimize file size. Customize page size, orientation, and margins. Fast, secure, and completely free JPG to PDF conversion tool.',
    keywords: 'JPG to PDF, JPEG to PDF, convert JPG to PDF, convert JPEG to PDF, JPG PDF converter, JPEG PDF converter',
  },
  '/webp-to-pdf': {
    title: 'WebP to PDF Converter - Convert WebP Images to PDF Online Free',
    description:
      'Convert WebP images to PDF documents instantly. Maintain excellent quality and compression. Customize page size, orientation, and margins. Fast, secure, and completely free WebP to PDF conversion tool.',
    keywords: 'WebP to PDF, convert WebP to PDF, WebP PDF converter, WebP to PDF online, WebP to PDF free, WebP compression PDF',
  },
  '/colors': {
    title: 'Free Color Tools: Palette Generator & Picker | FreeConvert',
    description: 'Create and explore color schemes online. Use our free color palette generator to design custom palettes or easily pick any color code for your projects.',
    keywords:
      'color palette generator, color picker, color scheme tool, design color palettes, free online colors, hex color picker, trending color palettes, free color palette, design colors, online color tools',
  },
  '/colors/picker': {
    title: 'Color Picker - Interactive Color Selector & Format Converter | FreeConvert',
    description:
      'Pick colors and get instant format conversions. Interactive color picker with HEX, RGB, RGBA, HSL, HSLA, and HSV outputs. Perfect for web designers and developers. Free online color picker tool.',
    keywords: 'color picker, pick color, color selector, HEX color picker, RGB color picker, color formats, web colors, design colors, color tool, hex color picker, free color picker',
  },
  '/colors/palettes': {
    title: 'Color Palette Generator - Create & Save Custom Color Schemes | FreeConvert',
    description:
      'Generate beautiful color palettes with complementary, analogous, and monochromatic schemes. Save your favorite palettes locally. Browse predefined palettes or create custom color combinations. Free palette generator.',
    keywords: 'color palette, palette generator, color schemes, complementary colors, analogous colors, monochromatic palette, color combinations, design palette, color harmony, trending palettes',
  },
  '/colors/gradients': {
    title: 'Gradient Generator - Create CSS & Tailwind Gradients Online | FreeConvert',
    description:
      'Generate stunning gradients between colors with instant CSS and Tailwind code. Customize direction, steps, and colors. Preview gradients in real-time. Copy code directly to your project. Free gradient generator.',
    keywords: 'gradient generator, CSS gradient, Tailwind gradient, linear gradient, color gradient, gradient maker, web gradient, gradient tool, gradient CSS code',
  },
  '/colors/converter': {
    title: 'Color Converter - Convert Between HEX, RGB, HSL & Color Formats | FreeConvert',
    description:
      'Convert colors between HEX, RGB, RGBA, HSL, HSLA, and HSV formats instantly. Supports color names and all CSS color formats. Perfect for cross-platform development. Free online color format converter.',
    keywords: 'color converter, HEX to RGB, RGB to HSL, HSL to HEX, color format converter, convert colors, CSS colors, color transformation, color code converter',
  },
  '/compress-image': {
    title: 'Compress Image Online Free - Image Compressor Tool',
    description: 'Compress image online free. Reduce image size to 20KB, 50KB, 100KB. Fast image compressor with quality control. Optimize images for web. No signup.',
    keywords:
      'compress image, image compressor, compress image online, compress image to 20kb, compress image to 50kb, reduce image size, image compression, compress image online free, optimize image, reduce photo size',
  },
  '/resize-image': {
    title: 'Resize Image Online Free - Image Resizer Tool',
    description: 'Resize image online free. Resize by pixels, percentage, or presets. Maintain aspect ratio and quality. Fast image resizer for photos. No signup needed.',
    keywords: 'resize image, resize image online, image resizer, resize photo, resize image online free, scale image, image dimensions, resize by percentage, resize by pixels',
  },
  '/crop-image': {
    title: 'Crop Image Online - Free Image Cropper & Rotator',
    description: 'Crop, rotate, and resize images online for free. Professional image cropping tool with aspect ratio presets. Flip, zoom, and edit images instantly in your browser.',
    keywords: 'crop image, image cropper, crop photo online, rotate image, flip image, resize image, aspect ratio, image editor, free image cropper',
  },
  '/remove-background': {
    title: 'Remove Background from Image - Free AI Background Remover',
    description: 'Remove image backgrounds automatically with AI. Free background remover tool. Fast, accurate, and privacy-focused. No upload to servers.',
    keywords: 'remove background, background remover, remove image background, ai background remover, transparent background, background eraser, cut out image',
  },
  '/texts/fonts': {
    title: 'Font Tools - Free Typography Playground, Font Pairing & Scale Generator | FreeConvert',
    description: 'Professional font tools for designers and developers. Preview Google Fonts, discover perfect font pairings, and generate typographic scales. Free online typography utilities.',
    keywords: 'font tools, typography, font preview, font pairing, typographic scale, Google Fonts, font generator, CSS fonts, web typography, design tools, fancy text, unicode fonts',
  },
  '/texts/fonts/preview': {
    title: 'Font Preview - Interactive Typography Playground with Google Fonts | FreeConvert',
    description: 'Test Google Fonts with live preview. Customize font size, weight, spacing, and colors. Generate CSS code instantly. Free online font preview tool.',
    keywords: 'font preview, Google Fonts, typography playground, font tester, CSS fonts, web fonts, font customizer, font size, font weight, free online fonts',
  },
  '/texts/fonts/pairings': {
    title: 'Font Pairings - Discover Perfect Typography Combinations | FreeConvert',
    description: 'Browse curated font pairings for web design. Find complementary Google Font combinations with use case recommendations. Copy CSS instantly. Free font pairing tool.',
    keywords: 'font pairing, font combinations, typography pairing, Google Font pairs, complementary fonts, font matching, web typography, design fonts',
  },
  '/texts/fonts/scales': {
    title: 'Typographic Scale Generator - Create Harmonious Font Size Systems | FreeConvert',
    description: 'Generate typographic scales using musical ratios. Create consistent font size hierarchies for your design system. Export CSS custom properties. Free type scale tool.',
    keywords: 'typographic scale, font scale, type scale, modular scale, font size system, design system, CSS variables, typography ratio, type hierarchy',
  },
  '/texts/emojis': {
    title: 'Emoji Picker - Browse & Copy Emojis with Device Preview | FreeConvert',
    description:
      'Browse thousands of emojis with device-specific rendering. Filter by category and see how emojis appear on Apple, Google, Microsoft, and Samsung devices. Copy to clipboard instantly.',
    keywords: 'emoji picker, emoji browser, copy emoji, device emoji, Apple emoji, Google emoji, Microsoft emoji, Samsung emoji, emoji categories, unicode emoji, emoji library, free emoji picker',
  },
  '/texts/symbols': {
    title: 'Symbol Library - Unicode Symbols & Special Characters | FreeConvert',
    description: 'Explore and copy special Unicode symbols and characters. Browse mathematical symbols, arrows, currency signs, shapes, and more for your projects.',
    keywords: 'unicode symbols, special characters, mathematical symbols, arrows, currency symbols, shapes, copy symbols, unicode library, special characters library, symbols picker',
  },
  '/texts': {
    title: 'Text Tools - Emoji Picker, Symbols & Font Utilities | FreeConvert',
    description: 'Free online text tools including emoji picker, Unicode symbols library, font preview, and typography utilities. Perfect for designers and developers.',
    keywords: 'text tools, emoji picker, symbols library, font tools, typography, unicode, special characters, design tools, web design',
  },
};
