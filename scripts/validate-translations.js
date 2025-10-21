#!/usr/bin/env node

/**
 * Translation Validation Script
 *
 * This script validates that all translation files have the same structure
 * as the English (en.json) file, which is the source of truth.
 *
 * Usage: node scripts/validate-translations.js
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '../messages');
const SOURCE_LOCALE = 'en';
const LOCALES = ['en', 'de', 'es', 'ru', 'hi', 'zh'];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, ...args) {
  console.log(color, ...args, colors.reset);
}

function getAllKeys(obj, prefix = '') {
  const keys = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

function validateTranslations() {
  log(colors.cyan, '\n🔍 Validating translations...\n');

  // Load source file
  const sourcePath = path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);
  if (!fs.existsSync(sourcePath)) {
    log(colors.red, `❌ Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const sourceKeys = getAllKeys(sourceContent);

  log(colors.blue, `📋 Source locale: ${SOURCE_LOCALE}`);
  log(colors.blue, `📊 Total keys in source: ${sourceKeys.length}\n`);

  let hasErrors = false;
  const results = {};

  // Validate each locale
  for (const locale of LOCALES) {
    if (locale === SOURCE_LOCALE) {
      log(colors.green, `✓ ${locale} (source)`);
      continue;
    }

    const localePath = path.join(MESSAGES_DIR, `${locale}.json`);

    if (!fs.existsSync(localePath)) {
      log(colors.red, `✗ ${locale} - File not found: ${localePath}`);
      hasErrors = true;
      continue;
    }

    const localeContent = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    const localeKeys = getAllKeys(localeContent);

    const missingKeys = sourceKeys.filter(key => !localeKeys.includes(key));
    const extraKeys = localeKeys.filter(key => !sourceKeys.includes(key));

    results[locale] = {
      total: localeKeys.length,
      missing: missingKeys,
      extra: extraKeys,
    };

    if (missingKeys.length === 0 && extraKeys.length === 0) {
      log(colors.green, `✓ ${locale} - All ${localeKeys.length} keys present`);
    } else {
      hasErrors = true;
      log(colors.yellow, `⚠ ${locale} - ${localeKeys.length} keys (${missingKeys.length} missing, ${extraKeys.length} extra)`);

      if (missingKeys.length > 0) {
        log(colors.red, `  Missing keys:`);
        missingKeys.slice(0, 10).forEach(key => {
          log(colors.red, `    - ${key}`);
        });
        if (missingKeys.length > 10) {
          log(colors.red, `    ... and ${missingKeys.length - 10} more`);
        }
      }

      if (extraKeys.length > 0) {
        log(colors.yellow, `  Extra keys:`);
        extraKeys.slice(0, 10).forEach(key => {
          log(colors.yellow, `    - ${key}`);
        });
        if (extraKeys.length > 10) {
          log(colors.yellow, `    ... and ${extraKeys.length - 10} more`);
        }
      }
    }
  }

  // Summary
  log(colors.cyan, '\n' + '='.repeat(50));
  if (hasErrors) {
    log(colors.red, '\n❌ Validation failed! Some translations are incomplete.\n');
    log(colors.yellow, 'Please update the translation files to match the source structure.\n');
    process.exit(1);
  } else {
    log(colors.green, '\n✅ All translations are valid!\n');
    process.exit(0);
  }
}

// Run validation
try {
  validateTranslations();
} catch (error) {
  log(colors.red, '\n❌ Error during validation:');
  console.error(error);
  process.exit(1);
}
