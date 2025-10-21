import { FileText, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyConvert = () => {
  return (
    <BlogSection title="Why Convert PNG to PDF?" icon={FileText} iconBgClass="bg-red-100" borderClass="border-l-4 border-red-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-red-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Document Creation:</strong>
            <span className="text-gray-700"> Create professional PDF documents from images for reports, presentations, or portfolios.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-red-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Easy Sharing:</strong>
            <span className="text-gray-700"> PDFs are universally readable and maintain formatting across all devices.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-red-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Professional Format:</strong>
            <span className="text-gray-700"> PDFs are the standard for official documents, contracts, and archiving.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
