'use client';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function BannerBlocks() {
  const t = useTranslations('banner');
  const tCommon = useTranslations('common');

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* First Banner - Advanced Tools */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8 lg:p-12 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="mr-3" size={24} />
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">{t('proTools')}</span>
            </div>
            <h3 className="text-3xl font-bold mb-4">{t('batchProcessing')}</h3>
            <p className="text-blue-100 mb-6 leading-relaxed max-w-2xl mx-auto">{t('batchProcessingDesc')}</p>
            <button className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              {tCommon('comingSoon')}
              <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>

        {/* Second Banner - Security & Privacy */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="h-64 lg:h-full order-2 lg:order-1">
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <Shield className="w-24 h-24 text-green-600 mx-auto mb-4" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <Star className="text-yellow-500 fill-current" size={16} />
                    </div>
                    <p className="text-gray-600">{t('trustedByUsers')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 lg:p-12 order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <Shield className="mr-3 text-green-600" size={24} />
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{t('secure')}</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('privacyPriority')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{t('privacyPriorityDesc')}</p>
              <div className="space-y-2">
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">{t('clientSideProcessing')}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">{t('noDataCollection')}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">{t('worksOffline')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
