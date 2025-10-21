import { Globe, Zap } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyWebP = () => {
  return (
    <BlogSection title="Why Convert JPG to WebP?" icon={Globe} iconBgClass="bg-green-100" borderClass="border-l-4 border-green-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <Zap className="mr-3 text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">30% Smaller Files:</strong>
            <span className="text-gray-700"> WebP images are typically 30% smaller than JPG at the same quality.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Faster Page Load:</strong>
            <span className="text-gray-700"> Smaller files mean faster websites and better user experience.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Better SEO:</strong>
            <span className="text-gray-700"> Google recommends WebP for web optimization and ranking.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
