import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'How do I resize an image without losing quality?',
      answer:
        'To maintain quality when resizing, use our high-quality resizing algorithm with bicubic interpolation. When making images smaller, quality loss is minimal. When enlarging, keep increases under 150% for best results. Always maintain aspect ratio to avoid distortion.',
    },
    {
      question: 'What is the difference between resizing and scaling?',
      answer:
        'Resizing and scaling are essentially the same—both change image dimensions. "Scaling" often refers to proportional resizing (maintaining aspect ratio), while "resizing" can mean changing width and height independently.',
    },
    {
      question: 'Can I resize multiple images at once?',
      answer: 'Currently, our tool processes one image at a time to ensure the best quality. For multiple images, simply process them one by one—it only takes seconds per image!',
    },
    {
      question: 'What are the best image dimensions for websites?',
      answer: 'For websites: Full-width hero images: 1920×1080px, Blog featured images: 1200×630px, Thumbnails: 300×200px, Product images: 800×800px. Always optimize for web after resizing.',
    },
    {
      question: 'What are the best image sizes for social media?',
      answer:
        'Instagram: 1080×1080px (square), 1080×1350px (portrait). Facebook: 1200×630px (link preview), 1200×1200px (post). Twitter: 1200×675px (card). LinkedIn: 1200×627px (link). Use our preset sizes for quick social media resizing.',
    },
    {
      question: 'Should I maintain aspect ratio when resizing?',
      answer:
        'Yes, in most cases! Maintaining aspect ratio prevents distortion and keeps your image looking natural. Only disable it when you specifically need exact dimensions (e.g., profile pictures with strict size requirements).',
    },
    {
      question: 'Can I enlarge small images without pixelation?',
      answer:
        'Enlarging images beyond their original size will always reduce quality to some degree. For best results, keep enlargements under 150%. For significant enlargements, consider using AI upscaling tools designed specifically for that purpose.',
    },
    {
      question: 'How does resizing affect file size?',
      answer:
        'Resizing directly affects file size. Making an image smaller reduces file size (fewer pixels = less data). A 1920×1080px image resized to 960×540px will be approximately 75% smaller in file size.',
    },
  ];

  return <BlogFAQ title="Frequently Asked Questions About Image Resizing" faqs={faqs} />;
};
