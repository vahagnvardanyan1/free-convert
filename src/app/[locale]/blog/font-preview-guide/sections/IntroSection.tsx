import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Choosing the right <strong>font</strong> for your project? Our <strong>free font preview tool</strong> lets you test hundreds of fonts with your own text instantly—see exactly how fonts look
          before committing.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to preview fonts online</strong>, compare different typefaces, and choose the perfect font for your design.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-xl">
          <Image src="/font-generator.webp" alt="Font Preview Tool" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our font preview tool</p>
      </div>
    </>
  );
};
