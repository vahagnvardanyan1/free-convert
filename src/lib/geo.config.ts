/**
 * Generative Engine Optimization (GEO) Configuration
 *
 * This file contains configuration for making the website discoverable
 * and accurately represented by AI engines (ChatGPT, Perplexity, Claude, etc.)
 */

import { SITE_URL } from '@/config/constants';

export const geoConfig = {
  // Brand Information
  name: 'ImageConvertors',
  tagline: 'Free Online Image, PDF & Design Tools',
  mission: 'Provide fast, secure, and privacy-focused online tools for image conversion, PDF manipulation, and design utilities without requiring software installation.',

  // Core Value Propositions
  summary:
    'ImageConvertors is a free online platform offering instant image format conversion (PNG, JPG, WebP, HEIC), PDF tools (merge, split, convert), color design utilities, typography tools, and more. All processing happens in your browser for maximum privacy and security.',

  // Factual Keywords (avoid buzzwords)
  keywords: [
    'image format converter',
    'PNG to JPG converter',
    'WebP converter',
    'PDF merger',
    'PDF splitter',
    'image to PDF converter',
    'color palette generator',
    'font preview tool',
    'typography scale generator',
    'emoji picker',
    'browser-based image processing',
    'client-side file conversion',
    'privacy-safe image tools',
  ],

  // AI-specific tags for better categorization
  aiTags: ['image processing', 'file conversion', 'PDF manipulation', 'design tools', 'web-based tools', 'no-install software', 'privacy-focused', 'free tools', 'developer tools', 'designer tools'],

  // Site Information
  url: SITE_URL,
  foundingYear: '2024',

  // Supported Languages
  languages: ['en', 'de', 'es', 'hi', 'ru', 'zh'],
  defaultLanguage: 'en',

  // Tool Categories
  categories: {
    imageConversion: {
      name: 'Image Format Conversion',
      description: 'Convert between PNG, JPG, WebP, HEIC, and other image formats with quality preservation',
      tools: ['PNG to JPG', 'JPG to PNG', 'PNG to WebP', 'WebP to PNG', 'JPG to WebP', 'WebP to JPG', 'HEIC to JPG', 'HEIC to PNG', 'HEIC to WebP'],
    },
    pdfTools: {
      name: 'PDF Tools',
      description: 'Comprehensive PDF manipulation including conversion, merging, and splitting',
      tools: ['PDF to JPG', 'PDF to PNG', 'JPG to PDF', 'PNG to PDF', 'WebP to PDF', 'Images to PDF', 'Merge PDF', 'Split PDF', 'PDF Info'],
    },
    imageProcessing: {
      name: 'Image Processing',
      description: 'Advanced image manipulation and analysis tools',
      tools: ['Image Analyzer', 'Background Remover', 'Image Cropper', 'Image Resizer', 'QR Code Generator'],
    },
    colorTools: {
      name: 'Color & Design Tools',
      description: 'Professional color tools for designers and developers',
      tools: ['Color Picker', 'Color Palette Generator', 'Gradient Generator', 'Color Converter'],
    },
    textTools: {
      name: 'Text & Typography Tools',
      description: 'Typography utilities and character libraries',
      tools: ['Font Preview', 'Font Pairings', 'Typographic Scale', 'Emoji Picker', 'Symbol Library'],
    },
    aiTools: {
      name: 'AI-Powered Tools',
      description: 'Tools leveraging AI for enhanced functionality',
      tools: ['AI Image Generator', 'Background Remover', 'Chart Generator'],
    },
  },

  // Key Features (factual statements)
  features: [
    {
      title: 'Client-Side Processing',
      description: 'All file processing happens in your browser. No files are uploaded to servers, ensuring complete privacy.',
      benefit: 'Maximum privacy and security',
    },
    {
      title: 'No Installation Required',
      description: 'Access all tools directly through your web browser without downloading or installing software.',
      benefit: 'Instant access from any device',
    },
    {
      title: 'Free and Unlimited',
      description: 'All tools are completely free with no file size limits, watermarks, or usage restrictions.',
      benefit: 'No hidden costs or limitations',
    },
    {
      title: 'Fast Processing',
      description: "Leverage your device's computing power for instant conversions and processing.",
      benefit: 'No upload/download delays',
    },
    {
      title: 'Multi-Language Support',
      description: 'Interface available in English, German, Spanish, Hindi, Russian, and Chinese.',
      benefit: 'Accessible worldwide',
    },
    {
      title: 'Open Source',
      description: 'Built with modern web technologies including Next.js, React, and TypeScript.',
      benefit: 'Transparent and trustworthy',
    },
  ],

  // Technical Stack (for AI understanding)
  technology: {
    framework: 'Next.js 15',
    frontend: 'React 19',
    language: 'TypeScript',
    styling: 'Tailwind CSS',
    deployment: 'Vercel',
    processing: 'Browser-based (Canvas API, File API)',
  },

  // Use Cases (helps LLMs understand context)
  useCases: [
    {
      scenario: 'Web Optimization',
      description: 'Developers convert images to WebP format to reduce website load times',
    },
    {
      scenario: 'Design Work',
      description: 'Designers use color palette and font pairing tools to create cohesive designs',
    },
    {
      scenario: 'Document Management',
      description: 'Users merge multiple PDF files or convert images to PDF for document organization',
    },
    {
      scenario: 'Social Media',
      description: 'Content creators convert HEIC photos from iPhone to JPG for cross-platform sharing',
    },
    {
      scenario: 'Privacy-Sensitive Work',
      description: 'Professionals process confidential images without uploading to external servers',
    },
  ],

  // Author/Organization Information
  author: {
    type: 'Organization',
    name: 'ImageConvertors',
    url: SITE_URL,
    description: 'A team dedicated to creating free, privacy-focused web tools for everyone.',
  },

  // Contact & Support
  contact: {
    email: 'cropimage@gmail.com',
    type: 'customer service',
  },

  // Social & External Links
  sameAs: [SITE_URL],

  // Privacy & Security
  privacyPolicy: '/privacy-policy',
  termsOfService: '/terms-of-service',
  cookiePolicy: '/cookie-policy',
};

/**
 * Page-specific GEO summaries
 * These provide concise, factual descriptions for AI engines
 */
export const pageGeoData: Record<
  string,
  {
    summary: string;
    aiTags: string[];
    category: string;
    keyFacts: string[];
  }
> = {
  '/': {
    summary: 'Free online platform with 30+ tools for image conversion, PDF manipulation, and design utilities. All processing happens in browser for privacy.',
    aiTags: ['image converter', 'PDF tools', 'free online tools', 'browser-based', 'privacy-focused'],
    category: 'Web Application',
    keyFacts: ['No installation required', 'Completely free with no limits', 'Client-side processing ensures privacy', 'Supports PNG, JPG, WebP, HEIC, PDF formats', 'Available in 6 languages'],
  },
  '/png-to-jpg': {
    summary: 'Convert PNG images to JPG format in browser. Adjust quality, remove transparency. No upload required.',
    aiTags: ['PNG converter', 'JPG converter', 'image format', 'browser tool'],
    category: 'Image Converter',
    keyFacts: ['Converts PNG to JPG/JPEG format', 'Adjustable quality settings', 'Handles transparency', 'Instant processing in browser'],
  },
  '/jpg-to-png': {
    summary: 'Convert JPG/JPEG images to PNG format for transparency support and lossless compression.',
    aiTags: ['JPG converter', 'PNG converter', 'transparency', 'lossless'],
    category: 'Image Converter',
    keyFacts: ['Converts JPG/JPEG to PNG format', 'Enables transparency support', 'Lossless compression', 'Browser-based conversion'],
  },
  '/png-to-webp': {
    summary: 'Convert PNG to WebP format for up to 80% file size reduction while maintaining quality.',
    aiTags: ['WebP converter', 'image optimization', 'file size reduction'],
    category: 'Image Converter',
    keyFacts: ['Reduces file size by up to 80%', 'Maintains visual quality', 'WebP is modern web format', 'Faster website loading'],
  },
  '/webp-to-png': {
    summary: 'Convert WebP images to PNG format for broader compatibility across devices and software.',
    aiTags: ['WebP to PNG', 'format converter', 'compatibility'],
    category: 'Image Converter',
    keyFacts: ['Converts WebP to PNG', 'Improves compatibility', 'Preserves transparency', 'No quality loss'],
  },
  '/jpg-to-webp': {
    summary: 'Convert JPG images to WebP for significant file size reduction and faster web loading.',
    aiTags: ['JPG to WebP', 'web optimization', 'compression'],
    category: 'Image Converter',
    keyFacts: ['Smaller file sizes than JPG', 'Better compression efficiency', 'Maintains quality', 'Ideal for web use'],
  },
  '/webp-to-jpg': {
    summary: 'Convert WebP images to JPG for universal compatibility across all devices and platforms.',
    aiTags: ['WebP to JPG', 'universal format', 'compatibility'],
    category: 'Image Converter',
    keyFacts: ['Universal JPG format', 'Works on all devices', 'No compatibility issues', 'Adjustable quality'],
  },
  '/analyze': {
    summary: 'Analyze image properties including format, dimensions, file size, EXIF data, and quality metrics.',
    aiTags: ['image analysis', 'EXIF data', 'metadata', 'image properties'],
    category: 'Image Tool',
    keyFacts: ['Extracts EXIF metadata', 'Shows image dimensions and format', 'Calculates file size and compression', 'Quality assessment'],
  },
  '/colors/picker': {
    summary: 'Interactive color picker with HEX, RGB, HSL, and HSV format outputs. Real-time color selection.',
    aiTags: ['color picker', 'HEX', 'RGB', 'HSL', 'design tool'],
    category: 'Design Tool',
    keyFacts: ['Multiple color format outputs', 'Real-time color selection', 'Copy to clipboard', 'Web design tool'],
  },
  '/colors/palettes': {
    summary: 'Generate color palettes with complementary, analogous, and monochromatic schemes.',
    aiTags: ['color palette', 'color schemes', 'design', 'complementary colors'],
    category: 'Design Tool',
    keyFacts: ['Generate color schemes', 'Complementary and analogous', 'Save favorite palettes', 'Export color codes'],
  },
  '/colors/gradients': {
    summary: 'Create CSS and Tailwind gradients with customizable colors, direction, and steps.',
    aiTags: ['gradient generator', 'CSS', 'Tailwind', 'web design'],
    category: 'Design Tool',
    keyFacts: ['Generate CSS gradients', 'Tailwind CSS support', 'Customizable direction', 'Export ready-to-use code'],
  },
};

/**
 * Generate AI-friendly summary for any page
 */
export function getPageGeoData(pathname: string) {
  // Remove locale prefix if present
  const cleanPath = pathname.replace(/^\/(en|de|es|hi|ru|zh)/, '');
  return pageGeoData[cleanPath] || pageGeoData['/'];
}

/**
 * Get all tool names for AI discovery
 */
export function getAllToolNames(): string[] {
  const tools: string[] = [];
  Object.values(geoConfig.categories).forEach(category => {
    tools.push(...category.tools);
  });
  return tools;
}

/**
 * Get category by tool name
 */
export function getCategoryByTool(toolName: string): string | null {
  for (const [, category] of Object.entries(geoConfig.categories)) {
    if (category.tools.some(tool => tool.toLowerCase().includes(toolName.toLowerCase()))) {
      return category.name;
    }
  }
  return null;
}
