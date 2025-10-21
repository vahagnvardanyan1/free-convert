import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>convert PNG to JPG</strong> for smaller file sizes or wider compatibility? Our <strong>free PNG to JPG converter</strong> makes it easy to transform PNG images to JPEG format
          in seconds—no software, no signup, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to convert PNG to JPG online</strong>, explain when to use each format, and help you maintain quality during conversion.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 shadow-xl">
          <Image src="/png-jpg-webp-pdf-convertors.webp" alt="PNG to JPG Converter" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our png to jpg converter</p>
      </div>
    </>
  );
};
