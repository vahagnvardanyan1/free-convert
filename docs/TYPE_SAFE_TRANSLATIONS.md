# Type-Safe Translations with Module Augmentation

This project uses **next-intl's module augmentation** to provide compile-time type safety for all translations. This is the recommended best practice by next-intl.

## 🎯 How It Works

### Module Augmentation

We augment the `next-intl` module to make TypeScript aware of our translation structure:

```typescript
// src/types/next-intl.d.ts
import { routing } from '@/i18n/routing';
import messages from '../../messages/en.json';

type Messages = typeof messages;

declare global {
  interface IntlMessages extends Messages {}
}

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Messages;
  }
}
```

This approach:
- ✅ Uses the official next-intl API (no custom wrappers)
- ✅ Provides full TypeScript autocomplete and type checking
- ✅ Works with both `useTranslations` and `getTranslations`
- ✅ Supports nested namespace access like `useTranslations('formatGrid.colorTools')`
- ✅ Zero runtime overhead - all type checking happens at compile time

## 🚀 Usage

### Client Components

```tsx
'use client';
import { useTranslations } from 'next-intl';

const MyComponent = () => {
  const t = useTranslations('converterPage');
  
  // ✅ TypeScript autocomplete and validation
  return (
    <div>
      <h1>{t('step1Title')}</h1>
      <p>{t('step1Description')}</p>
    </div>
  );
};
```

### Server Components

```tsx
import { getTranslations } from 'next-intl/server';

const MyServerComponent = async () => {
  const t = await getTranslations('converterPage');
  
  // ✅ TypeScript autocomplete and validation
  return <h1>{t('step1Title')}</h1>;
};
```

### Nested Namespaces

The type system supports nested namespace access:

```tsx
// Access nested properties
const t = useTranslations('formatGrid');
t('colorTools'); // ✅ Works!

// Or access top-level namespace
const tColor = useTranslations('colorTools');
tColor('layout.title'); // ✅ Works with nested keys!
```

### With Interpolation

```tsx
const t = useTranslations('converterPage');

// With dynamic values
const text = t('step1Description', { format: 'PNG' });
```

## ✅ Benefits

### 1. Compile-Time Safety

TypeScript catches translation errors before runtime:

```tsx
const t = useTranslations('converterPage');

// ❌ TypeScript error - key doesn't exist
t('step3Convert');

// ✅ Correct key - autocompletes
t('step3Title');
```

### 2. IDE Autocomplete

Your IDE provides autocomplete for all translation keys:

```tsx
const t = useTranslations('converterPage');
t('step') // IDE suggests: step1Title, step2Title, step3Title, step4Title
```

### 3. Refactoring Support

When renaming keys, TypeScript shows all usages that need updating.

### 4. No Runtime Overhead

All type checking happens at compile time. The production bundle has zero additional code.

### 5. Official API

Uses the standard next-intl API - no learning curve for new developers.

## 🌍 Supported Locales

- **English** (en) - Source of truth
- **German** (de)
- **Spanish** (es)
- **Russian** (ru)
- **Hindi** (hi)
- **Chinese** (zh)

All locales are validated to match the structure of `messages/en.json`.

## 📝 Adding New Translations

### Step 1: Add to English (Source)

Add new keys to `messages/en.json`:

```json
{
  "converterPage": {
    "step1Title": "Upload your {format} image",
    "newKey": "Your new translation"
  }
}
```

### Step 2: TypeScript Recognizes It Automatically

TypeScript immediately recognizes the new key:

```tsx
const t = useTranslations('converterPage');
t('newKey'); // ✅ TypeScript knows about this!
```

### Step 3: Add to All Other Locales

Add the same key to `de.json`, `es.json`, `ru.json`, `hi.json`, and `zh.json`.

### Step 4: Validate

Ensure all locales have the key:

```bash
npm run validate:translations
```

## 🧪 Validation

### Automatic Validation

The validation script runs before every build:

```bash
npm run validate:translations
```

This ensures:
- ✅ All locales have the same keys as `en.json`
- ✅ No missing translations
- ✅ No extra keys
- ✅ All 1528+ translation keys are present

### What Gets Validated

```
✓ en (source)
✓ de - All 1528 keys present
✓ es - All 1528 keys present  
✓ ru - All 1528 keys present
✓ hi - All 1528 keys present
✓ zh - All 1528 keys present

✅ All translations are valid!
```

## 🐛 Troubleshooting

### Issue: "Property doesn't exist"

**Error:**
```
Property 'step3Convert' does not exist on type...
```

**Solution:**
Check `messages/en.json` for the correct key name and update your code.

### Issue: MISSING_MESSAGE Runtime Error

**Error:**
```
IntlError: MISSING_MESSAGE: Could not resolve `converterPage.step3Convert` in messages for locale `ru`.
```

**Solution:**
1. Check if the key exists in `messages/en.json`
2. If it exists, add it to the missing locale file
3. Run `npm run validate:translations`

### Issue: TypeScript Not Recognizing New Keys

**Solution:**
1. Ensure the key is added to `messages/en.json`
2. Restart your TypeScript server (in VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server")
3. The `src/types/next-intl.d.ts` file imports `en.json` directly, so changes are reflected immediately

## 📚 File Structure

```
/messages/
  ├── en.json              # Source of truth
  ├── de.json             # German translations
  ├── es.json             # Spanish translations
  ├── ru.json             # Russian translations
  ├── hi.json             # Hindi translations
  └── zh.json             # Chinese translations

/src/
  ├── types/
  │   └── next-intl.d.ts  # Module augmentation
  ├── i18n/
  │   ├── config.ts       # Locale configuration
  │   ├── routing.ts      # Routing configuration
  │   └── request.ts      # Request configuration
  └── components/         # Your components using translations

/scripts/
  └── validate-translations.js  # Validation script
```

## 🔗 Resources

- [next-intl TypeScript Documentation](https://next-intl-docs.vercel.app/docs/workflows/typescript)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- Project translation files: `/messages/`

## 🎓 Best Practices

### 1. Always Use en.json as Source of Truth

Add new keys to `messages/en.json` first, then propagate to other locales.

### 2. Use Descriptive Keys

```tsx
// ✅ Good
t('step1Title')
t('uploadImageDescription')

// ❌ Bad
t('title1')
t('desc')
```

### 3. Group Related Translations

```json
{
  "converterPage": {
    "step1Title": "...",
    "step1Description": "...",
    "step2Title": "...",
    "step2Description": "..."
  }
}
```

### 4. Use Interpolation for Dynamic Content

```json
{
  "greeting": "Hello, {name}!"
}
```

```tsx
t('greeting', { name: 'John' })
```

### 5. Validate Before Committing

Always run validation before committing changes:

```bash
npm run validate:translations
```

## 🆘 Getting Help

If you encounter issues:

1. Check the [next-intl TypeScript docs](https://next-intl-docs.vercel.app/docs/workflows/typescript)
2. Run `npm run validate:translations` to check for structural issues
3. Check the console for helpful error messages in development mode
4. Review `src/types/next-intl.d.ts` to understand the type augmentation

---

**Last Updated:** October 2025  
**Method:** Module Augmentation (Official next-intl Best Practice)  
**Status:** ✅ Production Ready



