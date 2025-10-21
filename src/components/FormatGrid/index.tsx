'use client';
import {
  ArrowRight,
  FileImage,
  Image as ImageIcon,
  Globe,
  Camera,
  FileText,
  Merge,
  Split,
  Info,
  Palette,
  Droplet,
  Blend,
  Shuffle,
  Type,
  Sparkles,
  Ruler,
  Smile,
  Hash,
  Eraser,
  Maximize2,
  QrCode,
  Wand2,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { Card } from '../Card';

export function FormatGrid() {
  const t = useTranslations('formatGrid');
  const tTools = useTranslations('tools');
  const tCommon = useTranslations('common');

  const converters = [
    {
      from: 'Compress',
      to: 'Image',
      route: '/compress-image',
      icon: Maximize2,
      description: tTools('compressImageDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'AI Image',
      to: 'Generator',
      route: '/ai-image-generator',
      icon: Wand2,
      description: tTools('aiImageGeneratorDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'Remove',
      to: 'Background',
      route: '/remove-background',
      icon: Eraser,
      description: tTools('removeBackgroundDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'PNG',
      to: 'WebP',
      route: '/png-to-webp',
      icon: Globe,
      description: tTools('pngToWebpDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'JPG',
      to: 'PNG',
      route: '/jpg-to-png',
      icon: ImageIcon,
      description: tTools('jpgToPngDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'WebP',
      to: 'PNG',
      route: '/webp-to-png',
      icon: FileImage,
      description: tTools('webpToPngDesc'),
      popular: false,
      category: 'image',
    },
    {
      from: 'JPG',
      to: 'WebP',
      route: '/jpg-to-webp',
      icon: Globe,
      description: tTools('jpgToWebpDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'PNG',
      to: 'JPG',
      route: '/png-to-jpg',
      icon: Camera,
      description: tTools('pngToJpgDesc'),
      popular: false,
      category: 'image',
    },
    {
      from: 'WebP',
      to: 'JPG',
      route: '/webp-to-jpg',
      icon: Camera,
      description: tTools('webpToJpgDesc'),
      popular: false,
      category: 'image',
    },
    {
      from: 'HEIC',
      to: 'JPG',
      route: '/heic-to-jpg',
      icon: Camera,
      description: tTools('heicToJpgDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'HEIC',
      to: 'PNG',
      route: '/heic-to-png',
      icon: ImageIcon,
      description: tTools('heicToPngDesc'),
      popular: false,
      category: 'image',
    },
    {
      from: 'HEIC',
      to: 'WebP',
      route: '/heic-to-webp',
      icon: Globe,
      description: tTools('heicToWebpDesc'),
      popular: false,
      category: 'image',
    },
    {
      from: 'HEIC',
      to: 'PDF',
      route: '/heic-to-pdf',
      icon: FileText,
      description: tTools('heicToPdfDesc'),
      popular: false,
      category: 'image',
    },
    {
      from: 'PDF',
      to: 'JPG',
      route: '/pdf-to-jpg',
      icon: FileText,
      description: tTools('pdfToJpgDesc'),
      popular: true,
      category: 'pdf',
    },
    {
      from: 'PDF',
      to: 'PNG',
      route: '/pdf-to-png',
      icon: FileText,
      description: tTools('pdfToPngDesc'),
      popular: true,
      category: 'pdf',
    },
    {
      from: 'Images',
      to: 'PDF',
      route: '/images-to-pdf',
      icon: FileImage,
      description: tTools('imagesToPdfDesc'),
      popular: true,
      category: 'pdf',
    },
    {
      from: 'PNG',
      to: 'PDF',
      route: '/png-to-pdf',
      icon: FileImage,
      description: tTools('pngToPdfDesc'),
      popular: true,
      category: 'pdf',
    },
    {
      from: 'JPG',
      to: 'PDF',
      route: '/jpg-to-pdf',
      icon: FileImage,
      description: tTools('jpgToPdfDesc'),
      popular: true,
      category: 'pdf',
    },
    {
      from: 'WebP',
      to: 'PDF',
      route: '/webp-to-pdf',
      icon: FileImage,
      description: tTools('webpToPdfDesc'),
      popular: false,
      category: 'pdf',
    },
    {
      from: 'Merge',
      to: 'PDF',
      route: '/merge-pdf',
      icon: Merge,
      description: tTools('mergePdfDesc'),
      popular: false,
      category: 'pdf',
    },
    {
      from: 'Split',
      to: 'PDF',
      route: '/split-pdf',
      icon: Split,
      description: tTools('splitPdfDesc'),
      popular: false,
      category: 'pdf',
    },
    {
      from: 'Crop',
      to: 'Image',
      route: '/crop-image',
      icon: ImageIcon,
      description: tTools('cropImageDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'Resize',
      to: 'Image',
      route: '/resize-image',
      icon: Maximize2,
      description: tTools('resizeImageDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'QR Code',
      to: 'Generator',
      route: '/qr-code-generator',
      icon: QrCode,
      description: tTools('qrCodeGeneratorDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'Chart',
      to: 'Generator',
      route: '/chart-generator',
      icon: BarChart3,
      description: tTools('chartGeneratorDesc'),
      popular: true,
      category: 'image',
    },
    {
      from: 'Analyze',
      to: 'PDF',
      route: '/pdf-info',
      icon: Info,
      description: tTools('analyzePdfDesc'),
      popular: false,
      category: 'pdf',
    },
    {
      from: 'Color',
      to: 'Picker',
      route: '/colors/picker',
      icon: Droplet,
      description: tTools('colorPickerDesc'),
      popular: true,
      category: 'colors',
    },
    {
      from: 'Color',
      to: 'Palettes',
      route: '/colors/palettes',
      icon: Palette,
      description: tTools('colorPalettesDesc'),
      popular: true,
      category: 'colors',
    },
    {
      from: 'Gradient',
      to: 'Generator',
      route: '/colors/gradients',
      icon: Blend,
      description: tTools('gradientGeneratorDesc'),
      popular: true,
      category: 'colors',
    },
    {
      from: 'Color',
      to: 'Converter',
      route: '/colors/converter',
      icon: Shuffle,
      description: tTools('colorConverterDesc'),
      popular: false,
      category: 'colors',
    },
    {
      from: 'Font',
      to: 'Preview',
      route: '/texts/fonts/preview',
      icon: Type,
      description: tTools('fontPreviewDesc'),
      popular: true,
      category: 'fonts',
    },
    {
      from: 'Font',
      to: 'Pairings',
      route: '/texts/fonts/pairings',
      icon: Sparkles,
      description: tTools('fontPairingsDesc'),
      popular: true,
      category: 'fonts',
    },
    {
      from: 'Typographic',
      to: 'Scale',
      route: '/texts/fonts/scales',
      icon: Ruler,
      description: tTools('typographicScaleDesc'),
      popular: true,
      category: 'fonts',
    },
    {
      from: 'Emoji',
      to: 'Browser',
      route: '/texts/emojis',
      icon: Smile,
      description: tTools('emojiBrowserDesc'),
      popular: true,
      category: 'texts',
    },
    {
      from: 'Symbol',
      to: 'Browser',
      route: '/texts/symbols',
      icon: Hash,
      description: tTools('symbolBrowserDesc'),
      popular: true,
      category: 'texts',
    },
  ];
  const imageConverters = converters.filter(c => c.category === 'image');
  const pdfConverters = converters.filter(c => c.category === 'pdf');
  const colorTools = converters.filter(c => c.category === 'colors');
  const fontTools = converters.filter(c => c.category === 'fonts');
  const textTools = converters.filter(c => c.category === 'texts');

  const renderConverterCard = (converter: (typeof converters)[0]) => {
    const IconComponent = converter.icon;
    return (
      <Link key={`${converter.from}-${converter.to}`} href={converter.route}>
        <Card className="relative p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group">
          {converter.popular && (
            <div className="absolute -top-3 left-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">{tCommon('popular')}</span>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-200 shrink-0">
                <IconComponent className="text-gray-600 group-hover:text-white" size={20} />
              </div>
              <div className="text-left min-w-0">
                <div className="flex items-center gap-1 font-bold text-gray-900 text-sm sm:text-base min-w-0">
                  <span className="truncate max-w-[6.5rem] sm:max-w-[8rem]" title={converter.from}>
                    {converter.from}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="truncate max-w-[6.5rem] sm:max-w-[8rem]" title={converter.to}>
                    {converter.to}
                  </span>
                </div>
              </div>
            </div>
            <ArrowRight className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200" size={20} />
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">{converter.description}</p>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2 min-w-0">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs truncate max-w-[6rem] sm:max-w-[7rem]" title={converter.from}>
                {converter.from}
              </span>
              <ArrowRight size={12} className="text-gray-400 shrink-0" />
              <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded text-xs truncate max-w-[6rem] sm:max-w-[7rem]" title={converter.to}>
                {converter.to}
              </span>
            </div>
            <span className="text-xs text-gray-500 shrink-0">{tCommon('clickToConvert')}</span>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <section id="format-grid" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('description')}</p>
        </div>

        {/* Image Converters */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <ImageIcon className="mr-2" size={24} />
            {t('imageConverters')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{imageConverters.map(renderConverterCard)}</div>
        </div>

        {/* PDF Tools */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="mr-2" size={24} />
            {t('pdfTools')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{pdfConverters.map(renderConverterCard)}</div>
        </div>

        {/* Color Tools */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Palette className="mr-2" size={24} />
            {t('colorTools')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{colorTools.map(renderConverterCard)}</div>
        </div>

        {/* Font Tools */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Type className="mr-2" size={24} />
            {t('fontTools')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{fontTools.map(renderConverterCard)}</div>
        </div>

        {/* Text Tools */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Sparkles className="mr-2" size={24} />
            {t('textSymbolTools')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{textTools.map(renderConverterCard)}</div>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Explore Color Tools */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                <Palette className="mr-2" size={24} />
                {t('exploreColorTools')}
              </h3>
              <p className="text-gray-600 mb-4">{t('exploreColorDescription')}</p>
              <Link
                href="/colors"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                {tCommon('viewAll')} {t('colorTools')}
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>

            {/* Explore Font Tools */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                <Type className="mr-2" size={24} />
                {t('exploreFontTools')}
              </h3>
              <p className="text-gray-600 mb-4">{t('exploreFontDescription')}</p>
              <Link
                href="/texts/fonts"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                {tCommon('viewAll')} {t('fontTools')}
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>

            {/* Explore Text Tools */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-100">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                <Sparkles className="mr-2" size={24} />
                {t('exploreTextTools')}
              </h3>
              <p className="text-gray-600 mb-4">{t('exploreTextDescription')}</p>
              <Link
                href="/texts"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                {tCommon('viewAll')} {t('exploreTextTools')}
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-6">
            {/* Learn More */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-gray-900 mb-2">{t('needDifferentFormat')}</h3>
              <p className="text-gray-600 mb-4">{t('needDifferentFormatDescription')}</p>
              <button
                onClick={() => {
                  const element = document.getElementById('how-to');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                {tCommon('learnMore')}
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
