import { Type, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyPreview = () => {
  return (
    <BlogSection title="Why Preview Fonts?" icon={Type} iconBgClass="bg-amber-100" borderClass="border-l-4 border-amber-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-amber-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">See Before You Choose:</strong>
            <span className="text-gray-700"> Preview how fonts look with your actual text content.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-amber-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Compare Multiple Fonts:</strong>
            <span className="text-gray-700"> View different fonts side-by-side to find the best match.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-amber-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Test Readability:</strong>
            <span className="text-gray-700"> Ensure fonts are readable at different sizes.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
