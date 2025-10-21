import { Crop, CheckCircle, Sparkles } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhatIsCropping = () => {
  return (
    <BlogSection title="What is Image Cropping?" icon={Crop} iconBgClass="bg-blue-100" borderClass="border-l-4 border-blue-500">
      <p className="text-gray-700 leading-relaxed mb-6">
        <strong>Image cropping</strong> is the process of removing unwanted outer areas from a photograph or image to improve framing, emphasize a subject, or fit specific dimensions. It&apos;s one of
        the most fundamental photo editing techniques used by photographers, designers, and content creators worldwide.
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
              <span>Social media posts (Instagram, Facebook, Twitter)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Profile pictures and avatars</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Website headers and banners</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Product photography</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Document photos and ID pictures</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Thumbnail images</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
            <Sparkles className="mr-2" size={20} />
            Key Benefits:
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Remove distractions and improve focus</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Fit platform-specific aspect ratios</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Reduce file size by removing unnecessary pixels</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Create better composition and visual balance</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Meet exact dimension requirements</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Professional-looking results instantly</span>
            </li>
          </ul>
        </div>
      </div>
    </BlogSection>
  );
};
