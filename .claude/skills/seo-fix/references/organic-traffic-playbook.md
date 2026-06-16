# Organic-Traffic Playbook — free-convert

The reference knowledge base for the `/seo-fix` skill. This site is a free
file-conversion / image / PDF / color / font / text tools site (Next.js 16, next-intl,
6 locales). It lives or dies on **programmatic, transactional, high-intent** search
traffic ("png to webp", "heic to jpg", "compress image"). Every rule below is in
service of one goal: **more qualified organic traffic to the tool pages**.

Sourced from 2026 best-practice research (see "Sources" at the bottom). When a rule
depends on rapidly-changing Google/AI-engine behavior, re-verify with `WebSearch`
before acting — don't rely on memory for ranking-impacting calls.

---

## 1. The traffic model — where clicks come from

Organic clicks = **impressions × CTR**, and impressions = **rank × query demand**.
So three levers, in priority order:

1. **Indexable & eligible** — the page must be crawlable, in the sitemap, canonical,
   not duplicate. (No eligibility → zero traffic. This is what the audit script guards.)
2. **Rank** — relevance (keyword-aligned title/H1/content), authority, technical
   quality (Core Web Vitals), and unique value vs. competitors.
3. **CTR** — the title tag + meta description decide whether a ranked impression
   becomes a click. A compelling description can **double** organic traffic from the
   *same* ranking position; a strong title pattern can lift CTR **~36%**.

**Highest-leverage quarterly action:** rewrite titles/descriptions on pages with
**high impressions but low CTR** (find these in Google Search Console). This is the
fastest traffic win that needs no new ranking.

---

## 2. Title tags (the #1 lever — a direct ranking factor AND the top CTR driver)

- **Length:** 50–60 characters / ≤ ~600px so it doesn't truncate on desktop or mobile.
  A truncated title lowers CTR, which feeds back as a negative ranking signal.
- **Front-load the primary keyword** — exact-match user query first ("PNG to WebP
  Converter …"), so the critical words survive truncation and match (and bold) in SERPs.
- **One unique title per page.** Duplicate titles across the 6 locales' *same* page is
  fine (they're separate URLs by locale); duplicate titles across *different* tools is a bug.
- **High-CTR patterns** for tool pages (mix, don't repeat the same one everywhere):
  - `PNG to WebP Converter — Convert PNG to WebP Online Free | FreeConvert`
  - `Compress Images Online — Reduce Size up to 80% Free | FreeConvert`
  - Power words that work for tools: **Free, Online, Instant, Fast, Secure, No Signup,
    Unlimited, in Seconds**. A number ("up to 80%") + power word lifts CTR notably.
- Keep brand suffix `| FreeConvert` (drop it if it pushes past 60 chars).
- Match the established repo pattern: `<Tool> - <benefit/keyword> Online Free | FreeConvert`.

## 3. Meta descriptions (not a ranking factor — a CTR multiplier)

- **Length:** 120–158 characters (~920px). Mobile truncates earlier, so lead with value.
- **Start with the target phrase** — increases keyword bolding in the SERP.
- Structure: **what it does → key benefit/number → CTA**. e.g.
  *"Convert PNG to WebP online for free. Cut file size up to 80% with no quality loss.
  Fast, private, no signup — convert in your browser in seconds."*
- Active voice + a clear CTA ("Convert now", "Try it free"). Privacy ("in your browser",
  "files never uploaded") is a strong differentiator for converter tools — use it.
- Unique per page. Never duplicate; never leave it auto-generated.

## 4. Keyword & intent (transactional, not informational)

- Tool pages target **transactional/navigational** intent: `<format> to <format>`,
  `<action> <object> online/free`. The user wants to *do the thing now*, not read.
- Map one primary keyword + 2–3 close variants per page. Put the primary in: title,
  H1, first 100 words, one subheading, image `alt`, and the URL slug (already done).
- `keywords` meta is not a Google ranking factor but the repo populates it — keep it
  relevant and localized (it's cheap and harmless).
- **Blog posts** target informational intent ("how to convert HEIC to JPG") and should
  internally link down to the matching tool page (intent hand-off → conversion).

## 5. Content depth — beat thin/"scaled content abuse" (2026 Google crackdown)

Programmatic pages rank **only if each delivers unique value**. Google penalizes
"mass-produced pages with little value" — volume without proportional value. Rule of
thumb: **every tool page needs ≥ ~30% content unique to it**, not just a swapped
format name. For each tool page ensure:

- A short, specific intro (what/why, the formats involved, the benefit) — not boilerplate.
- A **HowTo** block (the 3–4 real steps to use *this* tool) → also emit HowTo schema.
- A **FAQ** block answering real questions for *this* conversion (quality? max size?
  is it free/private? batch?) → also emit FAQPage schema.
- Format-specific facts: what PNG/WebP/HEIC *are*, when to use each, typical size
  savings, compatibility notes. This is the "unique data" that separates safe pages
  from thin ones — and it's exactly what AI engines cite.
- Prefer **2,000 excellent pages over 20,000 thin ones.** Don't scaffold a page you
  can't make genuinely useful.

## 6. E-E-A-T & trust signals

Map to Google's Who / How / Why: make clear **who** runs the site (About, Organization
schema), **how** the tool works (client-side processing, privacy), **why** it exists.
Keep About / Privacy / Terms pages real and indexable. Accurate, verifiable claims only
(don't promise "100% quality" if lossy). These pages must also be in the sitemap.

## 7. GEO / AEO — get cited by ChatGPT, Perplexity, Gemini, Google AI Overviews

GEO/AEO are extensions of SEO, not a separate discipline. To be citable:

- **Passage citability:** answer the page's core question in a self-contained block of
  ~**40–60 words** (≈134–167 char sentences) near the top — the chunk an AI lifts.
- **Question-based headings** (`H2`/`H3` phrased as the user's question) above each
  answer — feeds both Featured Snippets / PAA and AI extraction.
- **Rich, server-rendered JSON-LD** (see §8) so engines parse entities reliably.
- Clear, factual, entity-rich language (name the formats, the action, the outcome).
- Consider an **`llms.txt`** at the site root summarizing the site + key tool URLs for
  AI crawlers (emerging standard; verify current adoption before adding).
- The repo already ships GEO-tuned Organization + WebSite schema sitewide
  (`src/components/StructuredData.tsx`, `src/lib/geoHelpers.ts`) — extend, don't duplicate.

## 8. Structured data (JSON-LD, server-rendered)

Server-render all schema (it's in the initial HTML via `StructuredData.tsx`). Per page type:

| Page | Schema |
|---|---|
| Tool page | `WebApplication` / `SoftwareApplication` (+ `offers` price 0), `BreadcrumbList` |
| Tool page with steps | `HowTo` |
| Tool/blog page with Q&A | `FAQPage` |
| Blog post | `Article` / `BlogPosting` (author, datePublished, dateModified) |
| Sitewide | `Organization`, `WebSite` (+ `SearchAction`) |

Validate JSON-LD shape (required fields, no placeholders, no deprecated types — Google
retired several in 2025–2026; verify before adding a type). Breadcrumb should match the
visible breadcrumb and the URL path.

## 9. International SEO (6 locales — `en, hi, de, ru, es, zh`)

- Every public route exists for all 6 locales, each with **self-referential + reciprocal
  `hreflang`** alternates and an **`x-default`** (handled by `getAlternateLanguages`).
- `canonical` is **self-referential per locale** (each locale's URL is its own canonical),
  via `getLocalizedUrl`.
- **No mixed-language pages** — title/description/H1/body all in the page's language.
  Untranslated metadata (a non-`en` value identical to `en`) is a real SEO defect: it
  competes with the en page and signals low quality. The audit flags these.
- OG `locale` must match (`localeMap[locale]`, e.g. `de_DE`).
- Translate naturally for *intent*, not word-for-word — localize the actual search term
  people use in that language (e.g. German users may search "umwandeln"/"konvertieren").
  Keep format/brand tokens (PNG, WebP, HEIC, PDF, FreeConvert) untranslated.

## 10. Technical SEO & Core Web Vitals (ranking + UX)

- **CWV targets:** LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. Tool pages are heavy client
  components — watch hydration cost, lazy-load the converter UI, reserve image
  dimensions (avoid CLS), use `next/image`, and keep the above-the-fold light.
- Clean URLs (already slug-based), HTTPS, mobile-first, fast TTFB (Vercel).
- `robots.txt` + XML sitemap fresh and submitted to GSC/Bing. Renamed routes get 301s.
- No duplicate content; one `h1` per page; descriptive internal anchor text.

## 11. Internal linking (distributes authority + spreads crawl)

- Register every tool in `src/config/toolCatalog.ts` so it appears in nav/grids (sitewide
  internal links).
- Cross-link **related tools** (e.g. on `png-to-webp`, link `jpg-to-webp`, `webp-to-png`,
  `compress-image`) with descriptive anchors — builds topical clusters.
- Link blog guides → their tool page and vice-versa (informational → transactional).
- Keep important pages within ~3 clicks of the home page.

## 12. Growth loop (run continuously, not once)

1. **Measure** — GSC: queries, impressions, CTR, position per page (free; wire via MCP
   if available). GA4 for organic landings.
2. **Find opportunities** — high-impression/low-CTR (→ rewrite title/meta);
   position 5–15 (→ improve content/links to crack page 1); high-traffic tools missing a
   sibling converter (→ build it); queries you rank for but have no page (→ new page).
3. **Act** — apply the rules above.
4. **Verify** — audit script → 0 errors; re-check CWV; re-submit sitemap.
5. **Watch leading indicators** — for each change, know "how would we know this failed?"
   (e.g. CTR didn't move in 4 weeks at stable position → title/meta hypothesis was wrong).

---

## Confidence & severity rubric (apply to every finding)

Report each finding as: **Finding → Evidence → Impact → Fix**, tagged with:
- **Severity:** `Critical` (blocks indexing / breaks parity) · `Warning` (quality/CTR/
  hreflang) · `Info`.
- **Confidence:** `Confirmed` (proven by script/file evidence) · `Likely` ·
  `Hypothesis` (needs live data e.g. GSC to confirm).

Never present a `Hypothesis` as a fact. Prefer fewer high-confidence, evidence-backed
findings over a long speculative list.

---

## Sources (re-verify time-sensitive items)
- Title/meta length, pixel limits, CTR uplift, front-loading keywords —
  scalenut.com, straightnorth.com, seoscore.tools, clickrank.ai (2026)
- Programmatic SEO quality / thin-content / scaled-content-abuse / 30%-unique rule —
  blogseo.io, digitalapplied.com, indexcraft.in (2026)
- GEO/AEO passage citability, question headings, llms.txt — claude-seo, Agentic-SEO-Skill,
  search-ai-optimization-expert (GitHub, 2026)
- Core Web Vitals thresholds — addyosmani/web-quality-skills, web.dev (2026)
