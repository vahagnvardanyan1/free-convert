import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          iPhone photos in HEIC format not working on your computer? Our <strong>free HEIC to JPG converter</strong> transforms Apple&apos;s HEIC images to universally-supported JPG format in
          seconds—no software, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to convert HEIC to JPG online</strong> and make your iPhone photos compatible with all devices.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-orange-100 shadow-xl">
          <Image src="/png-jpg-webp-pdf-convertors.webp" alt="HEIC to JPG Converter" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our heic to jpg converter</p>
      </div>
    </>
  );
};
