#!/usr/bin/env node
/**
 * SEO audit & auto-fix — evidence collector + mechanical fixer for the /seo-fix skill.
 *
 * Checks that hold the i18n SEO contract together:
 *   1. metadata.* key parity across all 6 message files (missing / empty keys)
 *   2. untranslated copy (non-en value identical to en) — title/description
 *   3. sitemap routes[] vs. actual [locale] route dirs (page in app but not sitemap)
 *   4. tool pages missing generateMetadata or the canonical/hreflang helpers
 *
 * Usage:
 *   node scripts/seo-audit.mjs              # human report, exit 1 if errors
 *   node scripts/seo-audit.mjs --warn-only  # never exit non-zero
 *   node scripts/seo-audit.mjs --json       # machine-readable findings (for the skill)
 *   node scripts/seo-audit.mjs --fix        # auto-add missing routes to the sitemap
 *
 * Mechanical fixes (--fix) are limited to the sitemap routes[] array. Missing
 * translations and per-page canonical/hreflang need real localized copy and code
 * edits — those are done by the /seo-fix skill (the LLM), not this script.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['en', 'hi', 'de', 'ru', 'es', 'zh'];
const DEFAULT_LOCALE = 'en';
const META_FIELDS = ['title', 'description', 'keywords', 'ogTitle', 'ogDescription', 'ogImageAlt'];

const WARN_ONLY = process.argv.includes('--warn-only');
const JSON_OUT = process.argv.includes('--json');
const FIX = process.argv.includes('--fix');

/** findings: {severity:'error'|'warn', code, message, ...data} */
const findings = [];
const add = (severity, code, message, data = {}) => findings.push({ severity, code, message, ...data });
const fixes = [];

// ── Load messages ───────────────────────────────────────────────────────────
const messages = {};
for (const loc of LOCALES) {
  const p = join(ROOT, 'messages', `${loc}.json`);
  if (!existsSync(p)) {
    add('error', 'missing-message-file', `messages/${loc}.json is missing entirely`, { locale: loc });
    continue;
  }
  try {
    messages[loc] = JSON.parse(readFileSync(p, 'utf8'));
  } catch (e) {
    add('error', 'invalid-json', `messages/${loc}.json is not valid JSON: ${e.message}`, { locale: loc });
  }
}

// ── 1 & 2. metadata key parity + untranslated copy ───────────────────────────
const enMeta = messages[DEFAULT_LOCALE]?.metadata ?? {};
const metaKeys = Object.keys(enMeta);

for (const key of metaKeys) {
  for (const loc of LOCALES) {
    if (loc === DEFAULT_LOCALE) continue;
    const block = messages[loc]?.metadata?.[key];
    if (!block) {
      add('error', 'metadata-key-missing', `metadata.${key} is MISSING in messages/${loc}.json`, { key, locale: loc, enBlock: enMeta[key] });
      continue;
    }
    for (const field of META_FIELDS) {
      const enVal = enMeta[key]?.[field];
      const locVal = block[field];
      if (enVal && (locVal === undefined || locVal === '')) {
        add('error', 'metadata-field-empty', `metadata.${key}.${field} is empty/missing in ${loc}`, { key, field, locale: loc, en: enVal });
      } else if (enVal && locVal === enVal && (field === 'title' || field === 'description')) {
        add('warn', 'metadata-untranslated', `metadata.${key}.${field} in ${loc} is identical to en (likely untranslated)`, { key, field, locale: loc, en: enVal });
      }
    }
  }
}
for (const loc of LOCALES) {
  if (loc === DEFAULT_LOCALE) continue;
  for (const key of Object.keys(messages[loc]?.metadata ?? {})) {
    if (!metaKeys.includes(key)) add('warn', 'metadata-orphan', `metadata.${key} exists in ${loc} but not in ${DEFAULT_LOCALE} (orphan)`, { key, locale: loc });
  }
}

// ── 3. sitemap routes vs. app route dirs ──────────────────────────────────────
const sitemapPath = join(ROOT, 'next-sitemap.config.js');
let sitemapSrc = readFileSync(sitemapPath, 'utf8');
const routesMatch = sitemapSrc.match(/const routes\s*=\s*\[([\s\S]*?)\];/);
const sitemapRoutes = new Set();
if (routesMatch) {
  for (const m of routesMatch[1].matchAll(/['"]([^'"]*)['"]/g)) sitemapRoutes.add(m[1]);
} else {
  add('error', 'sitemap-unparsable', 'Could not parse routes[] from next-sitemap.config.js');
}

const localeDir = join(ROOT, 'src', 'app', '[locale]');
const NON_INDEXED = new Set(['blog', 'colors', 'fonts', 'texts']); // section roots with nested children
const appRoutes = [];
for (const d of readdirSync(localeDir, { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  if (existsSync(join(localeDir, d.name, 'page.tsx'))) appRoutes.push(`/${d.name}`);
}

const missingFromSitemap = [];
for (const r of appRoutes) {
  if (NON_INDEXED.has(r.slice(1))) continue;
  if (!sitemapRoutes.has(r)) {
    missingFromSitemap.push(r);
    add('error', 'route-not-in-sitemap', `Route ${r} has a page.tsx but is NOT in sitemap routes[] (will not be indexed)`, { route: r });
  }
}

// ── 4. page-level metadata hygiene ────────────────────────────────────────────
for (const r of appRoutes) {
  const src = readFileSync(join(localeDir, r.slice(1), 'page.tsx'), 'utf8');
  const isStatic = /privacy|terms|cookie|about|faq/.test(r);
  if (!/generateMetadata/.test(src)) {
    add(isStatic ? 'warn' : 'error', 'page-no-metadata', `${r}/page.tsx has no generateMetadata export`, { route: r });
    continue;
  }
  if (!/getAlternateLanguages/.test(src)) add('warn', 'page-no-hreflang', `${r}/page.tsx defines metadata but does not use getAlternateLanguages (hreflang may be missing)`, { route: r });
  if (!/canonical/.test(src)) add('warn', 'page-no-canonical', `${r}/page.tsx defines metadata but sets no canonical`, { route: r });
}

// ── Auto-fix: insert missing routes into the sitemap routes[] array ───────────
if (FIX && missingFromSitemap.length && routesMatch) {
  const insertion = missingFromSitemap.map(r => `  '${r}',`).join('\n');
  // Append the missing routes just before the closing `];` of the routes array.
  sitemapSrc = sitemapSrc.replace(/(const routes\s*=\s*\[[\s\S]*?)(\n\];)/, `$1\n\n  // Auto-added by seo-audit --fix\n${insertion}$2`);
  writeFileSync(sitemapPath, sitemapSrc);
  for (const r of missingFromSitemap) fixes.push(`Added ${r} to sitemap routes[]`);
}

// ── Output ────────────────────────────────────────────────────────────────────
const errors = findings.filter(f => f.severity === 'error');
const warnings = findings.filter(f => f.severity === 'warn');

if (JSON_OUT) {
  console.log(
    JSON.stringify(
      { summary: { errors: errors.length, warnings: warnings.length, metaKeys: metaKeys.length, sitemapRoutes: sitemapRoutes.size, appRoutes: appRoutes.length }, findings, fixesApplied: fixes },
      null,
      2,
    ),
  );
} else {
  console.log(`\n■ metadata.* keys in ${DEFAULT_LOCALE}: ${metaKeys.length}   |   sitemap routes: ${sitemapRoutes.size}   |   [locale] page dirs: ${appRoutes.length}`);
  if (fixes.length) {
    console.log(`\n🔧 ${fixes.length} fix(es) applied:`);
    for (const f of fixes) console.log(`   • ${f}`);
  }
  const line = '─'.repeat(64);
  console.log(`\n${line}`);
  if (warnings.length) {
    console.log(`\n⚠  ${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`   • ${w.message}`);
  }
  if (errors.length) {
    console.log(`\n✖  ${errors.length} error(s):`);
    for (const e of errors) console.log(`   • ${e.message}`);
  } else {
    console.log('\n✓  No blocking SEO errors found.');
  }
  console.log(`\n${line}\n`);
}

if (errors.length && !WARN_ONLY) process.exit(1);
