import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Welcome to the future of image creation! With <strong>AI image generators</strong>, you can transform text descriptions into stunning visual art in seconds. Whether you&apos;re a designer,
          marketer, content creator, or just exploring creative possibilities, AI-powered image generation opens up a world of possibilities—no artistic skills required.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this comprehensive guide, we&apos;ll show you <strong>how to generate AI images</strong>, explore different styles and techniques, and help you create professional-quality visuals for
          your projects.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-violet-100 shadow-xl">
          <Image src="/t2i.webp" alt="AI Image Generation - Text to Image" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Generate stunning AI images from text using our free AI image generator tool</p>
      </div>
    </>
  );
};
