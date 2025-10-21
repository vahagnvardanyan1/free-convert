import type { Metadata } from 'next';

import { SITE_URL } from '@/config/constants';

interface BlogMetadataOptions {
  title: string;
  description: string;
  keywords: string[];
  publishDate: string;
  path: string;
  ogImage?: string;
}

export const generateBlogMetadata = ({ title, description, keywords, publishDate, path, ogImage = '/og-image.webp' }: BlogMetadataOptions): Metadata => {
  const url = `${SITE_URL}/blog/${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'ImageConvertors',
      type: 'article',
      publishedTime: publishDate,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    other: {
      'article:published_time': publishDate,
      'article:author': 'ImageConvertors Team',
    },
  };
};
