import { FileImage, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyConvert = () => {
  return (
    <BlogSection title="Why Convert WebP to PNG?" icon={FileImage} iconBgClass="bg-blue-100" borderClass="border-l-4 border-blue-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Wider Compatibility:</strong>
            <span className="text-gray-700"> PNG is supported by all image editors and older software that may not support WebP.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Transparency Support:</strong>
            <span className="text-gray-700"> Convert WebP with transparency to PNG format for use in design projects.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Editing Requirements:</strong>
            <span className="text-gray-700"> Many photo editors prefer PNG format for lossless editing.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Platform Requirements:</strong>
            <span className="text-gray-700"> Some platforms and systems still require PNG format.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
