import Image from 'next/image';

import { BlogIntro } from '@/components/blog/BlogSection';

export const IntroSection = () => {
  return (
    <>
      <BlogIntro>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Need to <strong>compress image to 20KB</strong> for a profile picture? Want to <strong>reduce image size to 50KB</strong> for faster website loading? Or perhaps you need to{' '}
          <strong>compress image to 100KB</strong> for email attachments? You are in the right place!
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>Image compression</strong> is the process of reducing file size without significant quality loss. Whether you are optimizing images for web, social media, email, or storage, proper
          compression can reduce file sizes by 50-90% while maintaining excellent visual quality.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In this comprehensive guide, we will show you exactly <strong>how to compress images online free</strong> using our powerful image compressor tool, explain different compression techniques,
          and provide tips for achieving specific file size targets like 20KB, 50KB, or 100KB.
        </p>
      </BlogIntro>

      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-green-100 shadow-xl">
          <Image src="/convert.webp" alt="Image Compression Tool" width={1200} height={630} className="w-full h-auto" priority />
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">Explore our image compression tool</p>
      </div>
    </>
  );
};
