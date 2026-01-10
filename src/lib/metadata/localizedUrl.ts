import { SITE_URL } from '@/config/constants';
import { defaultLocale, type Locale } from '@/i18n/config';

type GetLocalizedUrlArgs = {
  locale: Locale;
  /**
   * Path within the site (no domain). May be '' for home, '/colors', or 'colors'.
   */
  path?: string;
};

export const getLocalizedUrl = ({ locale, path = '' }: GetLocalizedUrlArgs) => {
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

  // Ensure home is always returned as `${SITE_URL}/` to avoid canonical/hreflang mismatch due to a missing trailing slash.
  if (!localePrefix && !normalizedPath) return `${SITE_URL}/`;

  return `${SITE_URL}${localePrefix}${normalizedPath}`;
};

type GetAlternateLanguagesArgs = {
  path?: string;
  locales: readonly Locale[];
  includeXDefault?: boolean;
};

export const getAlternateLanguages = ({ path = '', locales, includeXDefault = true }: GetAlternateLanguagesArgs) => {
  const entries = locales.map(locale => [locale, getLocalizedUrl({ locale, path })] as const);
  const languages = Object.fromEntries(entries) as Record<string, string>;

  if (includeXDefault) {
    languages['x-default'] = getLocalizedUrl({ locale: defaultLocale, path });
  }

  return languages;
};
