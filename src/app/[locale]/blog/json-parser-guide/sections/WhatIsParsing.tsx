import { Code2, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhatIsParsing = () => {
  return (
    <BlogSection title="What is JSON Parsing?" icon={Code2} iconBgClass="bg-cyan-100" borderClass="border-l-4 border-cyan-500">
      <p className="text-gray-700 leading-relaxed mb-6">
        <strong>JSON parsing</strong> converts JSON text into a structured format that&apos;s easier to read and work with. It also formats (beautifies) messy JSON with proper indentation.
      </p>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <CheckCircle className="mr-2 text-cyan-600" size={20} />
          Use Cases:
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start bg-cyan-50 p-3 rounded-lg">
            <span className="mr-2 text-cyan-600">•</span>
            <span>Format minified JSON for readability</span>
          </li>
          <li className="flex items-start bg-cyan-50 p-3 rounded-lg">
            <span className="mr-2 text-cyan-600">•</span>
            <span>Visualize JSON structure</span>
          </li>
          <li className="flex items-start bg-cyan-50 p-3 rounded-lg">
            <span className="mr-2 text-cyan-600">•</span>
            <span>Debug API responses</span>
          </li>
          <li className="flex items-start bg-cyan-50 p-3 rounded-lg">
            <span className="mr-2 text-cyan-600">•</span>
            <span>Extract specific values</span>
          </li>
        </ul>
      </div>
    </BlogSection>
  );
};
