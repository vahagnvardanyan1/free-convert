import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Can I convert multiple PNG images to one PDF?',
      answer: 'Yes! You can combine multiple PNG images into a single PDF document using our images to PDF tool.',
    },
    {
      question: 'Does PNG to PDF conversion lose quality?',
      answer: 'No! The PNG image is embedded in the PDF without compression or quality loss.',
    },
    {
      question: 'What is the maximum file size I can convert?',
      answer: 'Our tool handles most standard image sizes. For very large files, the conversion may take a bit longer but will complete successfully.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
