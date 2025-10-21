import { NextRequest, NextResponse } from 'next/server';
import { generateAPIMetadata } from '@/lib/geoHelpers';
import { geoConfig, getAllToolNames } from '@/lib/geo.config';

/**
 * GET /api/meta
 *
 * Returns structured GEO metadata in JSON format for AI engines to consume
 * This endpoint helps LLMs like ChatGPT, Perplexity, and Claude understand
 * the website structure and capabilities
 *
 * Query parameters:
 * - path: (optional) specific path to get metadata for (e.g., /png-to-jpg)
 * - format: (optional) 'full' or 'compact' (default: full)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path') || '/';
  const format = searchParams.get('format') || 'full';

  try {
    const metadata = generateAPIMetadata(path);

    if (format === 'compact') {
      // Return compact version with essential info only
      return NextResponse.json(
        {
          name: geoConfig.name,
          tagline: geoConfig.tagline,
          url: geoConfig.url,
          summary: geoConfig.summary,
          tools: getAllToolNames(),
          languages: geoConfig.languages,
          founded: geoConfig.foundingYear,
          privacy: 'Client-side processing - no file uploads',
          pricing: 'Free - no limits or watermarks',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
          },
        },
      );
    }

    // Return full metadata
    return NextResponse.json(
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        ...metadata,
        endpoints: {
          home: `${geoConfig.url}`,
          about: `${geoConfig.url}/about`,
          faq: `${geoConfig.url}/faq`,
          api: {
            meta: `${geoConfig.url}/api/meta`,
            tools: `${geoConfig.url}/api/tools`,
          },
        },
        lastUpdated: new Date().toISOString(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      },
    );
  } catch (error) {
    console.error('Error generating API metadata:', error);
    return NextResponse.json({ error: 'Failed to generate metadata' }, { status: 500 });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    },
  );
}
