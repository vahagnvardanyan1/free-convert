import { Shuffle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const ColorFormats = () => {
  return (
    <BlogSection title="Color Formats Explained" icon={Shuffle} iconBgClass="bg-pink-100" borderClass="border-l-4 border-pink-500">
      <div className="space-y-4">
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2">HEX (#FF5733)</h3>
          <p className="text-pink-800 text-sm">Hexadecimal format, commonly used in web design and CSS.</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2">RGB (255, 87, 51)</h3>
          <p className="text-pink-800 text-sm">Red, Green, Blue values (0-255), used in digital displays.</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2">HSL (9°, 100%, 60%)</h3>
          <p className="text-pink-800 text-sm">Hue, Saturation, Lightness, intuitive for color adjustments.</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-900 mb-2">HSV (9°, 80%, 100%)</h3>
          <p className="text-pink-800 text-sm">Hue, Saturation, Value, used in color pickers.</p>
        </div>
      </div>
    </BlogSection>
  );
};
