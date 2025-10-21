import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'How do I choose the right font?',
      answer:
        'Consider your purpose: serif fonts for traditional/formal, sans-serif for modern/clean, display fonts for headlines. Test readability at different sizes and ensure it matches your brand personality.',
    },
    {
      question: 'What are web-safe fonts?',
      answer: 'Web-safe fonts are pre-installed on most devices (Arial, Times New Roman, Georgia, etc.). Modern web fonts (Google Fonts) are now widely supported and reliable.',
    },
    {
      question: 'Can I use Google Fonts for free?',
      answer: 'Yes! All Google Fonts are free and open source. You can use them in personal and commercial projects.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
