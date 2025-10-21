'use client';
import { useState, useRef } from 'react';
import { ArrowLeft, FileImage, Info, Camera, Palette, Zap, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card } from '@/components/Card';

interface ImageAnalysis {
  fileName: string;
  fileSize: number;
  fileSizeFormatted: string;
  dimensions: {
    width: number;
    height: number;
  };
  format: string;
  aspectRatio: string;
  colorDepth: string;
  hasTransparency: boolean;
  estimatedColors: number;
  compressionRatio?: number;
  quality?: string;
}

export function AnalyzePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getAspectRatio = (width: number, height: number): string => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  };

  const analyzeImage = async (file: File): Promise<ImageAnalysis> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        // Get image data for color analysis
        const imageData = ctx?.getImageData(0, 0, img.width, img.height);
        const data = imageData?.data;

        let hasTransparency = false;
        const colorSet = new Set<string>();

        if (data) {
          for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha < 255) hasTransparency = true;

            // Sample colors (every 10th pixel to avoid performance issues)
            if (i % 40 === 0) {
              const color = `${data[i]},${data[i + 1]},${data[i + 2]}`;
              colorSet.add(color);
            }
          }
        }

        const analysis: ImageAnalysis = {
          fileName: file.name,
          fileSize: file.size,
          fileSizeFormatted: formatFileSize(file.size),
          dimensions: {
            width: img.width,
            height: img.height,
          },
          format: file.type.split('/')[1].toUpperCase(),
          aspectRatio: getAspectRatio(img.width, img.height),
          colorDepth: hasTransparency ? '32-bit (RGBA)' : '24-bit (RGB)',
          hasTransparency,
          estimatedColors: Math.min(colorSet.size * 10, 16777216), // Estimate based on sample
          compressionRatio: file.size / (img.width * img.height * 4),
        };

        // Estimate quality based on compression ratio
        if (analysis.compressionRatio) {
          if (analysis.compressionRatio > 0.8) analysis.quality = 'Low compression (High quality)';
          else if (analysis.compressionRatio > 0.3) analysis.quality = 'Medium compression';
          else analysis.quality = 'High compression (Lower quality)';
        }

        resolve(analysis);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setSelectedFile(file);
    setError(null);
    setIsAnalyzing(true);

    try {
      const result = await analyzeImage(file);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const features = [
    {
      title: 'Image Properties',
      description: 'Get detailed information about image dimensions, format, and file size',
      icon: Info,
    },
    {
      title: 'Color Analysis',
      description: 'Analyze color depth, transparency, and estimated color count',
      icon: Palette,
    },
    {
      title: 'Quality Assessment',
      description: 'Evaluate compression ratio and image quality metrics',
      icon: Camera,
    },
    {
      title: 'Instant Results',
      description: 'Get comprehensive analysis results in seconds',
      icon: Zap,
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2" size={16} />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Image Analyzer</h1>
              <p className="text-gray-600">Analyze image properties, format, and quality</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analysis Tool */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Image to Analyze</h2>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <FileImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Drop your image here or click to browse</p>
                <p className="text-sm text-gray-500">Supports JPG, PNG, WebP, GIF and more formats</p>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0])} className="hidden" />
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              {selectedFile && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Selected Image</h3>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <FileImage className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-blue-600">Analyzing image...</span>
                  </div>
                </div>
              )}

              {analysis && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">File Name</p>
                        <p className="text-sm">{analysis.fileName}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Format</p>
                        <p className="text-sm">{analysis.format}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">File Size</p>
                        <p className="text-sm">{analysis.fileSizeFormatted}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Dimensions</p>
                        <p className="text-sm">
                          {analysis.dimensions.width} × {analysis.dimensions.height} pixels
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Aspect Ratio</p>
                        <p className="text-sm">{analysis.aspectRatio}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Color Depth</p>
                        <p className="text-sm">{analysis.colorDepth}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Transparency</p>
                        <p className="text-sm">{analysis.hasTransparency ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Estimated Colors</p>
                        <p className="text-sm">{analysis.estimatedColors.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  {analysis.quality && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">Quality Assessment</p>
                      <p className="text-sm text-blue-600">{analysis.quality}</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Features Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Analysis Features</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <feature.icon className="h-6 w-6 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Why Analyze Images?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• Optimize images for web performance</p>
                <p>• Verify image specifications</p>
                <p>• Check compression quality</p>
                <p>• Understand color properties</p>
                <p>• Validate transparency support</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
