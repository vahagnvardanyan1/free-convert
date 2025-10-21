import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>convert colors between formats</strong>? Our <strong>free color converter</strong> transforms colors between HEX, RGB, HSL, and HSV formats instantly—perfect for designers
          and developers.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to convert color codes</strong>, understand different color formats, and use the right format for your projects.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-100 shadow-xl">
          <Image src="/color-picker.webp" alt="Color Format Converter" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our color format converter</p>
      </div>
    </>
  );
};
