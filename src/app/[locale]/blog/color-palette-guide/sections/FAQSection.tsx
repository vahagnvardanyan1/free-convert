import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'What makes a good color palette?',
      answer: 'A good palette has balance, contrast, and harmony. Use 3-5 colors: one dominant, one accent, and neutrals. Ensure sufficient contrast for readability.',
    },
    {
      question: 'How many colors should be in a palette?',
      answer: 'Typically 3-5 colors work best: primary color, secondary color, accent color, and 1-2 neutral colors. More colors can create visual confusion.',
    },
    {
      question: 'Can I save my color palettes?',
      answer: 'Copy the color codes and save them in your design system or documentation. Many tools also allow exporting palettes.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
