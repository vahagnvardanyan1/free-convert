# Type-Safe Translation System Documentation

Welcome to the Type-Safe Translation System documentation! This system ensures that all translation keys are type-checked at compile time, preventing missing translation errors.

## 📚 Documentation Files

- **[TRANSLATIONS.md](./TRANSLATIONS.md)** - Complete guide with detailed explanations
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference for common tasks

## 🚀 Quick Start

### 1. Using Translations in Components

**Client Component:**
```tsx
'use client';
import { useTranslations } from '@/lib/translations';

const MyComponent = () => {
  const t = useTranslations('converterPage');
  return <h1>{t('step1Title')}</h1>; // ✅ Type-safe!
};
```

**Server Component:**
```tsx
import { getTranslations } from '@/lib/translations';

const MyServerComponent = async () => {
  const t = await getTranslations('converterPage');
  return <h1>{t('step1Title')}</h1>; // ✅ Type-safe!
};
```

### 2. Adding New Translations

```bash
# 1. Edit messages/en.json (add your new key)
# 2. Generate types
npm run generate:types

# 3. Add the same key to all other locale files
# 4. Validate
npm run validate:translations
```

### 3. Available Commands

```bash
npm run generate:types        # Generate TypeScript types from en.json
npm run validate:translations # Validate all translation files
```

## 🎯 What Problem Does This Solve?

Before this system, translation errors like this occurred at runtime:

```
❌ IntlError: MISSING_MESSAGE: Could not resolve `converterPage.step3Convert` in messages for locale `ru`.
```

Now, these errors are caught at compile time:

```tsx
const t = useTranslations('converterPage');
t('step3Convert'); // ❌ TypeScript error: Property 'step3Convert' does not exist
t('step3Title');   // ✅ Correct!
```

## 🌍 Supported Locales

- **en** - English (source of truth)
- **de** - German
- **es** - Spanish
- **ru** - Russian
- **hi** - Hindi
- **zh** - Chinese

## 📁 File Structure

```
/messages/                          # Translation JSON files
  ├── en.json                      # Source of truth
  └── *.json                       # Other locales

/src/
  ├── lib/translations.ts          # Type-safe wrappers
  └── types/translations.generated.ts  # Auto-generated types

/scripts/
  ├── generate-translation-types.js    # Type generator
  └── validate-translations.js         # Validator

/docs/
  ├── README.md                    # This file
  ├── TRANSLATIONS.md              # Complete guide
  └── QUICK_REFERENCE.md           # Quick reference
```

## ✅ Benefits

1. **Compile-Time Safety** - Catch missing keys before deployment
2. **IDE Autocomplete** - Get suggestions for valid translation keys
3. **Refactoring Support** - Find all usages when renaming keys
4. **Consistent Structure** - All locales always in sync
5. **Better DX** - Clear error messages and type hints

## 🔗 Learn More

- [Complete Documentation](./TRANSLATIONS.md) - In-depth guide
- [Quick Reference](./QUICK_REFERENCE.md) - Common tasks and troubleshooting

## 🆘 Need Help?

Check the troubleshooting section in [TRANSLATIONS.md](./TRANSLATIONS.md) or run:

```bash
npm run validate:translations  # Check for structural issues
```

---

**Last Updated:** October 2025



