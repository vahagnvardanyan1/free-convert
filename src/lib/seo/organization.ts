/**
 * Organization Schema Generator
 * Creates Schema.org Organization structured data
 */

import type { Organization } from 'schema-dts';

import { SITE_URL } from '@/config/constants';

import type { StructuredData } from './types';

interface OrganizationConfig {
  name: string;
  alternateName?: string;
  url: string;
  description: string;
  foundingDate?: string;
  sameAs?: string[];
}

/**
 * Generate Organization schema with logo and contact information
 */
export const generateOrganizationSchema = ({ name, alternateName, url, description, foundingDate = '2024', sameAs = [] }: OrganizationConfig): StructuredData<Organization> => {
  const logoUrl = `${SITE_URL}/logo.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    ...(alternateName && { alternateName }),
    url,
    logo: logoUrl,
    image: logoUrl,
    description,
    foundingDate,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: sameAs.length > 0 ? sameAs : [url],
  };
};
