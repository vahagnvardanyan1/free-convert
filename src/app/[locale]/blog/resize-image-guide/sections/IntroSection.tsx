import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Whether you&apos;re optimizing images for your website, preparing photos for social media, reducing file sizes for email, or creating thumbnails, <strong>resizing images</strong> is a
          fundamental skill for anyone working with digital media. With our <strong>free online image resizer</strong>, you can scale, shrink, or enlarge your images in seconds—no software
          installation, no signup, and completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this comprehensive guide, we&apos;ll show you exactly <strong>how to resize images online</strong>, explain the best practices for different scenarios, and help you achieve professional
          results while maintaining quality.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-green-100 shadow-xl">
          <Image src="/resize.webp" alt="Screenshot of the ImageConvertors free online image resizer tool showing resizing interface" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Resize images online with precision using our free image resizer tool — no signup required, completely secure.</p>
      </div>
    </>
  );
};
