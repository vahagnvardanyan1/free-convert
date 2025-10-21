'use client';

import { usePathname } from 'next/navigation';

import { generateStructuredData, generateBreadcrumbStructuredData, generateFAQStructuredData, generateHowToStructuredData, siteConfig, routeMetadata } from '@/lib/metadata';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/geoHelpers';

/**
 * Enhanced StructuredData component with GEO (Generative Engine Optimization)
 *
 * This component renders JSON-LD structured data optimized for:
 * - Traditional search engines (Google, Bing)
 * - AI engines (ChatGPT, Perplexity, Claude)
 * - Social media platforms
 *
 * Key GEO features:
 * - Comprehensive entity definitions
 * - Clear factual descriptions
 * - Rich interconnected data
 */
export const StructuredData = () => {
  const pathname = usePathname();

  // Get traditional structured data
  const structuredData = generateStructuredData(pathname, siteConfig, routeMetadata);
  const breadcrumbData = generateBreadcrumbStructuredData(pathname, siteConfig.url, routeMetadata);
  const faqData = generateFAQStructuredData(pathname, siteConfig.url);
  const howToData = generateHowToStructuredData(pathname, siteConfig.url);

  // Get GEO-enhanced schemas
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      {/* GEO-Enhanced Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* GEO-Enhanced Website Schema - appears on all pages for better AI understanding */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* Main structured data - handle both single objects and arrays */}
      {Array.isArray(structuredData) ? (
        structuredData.map((schema, index) => (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Breadcrumb structured data */}
      {pathname !== '/' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData),
          }}
        />
      )}

      {/* FAQ structured data */}
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqData),
          }}
        />
      )}

      {/* HowTo structured data */}
      {howToData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToData),
          }}
        />
      )}
    </>
  );
};
