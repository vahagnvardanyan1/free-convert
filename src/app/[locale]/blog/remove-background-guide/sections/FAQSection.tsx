import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'How does AI background removal work?',
      answer:
        'AI background removal uses machine learning models trained on millions of images to automatically detect the main subject and separate it from the background. The AI identifies edges, colors, and patterns to create precise cutouts.',
    },
    {
      question: 'What file format should I use?',
      answer: 'Upload any JPG, PNG, WebP, or HEIC file. The output will be PNG with a transparent background, which you can use in design software or place on any background.',
    },
    {
      question: 'Can I remove background from multiple images?',
      answer: 'Currently processes one image at a time for best quality. For multiple images, process them individually—each takes only seconds!',
    },
    {
      question: 'Will it work with complex backgrounds?',
      answer: 'Our AI handles most backgrounds well, including complex scenes. For best results, ensure good contrast between subject and background, and the subject has clear edges.',
    },
    {
      question: 'Is my image data safe?',
      answer: 'Yes! All processing happens in your browser. Your images never leave your device and are never uploaded to our servers.',
    },
  ];

  return <BlogFAQ title="Frequently Asked Questions" faqs={faqs} />;
};
