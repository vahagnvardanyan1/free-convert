import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'What is a CSS gradient?',
      answer: 'CSS gradients create smooth color transitions without using images. They can be linear (straight line), radial (circular), or conic (rotating).',
    },
    {
      question: 'How many colors can I use in a gradient?',
      answer: 'You can use 2 or more colors. Most gradients use 2-3 colors for clean, professional results.',
    },
    {
      question: 'Are CSS gradients better than gradient images?',
      answer: 'Yes! CSS gradients are smaller in file size, scale perfectly, and can be easily modified. They also improve page load times.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
