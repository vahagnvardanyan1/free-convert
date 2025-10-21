/**
 * Type augmentation for next-intl
 *
 * This file augments the next-intl module to provide type safety for translations.
 * It ensures that all translation keys are type-checked at compile time.
 *
 * @see https://next-intl-docs.vercel.app/docs/workflows/typescript
 */

import type { routing } from '@/i18n/routing';
import type messages from '../../messages/en.json';

type Messages = typeof messages;

declare global {
  // Use type safe message keys with `next-intl`
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Messages;
  }
}
