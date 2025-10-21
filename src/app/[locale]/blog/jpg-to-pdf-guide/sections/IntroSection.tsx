import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>convert JPG to PDF</strong> for documents or presentations? Our <strong>free JPG to PDF converter</strong> creates professional PDF files from your JPG images in seconds—no
          software, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to convert JPG to PDF online</strong> and create professional PDF documents from your images.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-red-100 shadow-xl">
          <Image src="/png-jpg-webp-pdf-convertors.webp" alt="JPG to PDF Converter" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our jpg to pdf converter</p>
      </div>
    </>
  );
};
