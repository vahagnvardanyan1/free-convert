import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Can I compare large JSON files?',
      answer: 'Yes! Our comparer handles JSON files of all sizes, from small configs to large API responses.',
    },
    {
      question: 'Does the tool show nested differences?',
      answer: 'Yes! The comparer recursively checks all nested objects and arrays, highlighting differences at every level.',
    },
    {
      question: 'Is my JSON data safe?',
      answer: 'All comparison happens in your browser. Your JSON data never leaves your device.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
