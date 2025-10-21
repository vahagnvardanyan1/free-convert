import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'What types of charts can I create?',
      answer: 'You can create bar charts, line charts, pie charts, doughnut charts, and more. Each type is perfect for different data visualization needs.',
    },
    {
      question: 'Can I customize colors and styles?',
      answer: 'Yes! Customize colors, labels, fonts, and other styling options to match your brand or presentation needs.',
    },
    {
      question: 'What format should I download charts in?',
      answer: 'PNG for presentations and documents, SVG for scalable graphics that can be resized without quality loss.',
    },
    {
      question: 'Is my data safe?',
      answer: 'All chart generation happens in your browser. Your data never leaves your device.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
