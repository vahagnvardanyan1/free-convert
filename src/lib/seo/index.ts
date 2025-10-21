/**
 * SEO & Structured Data Main Module
 * Generates comprehensive Schema.org structured data for all page types
 */

import type { Metadata } from 'next';
import type { Thing } from 'schema-dts';

import type { StructuredData } from './types';
import { generateOrganizationSchema } from './organization';
import { generateWebSiteSchema } from './website';
import { generateBreadcrumbSchema, generateBreadcrumbItems } from './breadcrumb';
import { generateFAQSchema, getConverterFAQs, getCompressorFAQs } from './faq';
import { generateHowToSchema, generateImageConverterSteps } from './howto';
import { generateWebPageSchema, generateWebApplicationSchema, generateSoftwareApplicationSchema } from './page';

interface SiteConfig {
  name: string;
  url: string;
  description: string;
  author: {
    name: string;
  };
}

/**
 * Generate all structured data for a given page
 */
export const generateStructuredData = (pathname: string, siteConfig: SiteConfig, routeMetadata: Record<string, Partial<Metadata>>): StructuredData<Thing>[] => {
  const currentUrl = `${siteConfig.url}${pathname}`;
  const pageMetadata = routeMetadata[pathname] || routeMetadata['/'];
  const pageName = pageMetadata.title ? String(pageMetadata.title).split(' - ')[0] : siteConfig.name;
  const pageDescription = pageMetadata.description || siteConfig.description;

  // Generate base schemas
  const organizationSchema = generateOrganizationSchema({
    name: siteConfig.author.name,
    url: siteConfig.url,
    description: siteConfig.description,
  });

  const websiteSchema = generateWebSiteSchema({
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: organizationSchema,
  });

  const breadcrumbItems = generateBreadcrumbItems(pathname, siteConfig.url, routeMetadata);

  const webPageSchema = generateWebPageSchema({
    name: pageName,
    url: currentUrl,
    description: pageDescription,
    publisher: organizationSchema,
    breadcrumbItems,
  });

  const webApplicationSchema = generateWebApplicationSchema({
    name: pageName,
    url: currentUrl,
    description: pageDescription,
    publisher: organizationSchema,
    breadcrumbItems,
    screenshot: `${siteConfig.url}/og-image.webp`,
  });

  const softwareApplicationSchema = generateSoftwareApplicationSchema({
    name: pageName,
    url: currentUrl,
    description: pageDescription,
    publisher: organizationSchema,
    breadcrumbItems,
    screenshot: `${siteConfig.url}/og-image.webp`,
  });

  const baseSchemas: StructuredData<Thing>[] = [organizationSchema, websiteSchema, webPageSchema, webApplicationSchema, softwareApplicationSchema];

  // Add homepage-specific schemas
  if (pathname === '/') {
    const homeFeatures = [
      'PNG to WebP conversion',
      'JPG to PNG conversion',
      'WebP to PNG conversion',
      'PDF to JPG conversion',
      'PDF to PNG conversion',
      'Images to PDF conversion',
      'Image analysis and metadata extraction',
      'Batch image processing',
      'Quality optimization',
      'PDF merging and splitting',
    ];

    // Update the WebApplication features for homepage
    baseSchemas[3] = generateWebApplicationSchema({
      name: pageName,
      url: currentUrl,
      description: pageDescription,
      publisher: organizationSchema,
      breadcrumbItems,
      screenshot: `${siteConfig.url}/og-image.webp`,
      featureList: homeFeatures,
    });
  }

  return baseSchemas;
};

/**
 * Generate FAQ structured data
 */
export const generateFAQStructuredData = (pathname: string, baseUrl: string): ReturnType<typeof generateFAQSchema> => {
  const currentUrl = `${baseUrl}${pathname}`;
  let specificFAQs: ReturnType<typeof getConverterFAQs> = [];

  if (pathname.includes('-to-')) {
    const [from, to] = pathname.slice(1).split('-to-');
    specificFAQs = getConverterFAQs(from, to);
  } else if (pathname === '/compress-image') {
    specificFAQs = getCompressorFAQs();
  }

  return generateFAQSchema({
    pathname,
    currentUrl,
    specificFAQs,
  });
};

/**
 * Generate HowTo structured data
 */
export const generateHowToStructuredData = (pathname: string, baseUrl: string): ReturnType<typeof generateHowToSchema> | null => {
  if (!pathname.includes('-to-') && !pathname.includes('pdf')) {
    return null;
  }

  const currentUrl = `${baseUrl}${pathname}`;

  if (pathname.includes('-to-')) {
    const [from, to] = pathname.slice(1).split('-to-');
    const steps = generateImageConverterSteps(from, to, baseUrl);

    return generateHowToSchema({
      name: `How to Convert ${from.toUpperCase()} to ${to.toUpperCase()}`,
      description: `Step-by-step guide to convert ${from.toUpperCase()} images to ${to.toUpperCase()} format online for free.`,
      url: currentUrl,
      steps,
      imageUrl: `${baseUrl}/og-image.webp`,
    });
  }

  return null;
};

/**
 * Generate Breadcrumb structured data
 */
export const generateBreadcrumbStructuredData = (pathname: string, baseUrl: string, routeMetadata: Record<string, Partial<Metadata>>): ReturnType<typeof generateBreadcrumbSchema> => {
  return generateBreadcrumbSchema(pathname, baseUrl, routeMetadata);
};

// Re-export types and utilities
export type { StructuredData, FAQItemData, HowToStepData, BreadcrumbItemData } from './types';
export { generateOrganizationSchema } from './organization';
export { generateWebSiteSchema } from './website';
export { generateBreadcrumbSchema } from './breadcrumb';
export { generateFAQSchema } from './faq';
export { generateHowToSchema } from './howto';
export { generateWebPageSchema, generateWebApplicationSchema, generateSoftwareApplicationSchema } from './page';
