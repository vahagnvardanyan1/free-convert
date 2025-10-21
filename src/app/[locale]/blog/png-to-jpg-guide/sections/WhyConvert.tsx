import { Camera, Zap } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyConvert = () => {
  return (
    <BlogSection title="Why Convert PNG to JPG?" icon={Camera} iconBgClass="bg-orange-100" borderClass="border-l-4 border-orange-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <Zap className="mr-3 text-orange-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Smaller File Sizes:</strong>
            <span className="text-gray-700"> JPG files are significantly smaller than PNG, perfect for photos and web use.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-orange-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Better for Photos:</strong>
            <span className="text-gray-700"> JPG is optimized for photographic images with many colors.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-orange-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Faster Loading:</strong>
            <span className="text-gray-700"> Smaller files mean faster website loading and better user experience.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-orange-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Universal Support:</strong>
            <span className="text-gray-700"> JPG is supported by all devices, browsers, and software.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
