import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'What is the difference between cropping and resizing?',
      answer:
        'Cropping removes portions of an image to change composition or fit dimensions, while resizing changes the overall size while keeping all content. Cropping is great for framing and focusing on specific subjects, while resizing is for changing dimensions proportionally.',
    },
    {
      question: 'What aspect ratio should I use for social media?',
      answer:
        'Instagram: 1:1 (square) or 4:5 (portrait). Facebook: 16:9 for posts, 1.91:1 for link previews. Twitter: 16:9 for cards. LinkedIn: 1.91:1 for link previews. TikTok: 9:16 (vertical). Use our preset aspect ratios for quick social media cropping.',
    },
    {
      question: 'Can I crop multiple images at once?',
      answer: 'Currently, our tool processes one image at a time to ensure precision and quality. For multiple images, simply crop them one by one—the process is very quick!',
    },
    {
      question: 'Does cropping reduce image quality?',
      answer: 'No! Cropping removes pixels but doesn&apos;t compress or degrade the remaining image quality. The cropped area maintains 100% of its original quality.',
    },
    {
      question: 'How do I crop to exact pixel dimensions?',
      answer:
        'Use our custom crop mode or select a specific aspect ratio, then our tool will let you drag and position the crop area. The final download will match your selected dimensions perfectly.',
    },
    {
      question: 'Can I undo a crop after downloading?',
      answer: 'The downloaded cropped image is permanent. However, you can always upload your original image again and crop it differently. We recommend keeping your original files.',
    },
    {
      question: 'What file formats can I crop?',
      answer: 'Our cropper supports JPG/JPEG, PNG, WebP, GIF, and HEIC formats. The cropped image will be saved in a web-optimized format.',
    },
  ];

  return <BlogFAQ title="Frequently Asked Questions About Image Cropping" faqs={faqs} />;
};
