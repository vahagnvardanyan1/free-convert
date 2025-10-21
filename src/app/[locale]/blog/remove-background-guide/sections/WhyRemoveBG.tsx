import { Eraser, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhyRemoveBG = () => {
  return (
    <BlogSection title="Why Remove Image Backgrounds?" icon={Eraser} iconBgClass="bg-purple-100" borderClass="border-l-4 border-purple-500">
      <ul className="space-y-4">
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-purple-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Product Photography:</strong>
            <span className="text-gray-700"> Create clean product images for e-commerce with transparent or white backgrounds.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-purple-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Profile Pictures:</strong>
            <span className="text-gray-700"> Remove distracting backgrounds for professional headshots and social media profiles.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-purple-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Graphic Design:</strong>
            <span className="text-gray-700"> Isolate subjects for posters, flyers, presentations, and creative compositions.</span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircle className="mr-3 text-purple-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <strong className="text-gray-900">Marketing Materials:</strong>
            <span className="text-gray-700"> Create ads, banners, and promotional content with clean, transparent backgrounds.</span>
          </div>
        </li>
      </ul>
    </BlogSection>
  );
};
