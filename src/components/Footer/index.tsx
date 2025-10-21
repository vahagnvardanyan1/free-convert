'use client';

import { Mail, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '../LanguageSwitcher';

export function Footer() {
  const t = useTranslations('footer');
  const tHeader = useTranslations('header');
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 pb-6 border-b border-gray-800 sm:border-b-0 sm:pb-0">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">IC</span>
              </div>
              <span className="ml-2 text-xl font-bold">{t('brandName')}</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-sm">{t('brandDescription')}</p>
            <div className="flex items-center space-x-2">
              <Mail className="text-gray-400" size={16} />
              <a href="mailto:cropimage@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                {t('email')}
              </a>
            </div>
          </div>

          {/* AI Tools */}
          <div className="border-b border-gray-800 pb-4 sm:border-b-0 sm:pb-0">
            <button onClick={() => toggleSection('ai')} className="flex items-center justify-between w-full sm:cursor-default sm:pointer-events-none">
              <h3 className="font-semibold mb-4 sm:mb-4">{t('aiTools')}</h3>
              <ChevronDown className={`sm:hidden transition-transform ${openSection === 'ai' ? 'rotate-180' : ''}`} size={20} />
            </button>
            <ul className={`space-y-2 ${openSection === 'ai' ? 'block' : 'hidden sm:block'}`}>
              <li>
                <Link href="/ai-image-generator" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('aiImageGenerator')}
                </Link>
              </li>
              <li>
                <Link href="/remove-background" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('removeBackground')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Image Converters */}
          <div className="border-b border-gray-800 pb-4 sm:border-b-0 sm:pb-0">
            <button onClick={() => toggleSection('image')} className="flex items-center justify-between w-full sm:cursor-default sm:pointer-events-none">
              <h3 className="font-semibold mb-4 sm:mb-4">{t('imageConverters')}</h3>
              <ChevronDown className={`sm:hidden transition-transform ${openSection === 'image' ? 'rotate-180' : ''}`} size={20} />
            </button>
            <ul className={`space-y-2 ${openSection === 'image' ? 'block' : 'hidden sm:block'}`}>
              <li>
                <Link href="/crop-image" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('cropImage')}
                </Link>
              </li>
              <li>
                <Link href="/resize-image" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('resizeImage')}
                </Link>
              </li>
              <li>
                <Link href="/png-to-webp" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('pngToWebp')}
                </Link>
              </li>
              <li>
                <Link href="/jpg-to-png" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('jpgToPng')}
                </Link>
              </li>
              <li>
                <Link href="/webp-to-png" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('webpToPng')}
                </Link>
              </li>
              <li>
                <Link href="/jpg-to-webp" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('jpgToWebp')}
                </Link>
              </li>
              <li>
                <Link href="/png-to-jpg" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('pngToJpg')}
                </Link>
              </li>
              <li>
                <Link href="/webp-to-jpg" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('webpToJpg')}
                </Link>
              </li>
              <li>
                <Link href="/heic-to-jpg" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('heicToJpg')}
                </Link>
              </li>
              <li>
                <Link href="/heic-to-png" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('heicToPng')}
                </Link>
              </li>
              <li>
                <Link href="/heic-to-webp" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('heicToWebp')}
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('imageAnalyzer')}
                </Link>
              </li>
              <li>
                <Link href="/qr-code-generator" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('qrCodeGenerator')}
                </Link>
              </li>
              <li>
                <Link href="/chart-generator" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('chartGenerator')}
                </Link>
              </li>
            </ul>
          </div>

          {/* PDF Tools */}
          <div className="border-b border-gray-800 pb-4 sm:border-b-0 sm:pb-0">
            <button onClick={() => toggleSection('pdf')} className="flex items-center justify-between w-full sm:cursor-default sm:pointer-events-none">
              <h3 className="font-semibold mb-4 sm:mb-4">{t('pdfTools')}</h3>
              <ChevronDown className={`sm:hidden transition-transform ${openSection === 'pdf' ? 'rotate-180' : ''}`} size={20} />
            </button>
            <ul className={`space-y-2 ${openSection === 'pdf' ? 'block' : 'hidden sm:block'}`}>
              <li>
                <Link href="/pdf-to-jpg" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('pdfToJpg')}
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-png" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('pdfToPng')}
                </Link>
              </li>
              <li>
                <Link href="/images-to-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('imagesToPdf')}
                </Link>
              </li>
              <li>
                <Link href="/png-to-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('pngToPdf')}
                </Link>
              </li>
              <li>
                <Link href="/jpg-to-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('jpgToPdf')}
                </Link>
              </li>
              <li>
                <Link href="/heic-to-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('heicToPdf')}
                </Link>
              </li>
              <li>
                <Link href="/webp-to-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('webpToPdf')}
                </Link>
              </li>
              <li>
                <Link href="/merge-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('mergePdfFiles')}
                </Link>
              </li>
              <li>
                <Link href="/split-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('splitPdfFiles')}
                </Link>
              </li>
              <li>
                <Link href="/pdf-info" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('pdfInformation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Color Tools */}
          <div className="border-b border-gray-800 pb-4 sm:border-b-0 sm:pb-0">
            <button onClick={() => toggleSection('color')} className="flex items-center justify-between w-full sm:cursor-default sm:pointer-events-none">
              <h3 className="font-semibold mb-4 sm:mb-4">{t('colorTools')}</h3>
              <ChevronDown className={`sm:hidden transition-transform ${openSection === 'color' ? 'rotate-180' : ''}`} size={20} />
            </button>
            <ul className={`space-y-2 ${openSection === 'color' ? 'block' : 'hidden sm:block'}`}>
              <li>
                <Link href="/colors" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  {t('allColorTools')}
                </Link>
              </li>
              <li>
                <Link href="/colors/picker" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('colorPicker')}
                </Link>
              </li>
              <li>
                <Link href="/colors/palettes" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('colorPalettes')}
                </Link>
              </li>
              <li>
                <Link href="/colors/gradients" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('gradientGenerator')}
                </Link>
              </li>
              <li>
                <Link href="/colors/converter" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('colorConverter')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Text Tools */}
          <div className="border-b border-gray-800 pb-4 sm:border-b-0 sm:pb-0">
            <button onClick={() => toggleSection('text')} className="flex items-center justify-between w-full sm:cursor-default sm:pointer-events-none">
              <h3 className="font-semibold mb-4 sm:mb-4">{t('textTools')}</h3>
              <ChevronDown className={`sm:hidden transition-transform ${openSection === 'text' ? 'rotate-180' : ''}`} size={20} />
            </button>
            <ul className={`space-y-2 ${openSection === 'text' ? 'block' : 'hidden sm:block'}`}>
              <li>
                <Link href="/texts" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  {t('allTextTools')}
                </Link>
              </li>
              <li>
                <Link href="/texts/json-validator" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('jsonValidator')}
                </Link>
              </li>
              <li>
                <Link href="/texts/json-comparer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('jsonComparer')}
                </Link>
              </li>
              <li>
                <Link href="/texts/json-parser" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('jsonParser')}
                </Link>
              </li>
              <li>
                <Link href="/texts/emojis" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('emojiPicker')}
                </Link>
              </li>
              <li>
                <Link href="/texts/symbols" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('symbolLibrary')}
                </Link>
              </li>
              <li>
                <Link href="/texts/fonts/preview" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('fontPreview')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog & Resources */}
          <div className="border-b border-gray-800 pb-4 sm:border-b-0 sm:pb-0">
            <button onClick={() => toggleSection('blog')} className="flex items-center justify-between w-full sm:cursor-default sm:pointer-events-none">
              <h3 className="font-semibold mb-4 sm:mb-4">{t('blogResources')}</h3>
              <ChevronDown className={`sm:hidden transition-transform ${openSection === 'blog' ? 'rotate-180' : ''}`} size={20} />
            </button>
            <ul className={`space-y-2 max-h-[400px] overflow-y-auto ${openSection === 'blog' ? 'block' : 'hidden sm:block'}`}>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('blogHome')}
                </Link>
              </li>
              <li>
                <Link href="/blog/qr-code-generator-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('qrCodeGeneratorGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/crop-image-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('cropImageGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/resize-image-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('resizeImageGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/remove-background-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('removeBackgroundGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/png-to-webp-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('pngToWebpGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/png-to-jpg-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('pngToJpgGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/webp-to-png-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('webpToPngGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/png-to-pdf-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('pngToPdfGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/jpg-to-webp-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('jpgToWebpGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/jpg-to-pdf-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('jpgToPdfGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/pdf-to-jpg-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('pdfToJpgGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/heic-to-jpg-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('heicToJpgGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/heic-to-webp-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('heicToWebpGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/compress-images-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('compressImagesGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/color-picker-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('colorPickerGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/color-palette-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('colorPaletteGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/gradient-generator-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('gradientGeneratorGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/color-converter-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('colorConverterGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/font-preview-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('fontPreviewGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/font-pairing-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('fontPairingGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/typographic-scale-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('typographicScaleGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/emoji-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('emojiGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/symbol-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('symbolGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/json-validator-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('jsonValidatorGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/json-comparer-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('jsonComparerGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/json-parser-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {tHeader('jsonParserGuide')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links - Centered */}
        <div className="mt-8 pt-8">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t('privacyPolicy')}
            </Link>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <Link href="/terms-of-use" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t('termsOfUse')}
            </Link>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t('termsOfService')}
            </Link>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t('cookiePolicy')}
            </Link>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-400 text-sm text-center sm:text-left">{t('copyright')}</p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span className="text-gray-400 text-sm">{t('madeWithLove')}</span>
              <span className="text-gray-500 text-xs">{t('clientSideProcessing')}</span>
            </div>
            <div className="flex justify-center sm:justify-end">
              <LanguageSwitcher triggerClassName="bg-gray-800 text-gray-100 border-gray-700 hover:border-gray-500 focus-visible:border-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
