/**
 * WebSite Schema Generator
 * Creates Schema.org WebSite structured data with search actions
 */

import type { WebSite, Organization } from 'schema-dts';

import type { StructuredData } from './types';

interface WebSiteConfig {
  name: string;
  url: string;
  description: string;
  publisher: StructuredData<Organization>;
}

/**
 * Generate WebSite schema with search action
 * Simplified to work with schema-dts type requirements
 */
export const generateWebSiteSchema = ({ name, url, description, publisher }: WebSiteConfig): StructuredData<WebSite> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    publisher,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/?q={search_term_string}`,
      },
    },
  };
};
