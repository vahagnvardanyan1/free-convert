import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'What is the difference between parsing and validating JSON?',
      answer: 'Parsing converts JSON text into a structured format and formats it for readability. Validating checks if JSON syntax is correct. Our tool does both!',
    },
    {
      question: 'Can I minify JSON?',
      answer: 'Yes! Our parser can both beautify (format with indentation) and minify (remove whitespace) JSON.',
    },
    {
      question: 'Does the parser support large JSON files?',
      answer: 'Yes! The parser handles JSON files of all sizes efficiently.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
