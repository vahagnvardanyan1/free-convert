import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>convert WebP to PNG</strong> for compatibility or editing? Our <strong>free WebP to PNG converter</strong> makes it easy to transform modern WebP images into widely-supported
          PNG format in seconds—no software installation, no signup, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to convert WebP to PNG online</strong>, explain when to use each format, and provide tips for maintaining quality during conversion.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-green-100 shadow-xl">
          <Image src="/png-jpg-webp-pdf-convertors.webp" alt="WebP to PNG Converter" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our webp to png converter</p>
      </div>
    </>
  );
};
