import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Working with JSON data? Our <strong>free JSON validator</strong> helps you check JSON syntax, find errors, and ensure your data is properly formatted—no software, no signup, instant
          validation.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to validate JSON</strong>, understand common errors, and write better JSON code.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-green-100 shadow-xl">
          <Image src="/json-validate.webp" alt="JSON Validator Tool" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our json validator tool</p>
      </div>
    </>
  );
};
