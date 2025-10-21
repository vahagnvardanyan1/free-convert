import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Looking for the perfect <strong>emoji</strong> to express yourself? Our comprehensive <strong>emoji library</strong> provides thousands of emojis organized by category—all free to copy and
          paste with one click.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll explore emoji categories, show you how to use them effectively, and help you find the perfect emoji for any situation.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-yellow-100 shadow-xl">
          <Image src="/emoji.webp" alt="Emoji Browser and Picker" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our emoji browser and picker</p>
      </div>
    </>
  );
};
