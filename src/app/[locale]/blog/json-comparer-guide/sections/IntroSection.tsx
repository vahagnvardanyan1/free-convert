import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>compare JSON files</strong> and find differences? Our <strong>free JSON comparer</strong> highlights all differences between two JSON objects—perfect for debugging, API
          testing, and code reviews.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this guide, we&apos;ll show you <strong>how to compare JSON</strong>, identify differences, and understand changes between JSON files.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-orange-100 shadow-xl">
          <Image src="/json-compare.webp" alt="JSON Comparison Tool" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our json comparison tool</p>
      </div>
    </>
  );
};
