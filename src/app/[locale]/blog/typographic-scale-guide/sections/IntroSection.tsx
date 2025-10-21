import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          A <strong>typographic scale</strong> is a fundamental tool for creating visually harmonious designs. Our <strong>free typographic scale calculator</strong> helps you generate perfect font
          size hierarchies for your design projects—no guesswork, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to create typographic scales</strong>, understand modular scales, and apply them to your designs for professional typography.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-xl">
          <Image src="/font-generator.webp" alt="Typographic Scale Generator" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our typographic scale generator</p>
      </div>
    </>
  );
};
