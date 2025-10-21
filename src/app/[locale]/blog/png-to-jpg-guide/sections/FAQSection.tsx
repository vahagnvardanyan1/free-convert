import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Does converting PNG to JPG lose quality?',
      answer:
        'JPG uses lossy compression, so some quality loss occurs. However, our converter uses high-quality settings (85-90%) where the difference is minimal for photos. For graphics with text or sharp edges, PNG may be better.',
    },
    {
      question: 'What happens to transparency when converting PNG to JPG?',
      answer: 'JPG does not support transparency. Transparent areas in your PNG will be replaced with a white background when converted to JPG.',
    },
    {
      question: 'When should I use JPG instead of PNG?',
      answer: 'Use JPG for photographs and images with many colors where file size matters. Use PNG for graphics, logos, screenshots, or images requiring transparency.',
    },
    {
      question: 'How much smaller is JPG than PNG?',
      answer: 'JPG files are typically 50-75% smaller than PNG for the same image, making them ideal for web use and email attachments.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
