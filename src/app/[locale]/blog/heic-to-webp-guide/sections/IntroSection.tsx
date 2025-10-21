import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>convert HEIC to WebP</strong> for modern web optimization? Our <strong>free HEIC to WebP converter</strong> transforms iPhone photos to the efficient WebP format—perfect for
          websites, smaller file sizes, faster loading.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to convert HEIC to WebP online</strong> and optimize your iPhone photos for the web.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-orange-100 shadow-xl">
          <Image src="/png-jpg-webp-pdf-convertors.webp" alt="HEIC to WebP Converter" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our heic to webp converter</p>
      </div>
    </>
  );
};
