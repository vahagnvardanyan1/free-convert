export const locales = ['en', 'hi', 'de', 'ru', 'es', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  de: 'Deutsch',
  ru: 'Русский',
  es: 'Español',
  zh: '中文',
};

export const localeMap: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  de: 'de_DE',
  ru: 'ru_RU',
  es: 'es_ES',
  zh: 'zh_CN',
};
