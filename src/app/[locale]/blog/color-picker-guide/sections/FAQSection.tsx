import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'What color format should I use for web design?',
      answer: 'HEX is most common for CSS (#FF5733). RGB is also widely supported. For modern CSS, consider using HSL for easier color adjustments.',
    },
    {
      question: 'How do I pick colors that work well together?',
      answer: 'Use color theory: complementary colors for contrast, analogous colors for harmony, or triadic colors for vibrant combinations. Our palette generator can help with this.',
    },
    {
      question: 'Can I pick colors from an existing image?',
      answer: 'Use our color picker to select colors visually, or extract colors from images using image analysis tools.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
