import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>convert PDF to JPG</strong> for easier sharing or editing? Our <strong>free PDF to JPG converter</strong> extracts pages from PDF documents and saves them as high-quality JPG
          images—no software, no signup, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to convert PDF to JPG online</strong> and create image files from your PDF documents.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-red-100 shadow-xl">
          <Image src="/png-jpg-webp-pdf-convertors.webp" alt="PDF to JPG Converter" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our pdf to jpg converter</p>
      </div>
    </>
  );
};
