import { Camera, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyConvert = () => {
  return (
    <BlogSection title="Why Convert HEIC to JPG?" icon={Camera} iconBgClass="bg-blue-100" borderClass="border-l-4 border-blue-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Universal Compatibility:</strong>
            <span className="text-gray-700"> JPG works on all devices, computers, and software.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Easy Sharing:</strong>
            <span className="text-gray-700"> Share photos without compatibility issues.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Photo Editing:</strong>
            <span className="text-gray-700"> Edit photos in any photo editor that supports JPG.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
