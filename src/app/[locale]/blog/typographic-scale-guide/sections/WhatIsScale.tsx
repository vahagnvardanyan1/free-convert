import { Ruler, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhatIsScale = () => {
  return (
    <BlogSection title="What is a Typographic Scale?" icon={Ruler} iconBgClass="bg-amber-100" borderClass="border-l-4 border-amber-500">
      <p className="text-gray-700 leading-relaxed mb-6">
        A <strong>typographic scale</strong> is a sequence of font sizes that creates visual hierarchy and harmony in design. It uses mathematical ratios to ensure consistent spacing between text
        sizes.
      </p>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <CheckCircle className="mr-2 text-amber-600" size={20} />
          Benefits:
        </h3>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="flex items-start bg-amber-50 p-3 rounded-lg">
            <span className="mr-2 text-amber-600">•</span>
            <span>Visual harmony and consistency</span>
          </li>
          <li className="flex items-start bg-amber-50 p-3 rounded-lg">
            <span className="mr-2 text-amber-600">•</span>
            <span>Professional typography</span>
          </li>
          <li className="flex items-start bg-amber-50 p-3 rounded-lg">
            <span className="mr-2 text-amber-600">•</span>
            <span>Faster design decisions</span>
          </li>
          <li className="flex items-start bg-amber-50 p-3 rounded-lg">
            <span className="mr-2 text-amber-600">•</span>
            <span>Better readability</span>
          </li>
        </ul>
      </div>
    </BlogSection>
  );
};
