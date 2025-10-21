/**
 * Page Schema Generators
 * Creates WebPage, WebApplication, and SoftwareApplication schemas
 */

import type { WebPage, WebApplication, SoftwareApplication, Organization } from 'schema-dts';

import type { StructuredData, BreadcrumbItemData } from './types';

interface PageConfig {
  name: string;
  url: string;
  description: string;
  publisher: StructuredData<Organization>;
  breadcrumbItems: BreadcrumbItemData[];
}

/**
 * Generate WebPage schema
 */
export const generateWebPageSchema = ({ name, url, description, publisher, breadcrumbItems }: PageConfig): StructuredData<WebPage> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    url,
    description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': url,
    },
    publisher,
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    breadcrumb: {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbItems,
    },
  };
};

interface WebApplicationConfig extends PageConfig {
  applicationCategory?: string;
  applicationSubCategory?: string;
  screenshot?: string;
  featureList?: string[];
}

/**
 * Generate WebApplication schema
 */
export const generateWebApplicationSchema = ({
  name,
  url,
  description,
  publisher,
  applicationCategory = 'MultimediaApplication',
  applicationSubCategory = 'Image Converter',
  screenshot,
  featureList = [],
}: WebApplicationConfig): StructuredData<WebApplication> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory,
    applicationSubCategory,
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    releaseNotes: 'Free online image and PDF conversion tool',
    ...(screenshot && { screenshot }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: 1250,
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-01',
    },
    author: publisher,
    publisher,
    creator: publisher,
    maintainer: publisher,
    copyrightHolder: publisher,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    usageInfo: 'Free to use for personal and commercial purposes',
    ...(featureList.length > 0 && { featureList }),
  };
};

/**
 * Generate SoftwareApplication schema
 */
export const generateSoftwareApplicationSchema = ({
  name,
  url,
  description,
  publisher,
  applicationCategory = 'MultimediaApplication',
  applicationSubCategory = 'Image Processing',
  screenshot,
}: WebApplicationConfig): StructuredData<SoftwareApplication> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory,
    applicationSubCategory,
    operatingSystem: 'Web Browser',
    softwareVersion: '1.0',
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: publisher,
    publisher,
    downloadUrl: url,
    installUrl: url,
    ...(screenshot && { screenshot }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: 1250,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
};
