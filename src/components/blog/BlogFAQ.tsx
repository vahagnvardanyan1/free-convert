'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

import { Card } from '@/components/Card';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface BlogFAQProps {
  title?: string;
  faqs: FAQItem[];
}

export const BlogFAQ = ({ title = 'Frequently Asked Questions', faqs }: BlogFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Card className="p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
          <HelpCircle className="text-blue-600" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-semibold text-gray-900">{faq.question}</span>
              <ChevronDown className={`text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} size={20} />
            </button>
            {openIndex === index && <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">{typeof faq.answer === 'string' ? <p className="text-gray-700">{faq.answer}</p> : faq.answer}</div>}
          </div>
        ))}
      </div>
    </Card>
  );
};
