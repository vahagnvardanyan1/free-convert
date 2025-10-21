'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { Globe } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { cn } from '@/lib/utils';

type LanguageSwitcherProps = {
  triggerClassName?: string;
};

export function LanguageSwitcher({ triggerClassName }: LanguageSwitcherProps = {}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageChange = (newLocale: Locale) => {
    // Use next-intl's router which handles locale switching automatically
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known params are used
      { pathname, params },
      { locale: newLocale },
    );
  };

  return (
    <div className="relative inline-block">
      <Select value={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger
          aria-label="Select language"
          size="sm"
          className={cn('w-auto gap-2 bg-white text-gray-700 shadow-sm border border-gray-200 font-medium data-[placeholder]:text-gray-500', triggerClassName)}
        >
          <Globe className="h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {locales.map(loc => (
            <SelectItem key={loc} value={loc}>
              {localeNames[loc]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
