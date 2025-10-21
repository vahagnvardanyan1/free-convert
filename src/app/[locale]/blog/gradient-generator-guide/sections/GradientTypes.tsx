import { Blend, ArrowRight, Circle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const GradientTypes = () => {
  return (
    <BlogSection title="Gradient Types" icon={Blend} iconBgClass="bg-pink-100" borderClass="border-l-4 border-pink-500">
      <div className="space-y-4">
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2 flex items-center">
            <ArrowRight className="mr-2" size={18} />
            Linear Gradients
          </h3>
          <p className="text-pink-800 text-sm">Colors transition in a straight line. Perfect for backgrounds and headers.</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2 flex items-center">
            <Circle className="mr-2" size={18} />
            Radial Gradients
          </h3>
          <p className="text-pink-800 text-sm">Colors radiate from a center point. Great for spotlight effects.</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2">Conic Gradients</h3>
          <p className="text-pink-800 text-sm">Colors rotate around a center point. Perfect for pie charts and circular designs.</p>
        </div>
      </div>
    </BlogSection>
  );
};
