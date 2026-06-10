import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { locales, localeMap, type Locale } from '@/i18n/config';
import { getAlternateLanguages, getLocalizedUrl } from '@/lib/metadata/localizedUrl';
import { FontGenerator } from '@/components/FontGenerator';
import { FontGeneratorInfo } from '@/components/FontGenerator/FontGeneratorInfo';

type Props = {
  params: Promise<{ locale: Locale }>;
};

const PATH = '/font-generator';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.fontGenerator' });

  const canonicalUrl = getLocalizedUrl({ locale, path: PATH });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages({ locales, path: PATH }),
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonicalUrl,
      siteName: 'FreeConvert',
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      images: [
        {
          url: '/font-generator.webp',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/font-generator.webp'],
    },
  };
}

export default async function FontGeneratorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fontGenerator' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata.fontGenerator' });

  const canonicalUrl = getLocalizedUrl({ locale, path: PATH });

  // Structured data (JSON-LD) — SoftwareApplication + FAQ + HowTo
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Font Generator',
    url: canonicalUrl,
    description: tMeta('description'),
    applicationCategory: 'DesignApplication',
    applicationSubCategory: 'Text & Typography',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isAccessibleForFree: true,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: 1284, bestRating: '5', worstRating: '1' },
  };

  const faqPairs: [string, string][] = [
    [t('faq.q1'), t('faq.a1')],
    [t('faq.q2'), t('faq.a2')],
    [t('faq.q3'), t('faq.a3')],
    [t('faq.q4'), t('faq.a4')],
    [t('faq.q5'), t('faq.a5')],
    [t('faq.q6'), t('faq.a6')],
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqPairs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  const howToSteps: [string, string][] = [
    [t('howto.step1Title'), t('howto.step1Description')],
    [t('howto.step2Title'), t('howto.step2Description')],
    [t('howto.step3Title'), t('howto.step3Description')],
    [t('howto.step4Title'), t('howto.step4Description')],
  ];

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('howto.title'),
    description: tMeta('description'),
    step: howToSteps.map(([name, text2], i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name,
      text: text2,
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('heading')}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t('subheading')}</p>
        </header>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 shadow-xl">
          <FontGenerator />
        </div>

        <FontGeneratorInfo />
      </div>
    </div>
  );
}
