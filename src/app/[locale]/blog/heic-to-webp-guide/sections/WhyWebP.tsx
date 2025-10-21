import { Globe, Zap } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyWebP = () => {
  return (
    <BlogSection title="Why Convert HEIC to WebP?" icon={Globe} iconBgClass="bg-green-100" borderClass="border-l-4 border-green-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <Zap className="mr-3 text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Smaller File Sizes:</strong>
            <span className="text-gray-700"> WebP is 25-35% smaller than JPG with similar quality.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Web Optimized:</strong>
            <span className="text-gray-700"> Perfect for websites, faster loading, better SEO.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Modern Format:</strong>
            <span className="text-gray-700"> Supported by all modern browsers.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
