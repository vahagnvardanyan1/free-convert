import { GitCompare, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyCompare = () => {
  return (
    <BlogSection title="Why Compare JSON?" icon={GitCompare} iconBgClass="bg-cyan-100" borderClass="border-l-4 border-cyan-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-cyan-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">API Testing:</strong>
            <span className="text-gray-700"> Compare API responses before and after changes.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-cyan-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Debugging:</strong>
            <span className="text-gray-700"> Find differences in configuration files quickly.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-cyan-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Code Review:</strong>
            <span className="text-gray-700"> Verify data changes and updates.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
