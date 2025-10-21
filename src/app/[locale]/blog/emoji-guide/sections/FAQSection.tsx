import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Are emojis supported on all devices?',
      answer: 'Yes! Modern emojis are supported on all smartphones, tablets, and computers. Appearance may vary slightly between platforms (iOS, Android, Windows).',
    },
    {
      question: 'Can I use emojis in professional communication?',
      answer: 'It depends on context. Emojis are great for casual communication and social media. For formal business communication, use sparingly or avoid.',
    },
    {
      question: 'How do I type emojis on my device?',
      answer: 'Windows: Win + . (period), Mac: Cmd + Control + Space, Mobile: Emoji keyboard. Or use our tool to copy any emoji instantly.',
    },
  ];

  return <BlogFAQ faqs={faqs} />;
};
