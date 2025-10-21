import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          QR codes have become ubiquitous in our digital world—from restaurant menus to event tickets, business cards to product packaging. With our <strong>free QR code generator</strong>, you can
          create professional, customizable QR codes in seconds for URLs, WiFi passwords, contact information, and much more—no signup required, completely free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this comprehensive guide, we&apos;ll show you exactly <strong>how to create QR codes online</strong>, explore different QR code types, and provide tips for designing QR codes that
          actually get scanned.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 shadow-xl">
          <Image src="/qr-code.webp" alt="QR Code Generator Tool" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Create custom QR codes for free with our online QR code generator</p>
      </div>
    </>
  );
};
