# Type-Safe Translation System

This project uses a comprehensive type-safe translation system to prevent missing translation errors and ensure consistency across all supported locales.

## 🎯 Overview

The system consists of:
1. **Translation JSON files** - Located in `/messages/` directory
2. **Auto-generated TypeScript types** - Generated from `en.json` (source of truth)
3. **Type-safe wrapper functions** - Provide compile-time checking for translation keys
4. **Validation scripts** - Ensure all locales have matching structure

## 🌍 Supported Locales

- **English** (en) - Source of truth
- **German** (de)
- **Spanish** (es)
- **Russian** (ru)
- **Hindi** (hi)
- **Chinese** (zh)

## 📁 File Structure

```
/messages/               # Translation JSON files
  ├── en.json           # English (source of truth)
  ├── de.json           # German
  ├── es.json           # Spanish
  ├── ru.json           # Russian
  ├── hi.json           # Hindi
  └── zh.json           # Chinese

/src/types/
  └── translations.generated.ts  # Auto-generated types (DO NOT EDIT)

/src/lib/
  └── translations.ts   # Type-safe wrapper functions

/scripts/
  ├── generate-translation-types.js  # Generate TypeScript types
  └── validate-translations.js       # Validate translation files
```

## 🚀 Usage

### Client Components

Use the type-safe `useTranslations` hook in client components:

```tsx
'use client';
import { useTranslations } from '@/lib/translations';

const MyComponent = () => {
  const t = useTranslations('converterPage');
  
  // ✅ Type-safe - TypeScript knows this key exists
  const title = t('step1Title');
  
  // ✅ With interpolation
  const description = t('step1Description', { format: 'PNG' });
  
  // ❌ TypeScript error - key doesn't exist
  // const invalid = t('nonExistentKey');
  
  return <h1>{title}</h1>;
};
```

### Server Components

Use the type-safe `getTranslations` function in server components:

```tsx
import { getTranslations } from '@/lib/translations';

const MyServerComponent = async () => {
  const t = await getTranslations('converterPage');
  
  // ✅ Type-safe
  const title = t('step1Title');
  
  return <h1>{title}</h1>;
};
```

### Using Multiple Namespaces

```tsx
'use client';
import { useTranslations } from '@/lib/translations';

const MyComponent = () => {
  const t = useTranslations('converterPage');
  const tCommon = useTranslations('common');
  const tErrors = useTranslations('errors');
  
  return (
    <div>
      <h1>{t('step1Title')}</h1>
      <button>{tCommon('download')}</button>
      <p>{tErrors('processingFailed')}</p>
    </div>
  );
};
```

## 🔨 Scripts

### Generate TypeScript Types

Regenerate TypeScript types from `en.json`:

```bash
npm run generate:types
```

This script:
- Reads `messages/en.json`
- Generates TypeScript interfaces for all translation keys
- Outputs to `src/types/translations.generated.ts`
- Creates union types for type-safe namespace access

**When to run:**
- After adding new translation keys to `en.json`
- After modifying the structure of translation files
- Before committing changes to translations

### Validate Translations

Ensure all locale files have matching structure:

```bash
npm run validate:translations
```

This script:
- Compares all locale files against `en.json`
- Reports missing keys
- Reports extra keys
- Fails the build if inconsistencies are found

**When to run:**
- After updating any translation file
- Before committing changes
- Automatically runs in `prebuild`

## 📝 Adding New Translations

### Step 1: Add to English (Source)

Always add new translation keys to `messages/en.json` first:

```json
{
  "converterPage": {
    "step1Title": "Upload your {format} image",
    "step2Title": "Choose {format} as output",
    "step3Title": "Convert your image",
    "newKeyHere": "Your new translation text"
  }
}
```

### Step 2: Generate Types

Run the type generator:

```bash
npm run generate:types
```

### Step 3: Add to Other Locales

Add the same key to all other locale files (`de.json`, `es.json`, `ru.json`, `hi.json`, `zh.json`):

```json
{
  "converterPage": {
    "step1Title": "Laden Sie Ihr {format}-Bild hoch",
    "step2Title": "Wählen Sie {format} als Ausgabe",
    "step3Title": "Konvertieren Sie Ihr Bild",
    "newKeyHere": "Ihr neuer Übersetzungstext"
  }
}
```

### Step 4: Validate

Ensure all translations are present:

```bash
npm run validate:translations
```

### Step 5: Use in Code

Now you can use the new key with full type safety:

```tsx
const t = useTranslations('converterPage');
const newText = t('newKeyHere'); // ✅ Type-safe!
```

## 🛠️ Benefits of This System

### 1. **Compile-Time Safety**

TypeScript catches missing translation keys at compile time, not runtime:

```tsx
const t = useTranslations('converterPage');
t('step3Convert'); // ❌ TypeScript error: Key doesn't exist
t('step3Title');   // ✅ Correct key
```

### 2. **Auto-Complete**

Your IDE provides autocomplete for all translation keys:

```tsx
const t = useTranslations('converterPage');
t('step') // IDE suggests: step1Title, step2Title, step3Title, etc.
```

### 3. **Refactoring Safety**

When renaming keys, TypeScript shows all usages that need updating.

### 4. **Prevents Runtime Errors**

The system shown in your error (`MISSING_MESSAGE: Could not resolve 'converterPage.step3Convert'`) is now caught at compile time.

### 5. **Consistent Structure**

Validation ensures all locales have identical structure, preventing:
- Missing translations
- Typos in keys
- Structural mismatches

## 🔍 How It Works

### Type Generation

The `generate-translation-types.js` script:

1. Reads `messages/en.json`
2. Recursively traverses the JSON structure
3. Generates TypeScript interfaces matching the structure
4. Creates union types for each namespace
5. Outputs to `src/types/translations.generated.ts`

### Type-Safe Wrappers

The wrapper functions in `src/lib/translations.ts`:

1. Accept a namespace parameter (with type checking)
2. Return a function that accepts translation keys (with type checking)
3. Provide fallback behavior for missing translations in development
4. Log helpful error messages when keys are missing

### Validation

The `validate-translations.js` script:

1. Loads `en.json` as the source of truth
2. Compares each locale file against the source
3. Reports missing keys (keys in `en.json` but not in locale)
4. Reports extra keys (keys in locale but not in `en.json`)
5. Fails the build if any inconsistencies are found

## 🐛 Debugging Translation Issues

### Development Mode

In development, the wrapper functions will:
- Log errors to the console when a key is missing
- Return a visible fallback like `[Missing: namespace.key]`
- Not crash the application

### Production Mode

In production, the wrapper functions will:
- Silently fail (no console errors)
- Return the fallback text
- Allow the application to continue running

### Common Issues

#### Issue: "MISSING_MESSAGE: Could not resolve 'namespace.key'"

**Solution:**
1. Check if the key exists in `messages/en.json`
2. Run `npm run generate:types` to update TypeScript types
3. Run `npm run validate:translations` to check all locales

#### Issue: TypeScript error "Key doesn't exist"

**Solution:**
1. The key is genuinely missing from the translation files
2. Add the key to `messages/en.json`
3. Run `npm run generate:types`
4. Add the key to all other locale files

#### Issue: Build fails with validation errors

**Solution:**
1. Review the validation output to see which keys are missing
2. Add the missing keys to the appropriate locale files
3. Ensure all locale files have the same structure

## 🎓 Best Practices

### 1. **Always Start with English**

Add new keys to `en.json` first, then propagate to other locales.

### 2. **Run Scripts Regularly**

Run `npm run generate:types` and `npm run validate:translations` frequently during development.

### 3. **Use Descriptive Keys**

```tsx
// ✅ Good
t('step1Title')
t('uploadImageDescription')

// ❌ Bad
t('title1')
t('desc')
```

### 4. **Group Related Translations**

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

### 5. **Use Interpolation for Dynamic Content**

```json
{
  "greeting": "Hello, {name}!"
}
```

```tsx
t('greeting', { name: 'John' })
```

### 6. **Commit Generated Types**

Always commit the generated `translations.generated.ts` file so team members have up-to-date types.

## 🔄 Migration Guide

### From Old System to New System

1. **Update imports:**

```tsx
// Old (before)
import { useTranslations } from 'next-intl';

// New (after)
import { useTranslations } from '@/lib/translations';
```

2. **Generate types:**

```bash
npm run generate:types
```

3. **Fix TypeScript errors:**

TypeScript will now show errors for invalid keys. Fix them by:
- Using the correct key name
- Adding missing keys to translation files

4. **Test thoroughly:**

Run the application and test all pages to ensure translations work correctly.

## 📚 Additional Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- Project translation files: `/messages/`

## 🆘 Getting Help

If you encounter issues:

1. Check this documentation first
2. Run `npm run validate:translations` to check for structural issues
3. Check the console for helpful error messages in development mode
4. Review the generated types in `src/types/translations.generated.ts`

---

**Last Updated:** October 2025  
**Generated by:** Translation Type System v1.0



