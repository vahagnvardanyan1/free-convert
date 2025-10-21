import { Columns2, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const PairingPrinciples = () => {
  return (
    <BlogSection title="Font Pairing Principles" icon={Columns2} iconBgClass="bg-amber-100" borderClass="border-l-4 border-amber-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-amber-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Contrast:</strong>
            <span className="text-gray-700"> Pair serif with sans-serif for visual interest.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-amber-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Hierarchy:</strong>
            <span className="text-gray-700"> Use distinct fonts for headings and body text.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-amber-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Simplicity:</strong>
            <span className="text-gray-700"> Stick to 2-3 fonts maximum in a design.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-amber-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Mood Match:</strong>
            <span className="text-gray-700"> Ensure fonts match your design&apos;s tone and purpose.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
