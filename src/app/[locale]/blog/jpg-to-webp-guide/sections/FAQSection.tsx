import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Does converting JPG to WebP reduce quality?',
      answer: 'Our converter uses high-quality WebP settings. Quality loss is minimal and imperceptible for most uses.',
    },
    {
      question: 'Is WebP supported by all browsers?',
      answer: 'All modern browsers support WebP (Chrome, Firefox, Edge, Safari 14+, Opera). For older browsers, consider providing JPG fallbacks.',
    },
    {
      question: 'Can I convert WebP back to JPG if needed?',
      answer: 'Yes! Use our WebP to JPG converter to convert back if needed.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
