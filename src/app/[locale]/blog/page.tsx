import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  Image as ImageIcon,
  Smartphone,
  TrendingDown,
  FileText,
  Layers,
  Droplet,
  Palette,
  Blend,
  ArrowLeftRight,
  Type,
  Sparkles,
  Ruler,
  Scissors,
  Crop,
  Maximize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/Card';
import type { Metadata } from 'next';

import { SITE_URL } from '@/config/constants';
export const metadata: Metadata = {
  title: 'Blog - Image Conversion, Color & Font Tools Guides | ImageConvertors',
  description: 'Learn everything about image conversion, color tools, typography, and best practices. Guides for PNG, JPG, WebP, HEIC, PDF conversions, Google Fonts, color pickers, and design tools.',
  keywords: [
    'image conversion guides',
    'PNG to JPG guide',
    'image optimization',
    'web performance',
    'image converter tutorials',
    'file format guides',
    'font pairing guide',
    'typography scale',
    'Google Fonts preview',
    'color picker tool',
  ],
  alternates: {
    canonical: '${SITE_URL}/blog',
  },
  openGraph: {
    title: 'Blog - Image Conversion, Color & Font Tools Guides | ImageConvertors',
    description: 'Learn everything about image conversion, color tools, typography, and best practices. Comprehensive guides for designers and developers.',
    url: '${SITE_URL}/blog',
    siteName: 'ImageConvertors',
    type: 'website',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'ImageConvertors Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Image Conversion Guides & Tips',
    description: 'Learn everything about image conversion, optimization, and best practices.',
    images: ['/og-image.webp'],
  },
};

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  publishDate: string;
  readTime: string;
  category: string;
  icon: typeof ImageIcon;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    title: 'AI Image Generator Guide: Create Stunning Images from Text',
    description: 'Complete guide to generating AI images from text prompts. Learn how to create amazing artwork, photos, and designs using our free AI image generator with advanced models.',
    slug: 'ai-image-generator-guide',
    publishDate: '2025-01-15',
    readTime: '8 min read',
    category: 'AI Tools',
    icon: Sparkles,
    featured: true,
  },
  {
    title: 'Free QR Code Generator — Create Custom QR Codes Instantly',
    description: 'Learn how to create custom QR codes for URLs, WiFi, contacts, and more. Complete guide with best practices, use cases, and customization options. No signup required.',
    slug: 'qr-code-generator-guide',
    publishDate: '2025-10-09',
    readTime: '12 min read',
    category: 'Utilities',
    icon: ImageIcon,
    featured: true,
  },
  {
    title: 'Free Online Image Resizer — Resize & Scale Photos Perfectly',
    description: 'Complete guide to resizing images online for free. Learn professional techniques, optimal dimensions, and best practices for perfect image scaling. No signup required.',
    slug: 'resize-image-guide',
    publishDate: '2025-10-08',
    readTime: '11 min read',
    category: 'Image Editing',
    icon: Maximize2,
    featured: false,
  },
  {
    title: 'Free Online Image Cropper — Crop & Resize Photos Perfectly',
    description: 'Complete guide to cropping images online for free. Learn professional techniques, aspect ratios, and best practices for perfect image dimensions. No signup required.',
    slug: 'crop-image-guide',
    publishDate: '2025-10-08',
    readTime: '10 min read',
    category: 'Image Editing',
    icon: Crop,
    featured: true,
  },
  {
    title: 'The Ultimate Guide to Converting PNG to JPG Online',
    description: 'Learn everything about converting PNG images to JPG format without losing quality. Discover when to use each format, best practices, and step-by-step conversion methods.',
    slug: 'png-to-jpg-guide',
    publishDate: '2025-10-02',
    readTime: '8 min read',
    category: 'Image Conversion',
    icon: ImageIcon,
    featured: true,
  },
  {
    title: 'Convert JPG to WebP Online (Free & Fast)',
    description: 'Convert JPG images to modern WebP format for free. Reduce file sizes by up to 35%, speed up websites, and maintain image quality with our fast JPG to WebP converter.',
    slug: 'jpg-to-webp-guide',
    publishDate: '2025-10-02',
    readTime: '7 min read',
    category: 'Image Optimization',
    icon: TrendingDown,
  },
  {
    title: 'A Comprehensive Guide to Converting WEBP to PNG',
    description: 'Convert WEBP images to PNG online for free. Maintain quality, ensure compatibility, and preserve transparency. Learn benefits, steps, and best practices.',
    slug: 'webp-to-png-guide',
    publishDate: '2025-10-02',
    readTime: '8 min read',
    category: 'Image Conversion',
    icon: ImageIcon,
  },
  {
    title: 'Mastering PNG to WEBP Conversion: A Comprehensive Guide',
    description: 'Convert PNG to WEBP online for free. Reduce file size by 30%+, improve loading speed, and optimize images for the web with our comprehensive guide.',
    slug: 'png-to-webp-guide',
    publishDate: '2025-10-02',
    readTime: '8 min read',
    category: 'Image Optimization',
    icon: TrendingDown,
  },
  {
    title: 'How to Convert HEIC to JPG Online (Fast & Free)',
    description: 'Convert HEIC photos from iPhone to JPG quickly and securely. No signup required. Learn why HEIC format exists and how to convert it for universal compatibility.',
    slug: 'heic-to-jpg-guide',
    publishDate: '2025-10-02',
    readTime: '7 min read',
    category: 'Image Conversion',
    icon: Smartphone,
  },
  {
    title: 'The Ultimate Guide to Converting HEIC to WEBP',
    description: 'Convert HEIC images to WEBP online for free. Reduce file size, improve compatibility, and optimize for the web. Learn tools, benefits, and conversion steps.',
    slug: 'heic-to-webp-guide',
    publishDate: '2025-10-02',
    readTime: '9 min read',
    category: 'Image Conversion',
    icon: Smartphone,
  },
  {
    title: 'Convert PDF to JPG Online (Free & Fast)',
    description: 'Easily convert PDF documents to JPG images online. Fast, secure, and free PDF to JPG converter for presentations, websites, and social media.',
    slug: 'pdf-to-jpg-guide',
    publishDate: '2025-10-02',
    readTime: '6 min read',
    category: 'Document Conversion',
    icon: FileText,
  },
  {
    title: 'Unlocking the Power of Image Conversion: JPG to PDF Guide',
    description: 'Convert JPG images to PDF documents online for free. Comprehensive guide to batch conversion, file management, and creating professional PDF documents.',
    slug: 'jpg-to-pdf-guide',
    publishDate: '2025-10-02',
    readTime: '8 min read',
    category: 'Document Conversion',
    icon: FileText,
  },
  {
    title: 'Unlocking the Benefits of PNG to PDF Conversion',
    description: 'Convert PNG images to PDF documents online for free. Preserve quality, add security, and manage files easily with our comprehensive PNG to PDF guide.',
    slug: 'png-to-pdf-guide',
    publishDate: '2025-10-02',
    readTime: '9 min read',
    category: 'Document Conversion',
    icon: Layers,
  },
  {
    title: 'Best Way to Compress Images for the Web Without Losing Quality',
    description: 'Reduce image file size for faster websites and SEO. Learn about lossless and lossy compression, best formats for web (WebP, AVIF, JPG, PNG), and optimization techniques.',
    slug: 'compress-images-guide',
    publishDate: '2025-10-02',
    readTime: '9 min read',
    category: 'Image Optimization',
    icon: TrendingDown,
  },
  {
    title: 'The Ultimate Guide to Online Color Pickers',
    description: 'Pick colors instantly with our free online color picker. Get HEX, RGB, HSL, RGBA, and HSLA codes. Perfect for web designers, developers, and digital artists.',
    slug: 'color-picker-guide',
    publishDate: '2025-10-04',
    readTime: '7 min read',
    category: 'Color Tools',
    icon: Droplet,
    featured: false,
  },
  {
    title: 'The Ultimate Guide to Creating Perfect Color Palettes',
    description: 'Generate stunning color palettes online. Create complementary, analogous, and monochromatic color schemes. Save your palettes and browse curated collections.',
    slug: 'color-palette-guide',
    publishDate: '2025-10-04',
    readTime: '8 min read',
    category: 'Color Tools',
    icon: Palette,
  },
  {
    title: 'The Ultimate Guide to Creating CSS Gradients',
    description: 'Generate stunning CSS gradients online. Create linear and radial gradients with multiple colors. Get ready-to-use CSS code for beautiful web designs.',
    slug: 'gradient-generator-guide',
    publishDate: '2025-10-04',
    readTime: '8 min read',
    category: 'Color Tools',
    icon: Blend,
  },
  {
    title: 'The Ultimate Guide to Converting Color Codes',
    description: 'Convert colors between HEX, RGB, HSL, RGBA, HSLA, and HSV formats instantly. Free online color converter for designers and developers with accurate conversions.',
    slug: 'color-converter-guide',
    publishDate: '2025-10-04',
    readTime: '7 min read',
    category: 'Color Tools',
    icon: ArrowLeftRight,
  },
  {
    title: 'The Ultimate Guide to Previewing Google Fonts Online',
    description: 'Preview Google Fonts instantly with our free online font playground. Test typography, compare fonts, adjust sizes & weights. Perfect for web designers and developers.',
    slug: 'font-preview-guide',
    publishDate: '2025-10-05',
    readTime: '9 min read',
    category: 'Font Tools',
    icon: Type,
  },
  {
    title: 'The Ultimate Guide to Google Font Pairings',
    description: 'Discover perfect Google Font pairings for your projects. Browse curated font combinations for headings and body text. Create beautiful, harmonious typography.',
    slug: 'font-pairing-guide',
    publishDate: '2025-10-05',
    readTime: '10 min read',
    category: 'Font Tools',
    icon: Sparkles,
  },
  {
    title: 'The Ultimate Guide to Typographic Scales',
    description: 'Generate harmonious typographic scales using musical ratios. Create perfect font size hierarchies for your design system with our free CSS typography scale tool.',
    slug: 'typographic-scale-guide',
    publishDate: '2025-10-05',
    readTime: '11 min read',
    category: 'Font Tools',
    icon: Ruler,
  },
  {
    title: 'Free AI Background Remover — Remove Backgrounds Online Instantly',
    description:
      'Free AI-powered background remover. Remove backgrounds from images online instantly. No signup, unlimited use. Perfect for products, portraits & e-commerce. Professional results in seconds.',
    slug: 'remove-background-guide',
    publishDate: '2025-10-06',
    readTime: '9 min read',
    category: 'Image Tools',
    icon: Scissors,
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/">
            <Button variant="outline" className="mb-6 bg-white text-blue-600 hover:bg-gray-100 border-none">
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Button>
          </Link>
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">ImageConvertors Blog</h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Guides, tutorials, and tips for image conversion, color tools, typography, and design best practices. Everything you need for professional web design.
              </p>
            </div>
            <div className="relative w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-3xl border border-blue-300/40 bg-white/10 backdrop-blur-sm shadow-2xl">
              <Image
                src="/png-jpg-webp-pdf-convertors.webp"
                alt="Illustrations of PNG, JPG, WebP, and PDF conversion tools"
                width={1536}
                height={1024}
                className="w-full h-auto"
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-lg text-sm font-semibold mr-3">Featured</span>
              Latest Article
            </h2>
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                    <featuredPost.icon className="text-white" size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{featuredPost.category}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">{featuredPost.title}</h3>
                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">{featuredPost.description}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Calendar size={16} className="mr-2" />
                      <span>{new Date(featuredPost.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span className="mx-3">•</span>
                      <Clock size={16} className="mr-2" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <div className="flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                      Read Full Article
                      <ArrowRight className="ml-2" size={18} />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* All Posts Grid */}
        {regularPosts.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map(post => {
                const Icon = post.icon;
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                        <Icon className="text-white" size={24} />
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block w-fit">{post.category}</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">{post.title}</h3>
                      <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{post.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar size={14} className="mr-1" />
                        <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="mx-2">•</span>
                        <Clock size={14} className="mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        Read More
                        <ArrowRight className="ml-2" size={16} />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Coming Soon Section */}
        <div className="mt-12">
          <Card className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">More Articles Coming Soon!</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              We&apos;re constantly creating new content about image conversion, optimization techniques, typography, color tools, and design best practices. Check back soon for more guides and
              tutorials.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">Advanced Typography Tips</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">WebP vs PNG Comparison</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">Color Theory for Web Design</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">Batch Image Processing</span>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Convert Your Images?</h2>
          <p className="text-xl mb-6 text-blue-100">Try our free online converter now. Fast, secure, and no sign-up required!</p>
          <Link href="/">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Start Converting Now →
            </Button>
          </Link>
        </Card>
      </div>
    </>
  );
}
