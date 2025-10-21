import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need stunning <strong>gradients</strong> for your design? Our <strong>free gradient generator</strong> helps you create beautiful color gradients with CSS code—perfect for backgrounds,
          buttons, and modern web design.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to create gradients</strong>, explore different gradient types, and generate CSS code instantly.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-purple-100 shadow-xl">
          <Image src="/color-picker.webp" alt="Gradient Generator Tool" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our gradient generator tool</p>
      </div>
    </>
  );
};
