import type { Metadata } from 'next';

import { SITE_URL } from '@/config/constants';
import { geoConfig } from '@/lib/geo.config';
import { generateAIMeta, generateGeoTitle, generateFAQPageSchema } from '@/lib/geoHelpers';
import { localeMap, type Locale } from '@/i18n/config';
import { Accordion } from '@/components/Accordion';

type Props = {
  params: Promise<{ locale: Locale }>;
};

// FAQ data structured for both UI and schema.org
const faqData = [
  {
    question: 'What is ImageConvertors?',
    answer:
      'ImageConvertors is a free online platform that provides tools for image format conversion, PDF manipulation, color design utilities, and typography tools. All processing happens directly in your browser for maximum privacy and security.',
    category: 'General',
  },
  {
    question: 'Is ImageConvertors really free to use?',
    answer:
      'Yes, ImageConvertors is completely free to use. There are no hidden fees, premium features, subscriptions, or watermarks on your converted files. All tools are available to everyone at no cost.',
    category: 'General',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No, you do not need to create an account or sign up. All tools are accessible immediately without any registration. Simply visit the tool you need and start using it right away.',
    category: 'General',
  },
  {
    question: 'How does browser-based processing work?',
    answer:
      'All file processing happens entirely in your web browser using JavaScript and Web APIs. When you upload a file, it stays on your device and is processed locally. This means faster processing and complete privacy since no files are sent to our servers.',
    category: 'Privacy & Security',
  },
  {
    question: 'Are my files secure and private?',
    answer:
      'Yes, your files are completely secure. Since all processing happens in your browser, no files are uploaded to our servers. We cannot access, view, or store your files. Your data never leaves your device.',
    category: 'Privacy & Security',
  },
  {
    question: 'What happens to my files after conversion?',
    answer:
      'Your files remain on your device throughout the entire process. After conversion, you download the result directly from your browser. Nothing is stored on our servers because nothing was uploaded in the first place.',
    category: 'Privacy & Security',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'ImageConvertors supports all major image formats including PNG, JPG/JPEG, WebP, HEIC, GIF, and more. You can convert between any of these formats. We also support PDF conversion to and from images.',
    category: 'Features',
  },
  {
    question: 'Is there a file size limit?',
    answer:
      'There are no artificial file size limits imposed by us. However, very large files may take longer to process depending on your device capabilities and browser memory. Most modern devices can handle files up to several hundred megabytes.',
    category: 'Features',
  },
  {
    question: 'Can I convert multiple files at once?',
    answer:
      'Yes, many of our tools support batch processing. You can upload multiple files and convert them all at once. This is particularly useful for batch image conversions and creating multi-page PDFs from images.',
    category: 'Features',
  },
  {
    question: 'Do I need an internet connection?',
    answer:
      'You need an internet connection to load the website initially. After the page loads, the tools can work offline since all processing happens in your browser. However, features like AI image generation require an active internet connection.',
    category: 'Technical',
  },
  {
    question: 'What browsers are supported?',
    answer:
      'ImageConvertors works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version of your browser for the best experience. Mobile browsers are also fully supported.',
    category: 'Technical',
  },
  {
    question: 'Can I use ImageConvertors on mobile devices?',
    answer: 'Yes, ImageConvertors is fully responsive and works on mobile devices including smartphones and tablets. The interface adapts to smaller screens while maintaining full functionality.',
    category: 'Technical',
  },
  {
    question: 'What PDF tools are available?',
    answer:
      'We offer comprehensive PDF tools including: converting PDF to JPG/PNG, converting images to PDF, merging multiple PDFs, splitting PDFs, and viewing PDF information. All PDF operations are performed in your browser.',
    category: 'PDF Tools',
  },
  {
    question: 'Can I convert multiple images to a single PDF?',
    answer:
      'Yes, our Images to PDF tool allows you to select multiple images, arrange them in your desired order, and convert them into a single PDF document. You can customize page size, orientation, and margins.',
    category: 'PDF Tools',
  },
  {
    question: 'What color tools are available?',
    answer:
      'We provide several color tools: an interactive color picker with multiple format outputs (HEX, RGB, HSL), a color palette generator, a gradient generator with CSS code export, and a color format converter.',
    category: 'Design Tools',
  },
  {
    question: 'What typography tools do you offer?',
    answer:
      'Our typography tools include: a Google Fonts preview tool with live customization, curated font pairing suggestions, a typographic scale generator, an emoji picker with device previews, and a Unicode symbols library.',
    category: 'Design Tools',
  },
  {
    question: 'How does the AI image generator work?',
    answer:
      'Our AI image generator uses advanced AI models to create images from text descriptions. Simply describe what you want to see, and the AI will generate an image based on your prompt. This feature requires an active internet connection.',
    category: 'AI Tools',
  },
  {
    question: 'How does background removal work?',
    answer:
      'Our background removal tool uses AI to automatically detect and remove backgrounds from images. It works best with clear subjects against distinct backgrounds. The processing happens in your browser for privacy.',
    category: 'AI Tools',
  },
  {
    question: 'What languages are supported?',
    answer: `ImageConvertors is available in ${geoConfig.languages.length} languages: English, German, Spanish, Hindi, Russian, and Chinese. You can switch languages using the language selector in the header.`,
    category: 'General',
  },
  {
    question: 'Can I use ImageConvertors for commercial purposes?',
    answer:
      'Yes, you can use ImageConvertors for both personal and commercial purposes. There are no restrictions on how you use the tools or the files you process. However, please respect copyright laws for any content you convert.',
    category: 'Legal',
  },
  {
    question: 'How can I report a bug or suggest a feature?',
    answer: `If you encounter any issues or have suggestions for improvements, please contact us at ${geoConfig.contact.email}. We appreciate all feedback and continuously work to improve our tools.`,
    category: 'Support',
  },
  {
    question: 'Is the source code available?',
    answer:
      'ImageConvertors is built with modern web technologies including Next.js, React, and TypeScript. While specific components may be proprietary, we believe in transparency and may open-source parts of the project in the future.',
    category: 'Technical',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = 'Frequently Asked Questions (FAQ)';
  const description = 'Find answers to common questions about ImageConvertors: how it works, privacy and security, supported formats, features, and more.';
  const pathname = `/${locale}/faq`;
  const aiMeta = generateAIMeta('/faq');

  return {
    title: generateGeoTitle(title),
    description: description,
    keywords: 'FAQ, frequently asked questions, image converter help, how to use, browser-based conversion, privacy, security',
    authors: [{ name: geoConfig.author.name, url: geoConfig.author.url }],
    creator: geoConfig.author.name,
    publisher: geoConfig.author.name,
    alternates: {
      canonical: `${SITE_URL}${pathname}`,
      languages: Object.fromEntries(geoConfig.languages.map(lang => [lang, `${SITE_URL}/${lang}/faq`])),
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
          alt: 'ImageConvertors FAQ',
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
      'ai-summary': 'Comprehensive FAQ covering ImageConvertors features, privacy, supported formats, and how to use browser-based conversion tools.',
      'ai-category': 'FAQ Page',
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;

  // Group FAQs by category
  const categories = Array.from(new Set(faqData.map(faq => faq.category)));
  const faqByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = faqData.filter(faq => faq.category === category);
      return acc;
    },
    {} as Record<string, typeof faqData>,
  );

  return (
    <>
      {/* FAQ Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateFAQPageSchema(
              faqData.map(faq => ({ question: faq.question, answer: faq.answer })),
              `/${locale}/faq`,
            ),
          ),
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to know about {geoConfig.name}</p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">30+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tools</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Free</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Uploads</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{geoConfig.languages.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Languages</div>
          </div>
        </div>

        {/* FAQs by Category */}
        {categories.map(category => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">{category}</h2>
            <div className="space-y-4">
              {faqByCategory[category].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Accordion type="single" title={faq.question} content={faq.answer} />
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Contact Section */}
        <section className="mt-16 text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Can&apos;t find the answer you&apos;re looking for? Feel free to reach out to us.</p>
          <a href={`mailto:${geoConfig.contact.email}`} className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Contact Us
          </a>
        </section>
      </div>
    </>
  );
}
