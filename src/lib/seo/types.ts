/**
 * Type definitions for Schema.org structured data
 * Extends schema-dts with proper typing helpers
 */

import type { Thing, WithContext } from 'schema-dts';

/**
 * Helper type for structured data that includes @context
 * Makes working with schema-dts types more ergonomic
 */
export type StructuredData<T extends Thing> = WithContext<T>;

/**
 * Helper to create partial schema objects that can be extended
 */
export type PartialSchema<T extends Thing> = Partial<T>;

/**
 * Image object with proper dimensions
 */
export interface ImageObjectData {
  '@type': 'ImageObject';
  url: string;
  width?: string;
  height?: string;
}

/**
 * Contact point data
 */
export interface ContactPointData {
  '@type': 'ContactPoint';
  contactType: string;
  availableLanguage?: string | string[];
  email?: string;
}

/**
 * Breadcrumb list item
 */
export interface BreadcrumbItemData {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

/**
 * FAQ question and answer
 */
export interface FAQItemData {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

/**
 * HowTo step data
 */
export interface HowToStepData {
  '@type': 'HowToStep';
  position: number;
  name: string;
  text: string;
  image?: string;
}
