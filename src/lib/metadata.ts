import { Metadata } from 'next';

import { SITE_URL } from '@/config/constants';

// Type definitions for structured data
interface WebApplicationSchema {
  '@type': 'WebApplication';
  name?: string;
  description?: string;
  featureList?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface FAQItem {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

interface HowToStep {
  '@type': 'HowToStep';
  position: number;
  name: string;
  text: string;
  image: string;
}

// Base configuration for the application
export const siteConfig = {
  name: 'ImageConvertors',
  title: 'Free Online Tools: Image, Fonts & Colors | ImageConvertors',
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
    name: 'ImageConvertors',
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
    title: 'Free Online Tools: Image, Fonts & Colors | ImageConvertors',
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
    title: 'Free Color Tools: Palette Generator & Picker | ImageConvertors',
    description: 'Create and explore color schemes online. Use our free color palette generator to design custom palettes or easily pick any color code for your projects.',
    keywords:
      'color palette generator, color picker, color scheme tool, design color palettes, free online colors, hex color picker, trending color palettes, free color palette, design colors, online color tools',
  },
  '/colors/picker': {
    title: 'Color Picker - Interactive Color Selector & Format Converter | ImageConvertors',
    description:
      'Pick colors and get instant format conversions. Interactive color picker with HEX, RGB, RGBA, HSL, HSLA, and HSV outputs. Perfect for web designers and developers. Free online color picker tool.',
    keywords: 'color picker, pick color, color selector, HEX color picker, RGB color picker, color formats, web colors, design colors, color tool, hex color picker, free color picker',
  },
  '/colors/palettes': {
    title: 'Color Palette Generator - Create & Save Custom Color Schemes | ImageConvertors',
    description:
      'Generate beautiful color palettes with complementary, analogous, and monochromatic schemes. Save your favorite palettes locally. Browse predefined palettes or create custom color combinations. Free palette generator.',
    keywords: 'color palette, palette generator, color schemes, complementary colors, analogous colors, monochromatic palette, color combinations, design palette, color harmony, trending palettes',
  },
  '/colors/gradients': {
    title: 'Gradient Generator - Create CSS & Tailwind Gradients Online | ImageConvertors',
    description:
      'Generate stunning gradients between colors with instant CSS and Tailwind code. Customize direction, steps, and colors. Preview gradients in real-time. Copy code directly to your project. Free gradient generator.',
    keywords: 'gradient generator, CSS gradient, Tailwind gradient, linear gradient, color gradient, gradient maker, web gradient, gradient tool, gradient CSS code',
  },
  '/colors/converter': {
    title: 'Color Converter - Convert Between HEX, RGB, HSL & Color Formats | ImageConvertors',
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
    title: 'Font Tools - Free Typography Playground, Font Pairing & Scale Generator | ImageConvertors',
    description: 'Professional font tools for designers and developers. Preview Google Fonts, discover perfect font pairings, and generate typographic scales. Free online typography utilities.',
    keywords: 'font tools, typography, font preview, font pairing, typographic scale, Google Fonts, font generator, CSS fonts, web typography, design tools, fancy text, unicode fonts',
  },
  '/texts/fonts/preview': {
    title: 'Font Preview - Interactive Typography Playground with Google Fonts | ImageConvertors',
    description: 'Test Google Fonts with live preview. Customize font size, weight, spacing, and colors. Generate CSS code instantly. Free online font preview tool.',
    keywords: 'font preview, Google Fonts, typography playground, font tester, CSS fonts, web fonts, font customizer, font size, font weight, free online fonts',
  },
  '/texts/fonts/pairings': {
    title: 'Font Pairings - Discover Perfect Typography Combinations | ImageConvertors',
    description: 'Browse curated font pairings for web design. Find complementary Google Font combinations with use case recommendations. Copy CSS instantly. Free font pairing tool.',
    keywords: 'font pairing, font combinations, typography pairing, Google Font pairs, complementary fonts, font matching, web typography, design fonts',
  },
  '/texts/fonts/scales': {
    title: 'Typographic Scale Generator - Create Harmonious Font Size Systems | ImageConvertors',
    description: 'Generate typographic scales using musical ratios. Create consistent font size hierarchies for your design system. Export CSS custom properties. Free type scale tool.',
    keywords: 'typographic scale, font scale, type scale, modular scale, font size system, design system, CSS variables, typography ratio, type hierarchy',
  },
  '/texts/emojis': {
    title: 'Emoji Picker - Browse & Copy Emojis with Device Preview | ImageConvertors',
    description:
      'Browse thousands of emojis with device-specific rendering. Filter by category and see how emojis appear on Apple, Google, Microsoft, and Samsung devices. Copy to clipboard instantly.',
    keywords: 'emoji picker, emoji browser, copy emoji, device emoji, Apple emoji, Google emoji, Microsoft emoji, Samsung emoji, emoji categories, unicode emoji, emoji library, free emoji picker',
  },
  '/texts/symbols': {
    title: 'Symbol Library - Unicode Symbols & Special Characters | ImageConvertors',
    description: 'Explore and copy special Unicode symbols and characters. Browse mathematical symbols, arrows, currency signs, shapes, and more for your projects.',
    keywords: 'unicode symbols, special characters, mathematical symbols, arrows, currency symbols, shapes, copy symbols, unicode library, special characters library, symbols picker',
  },
  '/texts': {
    title: 'Text Tools - Emoji Picker, Symbols & Font Utilities | ImageConvertors',
    description: 'Free online text tools including emoji picker, Unicode symbols library, font preview, and typography utilities. Perfect for designers and developers.',
    keywords: 'text tools, emoji picker, symbols library, font tools, typography, unicode, special characters, design tools, web design',
  },
};

// Generate comprehensive structured data (JSON-LD) for different page types
export const generateStructuredData = (pathname: string) => {
  // Get current page URL
  const currentUrl = `${siteConfig.url}${pathname}`;

  // Get page-specific metadata
  const pageMetadata = routeMetadata[pathname] || routeMetadata['/'];
  // Base Organization schema with logo for Google search results
  const organizationSchema = {
    '@type': 'Organization',
    name: siteConfig.author.name,
    url: siteConfig.url,
    logo: `${SITE_URL}/logo.png`,
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
      width: 512,
      height: 512,
    },
    description: siteConfig.description,
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [siteConfig.author.url],
  };

  // Website schema - represents the entire site
  const websiteSchema = {
    '@type': 'Website',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: organizationSchema,
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      // Image Converters
      {
        '@type': 'ConvertAction',
        name: 'Convert PNG to WebP',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/png-to-webp`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert JPG to PNG',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/jpg-to-png`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert WebP to PNG',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/webp-to-png`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert JPG to WebP',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/jpg-to-webp`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert PNG to JPG',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/png-to-jpg`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert WebP to JPG',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/webp-to-jpg`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert HEIC to JPG',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/heic-to-jpg`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert HEIC to WebP',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/heic-to-webp`,
        },
      },
      // PDF Converters
      {
        '@type': 'ConvertAction',
        name: 'Convert PNG to PDF',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/png-to-pdf`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert JPG to PDF',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/jpg-to-pdf`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert WebP to PDF',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/webp-to-pdf`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert PDF to JPG',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/pdf-to-jpg`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Convert PDF to PNG',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/pdf-to-png`,
        },
      },
      // Image Analysis
      {
        '@type': 'AnalyzeAction',
        name: 'Analyze Images',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/analyze`,
        },
      },
      // Color Tools
      {
        '@type': 'ViewAction',
        name: 'Color Picker',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/colors/picker`,
        },
      },
      {
        '@type': 'CreateAction',
        name: 'Generate Color Palettes',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/colors/palettes`,
        },
      },
      {
        '@type': 'CreateAction',
        name: 'Gradient Generator',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/colors/gradients`,
        },
      },
      {
        '@type': 'ConvertAction',
        name: 'Color Converter',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/colors/converter`,
        },
      },
      // Font Tools
      {
        '@type': 'ViewAction',
        name: 'Font Preview',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/texts/fonts/preview`,
        },
      },
      {
        '@type': 'ViewAction',
        name: 'Font Pairings',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/texts/fonts/pairings`,
        },
      },
      {
        '@type': 'CreateAction',
        name: 'Typographic Scale Generator',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/texts/fonts/scales`,
        },
      },
      // Text Tools
      {
        '@type': 'ViewAction',
        name: 'Emoji Picker',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/texts/emojis`,
        },
      },
      {
        '@type': 'ViewAction',
        name: 'Symbol Library',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/texts/symbols`,
        },
      },
      // PDF Tools
      {
        '@type': 'OrganizeAction',
        name: 'Merge PDF Files',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/merge-pdf`,
        },
      },
      {
        '@type': 'OrganizeAction',
        name: 'Split PDF Files',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/split-pdf`,
        },
      },
    ],
  };

  // WebPage schema - page-specific
  const webPageSchema = {
    '@type': 'WebPage',
    name: pageMetadata.title ? String(pageMetadata.title).split(' - ')[0] : siteConfig.name,
    url: currentUrl,
    description: pageMetadata.description || siteConfig.description,
    isPartOf: {
      '@type': 'Website',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: organizationSchema,
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntity: currentUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      '@id': `${currentUrl}#breadcrumb`,
      itemListElement: generateBreadcrumbItems(pathname),
    },
  };

  // Enhanced WebApplication schema
  const baseWebApplicationSchema = {
    '@type': 'WebApplication',
    name: pageMetadata.title ? String(pageMetadata.title).split(' - ')[0] : siteConfig.name,
    url: currentUrl,
    description: pageMetadata.description || siteConfig.description,
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Image Converter',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    releaseNotes: 'Free online image and PDF conversion tool',
    screenshot: `${siteConfig.url}/og-image.webp`,
    mainEntityOfPage: currentUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-01',
    },
    author: organizationSchema,
    publisher: organizationSchema,
    creator: organizationSchema,
    maintainer: organizationSchema,
    copyrightHolder: organizationSchema,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    usageInfo: 'Free to use for personal and commercial purposes',
  };

  // SoftwareApplication schema for better categorization
  const softwareApplicationSchema = {
    '@type': 'SoftwareApplication',
    name: pageMetadata.title ? String(pageMetadata.title).split(' - ')[0] : siteConfig.name,
    description: pageMetadata.description || siteConfig.description,
    url: currentUrl,
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Image Processing',
    operatingSystem: 'Web Browser',
    softwareVersion: '1.0',
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: organizationSchema,
    publisher: organizationSchema,
    downloadUrl: currentUrl,
    installUrl: currentUrl,
    screenshot: `${siteConfig.url}/og-image.webp`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  // Return multiple schemas as an array
  const baseStructuredData = [
    {
      '@context': 'https://schema.org',
      ...organizationSchema,
    },
    {
      '@context': 'https://schema.org',
      ...websiteSchema,
    },
    {
      '@context': 'https://schema.org',
      ...webPageSchema,
    },
    {
      '@context': 'https://schema.org',
      ...baseWebApplicationSchema,
    },
    {
      '@context': 'https://schema.org',
      ...softwareApplicationSchema,
    },
  ];

  // Add specific structured data based on the route
  if (pathname === '/') {
    const homePageSchemas = [
      ...baseStructuredData,
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Image Format Conversion Services',
        description: 'Professional image format conversion services including PNG, JPG, WebP, and more.',
        provider: organizationSchema,
        serviceType: 'Image Conversion',
        areaServed: 'Worldwide',
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: currentUrl,
          serviceType: 'Online',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Image Conversion Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'PNG to WebP Conversion',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'JPG to PNG Conversion',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Image Analysis',
              },
            },
          ],
        },
      },
    ];

    // Update the WebPage schema for homepage
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (homePageSchemas[2] as any).name = 'ImageConverter - Free Online Image & PDF Converter';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (homePageSchemas[2] as any).description = 'Convert and analyze images between PNG, JPG, WebP, GIF and more formats instantly. Complete PDF tools included.';

    // Update the main WebApplication with homepage features
    (homePageSchemas[3] as WebApplicationSchema).featureList = [
      'PNG to WebP conversion',
      'JPG to PNG conversion',
      'WebP to PNG conversion',
      'PDF to JPG conversion',
      'PDF to PNG conversion',
      'Images to PDF conversion',
      'Image analysis and metadata extraction',
      'Batch image processing',
      'Quality optimization',
      'PDF merging and splitting',
    ];

    return homePageSchemas;
  }

  if (pathname === '/analyze') {
    const analyzeSchemas = [...baseStructuredData];

    // Update the WebPage schema for analyze page
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (analyzeSchemas[2] as any).name = 'Image Analyzer - Analyze Image Properties & Quality';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (analyzeSchemas[2] as any).description = 'Analyze your images instantly. Get detailed information about format, dimensions, file size, color depth, compression, EXIF data, and quality metrics.';

    (analyzeSchemas[3] as WebApplicationSchema).name = 'Image Analyzer';
    (analyzeSchemas[3] as WebApplicationSchema).description = 'Analyze image properties, format, dimensions, and quality metrics online for free.';
    (analyzeSchemas[3] as WebApplicationSchema).featureList = [
      'Image property analysis',
      'EXIF data extraction',
      'Color depth analysis',
      'Compression ratio calculation',
      'Quality assessment',
      'Format detection',
    ];

    // Add specific Service schema for image analysis
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (analyzeSchemas as any[]).push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Image Analysis Service',
      description: 'Comprehensive image analysis including metadata, properties, and quality assessment.',
      provider: {
        '@type': 'Organization',
        name: organizationSchema.name,
        url: organizationSchema.url,
      },
      serviceType: 'Image Analysis',
      areaServed: 'Worldwide',
      url: currentUrl,
    });

    return analyzeSchemas;
  }

  // Handle conversion tool pages
  if (pathname.includes('-to-') || pathname.includes('pdf')) {
    const conversionSchemas = [...baseStructuredData];
    let serviceName = '';
    let serviceDescription = '';

    if (pathname.includes('-to-')) {
      const [from, to] = pathname.slice(1).split('-to-');
      serviceName = `${from.toUpperCase()} to ${to.toUpperCase()} Converter`;
      serviceDescription = `Convert ${from.toUpperCase()} images to ${to.toUpperCase()} format online for free.`;
      (conversionSchemas[3] as WebApplicationSchema).featureList = [
        `${from.toUpperCase()} to ${to.toUpperCase()} conversion`,
        'Quality preservation',
        'Batch processing',
        'Instant download',
        'No file size limits',
      ];
    } else if (pathname.includes('pdf')) {
      if (pathname.includes('pdf-to-jpg')) {
        serviceName = 'PDF to JPG Converter';
        serviceDescription = 'Convert PDF documents to high-quality JPG images.';
      } else if (pathname.includes('pdf-to-png')) {
        serviceName = 'PDF to PNG Converter';
        serviceDescription = 'Convert PDF documents to high-quality PNG images.';
      } else if (pathname.includes('images-to-pdf')) {
        serviceName = 'Images to PDF Converter';
        serviceDescription = 'Combine multiple images into a single PDF document.';
      } else if (pathname.includes('merge-pdf')) {
        serviceName = 'PDF Merger';
        serviceDescription = 'Merge multiple PDF documents into one file.';
      } else if (pathname.includes('split-pdf')) {
        serviceName = 'PDF Splitter';
        serviceDescription = 'Split PDF documents into separate pages or sections.';
      } else if (pathname.includes('pdf-info')) {
        serviceName = 'PDF Info Analyzer';
        serviceDescription = 'Analyze PDF document properties and metadata.';
      } else if (pathname.includes('png-to-pdf')) {
        serviceName = 'PNG to PDF Converter';
        serviceDescription = 'Convert PNG images to PDF documents with transparency support.';
      } else if (pathname.includes('jpg-to-pdf')) {
        serviceName = 'JPG to PDF Converter';
        serviceDescription = 'Convert JPG/JPEG images to PDF documents with optimized quality.';
      } else if (pathname.includes('webp-to-pdf')) {
        serviceName = 'WebP to PDF Converter';
        serviceDescription = 'Convert WebP images to PDF documents with excellent compression.';
      }

      (conversionSchemas[3] as WebApplicationSchema).featureList = ['PDF processing', 'High-quality output', 'Batch processing', 'Secure conversion', 'No watermarks', 'Fast processing'];
    }

    // Update the WebPage schema for conversion pages
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (conversionSchemas[2] as any).name = serviceName;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (conversionSchemas[2] as any).description = serviceDescription;

    (conversionSchemas[3] as WebApplicationSchema).name = serviceName;
    (conversionSchemas[3] as WebApplicationSchema).description = serviceDescription;

    // Add specific Service schema for this conversion type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (conversionSchemas as any[]).push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceName,
      description: serviceDescription,
      provider: {
        '@type': 'Organization',
        name: organizationSchema.name,
        url: organizationSchema.url,
      },
      serviceType: 'File Conversion',
      areaServed: 'Worldwide',
      url: currentUrl,
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: currentUrl,
        serviceType: 'Online',
      },
    });

    return conversionSchemas;
  }

  // Handle image editing tools (compress, resize, crop, remove-background)
  if (pathname === '/compress-image' || pathname === '/resize-image' || pathname === '/crop-image' || pathname === '/remove-background') {
    const imageToolSchemas = [...baseStructuredData];
    let toolName = '';
    let toolDescription = '';
    let featureList: string[] = [];

    if (pathname === '/compress-image') {
      toolName = 'Image Compressor';
      toolDescription = 'Compress images online for free. Reduce file size to 20KB, 50KB, 100KB or custom size without losing quality.';
      featureList = [
        'Compress image to specific file size (20KB, 50KB, 100KB, 200KB)',
        'Quality-based compression',
        'Visual comparison before and after',
        'No quality loss with smart compression',
        'Instant compression in browser',
        'Support for JPG, PNG, WebP formats',
      ];
    } else if (pathname === '/resize-image') {
      toolName = 'Image Resizer';
      toolDescription = 'Resize images online for free. Resize by pixels, percentage, or use preset sizes. Maintain aspect ratio and quality.';
      featureList = ['Resize by pixels or percentage', 'Preset sizes (HD, Full HD, 4K, thumbnail)', 'Maintain aspect ratio option', 'Custom dimensions', 'Instant preview', 'No quality loss'];
    } else if (pathname === '/crop-image') {
      toolName = 'Image Cropper';
      toolDescription = 'Crop images online for free. Professional image cropping with aspect ratio presets, rotate, flip, and zoom controls.';
      featureList = ['Crop with aspect ratio presets', 'Rotate and flip images', 'Zoom controls', 'Free crop mode', 'Instant preview', 'Precision controls'];
    } else if (pathname === '/remove-background') {
      toolName = 'Background Remover';
      toolDescription = 'Remove image backgrounds automatically with AI. Fast, accurate, and privacy-focused background removal tool.';
      featureList = ['AI-powered background removal', 'Automatic background detection', 'Transparent background output', 'Client-side processing', 'No server upload', 'Privacy-focused'];
    }

    // Update the WebPage schema
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (imageToolSchemas[2] as any).name = toolName;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (imageToolSchemas[2] as any).description = toolDescription;

    (imageToolSchemas[3] as WebApplicationSchema).name = toolName;
    (imageToolSchemas[3] as WebApplicationSchema).description = toolDescription;
    (imageToolSchemas[3] as WebApplicationSchema).featureList = featureList;

    // Add specific Service schema for image editing tools
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (imageToolSchemas as any[]).push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: toolName,
      description: toolDescription,
      provider: {
        '@type': 'Organization',
        name: organizationSchema.name,
        url: organizationSchema.url,
      },
      serviceType: 'Image Editing',
      areaServed: 'Worldwide',
      url: currentUrl,
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: currentUrl,
        serviceType: 'Online',
      },
    });

    return imageToolSchemas;
  }

  // Handle text tools pages
  if (pathname.startsWith('/texts')) {
    const textSchemas = [...baseStructuredData];

    if (pathname === '/texts') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textSchemas[2] as any).name = 'Text Tools - Emoji, Symbols & Fonts';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textSchemas[2] as any).description = 'Free online text tools including emoji picker, Unicode symbols library, font preview, and typography utilities.';

      (textSchemas[3] as WebApplicationSchema).featureList = [
        'Browse and copy emojis',
        'Unicode symbols library',
        'Google Fonts preview',
        'Font pairing suggestions',
        'Typographic scale generation',
        'Special characters collection',
      ];
    } else if (pathname === '/texts/emojis') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textSchemas[2] as any).name = 'Emoji Picker - Browse & Copy Emojis';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textSchemas[2] as any).description = 'Browse thousands of emojis with device-specific rendering. Filter by category and copy to clipboard instantly.';

      (textSchemas[3] as WebApplicationSchema).name = 'Emoji Picker';
      (textSchemas[3] as WebApplicationSchema).description = 'Browse and copy emojis with device-specific rendering preview.';
      (textSchemas[3] as WebApplicationSchema).featureList = [
        'Browse thousands of emojis',
        'Category-based filtering',
        'Search by name or keyword',
        'Device-specific rendering preview',
        'One-click copy to clipboard',
        'Native and platform emojis (Apple, Google, Microsoft, Samsung)',
      ];
    } else if (pathname === '/texts/symbols') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textSchemas[2] as any).name = 'Symbol Library - Unicode Symbols';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textSchemas[2] as any).description = 'Explore and copy special Unicode symbols and characters including mathematical symbols, arrows, currency signs, and shapes.';

      (textSchemas[3] as WebApplicationSchema).name = 'Symbol Library';
      (textSchemas[3] as WebApplicationSchema).description = 'Browse and copy Unicode symbols and special characters.';
      (textSchemas[3] as WebApplicationSchema).featureList = [
        'Mathematical symbols',
        'Arrow symbols',
        'Currency symbols',
        'Geometric shapes',
        'Punctuation marks',
        'Miscellaneous symbols',
        'Search and filter symbols',
        'One-click copy with Unicode reference',
      ];
    } else if (pathname === '/texts/fonts') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textSchemas[2] as any).name = 'Font Tools - Typography Utilities';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textSchemas[2] as any).description = 'Professional font tools including preview, pairing suggestions, and typographic scale generators.';

      (textSchemas[3] as WebApplicationSchema).featureList = [
        'Google Fonts preview with live customization',
        'Curated font pairing suggestions',
        'Typographic scale generation',
        'CSS font code generation',
        'Font weight and size testing',
        'Typography hierarchy tools',
      ];
    } else if (pathname === '/texts/fonts/preview') {
      (textSchemas[3] as WebApplicationSchema).name = 'Font Preview Tool';
      (textSchemas[3] as WebApplicationSchema).description = 'Interactive Google Fonts preview with customization options.';
      (textSchemas[3] as WebApplicationSchema).featureList = [
        'Live Google Fonts preview',
        'Font size and weight adjustment',
        'Line height and letter spacing controls',
        'Text and background color customization',
        'CSS code generation',
        'Font import code export',
      ];
    } else if (pathname === '/texts/fonts/pairings') {
      (textSchemas[3] as WebApplicationSchema).name = 'Font Pairing Explorer';
      (textSchemas[3] as WebApplicationSchema).description = 'Discover perfect font combinations with curated pairings.';
      (textSchemas[3] as WebApplicationSchema).featureList = [
        'Curated font pairing recommendations',
        'Category-based filtering',
        'Use case suggestions',
        'Live pairing preview',
        'CSS code generation',
        'Popular pairing highlights',
      ];
    } else if (pathname === '/texts/fonts/scales') {
      (textSchemas[3] as WebApplicationSchema).name = 'Typographic Scale Generator';
      (textSchemas[3] as WebApplicationSchema).description = 'Generate harmonious font size systems using musical ratios.';
      (textSchemas[3] as WebApplicationSchema).featureList = [
        'Musical ratio-based scales',
        'Customizable base size',
        'Visual scale preview',
        'CSS custom properties generation',
        'Quick preset scales',
        'Responsive scale suggestions',
      ];
    }

    // Add CreativeWork schema for text tools
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (textSchemas as any[]).push({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: pathname.includes('/fonts')
        ? 'Typography Tools Collection'
        : pathname.includes('/emojis')
          ? 'Emoji Collection'
          : pathname.includes('/symbols')
            ? 'Symbol Collection'
            : 'Text Tools Collection',
      description: pathname.includes('/fonts')
        ? 'Comprehensive typography tools for web designers and developers, including font preview, pairing suggestions, and typographic scale generators.'
        : pathname.includes('/emojis')
          ? 'Comprehensive emoji library with device-specific rendering and easy copy functionality.'
          : pathname.includes('/symbols')
            ? 'Complete Unicode symbols library with special characters for various use cases.'
            : 'Complete text tools collection including emojis, symbols, and font utilities.',
      url: currentUrl,
      creator: organizationSchema,
      audience: {
        '@type': 'Audience',
        audienceType: 'Web Designers and Developers',
      },
    });

    return textSchemas;
  }

  // Handle color tools pages
  if (pathname.startsWith('/colors')) {
    const colorSchemas = [...baseStructuredData];

    if (pathname === '/colors') {
      (colorSchemas[3] as WebApplicationSchema).featureList = ['Color picker', 'Color palette generation', 'Gradient creator', 'Color format converter', 'HEX to RGB conversion', 'Color scheme tools'];
    }

    return colorSchemas;
  }

  // For other pages (privacy, terms, etc.)
  return baseStructuredData;
};

// Export standalone Organization schema for use in homepage
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ImageConvertors',
  alternateName: 'ImageConvertors',
  url: siteConfig.url,
  logo: `${SITE_URL}/logo.png`,
  description: siteConfig.description,
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: [siteConfig.url],
});

// Generate dynamic metadata based on pathname

// Helper function to generate breadcrumb items
const generateBreadcrumbItems = (pathname: string) => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbList = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteConfig.url,
    },
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const routeData = routeMetadata[currentPath];
    breadcrumbList.push({
      '@type': 'ListItem',
      position: index + 2,
      name: routeData?.title ? String(routeData.title).split(' - ')[0] : segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      item: `${siteConfig.url}${currentPath}`,
    });
  });

  return breadcrumbList;
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (pathname: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: generateBreadcrumbItems(pathname),
  };
};

// Generate FAQ structured data
export const generateFAQStructuredData = (pathname: string) => {
  // Only add FAQ schema on homepage, converter pages, and image editing tools
  const isConverterPage = pathname !== '/' && (pathname.includes('-to-') || pathname.includes('pdf'));
  const isImageEditingTool = pathname === '/compress-image' || pathname === '/resize-image' || pathname === '/crop-image' || pathname === '/remove-background';

  if (pathname !== '/' && !isConverterPage && !isImageEditingTool) {
    return null;
  }

  const currentUrl = `${siteConfig.url}${pathname}`;
  // const pageMetadata = routeMetadata[pathname] || routeMetadata['/'];

  const commonFAQs = [
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

  let specificFAQs: FAQItem[] = [];

  if (pathname.includes('-to-')) {
    const [from, to] = pathname.slice(1).split('-to-');
    specificFAQs = [
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
  } else if (pathname === '/compress-image') {
    specificFAQs = [
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
      {
        '@type': 'Question',
        name: 'What is the best image compressor online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ImageConvertors offers a free image compressor with quality control, target file size compression (20KB, 50KB, 100KB), and instant browser-based processing. All compression happens locally in your browser, ensuring privacy and security.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to reduce image file size?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To reduce image file size: 1) Use our image compressor to compress the image, 2) Adjust quality settings (lower quality = smaller size), 3) Set a target file size like 50KB or 100KB, 4) Download the compressed image. You can reduce file size by 50-90% while maintaining good visual quality.',
        },
      },
    ];
  } else if (pathname === '/resize-image') {
    specificFAQs = [
      {
        '@type': 'Question',
        name: 'How to resize image online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To resize images online: 1) Upload your image, 2) Choose resize mode (by percentage, pixels, or preset), 3) Enter desired dimensions, 4) Enable "Maintain aspect ratio" to prevent distortion, 5) Click "Resize & Download". The resizing happens instantly in your browser.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to resize image without losing quality?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To resize images without losing quality: 1) Only reduce size (downscaling), never enlarge images, 2) Enable "Maintain aspect ratio" option, 3) Use high-quality output format like PNG for graphics or JPG at 90%+ quality for photos. Our tool uses advanced algorithms to preserve image quality during resizing.',
        },
      },
    ];
  } else if (pathname === '/crop-image') {
    specificFAQs = [
      {
        '@type': 'Question',
        name: 'How to crop image online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To crop images online: 1) Upload your image, 2) Select aspect ratio or use free crop mode, 3) Adjust the crop area by dragging corners, 4) Use rotate/flip options if needed, 5) Click "Crop & Download". All editing happens in your browser.',
        },
      },
    ];
  } else if (pathname === '/remove-background') {
    specificFAQs = [
      {
        '@type': 'Question',
        name: 'How to remove background from image?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To remove image background: 1) Upload your image, 2) Our AI automatically detects and removes the background, 3) Preview the result with transparent background, 4) Download as PNG to maintain transparency. All processing happens in your browser for privacy.',
        },
      },
    ];
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: currentUrl,
    mainEntity: [...specificFAQs, ...commonFAQs],
    mainEntityOfPage: currentUrl,
  };
};

// Generate HowTo structured data for conversion processes
export const generateHowToStructuredData = (pathname: string) => {
  if (!pathname.includes('-to-') && !pathname.includes('pdf')) {
    return null;
  }

  const currentUrl = `${siteConfig.url}${pathname}`;
  // const pageMetadata = routeMetadata[pathname] || routeMetadata['/'];

  let name = '';
  let description = '';
  let steps: HowToStep[] = [];

  if (pathname.includes('-to-')) {
    const [from, to] = pathname.slice(1).split('-to-');
    name = `How to Convert ${from.toUpperCase()} to ${to.toUpperCase()}`;
    description = `Step-by-step guide to convert ${from.toUpperCase()} images to ${to.toUpperCase()} format online for free.`;

    steps = [
      {
        '@type': 'HowToStep',
        position: 1,
        name: `Upload ${from.toUpperCase()} File`,
        text: `Click the upload button or drag and drop your ${from.toUpperCase()} file into the converter area.`,
        image: `${siteConfig.url}/images/howto/${from}-to-${to}/step-upload.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Start Conversion',
        text: `Click the "Convert" button to begin the ${from.toUpperCase()} to ${to.toUpperCase()} conversion process.`,
        image: `${siteConfig.url}/images/howto/${from}-to-${to}/step-convert.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: `Download ${to.toUpperCase()} File`,
        text: `Once conversion is complete, download your converted ${to.toUpperCase()} file instantly.`,
        image: `${siteConfig.url}/images/howto/${from}-to-${to}/step-download.webp`,
      },
    ];
  } else if (pathname.includes('pdf-to-')) {
    const format = pathname.includes('jpg') ? 'JPG' : 'PNG';
    const formatLower = format.toLowerCase();
    name = `How to Convert PDF to ${format}`;
    description = `Step-by-step guide to convert PDF documents to ${format} images online.`;

    steps = [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload PDF File',
        text: 'Select and upload the PDF document you want to convert to images.',
        image: `${siteConfig.url}/images/howto/pdf-to-${formatLower}/step-upload-pdf.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Choose Pages',
        text: 'Select which pages you want to convert or convert all pages.',
        image: `${siteConfig.url}/images/howto/pdf-to-${formatLower}/step-select-pages.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Convert to Images',
        text: `Click convert to transform your PDF pages into high-quality ${format} images.`,
        image: `${siteConfig.url}/images/howto/pdf-to-${formatLower}/step-convert-pdf.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Download Images',
        text: `Download individual ${format} images or get them all in a ZIP file.`,
        image: `${siteConfig.url}/images/howto/pdf-to-${formatLower}/step-download-images.webp`,
      },
    ];
  } else if (pathname.includes('images-to-pdf') || pathname.includes('-to-pdf')) {
    let formatName = '';
    let folderName = '';

    if (pathname.includes('png-to-pdf')) {
      formatName = 'PNG';
      folderName = 'png-to-pdf';
    } else if (pathname.includes('jpg-to-pdf')) {
      formatName = 'JPG';
      folderName = 'jpg-to-pdf';
    } else if (pathname.includes('webp-to-pdf')) {
      formatName = 'WebP';
      folderName = 'webp-to-pdf';
    } else {
      formatName = 'Images';
      folderName = 'images-to-pdf';
    }

    name = `How to Convert ${formatName} to PDF`;
    description = `Step-by-step guide to convert ${formatName} ${formatName === 'Images' ? 'files' : 'images'} into PDF documents.`;

    steps = [
      {
        '@type': 'HowToStep',
        position: 1,
        name: `Select ${formatName} ${formatName === 'Images' ? 'Files' : 'Images'}`,
        text: `Upload ${formatName === 'Images' ? 'multiple images' : `your ${formatName} images`} you want to convert to PDF.`,
        image: `${siteConfig.url}/images/howto/${folderName}/step-select-images.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Arrange Order',
        text: `${formatName === 'Images' ? 'Drag and drop images to arrange them in your preferred order.' : `Arrange your ${formatName} images in the desired order for the PDF.`}`,
        image: `${siteConfig.url}/images/howto/${folderName}/step-arrange-order.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Create PDF',
        text: `Click create to convert ${formatName === 'Images' ? 'all images' : `your ${formatName} images`} into a PDF document.`,
        image: `${siteConfig.url}/images/howto/${folderName}/step-create-pdf.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Download PDF',
        text: `Download your ${formatName} to PDF converted document instantly.`,
        image: `${siteConfig.url}/images/howto/${folderName}/step-download-pdf.webp`,
      },
    ];
  } else if (pathname.includes('merge-pdf')) {
    name = 'How to Merge PDF Files';
    description = 'Step-by-step guide to merge multiple PDF documents into one file.';

    steps = [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload PDF Files',
        text: 'Select and upload multiple PDF files you want to merge.',
        image: `${siteConfig.url}/images/howto/merge-pdf/step-upload-pdfs.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Arrange Order',
        text: 'Drag and drop PDF files to set the order for merging.',
        image: `${siteConfig.url}/images/howto/merge-pdf/step-arrange-order.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Merge PDFs',
        text: 'Click merge to combine all PDF files into a single document.',
        image: `${siteConfig.url}/images/howto/merge-pdf/step-merge-pdfs.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Download Merged PDF',
        text: 'Download your merged PDF document.',
        image: `${siteConfig.url}/images/howto/merge-pdf/step-download-merged.webp`,
      },
    ];
  } else if (pathname.includes('split-pdf')) {
    name = 'How to Split PDF Files';
    description = 'Step-by-step guide to split PDF documents into separate pages or sections.';

    steps = [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload PDF File',
        text: 'Select and upload the PDF document you want to split.',
        image: `${siteConfig.url}/images/howto/split-pdf/step-upload-pdf.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Choose Split Method',
        text: 'Select how you want to split: by pages, by size, or by bookmarks.',
        image: `${siteConfig.url}/images/howto/split-pdf/step-choose-method.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Split PDF',
        text: 'Click split to separate your PDF according to your chosen method.',
        image: `${siteConfig.url}/images/howto/split-pdf/step-split-pdf.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Download Split Files',
        text: 'Download individual PDF files or get them all in a ZIP archive.',
        image: `${siteConfig.url}/images/howto/split-pdf/step-download-split.webp`,
      },
    ];
  }

  if (steps.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    url: currentUrl,
    image: `${siteConfig.url}/og-image.webp`,
    mainEntityOfPage: currentUrl,
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
