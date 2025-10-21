import { Code2, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhatIsJSON = () => {
  return (
    <BlogSection title="What is JSON Validation?" icon={Code2} iconBgClass="bg-cyan-100" borderClass="border-l-4 border-cyan-500">
      <p className="text-gray-700 leading-relaxed mb-6">
        <strong>JSON validation</strong> checks if your JSON data follows proper syntax rules. Valid JSON must have correct brackets, quotes, commas, and data types. Our validator instantly identifies
        errors and shows you exactly where they are.
      </p>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <CheckCircle className="mr-2 text-cyan-600" size={20} />
          Why Validate JSON:
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start bg-cyan-50 p-3 rounded-lg">
            <span className="mr-2 text-cyan-600">•</span>
            <span>Find syntax errors before deployment</span>
          </li>
          <li className="flex items-start bg-cyan-50 p-3 rounded-lg">
            <span className="mr-2 text-cyan-600">•</span>
            <span>Ensure API compatibility</span>
          </li>
          <li className="flex items-start bg-cyan-50 p-3 rounded-lg">
            <span className="mr-2 text-cyan-600">•</span>
            <span>Debug configuration files</span>
          </li>
          <li className="flex items-start bg-cyan-50 p-3 rounded-lg">
            <span className="mr-2 text-cyan-600">•</span>
            <span>Verify data integrity</span>
          </li>
        </ul>
      </div>
    </BlogSection>
  );
};
