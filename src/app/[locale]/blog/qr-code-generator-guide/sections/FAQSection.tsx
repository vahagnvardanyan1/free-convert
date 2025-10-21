import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Are QR codes free to create and use?',
      answer: 'Yes! QR codes are completely free to create, use, and distribute. There are no licensing fees or restrictions. Our QR code generator is 100% free with no signup required.',
    },
    {
      question: 'Do QR codes expire?',
      answer:
        'Static QR codes (like the ones our tool creates) never expire. They contain the data directly and will work forever. Dynamic QR codes (which redirect through a service) may expire if the service is discontinued.',
    },
    {
      question: 'Can I customize QR code colors?',
      answer:
        'Yes! Our tool lets you customize both foreground (the QR pattern) and background colors. For best scanning results, maintain high contrast—dark foreground on light background works best.',
    },
    {
      question: 'What is the difference between PNG and SVG downloads?',
      answer:
        'PNG is a raster format (pixels) best for digital use (websites, emails, social media). SVG is a vector format that scales infinitely without quality loss—perfect for print, large formats, or when you need to resize later.',
    },
    {
      question: 'How do I create a WiFi QR code?',
      answer:
        'Select the "WiFi" type, enter your network name (SSID), password, and encryption type (WPA/WPA2 is most common). Anyone scanning the code can instantly connect to your WiFi without typing the password.',
    },
    {
      question: 'What size should my QR code be?',
      answer:
        'Minimum size for reliable scanning: 2×2 cm (0.8×0.8 inches) at arm&apos;s length. For business cards: 2.5×2.5 cm. For posters viewed from distance: scale up proportionally. Our tool generates high-resolution QR codes that scale well.',
    },
    {
      question: 'Can QR codes contain logos or images?',
      answer:
        'While QR codes can technically include logos in the center, our tool focuses on generating clean, reliable QR codes that scan perfectly every time. Adding logos requires careful consideration of error correction and may reduce scanning reliability.',
    },
  ];

  return <BlogFAQ title="Frequently Asked Questions About QR Codes" faqs={faqs} />;
};
