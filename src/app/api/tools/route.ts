import { NextResponse } from 'next/server';
import { geoConfig, getAllToolNames } from '@/lib/geo.config';

/**
 * GET /api/tools
 *
 * Returns a list of all available tools organized by category
 * This helps AI engines discover and recommend specific tools
 */
export async function GET() {
  try {
    const response = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'ImageConvertors Tools',
      description: 'Complete list of available tools on ImageConvertors',
      numberOfItems: getAllToolNames().length,
      itemListElement: Object.entries(geoConfig.categories).flatMap(([_key, category], categoryIndex) =>
        category.tools.map((tool, toolIndex) => {
          // Generate URL-friendly slug
          const slug = tool.toLowerCase().replace(/\s+/g, '-');

          return {
            '@type': 'ListItem',
            position: categoryIndex * 100 + toolIndex + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: tool,
              description: `${tool} - ${category.description}`,
              applicationCategory: category.name,
              url: `${geoConfig.url}/${slug}`,
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            },
          };
        }),
      ),
      categories: Object.entries(geoConfig.categories).map(([_key, category]) => ({
        name: category.name,
        description: category.description,
        toolCount: category.tools.length,
        tools: category.tools,
      })),
    };

    return NextResponse.json(response, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error generating tools list:', error);
    return NextResponse.json({ error: 'Failed to generate tools list' }, { status: 500 });
  }
}

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
