import { Globe, Zap } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyWebP = () => {
  return (
    <BlogSection title="Why Convert PNG to WebP?" icon={Globe} iconBgClass="bg-green-100" borderClass="border-l-4 border-green-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <Zap className="mr-3 text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Smaller File Sizes:</strong>
            <span className="text-gray-700"> WebP images are typically 25-35% smaller than PNG while maintaining similar quality.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Faster Loading:</strong>
            <span className="text-gray-700"> Smaller files mean faster website loading times, improving user experience and SEO.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Modern Format:</strong>
            <span className="text-gray-700"> WebP is supported by all modern browsers and recommended by Google for web optimization.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Transparency Support:</strong>
            <span className="text-gray-700"> WebP supports transparency just like PNG, but with better compression.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
