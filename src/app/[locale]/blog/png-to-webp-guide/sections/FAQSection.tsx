import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Does converting PNG to WebP lose quality?',
      answer:
        'WebP can be lossless or lossy. Our converter uses high-quality settings to minimize quality loss while achieving significant file size reduction. For most uses, the quality difference is imperceptible.',
    },
    {
      question: 'How much smaller are WebP files compared to PNG?',
      answer: 'WebP files are typically 25-35% smaller than PNG for similar quality. This means faster loading and less bandwidth usage.',
    },
    {
      question: 'Does WebP support transparency?',
      answer: 'Yes! WebP fully supports transparency (alpha channel) just like PNG, but with better compression.',
    },
    {
      question: 'Is WebP supported by all browsers?',
      answer: 'All modern browsers (Chrome, Firefox, Edge, Safari 14+, Opera) support WebP. For older browsers, consider providing PNG fallbacks.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
