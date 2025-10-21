'use client';
import Image from 'next/image';
import { Upload, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');

  const scrollToConverter = () => {
    const element = document.getElementById('format-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('title')}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t('titleHighlight')}</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 mb-6 max-w-xl">{t('description')}</p>

            <div className="mb-8">
              <p className="text-gray-700 mb-2">{t('popularConversions')}</p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {['PNG → WebP', 'JPG → PNG', 'WebP → PNG', 'JPG → WebP', 'PNG → JPG', 'WebP → JPG'].map(format => (
                  <span key={format} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm border">
                    {format}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToConverter}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Upload className="mr-2" size={20} />
                {tCommon('uploadYourImage')}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const element = document.getElementById('how-to');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-xl border-2 hover:bg-gray-50"
              >
                {tCommon('learnHow')}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>
                ✓ {t('features.noRegistration')} • ✓ {t('features.browserBased')} • ✓ {t('features.secure')}
              </p>
            </div>
          </div>

          {/* Visual Element */}
          <div className="flex justify-center mt-12 lg:mt-0">
            <div className="relative w-full max-w-xl pb-20">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-blue-200/60">
                <Image
                  src="/person-with-laptop.webp"
                  alt="Designer converting images on a laptop"
                  width={1024}
                  height={1236}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 1280px) 70vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-white/10 to-transparent" />
              </div>

              <div className="absolute left-1/2 -bottom-12 w-full max-w-md -translate-x-1/2">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/60 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-3">{t('popularConversions')}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: 'PNG', color: 'text-blue-600' },
                      { label: 'JPG', color: 'text-purple-600' },
                      { label: 'WebP', color: 'text-green-600' },
                      { label: 'PDF', color: 'text-red-500' },
                    ].map(format => (
                      <div key={format.label} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center justify-center">
                        <span className={`text-2xl font-bold ${format.color}`}>{format.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <ArrowRight className="text-blue-500" size={20} />
                    <span>{t('instantConversions')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
