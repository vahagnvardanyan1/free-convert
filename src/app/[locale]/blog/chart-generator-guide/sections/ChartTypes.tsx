import { BarChart3, PieChart, LineChart } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const ChartTypes = () => {
  return (
    <BlogSection title="Chart Types" icon={BarChart3} iconBgClass="bg-teal-100" borderClass="border-l-4 border-teal-500">
      <div className="space-y-4">
        <div className="bg-teal-50 p-4 rounded-lg">
          <h3 className="font-semibold text-teal-900 mb-2 flex items-center">
            <BarChart3 className="mr-2" size={20} />
            Bar Charts
          </h3>
          <p className="text-teal-800 text-sm">Perfect for comparing values across categories.</p>
        </div>
        <div className="bg-teal-50 p-4 rounded-lg">
          <h3 className="font-semibold text-teal-900 mb-2 flex items-center">
            <LineChart className="mr-2" size={20} />
            Line Charts
          </h3>
          <p className="text-teal-800 text-sm">Ideal for showing trends over time.</p>
        </div>
        <div className="bg-teal-50 p-4 rounded-lg">
          <h3 className="font-semibold text-teal-900 mb-2 flex items-center">
            <PieChart className="mr-2" size={20} />
            Pie Charts
          </h3>
          <p className="text-teal-800 text-sm">Great for showing proportions and percentages.</p>
        </div>
      </div>
    </BlogSection>
  );
};
