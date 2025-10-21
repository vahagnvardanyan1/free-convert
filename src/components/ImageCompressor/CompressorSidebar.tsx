import { Info, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ToolSection, ToolSidebar } from '@/components/tooling/ToolSection';

export const CompressorSidebar = () => {
  const t = useTranslations('compressor');

  return (
    <ToolSidebar>
      <ToolSection title={t('whyCompress')}>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <Zap className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('benefit1')}</span>
          </li>
          <li className="flex items-start">
            <Zap className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('benefit2')}</span>
          </li>
          <li className="flex items-start">
            <Zap className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('benefit3')}</span>
          </li>
          <li className="flex items-start">
            <Zap className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('benefit4')}</span>
          </li>
        </ul>
      </ToolSection>

      <ToolSection title={t('compressionTips')}>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <Info className="mr-2 text-purple-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('tip1')}</span>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-purple-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('tip2')}</span>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-purple-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('tip3')}</span>
          </li>
        </ul>
      </ToolSection>
    </ToolSidebar>
  );
};
