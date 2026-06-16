---
name: seo-fix
description: >-
  Audit, fix, and grow the organic search traffic of this Next.js 16 / next-intl
  tool site. Run when asked to "fix SEO", "/seo-fix", improve organic traffic,
  run an SEO audit, optimize titles/meta, repair missing metadata, add missing
  translations, fix the sitemap, or fix canonical/hreflang. Detects every gap
  with scripts/seo-audit.mjs, applies a research-backed organic-traffic playbook,
  writes/optimizes localized metadata in all 6 languages, fixes the sitemap, and
  wires canonical + hreflang. Pulls Google Search Console data (when connected) to
  find low-CTR / striking-distance pages and confirm real ranking movement — every
  finding evidence-backed and confidence-tagged.
---

# /seo-fix — audit, fix & grow organic traffic

**free-convert** is a programmatic-SEO tool site (Next.js 16 App Router, next-intl,
6 locales: `en, hi, de, ru, es, zh`; default `en` has no URL prefix). Transactional
search traffic to the tool pages is the entire business. Your job when this skill
runs: **find every SEO gap, fix it, and push each page toward more organic clicks** —
then prove the work holds.

Work the full loop autonomously. Only pause to ask the user before changing visible
**English** copy or deleting content; translations, sitemap entries, schema, and
canonical/hreflang wiring should just be done.

## Step 0 — Load the playbook (always)

Read **`references/organic-traffic-playbook.md`** (in this skill folder) first. It is
the source of truth for *how* to optimize — title/meta rules with exact limits, keyword
intent, content-depth/thin-content rules, E-E-A-T, GEO/AEO, schema, CWV, internal
linking, the growth loop, and the confidence/severity rubric. Apply it throughout.

## Step 1 — Research when it matters

SEO rules and AI-search behavior change. Before applying any ranking-impacting change
that depends on current behavior (title/meta limits, schema types, GEO/`llms.txt`,
algorithm updates) or when the user asks to "research", use **`WebSearch`/`WebFetch`**
to confirm 2026 best practice — don't rely on memory. Prefer primary sources (Google
Search Central, web.dev, Schema.org).

## Step 1.5 — Google Search Console (real ranking data)

This is the **only** way to know whether a keyword actually works and whether a page
moved up in Google — code audits prove a page is *eligible* to rank, GSC proves what it
*does* rank for. Always try to load GSC data; degrade gracefully if it isn't available.

**Get the data (in priority order):**
1. **GSC MCP server**, if one is connected. Discover it with `ToolSearch` (query
   `search console` / `google search console` / `gsc`). If found, query the
   `searchanalytics` data for the property (default `https://<SITE_URL>`).
2. **Pasted / exported data** — ask the user to export *Search results* from
   [search.google.com/search-console](https://search.google.com/search-console)
   (Performance → Export → CSV/Sheets) and share it, or paste the Queries + Pages tables.
3. **None available** → say so explicitly, mark every traffic-performance finding as
   `Hypothesis`, and still do all the on-page/technical work (Steps 2–5). Note that
   ranking impact can only be confirmed once GSC is connected.

**What to pull (last 28 days, then compare to the prior 28 for movement):**
- Per **page**: clicks, impressions, CTR, average position.
- Per **query**: same four metrics, plus the page that ranks for it.
- Segment by **country** when judging the 6 locales (e.g. `de` performance in Germany).

**Turn the data into prioritized action (highest ROI first):**
| Signal in GSC | Meaning | Action |
|---|---|---|
| High impressions, **low CTR** | Ranks but title/meta don't earn the click | Rewrite title/description (playbook §2–§3) — fastest win, no new ranking needed |
| **Position 5–15** ("striking distance") | One page-1 push away | Strengthen content depth, internal links, schema for that page (§5, §8, §11) |
| Query with impressions but **no dedicated page** | Unmet demand | Propose a new tool/blog page for it |
| Position **dropping** week-over-week | Decay / lost ranking | Investigate (content freshness, a regression, new competitor) |
| Locale page ranks far below `en` | Weak localization | Improve that locale's copy/translation (§9) |

**Close the loop:** after applying fixes, note the page's current avg position/CTR as a
baseline and tell the user to **re-check GSC in 2–4 weeks** — that's how long Google
takes to reflect changes. Report movement as `Confirmed` only once GSC shows it.

**Privacy:** GSC data may include real query/traffic data — keep it in the working
session; don't write exports into the repo or commit them.

## Step 2 — Collect evidence

```bash
node scripts/seo-audit.mjs --json --warn-only
```

Returns `{ summary, findings[], fixesApplied[] }`. Each finding has `severity`
(`error`/`warn`), `code`, `message`, and fix data (`key`, `locale`, `field`, `route`,
`en`, `enBlock`). Triage **errors (block indexing / break parity) before warnings**.

## Step 3 — Fix each finding by its `code`

### `route-not-in-sitemap` (Critical) — page exists but won't be indexed
```bash
node scripts/seo-audit.mjs --fix
```
Appends every missing route to `routes[]` in `next-sitemap.config.js`, then move each
into the correct category comment block. Confirm it isn't caught by `exclude`.

### `metadata-key-missing` / `metadata-field-empty` (Critical) — missing localized copy
The finding's `enBlock`/`en` is the English source. **Write real, optimized,
natural-language copy** for the full block in the target locale under `metadata.<key>`
in `messages/<locale>.json`. Don't just translate — apply the playbook's title (§2) and
meta-description (§3) rules and localize to the *search term people actually use* in
that language (playbook §9). Block shape:
```json
"title": "...", "description": "...", "keywords": "...",
"ogTitle": "...", "ogDescription": "...", "ogImageAlt": "..."
```
Rules: titles ≤ 60 chars, keyword front-loaded; descriptions 120–158 chars starting
with the target phrase + a benefit/number + CTA; keep brand/format tokens (PNG, WebP,
HEIC, PDF, Lottie, QR, FreeConvert, extensions) untranslated; `zh` = Simplified, `hi` =
Devanagari; insert the key in the same position other locales use; keep JSON valid.

### `metadata-untranslated` (Warning) — non-en title/description identical to en
Replace with proper localized, optimized copy (same rules). Untranslated metadata
competes with the en page and signals low quality.

### `page-no-metadata` (Critical for tools) — no `generateMetadata`
Add one from the canonical template below, plus its `metadata.<key>` in all 6 files.

### `page-no-canonical` / `page-no-hreflang` (Warning)
Wire the repo helpers into `generateMetadata` — **never hand-build URLs**:
```ts
import { locales, localeMap, type Locale } from '@/i18n/config';
import { getAlternateLanguages, getLocalizedUrl } from '@/lib/metadata/localizedUrl';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.<key>' });
  const canonicalUrl = getLocalizedUrl({ locale, path: '/<route>' });
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages({ locales, path: '/<route>' }),
    },
    openGraph: {
      title: t('ogTitle'), description: t('ogDescription'), url: canonicalUrl,
      siteName: 'FreeConvert', type: 'website', locale: localeMap[locale] || 'en_US',
      images: [{ url: '/convert.webp', width: 1200, height: 630, alt: t('ogImageAlt') }],
    },
  };
}
```
`getAlternateLanguages` already appends `x-default`. Reference: `src/app/[locale]/png-to-webp/page.tsx`.

### `metadata-orphan` (Warning)
Key exists in a non-`en` locale but not `en`. Add the `en` key if the route still
exists; delete the orphan if the route was removed.

## Step 4 — Growth pass (beyond just fixing errors)

Once parity is green, raise traffic ceilings (playbook §1, §5, §12):
- **CTR:** review existing en titles/descriptions against §2–§3 — front-loaded keyword?
  ≤60 chars? benefit/number/CTA? Rewrite weak ones (highest-leverage win). Propose en
  changes for approval; apply confidently to non-en locales.
- **Thin content:** flag tool pages lacking a real intro / HowTo / FAQ / format-specific
  facts (§5). These cap rankings under Google's scaled-content rules.
- **Schema:** ensure each page emits the right JSON-LD (§8) — WebApplication, HowTo,
  FAQPage, Breadcrumb — server-rendered.
- **GEO/AEO:** add a ~40–60-word self-contained answer + question-style headings (§7)
  so ChatGPT/Perplexity/Gemini/AI Overviews can cite the page.
- **Internal links:** cross-link sibling converters + blog↔tool (§11); register new tools
  in `src/config/toolCatalog.ts`.

## Step 5 — Verify (do not skip)

```bash
node scripts/seo-audit.mjs    # expect 0 errors
npm run type-check
npm run lint
```
Re-run the audit until **0 errors**. Genuine false-positive warnings (e.g. metadata set
via a shared layout) may remain — note them explicitly, never silently.

## Step 6 — Report (use the rubric)

Summarize as **Finding → Evidence → Impact → Fix**, each tagged `Critical/Warning/Info`
× `Confirmed/Likely/Hypothesis` (playbook rubric). Cover:
- sitemap routes added; `metadata.<key>` blocks added/optimized by locale;
  pages wired for canonical/hreflang; CTR/content/schema/GEO/linking improvements;
- final audit (errors → 0) + type-check/lint status;
- warnings intentionally left, with reasons;
- a short **prioritized next-steps** list of traffic opportunities that need live GSC
  data or new content (the highest-ROI work, ranked by impact × effort).

## Ground-truth reference (don't re-derive)

| Concern | Location |
|---|---|
| Optimization knowledge base | `references/organic-traffic-playbook.md` (this folder) |
| Locales / OG locale map | `src/i18n/config.ts` (`locales`, `localeMap`, default `en`) |
| Canonical / hreflang helpers | `src/lib/metadata/localizedUrl.ts` |
| Per-page metadata template | `src/app/[locale]/png-to-webp/page.tsx` |
| Translations | `messages/{en,hi,de,ru,es,zh}.json` → `metadata.<key>` |
| Sitemap + robots | `next-sitemap.config.js` (`routes[]`, hreflang `transform`) |
| Structured data (JSON-LD) | `src/components/StructuredData.tsx`, `src/lib/metadata`, `src/lib/geoHelpers.ts` |
| Tool registry (internal links) | `src/config/toolCatalog.ts` |
| Default OG image | `/convert.webp` (1200×630) |

Commands: `node scripts/seo-audit.mjs` (report) · `… --json` (structured) · `… --fix` (auto-add sitemap routes).
