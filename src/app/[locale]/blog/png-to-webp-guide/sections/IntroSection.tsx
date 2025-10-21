import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Looking to <strong>convert PNG to WebP</strong> for faster website loading and better compression? Our <strong>free PNG to WebP converter</strong> transforms your images to the modern WebP
          format in seconds—no software needed, no signup, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to convert PNG to WebP online</strong>, explain the benefits of WebP format, and help you optimize your images for the web.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 shadow-xl">
          <Image src="/png-jpg-webp-pdf-convertors.webp" alt="PNG to WebP Converter" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our png to webp converter</p>
      </div>
    </>
  );
};
