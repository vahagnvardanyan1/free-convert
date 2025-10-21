import { Maximize2, CheckCircle, Sparkles } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhatIsResizing = () => {
  return (
    <BlogSection title="What is Image Resizing?" icon={Maximize2} iconBgClass="bg-green-100" borderClass="border-l-4 border-green-500">
      <p className="text-gray-700 leading-relaxed mb-6">
        <strong>Image resizing</strong> is the process of changing the dimensions (width and height) of a digital image, making it larger or smaller. Unlike cropping (which removes portions of an
        image), resizing scales the entire image while optionally maintaining its original proportions (aspect ratio).
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-900 mb-4 flex items-center">
            <CheckCircle className="mr-2" size={20} />
            Perfect For:
          </h3>
          <ul className="space-y-2 text-green-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Website optimization and faster loading</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Social media posts (Instagram, Facebook, Twitter)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Email attachments and file size reduction</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Creating thumbnails and preview images</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Preparing images for printing</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Mobile app assets and icons</span>
            </li>
          </ul>
        </div>

        <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
          <h3 className="font-semibold text-emerald-900 mb-4 flex items-center">
            <Sparkles className="mr-2" size={20} />
            Key Benefits:
          </h3>
          <ul className="space-y-2 text-emerald-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Reduce file size for faster uploads/downloads</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Meet platform-specific dimension requirements</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Improve website performance and SEO</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Save storage space on devices</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Create consistent image sizes</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Maintain professional appearance</span>
            </li>
          </ul>
        </div>
      </div>
    </BlogSection>
  );
};
