import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Whether you&apos;re preparing images for social media, creating a professional portfolio, designing marketing materials, or just want that perfect profile picture,{' '}
          <strong>cropping images</strong> is an essential skill. With our <strong>free online image cropper</strong>, you can crop, resize, rotate, and perfect your images in seconds—no software
          installation, no signup, and completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this comprehensive guide, we&apos;ll show you exactly <strong>how to crop images online</strong>, explain the best practices for different use cases, and help you achieve professional
          results every time.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 shadow-xl">
          <Image src="/crop.webp" alt="Screenshot of the ImageConvertors free online image cropper tool showing cropping interface" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Crop images online with precision using our free image cropper tool — no signup required, completely secure.</p>
      </div>
    </>
  );
};
