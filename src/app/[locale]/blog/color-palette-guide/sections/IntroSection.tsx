import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Looking for <strong>color palette inspiration</strong>? Our <strong>free color palette generator</strong> helps you create beautiful, harmonious color schemes for your design projects—no
          design experience needed, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to create color palettes</strong>, explore color theory basics, and generate professional color schemes instantly.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-purple-100 shadow-xl">
          <Image src="/color-picker.webp" alt="Color Palette Generator" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our color palette generator</p>
      </div>
    </>
  );
};
