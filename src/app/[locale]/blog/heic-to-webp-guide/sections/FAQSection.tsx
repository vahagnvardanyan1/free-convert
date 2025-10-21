import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Is WebP better than HEIC?',
      answer: 'Both are modern formats with good compression. WebP has wider web browser support, while HEIC is Apple-specific. For web use, WebP is better.',
    },
    {
      question: 'Does conversion preserve photo quality?',
      answer: 'Yes! Our converter uses high-quality settings to minimize quality loss during conversion.',
    },
    {
      question: 'Can I convert HEIC Live Photos?',
      answer: 'The tool converts the still image from Live Photos. The video component is not included in the conversion.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
