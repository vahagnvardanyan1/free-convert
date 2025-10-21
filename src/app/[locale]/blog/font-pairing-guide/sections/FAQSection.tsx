import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'How many fonts should I use in a design?',
      answer: 'Stick to 2-3 fonts maximum: one for headings, one for body text, and optionally one for accents. More fonts create visual confusion.',
    },
    {
      question: 'Should I pair serif with sans-serif?',
      answer: 'This is a classic pairing strategy that creates good contrast. However, you can also pair similar fonts with different weights or styles.',
    },
    {
      question: 'What are some classic font pairings?',
      answer: 'Popular pairings include: Playfair Display + Source Sans Pro, Montserrat + Merriweather, Roboto + Roboto Slab, Open Sans + Lora.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
