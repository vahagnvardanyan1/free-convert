import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Can I convert multiple JPG images to one PDF?',
      answer: 'Yes! Use our images to PDF tool to combine multiple JPG files into a single PDF document.',
    },
    {
      question: 'Does JPG to PDF conversion lose quality?',
      answer: 'No! The JPG image is embedded in the PDF without additional compression.',
    },
    {
      question: 'What is the maximum JPG file size?',
      answer: 'Our tool handles most standard image sizes efficiently.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
