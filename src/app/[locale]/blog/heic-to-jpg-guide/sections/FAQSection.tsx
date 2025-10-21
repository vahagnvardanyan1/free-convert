import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'What is HEIC format?',
      answer: 'HEIC (High Efficiency Image Container) is Apple&apos;s default photo format for iOS 11+. It offers better compression than JPG but has limited compatibility outside Apple devices.',
    },
    {
      question: 'Does converting HEIC to JPG lose quality?',
      answer: 'Minimal quality loss. Our converter uses high-quality settings to preserve image quality while converting to the more compatible JPG format.',
    },
    {
      question: 'Can I convert multiple HEIC files at once?',
      answer: 'Currently one file at a time for best quality. The process is very quick—just a few seconds per image.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
