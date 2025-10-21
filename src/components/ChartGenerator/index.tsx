/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useRef, useEffect } from 'react';
import { BarChart3, LineChart, PieChart, TrendingUp, Activity, Target, Download, Plus, Trash2, Eye, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../Card';
import { useTranslations } from 'next-intl';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler);

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'area' | 'radar';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

const DEFAULT_COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange
  '#06B6D4', // cyan
  '#84CC16', // lime
];

export function ChartGenerator() {
  const t = useTranslations('chartGenerator');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [chartTitle, setChartTitle] = useState('My Chart');
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { label: 'January', value: 65, color: DEFAULT_COLORS[0] },
    { label: 'February', value: 59, color: DEFAULT_COLORS[1] },
    { label: 'March', value: 80, color: DEFAULT_COLORS[2] },
    { label: 'April', value: 81, color: DEFAULT_COLORS[3] },
    { label: 'May', value: 56, color: DEFAULT_COLORS[4] },
  ]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  const addDataPoint = () => {
    const newIndex = dataPoints.length;
    setDataPoints([...dataPoints, { label: `Item ${newIndex + 1}`, value: 50, color: DEFAULT_COLORS[newIndex % DEFAULT_COLORS.length] }]);
  };

  const removeDataPoint = (index: number) => {
    if (dataPoints.length > 1) {
      setDataPoints(dataPoints.filter((_, i) => i !== index));
    }
  };

  const updateDataPoint = (index: number, field: keyof DataPoint, value: string | number) => {
    const updated = [...dataPoints];
    updated[index] = { ...updated[index], [field]: value };
    setDataPoints(updated);
  };

  const scrollToPreview = () => {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setShowScrollButton(false);
    }
  };

  const scrollToControls = () => {
    if (controlsRef.current) {
      controlsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setShowScrollButton(false);
        return;
      }

      if (previewRef.current && controlsRef.current) {
        const previewTop = previewRef.current.getBoundingClientRect().top;
        const controlsBottom = controlsRef.current.getBoundingClientRect().bottom;
        setShowScrollButton(previewTop > window.innerHeight && controlsBottom < window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Prepare chart data
  const chartData = {
    labels: dataPoints.map(point => point.label),
    datasets: [
      {
        label: chartTitle,
        data: dataPoints.map(point => point.value),
        backgroundColor:
          chartType === 'pie' || chartType === 'doughnut' || chartType === 'radar'
            ? dataPoints.map(point => point.color || DEFAULT_COLORS[0])
            : chartType === 'area'
              ? dataPoints.map(point => (point.color || DEFAULT_COLORS[0]) + '40')
              : dataPoints.map(point => point.color || DEFAULT_COLORS[0]),
        borderColor: chartType === 'line' || chartType === 'area' || chartType === 'radar' ? DEFAULT_COLORS[0] : dataPoints.map(point => point.color || DEFAULT_COLORS[0]),
        borderWidth: chartType === 'line' || chartType === 'area' ? 3 : 2,
        fill: chartType === 'area',
        tension: 0.4,
        pointBackgroundColor: dataPoints.map(point => point.color || DEFAULT_COLORS[0]),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: chartType === 'line' || chartType === 'area' ? 6 : 0,
        pointHoverRadius: chartType === 'line' || chartType === 'area' ? 8 : 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: chartType === 'pie' || chartType === 'doughnut',
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: 'system-ui, -apple-system, sans-serif',
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 18,
          weight: 'bold' as const,
          family: 'system-ui, -apple-system, sans-serif',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        cornerRadius: 8,
      },
    },
    scales:
      chartType !== 'pie' && chartType !== 'doughnut' && chartType !== 'radar'
        ? {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)',
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          }
        : chartType === 'radar'
          ? {
              r: {
                angleLines: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                pointLabels: {
                  font: {
                    size: 12,
                  },
                },
                ticks: {
                  backdropColor: 'transparent',
                },
              },
            }
          : undefined,
  };

  const downloadChart = (format: 'png' | 'svg') => {
    const chart = chartRef.current;
    if (!chart) return;

    const canvas = chart.canvas;
    if (!canvas) return;

    if (format === 'png') {
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${chartTitle.toLowerCase().replace(/\s+/g, '-')}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    } else if (format === 'svg') {
      // For SVG export, we'll create an SVG from the canvas
      const imageData = canvas.toDataURL('image/png');

      const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image width="${canvas.width}" height="${canvas.height}" xlink:href="${imageData}"/>
</svg>`;

      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${chartTitle.toLowerCase().replace(/\s+/g, '-')}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const chartTypes = [
    { type: 'bar' as ChartType, label: t('barChart'), icon: BarChart3, gradient: 'from-blue-500 to-blue-600' },
    { type: 'line' as ChartType, label: t('lineChart'), icon: LineChart, gradient: 'from-green-500 to-green-600' },
    { type: 'pie' as ChartType, label: t('pieChart'), icon: PieChart, gradient: 'from-purple-500 to-purple-600' },
    { type: 'doughnut' as ChartType, label: t('doughnutChart'), icon: Target, gradient: 'from-pink-500 to-pink-600' },
    { type: 'area' as ChartType, label: t('areaChart'), icon: TrendingUp, gradient: 'from-amber-500 to-amber-600' },
    { type: 'radar' as ChartType, label: t('radarChart'), icon: Activity, gradient: 'from-teal-500 to-teal-600' },
  ];

  const renderChart = () => {
    const commonProps = {
      ref: chartRef,
      data: chartData,
      options: chartOptions,
    };

    switch (chartType) {
      case 'bar':
        return <Bar {...commonProps} />;
      case 'line':
        return <Line {...commonProps} />;
      case 'pie':
        return <Pie {...commonProps} />;
      case 'doughnut':
        return <Doughnut {...commonProps} />;
      case 'area':
        return <Line {...commonProps} />;
      case 'radar':
        return <Radar {...commonProps} />;
      default:
        return <Bar {...commonProps} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-3 md:mb-4">
          <BarChart3 className="text-blue-600" size={28} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-2">{t('title')}</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">{t('description')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Left Column - Controls */}
        <div ref={controlsRef} className="space-y-4 sm:space-y-6">
          {/* Chart Type Selection */}
          <Card className="p-4 sm:p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2 sm:mr-3"></div>
              {t('selectChartType')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {chartTypes.map(({ type, label, icon: Icon, gradient }) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`group relative p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 min-h-[80px] sm:min-h-[100px] active:scale-95 ${
                    chartType === type
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-102 bg-white'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-lg sm:rounded-xl transition-opacity`}></div>
                  <Icon className={`mx-auto mb-2 sm:mb-3 transition-transform group-hover:scale-110 ${chartType === type ? 'text-blue-600' : 'text-gray-600'}`} size={24} />
                  <p className={`text-xs sm:text-sm font-semibold leading-tight ${chartType === type ? 'text-blue-700' : 'text-gray-700'}`}>{label}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Chart Settings */}
          <Card className="p-4 sm:p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2 sm:mr-3"></div>
              {t('chartSettings')}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('chartTitle')}</label>
                <input
                  type="text"
                  value={chartTitle}
                  onChange={e => setChartTitle(e.target.value)}
                  placeholder={t('enterChartTitle')}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </Card>

          {/* Data Points */}
          <Card className="p-4 sm:p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center flex-1 min-w-0">
                <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                <span className="truncate">{t('dataPoints')}</span>
              </h2>
              <Button
                onClick={addDataPoint}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              >
                <Plus size={14} className="sm:mr-1" />
                <span className="hidden sm:inline">{t('add')}</span>
              </Button>
            </div>
            <div className="space-y-2 sm:space-y-3 max-h-[50vh] sm:max-h-96 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
              {dataPoints.map((point, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg sm:rounded-xl hover:shadow-md transition-all border border-gray-200 overflow-hidden">
                  {/* Mobile Layout */}
                  <div className="sm:hidden p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-shrink-0">
                        <input
                          type="color"
                          value={point.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                          onChange={e => updateDataPoint(index, 'color', e.target.value)}
                          className="h-10 w-10 rounded-lg cursor-pointer border-2 border-white shadow-md active:scale-95 transition-transform"
                        />
                        <div className="absolute inset-0 rounded-lg border-2 border-gray-300 pointer-events-none"></div>
                      </div>
                      <input
                        type="text"
                        value={point.label}
                        onChange={e => updateDataPoint(index, 'label', e.target.value)}
                        placeholder={t('label')}
                        className="flex-1 px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      {dataPoints.length > 1 && (
                        <button onClick={() => removeDataPoint(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-95 flex-shrink-0" aria-label="Delete">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                    <input
                      type="number"
                      value={point.value}
                      onChange={e => updateDataPoint(index, 'value', parseFloat(e.target.value) || 0)}
                      placeholder={t('value')}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center space-x-3 p-4">
                    <div className="relative group flex-shrink-0">
                      <input
                        type="color"
                        value={point.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                        onChange={e => updateDataPoint(index, 'color', e.target.value)}
                        className="h-12 w-12 rounded-lg cursor-pointer border-2 border-white shadow-md hover:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 rounded-lg border-2 border-gray-300 pointer-events-none"></div>
                    </div>
                    <input
                      type="text"
                      value={point.label}
                      onChange={e => updateDataPoint(index, 'label', e.target.value)}
                      placeholder={t('label')}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    <input
                      type="number"
                      value={point.value}
                      onChange={e => updateDataPoint(index, 'value', parseFloat(e.target.value) || 0)}
                      placeholder={t('value')}
                      className="w-28 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    {dataPoints.length > 1 && (
                      <button onClick={() => removeDataPoint(index)} className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all hover:scale-110 flex-shrink-0" aria-label="Delete">
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Preview & Download */}
        <div ref={previewRef} className="space-y-4 sm:space-y-6">
          {/* Mobile Back to Edit Button */}
          <div className="lg:hidden">
            <Button onClick={scrollToControls} variant="outline" className="w-full border-2 hover:border-blue-500 active:scale-95 transition-transform" size="lg">
              <ChevronUp className="mr-2" size={18} />
              {t('backToEdit')}
            </Button>
          </div>

          {/* Preview Card */}
          <Card className="p-4 sm:p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2 sm:mr-3"></div>
              {t('preview')}
            </h2>
            <div className="bg-white rounded-lg sm:rounded-xl border-2 border-gray-200 p-3 sm:p-4 md:p-6 shadow-inner overflow-x-auto">
              <div className="min-w-[280px]">{renderChart()}</div>
            </div>
          </Card>

          {/* Download Card */}
          <Card className="p-4 sm:p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2 sm:mr-3"></div>
              {t('downloadChart')}
            </h2>
            <div className="space-y-2 sm:space-y-3">
              <Button
                onClick={() => downloadChart('png')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm sm:text-base py-2.5 sm:py-3"
                size="lg"
              >
                <Download className="mr-2" size={18} />
                {t('downloadPng')}
              </Button>
              <Button
                onClick={() => downloadChart('svg')}
                variant="outline"
                className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all active:scale-95 text-sm sm:text-base py-2.5 sm:py-3"
                size="lg"
              >
                <Download className="mr-2" size={18} />
                Download SVG
              </Button>
            </div>
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl border border-blue-200">
              <p className="text-xs sm:text-sm text-gray-600 text-center flex items-center justify-center flex-wrap">
                <span className="mr-2">🔒</span>
                <span>{t('chartGeneratedInfo')}</span>
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating "View Chart" Button for Mobile */}
      {showScrollButton && (
        <button
          onClick={scrollToPreview}
          className="lg:hidden fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 flex items-center space-x-2 animate-bounce active:scale-95"
          aria-label="View Chart"
        >
          <Eye size={18} />
          <span className="font-semibold text-sm sm:text-base">{t('viewChart')}</span>
        </button>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        @media (min-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }

        /* Better touch targets for mobile */
        @media (max-width: 640px) {
          input[type='color'] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            min-width: 40px;
            min-height: 40px;
          }
          input[type='color']::-webkit-color-swatch-wrapper {
            padding: 0;
          }
          input[type='color']::-webkit-color-swatch {
            border: none;
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
}
