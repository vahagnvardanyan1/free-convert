import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>remove background from image</strong> for product photos, profile pictures, or creative designs? Our <strong>free background remover</strong> uses AI technology to
          automatically detect and remove backgrounds in seconds—no manual selection required, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to remove background from images online</strong>, explore different techniques, and provide tips for perfect results every time.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-purple-100 shadow-xl">
          <Image src="/bg-remove.webp" alt="AI Background Removal Tool" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our ai background removal tool</p>
      </div>
    </>
  );
};
