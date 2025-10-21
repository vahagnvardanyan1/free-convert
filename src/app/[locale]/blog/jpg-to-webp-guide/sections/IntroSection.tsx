import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Want to <strong>convert JPG to WebP</strong> for better web performance? Our <strong>free JPG to WebP converter</strong> optimizes your photos for faster loading—perfect for websites, blogs,
          and online stores.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to convert JPG to WebP online</strong> and improve your website&apos;s performance.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-red-100 shadow-xl">
          <Image src="/png-jpg-webp-pdf-convertors.webp" alt="JPG to WebP Converter" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our jpg to webp converter</p>
      </div>
    </>
  );
};
