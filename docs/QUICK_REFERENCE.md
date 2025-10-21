# Translation System Quick Reference

## 🚀 Quick Start

### Client Component

```tsx
'use client';
import { useTranslations } from '@/lib/translations';

const MyComponent = () => {
  const t = useTranslations('converterPage');
  return <h1>{t('step1Title')}</h1>;
};
```

### Server Component

```tsx
import { getTranslations } from '@/lib/translations';

const MyServerComponent = async () => {
  const t = await getTranslations('converterPage');
  return <h1>{t('step1Title')}</h1>;
};
```

## 📋 Common Commands

```bash
# Generate TypeScript types from en.json
npm run generate:types

# Validate all translation files
npm run validate:translations

# Run both (happens automatically before build)
npm run prebuild
```

## ✅ Adding New Translation

1. **Add to `messages/en.json`:**
```json
{
  "myNamespace": {
    "myNewKey": "My new translation"
  }
}
```

2. **Generate types:**
```bash
npm run generate:types
```

3. **Add to all other locale files** (`de.json`, `es.json`, `ru.json`, `hi.json`, `zh.json`)

4. **Validate:**
```bash
npm run validate:translations
```

5. **Use in code:**
```tsx
const t = useTranslations('myNamespace');
const text = t('myNewKey'); // Type-safe!
```

## 🔍 Available Namespaces

- `common` - Common UI elements (buttons, actions)
- `errors` - Error messages
- `header` - Header navigation
- `footer` - Footer content
- `hero` - Hero section
- `features` - Features section
- `converterPage` - Image converter pages
- `converter` - Generic converter
- `cropper` - Image cropper tool
- `resizer` - Image resizer tool
- `compressor` - Image compressor tool
- `qrcode` - QR code generator
- `bgRemover` - Background remover
- `pdfTool` - PDF tools
- `metadata` - SEO metadata
- And many more...

## 💡 With Interpolation

```tsx
// Translation in en.json:
// "greeting": "Hello, {name}! You have {count} messages."

const t = useTranslations('common');
const message = t('greeting', { name: 'John', count: 5 });
// Result: "Hello, John! You have 5 messages."
```

## 🐛 Troubleshooting

### Error: "MISSING_MESSAGE: Could not resolve 'namespace.key'"

1. Check if key exists in `messages/en.json`
2. Run `npm run generate:types`
3. Run `npm run validate:translations`

### Error: TypeScript error - Property doesn't exist

The key doesn't exist in your translation files. Add it to `en.json` and regenerate types.

### Build Fails with Validation Errors

Some locale files are missing keys. Check the error output and add missing translations.

## 📁 File Locations

- Translation files: `/messages/*.json`
- Generated types: `/src/types/translations.generated.ts` (DO NOT EDIT)
- Wrapper functions: `/src/lib/translations.ts`
- Scripts: `/scripts/generate-translation-types.js` & `/scripts/validate-translations.js`

## 🎯 Key Benefits

- ✅ **Compile-time safety** - Catch missing translations before runtime
- ✅ **IDE autocomplete** - Get suggestions for all valid keys
- ✅ **Refactoring support** - Find all usages when renaming keys
- ✅ **Prevents errors** - No more "MISSING_MESSAGE" errors in production
- ✅ **Consistent structure** - All locales always in sync

---

For complete documentation, see [TRANSLATIONS.md](./TRANSLATIONS.md)



