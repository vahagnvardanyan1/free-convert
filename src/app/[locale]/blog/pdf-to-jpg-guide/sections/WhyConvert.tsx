import { FileText, Zap } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyConvert = () => {
  return (
    <BlogSection title="Why Convert PDF to JPG?" icon={FileText} iconBgClass="bg-blue-100" borderClass="border-l-4 border-blue-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <Zap className="mr-3 text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Easy Sharing:</strong>
            <span className="text-gray-700"> JPG images are easier to share on social media, messaging apps, and email.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Image Editing:</strong>
            <span className="text-gray-700"> Extract pages as images for editing in photo software.</span>
          </div>
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Web Use:</strong>
            <span className="text-gray-700"> Use PDF pages as images on websites or presentations.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
