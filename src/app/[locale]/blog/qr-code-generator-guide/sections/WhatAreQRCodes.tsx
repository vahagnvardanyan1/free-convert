import { QrCode, CheckCircle } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const WhatAreQRCodes = () => {
  return (
    <BlogSection title="What are QR Codes?" icon={QrCode} iconBgClass="bg-indigo-100" borderClass="border-l-4 border-indigo-500">
      <p className="text-gray-700 leading-relaxed mb-6">
        <strong>QR codes</strong> (Quick Response codes) are two-dimensional barcodes that can store various types of information like URLs, text, contact details, WiFi credentials, and more. They can
        be scanned with smartphone cameras to instantly access the encoded information.
      </p>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <CheckCircle className="mr-2 text-indigo-600" size={20} />
          Popular Use Cases:
        </h3>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="flex items-start bg-indigo-50 p-3 rounded-lg">
            <span className="mr-2 text-indigo-600">•</span>
            <span>Restaurant menus and contactless ordering</span>
          </li>
          <li className="flex items-start bg-indigo-50 p-3 rounded-lg">
            <span className="mr-2 text-indigo-600">•</span>
            <span>Business cards and networking</span>
          </li>
          <li className="flex items-start bg-indigo-50 p-3 rounded-lg">
            <span className="mr-2 text-indigo-600">•</span>
            <span>Event tickets and check-ins</span>
          </li>
          <li className="flex items-start bg-indigo-50 p-3 rounded-lg">
            <span className="mr-2 text-indigo-600">•</span>
            <span>Product packaging and marketing</span>
          </li>
          <li className="flex items-start bg-indigo-50 p-3 rounded-lg">
            <span className="mr-2 text-indigo-600">•</span>
            <span>WiFi password sharing</span>
          </li>
          <li className="flex items-start bg-indigo-50 p-3 rounded-lg">
            <span className="mr-2 text-indigo-600">•</span>
            <span>App downloads and promotions</span>
          </li>
        </ul>
      </div>
    </BlogSection>
  );
};
