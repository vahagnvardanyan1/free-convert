import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'What is the difference between RGB and HEX?',
      answer: 'HEX is a hexadecimal representation of RGB values. #FF5733 in HEX equals RGB(255, 87, 51). Both represent the same color, just different notation.',
    },
    {
      question: 'When should I use HSL vs RGB?',
      answer: 'Use HSL when you need to adjust brightness or saturation programmatically. Use RGB for direct color specification. HSL is more intuitive for color manipulation.',
    },
    {
      question: 'Can I convert colors with transparency (alpha)?',
      answer: 'Yes! Our converter supports RGBA and HSLA formats for colors with transparency.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
