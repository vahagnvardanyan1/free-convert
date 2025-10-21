import { Wand2, Sparkles } from 'lucide-react';
import Image from 'next/image';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhatIsAI = () => {
  return (
    <BlogSection title="What is AI Image Generation?" icon={Wand2} iconBgClass="bg-violet-100" borderClass="border-l-4 border-violet-500">
      <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
        <Image src="/t2i.webp" alt="AI Image Generation - Text to Image" width={1200} height={600} className="w-full h-auto" priority />
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">
        <strong>AI image generation</strong> uses artificial intelligence and machine learning to create original images from text descriptions (prompts). Modern AI models like DALL-E, Midjourney, and
        Stable Diffusion can generate photorealistic images, artistic illustrations, logos, and more based on your written instructions.
      </p>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <Sparkles className="mr-2 text-violet-600" size={20} />
          Popular Uses:
        </h3>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="flex items-start bg-violet-50 p-3 rounded-lg">
            <span className="mr-2 text-violet-600">•</span>
            <span>Marketing and advertising visuals</span>
          </li>
          <li className="flex items-start bg-violet-50 p-3 rounded-lg">
            <span className="mr-2 text-violet-600">•</span>
            <span>Social media content creation</span>
          </li>
          <li className="flex items-start bg-violet-50 p-3 rounded-lg">
            <span className="mr-2 text-violet-600">•</span>
            <span>Blog post illustrations</span>
          </li>
          <li className="flex items-start bg-violet-50 p-3 rounded-lg">
            <span className="mr-2 text-violet-600">•</span>
            <span>Concept art and brainstorming</span>
          </li>
          <li className="flex items-start bg-violet-50 p-3 rounded-lg">
            <span className="mr-2 text-violet-600">•</span>
            <span>Product mockups and prototypes</span>
          </li>
          <li className="flex items-start bg-violet-50 p-3 rounded-lg">
            <span className="mr-2 text-violet-600">•</span>
            <span>Creative exploration and inspiration</span>
          </li>
        </ul>
      </div>
    </BlogSection>
  );
};
