import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'How do I type special symbols on my keyboard?',
      answer: 'Most special symbols require Alt codes (Windows) or Option key combinations (Mac). Our tool makes it easier—just click to copy any symbol.',
    },
    {
      question: 'Are these symbols supported on all devices?',
      answer: 'Most Unicode symbols are supported on modern devices. Some rare symbols may not display on older systems.',
    },
    {
      question: 'Can I use these symbols commercially?',
      answer: 'Yes! Unicode symbols are free to use in any project, personal or commercial.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
