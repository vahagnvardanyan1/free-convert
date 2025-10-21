import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Does converting WebP to PNG lose quality?',
      answer: 'No quality loss occurs during WebP to PNG conversion. Both formats support high-quality images, and our converter preserves all image data including transparency.',
    },
    {
      question: 'Why is PNG larger than WebP?',
      answer: 'PNG typically produces larger files than WebP because WebP uses more advanced compression. However, PNG offers wider compatibility with older software and systems.',
    },
    {
      question: 'Can I convert WebP to PNG with transparency?',
      answer: 'Yes! Our converter fully supports transparency. WebP images with alpha channels are converted to PNG with transparency preserved.',
    },
    {
      question: 'Is it free to convert WebP to PNG?',
      answer: 'Completely free! No limits, no signup required, unlimited conversions.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
