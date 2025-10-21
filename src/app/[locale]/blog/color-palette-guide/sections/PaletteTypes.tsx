import { Droplet } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const PaletteTypes = () => {
  return (
    <BlogSection title="Color Palette Types" icon={Droplet} iconBgClass="bg-pink-100" borderClass="border-l-4 border-pink-500">
      <div className="space-y-4">
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2">Monochromatic</h3>
          <p className="text-pink-800 text-sm">Variations of a single hue with different saturation and lightness.</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2">Complementary</h3>
          <p className="text-pink-800 text-sm">Colors opposite on the color wheel, creating high contrast.</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2">Analogous</h3>
          <p className="text-pink-800 text-sm">Colors next to each other on the color wheel, harmonious.</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2">Triadic</h3>
          <p className="text-pink-800 text-sm">Three colors evenly spaced on the color wheel, vibrant.</p>
        </div>
      </div>
    </BlogSection>
  );
};
