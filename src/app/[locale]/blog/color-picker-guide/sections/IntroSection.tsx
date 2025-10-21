import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>pick colors</strong> for your design project? Our <strong>free color picker</strong> helps you select, adjust, and copy perfect colors in any format—HEX, RGB, HSL, HSV. No
          software needed, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to use a color picker</strong>, understand color formats, and choose the right colors for your designs.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-pink-100 shadow-xl">
          <Image src="/color-picker.webp" alt="Color Picker Tool" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our color picker tool</p>
      </div>
    </>
  );
};
