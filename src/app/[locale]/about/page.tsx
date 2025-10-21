import { Metadata } from 'next';

import { SITE_URL } from '@/config/constants';
import { geoConfig } from '@/lib/geo.config';
import { generateAIMeta, generateGeoTitle } from '@/lib/geoHelpers';
import { localeMap, type Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = 'About ImageConvertors';
  const description = 'Learn about ImageConvertors: a free, privacy-focused platform for image conversion, PDF manipulation, and design tools. All processing happens in your browser.';
  const pathname = `/${locale}/about`;
  const aiMeta = generateAIMeta('/about');

  return {
    title: generateGeoTitle(title),
    description: description,
    keywords: 'about ImageConvertors, image converter, free tools, browser-based conversion, privacy-focused',
    authors: [{ name: geoConfig.author.name, url: geoConfig.author.url }],
    creator: geoConfig.author.name,
    publisher: geoConfig.author.name,
    alternates: {
      canonical: `${SITE_URL}${pathname}`,
      languages: Object.fromEntries(geoConfig.languages.map(lang => [lang, `${SITE_URL}/${lang}/about`])),
    },
    openGraph: {
      title: title,
      description: description,
      url: `${SITE_URL}${pathname}`,
      siteName: 'ImageConvertors',
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      alternateLocale: geoConfig.languages.filter(lang => lang !== locale),
      images: [
        {
          url: '/og-image.webp',
          width: 1200,
          height: 630,
          alt: 'ImageConvertors - Free Online Tools',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/og-image.webp'],
      site: '@imageconverter',
      creator: '@imageconverter',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      ...aiMeta,
      'ai-summary': 'ImageConvertors is a free online platform offering browser-based image conversion, PDF tools, and design utilities with complete privacy.',
      'ai-category': 'About Page',
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About {geoConfig.name}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{geoConfig.tagline}</p>
      </header>

      {/* Mission Statement */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{geoConfig.mission}</p>
      </section>

      {/* What We Do */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What We Do</h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">{geoConfig.summary}</p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {Object.entries(geoConfig.categories).map(([key, category]) => (
            <div key={key} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
              <div className="text-sm text-gray-500 dark:text-gray-500">{category.tools.length} tools available</div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <div className="space-y-6">
          {geoConfig.features.map((feature, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{feature.description}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">✓ {feature.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Common Use Cases</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Our tools are designed for various real-world scenarios:</p>
        <div className="grid md:grid-cols-2 gap-6">
          {geoConfig.useCases.map((useCase, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{useCase.scenario}</h3>
              <p className="text-gray-600 dark:text-gray-400">{useCase.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Technology</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Built with modern, industry-standard technologies for reliability and performance:</p>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <dl className="grid md:grid-cols-2 gap-4">
            {Object.entries(geoConfig.technology).map(([key, value]) => (
              <div key={key}>
                <dt className="font-semibold text-gray-900 dark:text-gray-100 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</dt>
                <dd className="text-gray-600 dark:text-gray-400 mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Languages */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Multi-Language Support</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Our platform is available in {geoConfig.languages.length} languages:</p>
        <div className="flex flex-wrap gap-2">
          {geoConfig.languages.map(lang => (
            <span key={lang} className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium uppercase">
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Privacy & Security</h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Your privacy is our priority.</strong> All file processing happens entirely in your web browser using JavaScript. This means:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>No files are uploaded to our servers</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>No data collection or tracking of your files</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Works offline after initial page load</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Complete control over your data</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Founded */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">History</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          ImageConvertors was founded in {geoConfig.foundingYear} with a simple goal: to provide free, privacy-respecting tools that anyone can use without signing up or downloading software.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Have questions or feedback? We&apos;d love to hear from you.</p>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Email:</strong>{' '}
            <a href={`mailto:${geoConfig.contact.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              {geoConfig.contact.email}
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Try our free tools now. No sign-up required.</p>
        <a href={`/${locale}`} className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Explore Tools
        </a>
      </section>
    </div>
  );
}
