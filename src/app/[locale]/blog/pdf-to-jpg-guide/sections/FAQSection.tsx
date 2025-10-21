import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Can I convert specific PDF pages to JPG?',
      answer: 'Yes! Our tool allows you to select specific pages or convert all pages from your PDF to JPG images.',
    },
    {
      question: 'What quality should I use for PDF to JPG conversion?',
      answer: 'We recommend 90-95% quality for best results. This maintains clarity while keeping file sizes reasonable.',
    },
    {
      question: 'Can I convert large PDF files?',
      answer: 'Yes, our tool handles PDF files of various sizes. Larger files may take a bit longer to process.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
