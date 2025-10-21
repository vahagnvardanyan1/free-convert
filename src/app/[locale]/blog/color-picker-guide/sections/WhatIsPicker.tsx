import { Palette, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhatIsPicker = () => {
  return (
    <BlogSection title="What is a Color Picker?" icon={Palette} iconBgClass="bg-pink-100" borderClass="border-l-4 border-pink-500">
      <p className="text-gray-700 leading-relaxed mb-6">
        A <strong>color picker</strong> is a visual tool that helps you select colors by adjusting hue, saturation, and brightness. It provides color codes in various formats (HEX, RGB, HSL) for use
        in web design, graphic design, and development.
      </p>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <CheckCircle className="mr-2 text-pink-600" size={20} />
          Perfect For:
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start bg-pink-50 p-3 rounded-lg">
            <span className="mr-2 text-pink-600">•</span>
            <span>Web design and CSS styling</span>
          </li>
          <li className="flex items-start bg-pink-50 p-3 rounded-lg">
            <span className="mr-2 text-pink-600">•</span>
            <span>Brand color selection</span>
          </li>
          <li className="flex items-start bg-pink-50 p-3 rounded-lg">
            <span className="mr-2 text-pink-600">•</span>
            <span>UI/UX design</span>
          </li>
          <li className="flex items-start bg-pink-50 p-3 rounded-lg">
            <span className="mr-2 text-pink-600">•</span>
            <span>Digital art and illustration</span>
          </li>
        </ul>
      </div>
    </BlogSection>
  );
};
