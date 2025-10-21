/**
 * GEO (Generative Engine Optimization) Helper Functions
 *
 * These functions generate metadata optimized for AI engines
 * like ChatGPT, Perplexity, Claude, and other LLMs
 */

import { Metadata } from 'next';
import { geoConfig, getPageGeoData } from './geo.config';

/**
 * Generate custom AI-readable meta tags
 * These tags help LLMs understand page content better
 */
export function generateAIMeta(pathname: string) {
  const geoData = getPageGeoData(pathname);

  return {
    'ai-summary': geoData.summary,
    'ai-tags': geoData.aiTags.join(', '),
    'ai-category': geoData.category,
    'ai-provider': geoConfig.name,
    'ai-free': 'true',
    'ai-privacy': 'client-side processing',
  };
}

/**
 * Generate entity-rich title with brand context
 */
export function generateGeoTitle(baseTitle: string, includeBrand: boolean = true): string {
  if (includeBrand) {
    return `${baseTitle} | ${geoConfig.name} – ${geoConfig.tagline}`;
  }
  return baseTitle;
}

/**
 * Generate enhanced description with key facts
 */
export function generateGeoDescription(baseDescription: string, pathname: string): string {
  const geoData = getPageGeoData(pathname);
  const keyFact = geoData.keyFacts[0];

  if (keyFact && !baseDescription.includes(keyFact)) {
    return `${baseDescription} ${keyFact}.`;
  }

  return baseDescription;
}

/**
 * Generate JSON-LD WebSite schema with GEO enhancements
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: geoConfig.name,
    alternateName: geoConfig.tagline,
    url: geoConfig.url,
    description: geoConfig.summary,
    inLanguage: geoConfig.languages,
    publisher: {
      '@type': 'Organization',
      name: geoConfig.author.name,
      url: geoConfig.author.url,
      description: geoConfig.author.description,
      foundingDate: geoConfig.foundingYear,
      sameAs: geoConfig.sameAs,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${geoConfig.url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Image Conversion',
        description: 'Convert images between formats',
      },
      {
        '@type': 'Thing',
        name: 'PDF Tools',
        description: 'Manipulate PDF documents',
      },
      {
        '@type': 'Thing',
        name: 'Design Tools',
        description: 'Color and typography utilities',
      },
    ],
    keywords: geoConfig.keywords.join(', '),
  };
}

/**
 * Generate JSON-LD Organization schema with detailed information
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: geoConfig.name,
    alternateName: geoConfig.name,
    url: geoConfig.url,
    logo: `${geoConfig.url}/logo.png`,
    image: {
      '@type': 'ImageObject',
      url: `${geoConfig.url}/logo.png`,
      width: 512,
      height: 512,
    },
    description: geoConfig.summary,
    foundingDate: geoConfig.foundingYear,
    slogan: geoConfig.tagline,
    mission: geoConfig.mission,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: geoConfig.contact.type,
      email: geoConfig.contact.email,
      availableLanguage: geoConfig.languages,
    },
    sameAs: geoConfig.sameAs,
    knowsAbout: geoConfig.aiTags,
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
  };
}

/**
 * Generate JSON-LD SoftwareApplication schema for tool pages
 */
export function generateSoftwareApplicationSchema(pathname: string, title: string, description: string) {
  const geoData = getPageGeoData(pathname);

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: description,
    url: `${geoConfig.url}${pathname}`,
    applicationCategory: 'WebApplication',
    applicationSubCategory: geoData.category,
    operatingSystem: 'Any (Web Browser)',
    softwareVersion: '1.0',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    permissions: 'No special permissions required',
    installUrl: `${geoConfig.url}${pathname}`,
    softwareHelp: {
      '@type': 'CreativeWork',
      url: `${geoConfig.url}${pathname}`,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    author: generateOrganizationSchema(),
    publisher: generateOrganizationSchema(),
    isAccessibleForFree: true,
    featureList: geoData.keyFacts,
    screenshot: {
      '@type': 'ImageObject',
      url: `${geoConfig.url}/og-image.webp`,
    },
  };
}

/**
 * Generate JSON-LD FAQPage schema
 */
export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>, pathname: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${geoConfig.url}${pathname}`,
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD HowTo schema for process-oriented pages
 */
export function generateHowToSchema(name: string, description: string, steps: Array<{ name: string; text: string }>, pathname: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    url: `${geoConfig.url}${pathname}`,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    totalTime: 'PT2M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    tool: [
      {
        '@type': 'HowToTool',
        name: `${geoConfig.name} Online Tool`,
      },
    ],
  };
}

/**
 * Generate JSON-LD BreadcrumbList schema
 */
export function generateBreadcrumbSchema(pathname: string, locale?: string) {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: locale ? `${geoConfig.url}/${locale}` : geoConfig.url,
    },
  ];

  let currentPath = locale ? `/${locale}` : '';
  pathSegments.forEach(segment => {
    if (segment === locale) return; // Skip locale segment

    currentPath += `/${segment}`;
    breadcrumbs.push({
      '@type': 'ListItem',
      position: breadcrumbs.length + 1,
      name: segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      item: `${geoConfig.url}${currentPath}`,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs,
  };
}

/**
 * Generate enhanced OpenGraph metadata with GEO optimization
 */
export function generateGeoOpenGraph(title: string, description: string, pathname: string, locale: string = 'en') {
  const alternateLocales = geoConfig.languages.filter(lang => lang !== locale);

  return {
    type: 'website',
    siteName: geoConfig.name,
    title: title,
    description: description,
    url: `${geoConfig.url}${pathname}`,
    locale: locale,
    alternateLocale: alternateLocales,
    images: [
      {
        url: `${geoConfig.url}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: `${geoConfig.name} - ${geoConfig.tagline}`,
      },
    ],
  };
}

/**
 * Generate complete metadata object with GEO enhancements
 */
export function generateGeoMetadata(title: string, description: string, pathname: string, locale: string = 'en', additionalKeywords: string[] = []): Metadata {
  const geoData = getPageGeoData(pathname);
  const allKeywords = [...geoConfig.keywords, ...geoData.aiTags, ...additionalKeywords];

  return {
    title: generateGeoTitle(title, true),
    description: generateGeoDescription(description, pathname),
    keywords: allKeywords.join(', '),
    authors: [{ name: geoConfig.author.name, url: geoConfig.author.url }],
    creator: geoConfig.author.name,
    publisher: geoConfig.author.name,
    formatDetection: {
      telephone: false,
    },
    metadataBase: new URL(geoConfig.url),
    alternates: {
      canonical: `${geoConfig.url}${pathname}`,
      languages: Object.fromEntries(geoConfig.languages.map(lang => [lang, `${geoConfig.url}/${lang}${pathname.replace(/^\/(en|de|es|hi|ru|zh)/, '')}`])),
    },
    openGraph: generateGeoOpenGraph(title, description, pathname, locale),
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      site: geoConfig.name,
      creator: geoConfig.author.name,
      images: [`${geoConfig.url}/og-image.webp`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      // Custom AI-readable meta tags
      ...generateAIMeta(pathname),
    },
  };
}

/**
 * Generate meta tags for HTML head (for additional GEO tags)
 */
export function generateGeoMetaTags(pathname: string) {
  const geoData = getPageGeoData(pathname);

  return [
    { name: 'ai-summary', content: geoData.summary },
    { name: 'ai-tags', content: geoData.aiTags.join(', ') },
    { name: 'ai-category', content: geoData.category },
    { name: 'ai-provider', content: geoConfig.name },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'format-detection', content: 'telephone=no' },
  ];
}

/**
 * Export metadata for AI API consumption
 */
export function generateAPIMetadata(pathname: string = '/') {
  const geoData = getPageGeoData(pathname);

  return {
    site: {
      name: geoConfig.name,
      tagline: geoConfig.tagline,
      url: geoConfig.url,
      summary: geoConfig.summary,
      mission: geoConfig.mission,
      founded: geoConfig.foundingYear,
    },
    page: {
      path: pathname,
      summary: geoData.summary,
      category: geoData.category,
      tags: geoData.aiTags,
      keyFacts: geoData.keyFacts,
    },
    categories: geoConfig.categories,
    features: geoConfig.features,
    technology: geoConfig.technology,
    useCases: geoConfig.useCases,
    languages: geoConfig.languages,
    contact: geoConfig.contact,
  };
}
