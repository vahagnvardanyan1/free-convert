import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>convert PNG to PDF</strong> for documents, presentations, or archiving? Our <strong>free PNG to PDF converter</strong> transforms your PNG images into professional PDF files
          in seconds—no software, no signup, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to convert PNG to PDF online</strong> and create professional PDF documents from your images.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 shadow-xl">
          <Image src="/png-jpg-webp-pdf-convertors.webp" alt="PNG to PDF Converter" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our png to pdf converter</p>
      </div>
    </>
  );
};
