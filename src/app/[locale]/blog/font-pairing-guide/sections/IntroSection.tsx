import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Choosing the right <strong>font pairing</strong> can make or break your design. Our <strong>free font pairing tool</strong> helps you discover beautiful font combinations that work perfectly
          together—no design experience needed.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to pair fonts</strong>, explore typography principles, and create professional-looking designs with perfect font combinations.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-xl">
          <Image src="/font-picker.webp" alt="Font Pairing Tool" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our font pairing tool</p>
      </div>
    </>
  );
};
