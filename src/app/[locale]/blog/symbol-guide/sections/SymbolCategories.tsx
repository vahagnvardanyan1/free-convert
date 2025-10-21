import { Hash, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const SymbolCategories = () => {
  return (
    <BlogSection title="Symbol Categories" icon={Hash} iconBgClass="bg-slate-100" borderClass="border-l-4 border-slate-500">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <CheckCircle className="mr-2 text-slate-600" size={20} />
          Available Categories:
        </h3>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="flex items-start bg-slate-50 p-3 rounded-lg">
            <span className="mr-2 text-slate-600">•</span>
            <span>Mathematical symbols (±, ×, ÷, ∞, √)</span>
          </li>
          <li className="flex items-start bg-slate-50 p-3 rounded-lg">
            <span className="mr-2 text-slate-600">•</span>
            <span>Arrows (→, ←, ↑, ↓, ⇄)</span>
          </li>
          <li className="flex items-start bg-slate-50 p-3 rounded-lg">
            <span className="mr-2 text-slate-600">•</span>
            <span>Currency symbols ($, €, £, ¥, ₹)</span>
          </li>
          <li className="flex items-start bg-slate-50 p-3 rounded-lg">
            <span className="mr-2 text-slate-600">•</span>
            <span>Special characters (©, ®, ™, §)</span>
          </li>
          <li className="flex items-start bg-slate-50 p-3 rounded-lg">
            <span className="mr-2 text-slate-600">•</span>
            <span>Geometric shapes (■, ▲, ●, ◆)</span>
          </li>
          <li className="flex items-start bg-slate-50 p-3 rounded-lg">
            <span className="mr-2 text-slate-600">•</span>
            <span>Zodiac and astrological symbols</span>
          </li>
        </ul>
      </div>
    </BlogSection>
  );
};
