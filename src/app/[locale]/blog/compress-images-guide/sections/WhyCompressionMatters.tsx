import { Zap } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyCompressionMatters = () => {
  return (
    <BlogSection title="Why Image Compression Matters" icon={Zap} iconBgClass="bg-emerald-100" borderClass="border-l-4 border-emerald-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div>
            <strong className="text-gray-900">Faster Website Loading:</strong>
            <span className="text-gray-700">
              {' '}
              Compressed images load 3-5x faster, improving user experience and reducing bounce rates. Google reports that 53% of mobile users abandon sites that take over 3 seconds to load.
            </span>
          </div>
        </li>
        <li className="flex items-start">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div>
            <strong className="text-gray-900">Better SEO Rankings:</strong>
            <span className="text-gray-700"> Page speed is a ranking factor. Smaller images help your website rank higher in search results, bringing more organic traffic.</span>
          </div>
        </li>
        <li className="flex items-start">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div>
            <strong className="text-gray-900">Reduced Bandwidth Costs:</strong>
            <span className="text-gray-700"> Smaller images consume less bandwidth, reducing hosting costs and saving data for mobile users.</span>
          </div>
        </li>
        <li className="flex items-start">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div>
            <strong className="text-gray-900">Storage Optimization:</strong>
            <span className="text-gray-700"> Compressed images take up less space, allowing you to store more photos and files on your devices or cloud storage.</span>
          </div>
        </li>
        <li className="flex items-start">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div>
            <strong className="text-gray-900">Email Attachment Limits:</strong>
            <span className="text-gray-700"> Most email providers limit attachment sizes to 20-25MB. Compressing images ensures your emails go through without issues.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
