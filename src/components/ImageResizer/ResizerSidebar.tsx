import { CheckCircle, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ToolSection, ToolSidebar } from '@/components/tooling/ToolSection';

export const ResizerSidebar = () => {
  const t = useTranslations('resizer');

  return (
    <ToolSidebar>
      <ToolSection title={t('commonUses')}>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <CheckCircle className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('use1')}</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('use2')}</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('use3')}</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('use4')}</span>
          </li>
        </ul>
      </ToolSection>

      <ToolSection title={t('tips')}>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <Settings className="mr-2 text-purple-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('tip1')}</span>
          </li>
          <li className="flex items-start">
            <Settings className="mr-2 text-purple-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('tip2')}</span>
          </li>
          <li className="flex items-start">
            <Settings className="mr-2 text-purple-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{t('tip3')}</span>
          </li>
        </ul>
      </ToolSection>
    </ToolSidebar>
  );
};
