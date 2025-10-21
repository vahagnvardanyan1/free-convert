import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'What is the Golden Ratio in typography?',
      answer: 'The Golden Ratio (1.618) creates harmonious proportions. In typography, it means each font size is 1.618 times larger than the previous one.',
    },
    {
      question: 'What scale ratio should I use?',
      answer: '1.25 (Major Third) for subtle hierarchy, 1.5 (Perfect Fifth) for moderate contrast, 1.618 (Golden Ratio) for dramatic hierarchy. Choose based on your design needs.',
    },
    {
      question: 'How many font sizes should I use?',
      answer: 'Typically 5-7 sizes are sufficient: one for body text, 3-4 for headings, and 1-2 for smaller text like captions.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
