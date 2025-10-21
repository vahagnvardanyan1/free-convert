import { BlogFAQ } from '@/components/blog/BlogFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'How does AI image generation work?',
      answer:
        'AI image generators use deep learning models trained on millions of images. When you enter a text prompt, the AI interprets your description and generates a unique image matching your specifications by understanding patterns, styles, and visual concepts from its training data.',
    },
    {
      question: 'Can I use AI-generated images commercially?',
      answer:
        'Usage rights depend on the specific AI model and service. Many AI generators allow commercial use, but always check the terms of service. Images generated with our tool can typically be used freely, but verify for your specific use case.',
    },
    {
      question: 'How do I write better prompts for AI image generation?',
      answer:
        'Be specific and descriptive. Include: subject, style (realistic, artistic, etc.), colors, mood, lighting, perspective, and details. Example: "A majestic lion in golden hour sunlight, photorealistic style, detailed fur, dramatic lighting" works better than just "lion".',
    },
    {
      question: 'What image styles can AI generate?',
      answer:
        'AI can create virtually any style: photorealistic, oil painting, watercolor, digital art, anime, 3D render, pencil sketch, abstract, vintage, modern, minimalist, and countless others. Specify the style in your prompt for best results.',
    },
    {
      question: 'How long does it take to generate an AI image?',
      answer: 'Most AI image generators create images in 10-60 seconds depending on complexity, resolution, and server load. Our tool aims for quick generation times while maintaining quality.',
    },
    {
      question: 'Can AI generate images of real people?',
      answer:
        'AI can generate realistic human faces and figures, but these are fictional creations, not real people. Most AI tools have safety measures to prevent generating images of specific real individuals without consent.',
    },
  ];

  return <BlogFAQ title="Frequently Asked Questions About AI Image Generation" faqs={faqs} />;
};
