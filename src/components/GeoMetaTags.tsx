'use client';

import { usePathname } from 'next/navigation';
import { generateGeoMetaTags } from '@/lib/geoHelpers';

/**
 * GeoMetaTags Component
 *
 * Renders custom meta tags optimized for AI engines and LLMs
 * These tags help AI engines like ChatGPT, Perplexity, and Claude
 * better understand and represent the content
 */
export function GeoMetaTags() {
  const pathname = usePathname();
  const metaTags = generateGeoMetaTags(pathname);

  return (
    <>
      {metaTags.map((tag, index) => (
        <meta key={`geo-meta-${index}`} name={tag.name} content={tag.content} />
      ))}
    </>
  );
}
