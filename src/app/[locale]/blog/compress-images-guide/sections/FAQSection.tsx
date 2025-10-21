import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'How much can I compress an image without losing quality?',
      answer:
        'You can typically reduce image size by 50-70% without noticeable quality loss using our smart compression algorithm. For JPG images, quality settings of 80-90% provide excellent results. PNG images can be optimized by 30-50% depending on color complexity.',
    },
    {
      question: 'What is the difference between lossy and lossless compression?',
      answer: (
        <>
          <strong>Lossy compression</strong> (JPG/WebP) removes some image data to achieve smaller sizes - ideal for photos and complex images. <strong>Lossless compression</strong> (PNG optimization)
          preserves all data - best for graphics with text, logos, or images requiring perfect quality.
        </>
      ),
    },
    {
      question: 'Can I compress multiple images at once?',
      answer: 'Currently, our tool processes one image at a time to ensure the best quality and performance. For batch processing, simply compress images one by one - the process is very quick!',
    },
    {
      question: 'Is my image data safe when compressing online?',
      answer:
        'Absolutely! All image compression happens entirely in your browser using client-side JavaScript. Your images never leave your device and are never uploaded to our servers. This ensures complete privacy and security.',
    },
    {
      question: 'What image formats can I compress?',
      answer: 'Our compressor supports JPG/JPEG, PNG, WebP, GIF, and HEIC formats. The tool automatically detects the format and applies the best compression algorithm.',
    },
    {
      question: 'How do I compress an image to exactly 20KB or 50KB?',
      answer:
        'Use the "By File Size" mode in our compressor. Enter your target size (e.g., 20KB or 50KB), and our smart algorithm will automatically adjust compression to match your target while maintaining the best possible quality.',
    },
    {
      question: 'Will compressing images reduce image quality?',
      answer:
        'Compression always involves some tradeoff, but with the right settings, quality loss is imperceptible to the human eye. Our tool lets you preview results before downloading, so you can ensure quality meets your standards.',
    },
    {
      question: 'What are the best compression settings for websites?',
      answer:
        'For websites, we recommend: 80-85% quality for JPG images, WebP format when possible (better compression than JPG), and 1920px maximum width for full-width images. Hero images can be 150-300KB, while thumbnails should be 20-50KB.',
    },
  ];

  return <BlogFAQ title="Frequently Asked Questions About Image Compression" faqs={faqs} />;
};
