/**
 * Breadcrumb Schema Generator
 * Creates Schema.org BreadcrumbList structured data
 */

import type { BreadcrumbList } from 'schema-dts';
import type { Metadata } from 'next';

import type { StructuredData, BreadcrumbItemData } from './types';

/**
 * Generate breadcrumb items from pathname
 */
export const generateBreadcrumbItems = (pathname: string, baseUrl: string, routeMetadata: Record<string, Partial<Metadata>>): BreadcrumbItemData[] => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbList: BreadcrumbItemData[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const routeData = routeMetadata[currentPath];
    breadcrumbList.push({
      '@type': 'ListItem',
      position: index + 2,
      name: routeData?.title ? String(routeData.title).split(' - ')[0] : segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      item: `${baseUrl}${currentPath}`,
    });
  });

  return breadcrumbList;
};

/**
 * Generate BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (pathname: string, baseUrl: string, routeMetadata: Record<string, Partial<Metadata>>): StructuredData<BreadcrumbList> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: generateBreadcrumbItems(pathname, baseUrl, routeMetadata),
  };
};
