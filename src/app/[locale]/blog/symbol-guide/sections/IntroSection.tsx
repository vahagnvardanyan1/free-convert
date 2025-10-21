import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Looking for <strong>special symbols</strong> to copy and paste? Our comprehensive <strong>symbol library</strong> provides thousands of special characters, mathematical symbols, arrows, and
          decorative elements—all free to copy with one click.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll explore different symbol categories, show you how to use them, and help you find the perfect symbols for your projects.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 shadow-xl">
          <Image src="/symbol.webp" alt="Symbol Library" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our symbol library</p>
      </div>
    </>
  );
};
