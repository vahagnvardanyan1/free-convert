/** @type {import('next-sitemap').IConfig} */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { SITE_URL } = require('./src/config/constants.js');

const locales = ['en', 'hi', 'de', 'ru', 'es', 'zh'];
const defaultLocale = 'en';

const localeHrefLangMap = {
  en: 'en-US',
  hi: 'hi-IN',
  de: 'de-DE',
  ru: 'ru-RU',
  es: 'es-ES',
  zh: 'zh-CN',
};

// Define all routes
const routes = [
  '',
  '/analyze',
  '/ai-image-generator',
  '/remove-background',

  // Image converter tools
  '/png-to-webp',
  '/png-to-jpg',
  '/png-to-pdf',
  '/jpg-to-png',
  '/jpg-to-webp',
  '/jpg-to-pdf',
  '/webp-to-png',
  '/webp-to-jpg',
  '/webp-to-pdf',
  '/crop-image',
  '/resize-image',
  '/qr-code-generator',
  '/compress-image',

  // HEIC converter tools
  '/heic-to-jpg',
  '/heic-to-png',
  '/heic-to-webp',
  '/heic-to-pdf',

  // PDF tools
  '/pdf-to-jpg',
  '/pdf-to-png',
  '/images-to-pdf',
  '/merge-pdf',
  '/split-pdf',
  '/pdf-info',

  // Blog pages
  '/blog',
  '/blog/compress-images-guide',
  '/blog/heic-to-jpg-guide',
  '/blog/heic-to-webp-guide',
  '/blog/jpg-to-pdf-guide',
  '/blog/jpg-to-webp-guide',
  '/blog/pdf-to-jpg-guide',
  '/blog/color-picker-guide',
  '/blog/color-palette-guide',
  '/blog/gradient-generator-guide',
  '/blog/color-converter-guide',
  '/blog/png-to-jpg-guide',
  '/blog/png-to-pdf-guide',
  '/blog/png-to-webp-guide',
  '/blog/webp-to-png-guide',
  '/blog/font-preview-guide',
  '/blog/font-pairing-guide',
  '/blog/typographic-scale-guide',
  '/blog/emoji-guide',
  '/blog/symbol-guide',
  '/blog/remove-background-guide',
  '/blog/json-validator-guide',
  '/blog/json-comparer-guide',
  '/blog/json-parser-guide',
  '/blog/crop-image-guide',
  '/blog/resize-image-guide',
  '/blog/qr-code-generator-guide',
  '/blog/ai-image-generator-guide',

  // Color tools
  '/colors',
  '/colors/picker',
  '/colors/palettes',
  '/colors/gradients',
  '/colors/converter',

  // Font tools
  '/fonts',
  '/fonts/preview',
  '/fonts/pairings',
  '/fonts/scales',

  // Text tools
  '/texts',
  '/texts/fonts',
  '/texts/fonts/preview',
  '/texts/fonts/pairings',
  '/texts/fonts/scales',
  '/texts/emojis',
  '/texts/symbols',
  '/texts/json-validator',
  '/texts/json-comparer',
  '/texts/json-parser',

  // Legal pages
  '/privacy-policy',
  '/terms-of-service',
  '/terms-of-use',
  '/cookie-policy',
];

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/api/*', '/404', '/500', '/hi/server-sitemap.xml', '/en/server-sitemap.xml', '/manifest.webmanifest'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
  },

  // Transform function to add hreflang alternates for each URL
  transform: async (config, path) => {
    const normalisePath = input => {
      if (!input || input === '/') {
        return '';
      }
      return input.startsWith('/') ? input : `/${input}`;
    };

    const stripLocalePrefix = pathname => {
      if (!pathname || pathname === '/') return '';

      for (const locale of locales) {
        if (locale === defaultLocale) continue;

        const localePrefix = `/${locale}`;
        if (pathname === localePrefix) {
          return '';
        }
        if (pathname.startsWith(`${localePrefix}/`)) {
          return pathname.slice(localePrefix.length);
        }
      }

      return pathname;
    };

    const basePath = normalisePath(stripLocalePrefix(path));

    const buildHref = locale => {
      const suffix = basePath || '';
      if (locale === defaultLocale) {
        return `${config.siteUrl}${suffix || '/'}`;
      }
      return `${config.siteUrl}/${locale}${suffix}`;
    };

    const alternateRefs = locales.map(locale => ({
      hreflang: localeHrefLangMap[locale] ?? locale,
      href: buildHref(locale),
    }));

    alternateRefs.push({
      hreflang: 'x-default',
      href: `${config.siteUrl}${basePath || '/'}`,
    });

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: basePath === '' ? 1.0 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs,
    };
  },

  // Generate additional paths for all locales
  additionalPaths: async config => {
    const paths = [];

    // Generate paths for all routes and all locales
    for (const route of routes) {
      for (const locale of locales) {
        // For default locale (en), don't add locale prefix
        const path = locale === defaultLocale ? route || '/' : `/${locale}${route || ''}`;

        paths.push(await config.transform(config, path));
      }
    }

    return paths;
  },

  // Optimize for SEO
  changefreq: 'weekly',
  priority: 0.8,
  sitemapSize: 50000,
  autoLastmod: true,
};
