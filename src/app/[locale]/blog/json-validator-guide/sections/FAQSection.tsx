import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'What are common JSON errors?',
      answer: 'Common errors include: missing commas, unquoted keys, trailing commas, mismatched brackets, and incorrect data types. Our validator highlights these errors with clear messages.',
    },
    {
      question: 'Can I validate large JSON files?',
      answer: 'Yes! Our validator handles JSON files of all sizes, from small configurations to large API responses.',
    },
    {
      question: 'Is my JSON data safe?',
      answer: 'Absolutely! All validation happens in your browser. Your JSON data never leaves your device and is never sent to our servers.',
    },
    {
      question: 'Can I format JSON while validating?',
      answer: 'Yes! Our tool can both validate and beautify JSON, making it readable with proper indentation.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
