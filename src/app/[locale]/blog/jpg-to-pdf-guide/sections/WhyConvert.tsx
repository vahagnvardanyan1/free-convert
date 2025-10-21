import { FileText, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyConvert = () => {
  return (
    <BlogSection title="Why Convert JPG to PDF?" icon={FileText} iconBgClass="bg-red-100" borderClass="border-l-4 border-red-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-red-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Professional Documents:</strong>
            <span className="text-gray-700"> Create PDF documents from images for reports and portfolios.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-red-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Easy Sharing:</strong>
            <span className="text-gray-700"> PDFs maintain formatting and are universally readable.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-red-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Multi-Page Documents:</strong>
            <span className="text-gray-700"> Combine multiple JPG images into one PDF file.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
