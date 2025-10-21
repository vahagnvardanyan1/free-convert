import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Server, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/Card';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SITE_URL } from '@/config/constants';
import { type Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.privacyPolicy' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy-policy`,
    },
  };
}

export default function PrivacyPolicyPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600">How we protect your data and privacy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Shield className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Privacy Matters</h2>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            At ImageConvertors, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your
            data when you use our image conversion services.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <Lock className="text-green-600 mr-2" size={20} />
              <span className="font-semibold text-green-800">100% Client-Side Processing</span>
            </div>
            <p className="text-green-700 text-sm mt-1">Your images are processed entirely in your browser. We never upload, store, or access your files.</p>
          </div>
        </Card>

        {/* Information We Collect */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Eye className="mr-2 text-blue-600" size={20} />
            Information We Collect
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Images and Files</h4>
              <p className="text-gray-700 leading-relaxed">
                <strong>What we collect:</strong> None. Your images are processed entirely within your browser using client-side JavaScript. We do not upload, store, transmit, or have access to any of
                your files.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Usage Analytics</h4>
              <p className="text-gray-700 leading-relaxed">
                <strong>What we collect:</strong> Basic website analytics including page views, browser type, device information, and general usage patterns. This data is anonymized and helps us
                improve our service.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Technical Information</h4>
              <p className="text-gray-700 leading-relaxed">
                <strong>What we collect:</strong> IP address, browser type, operating system, and referral URLs. This information is collected automatically and used for security and performance
                optimization.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4. Contact Information</h4>
              <p className="text-gray-700 leading-relaxed">
                <strong>What we collect:</strong> If you contact us directly, we may collect your name, email address, and the content of your message to respond to your inquiry.
              </p>
            </div>
          </div>
        </Card>

        {/* How We Use Information */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Server className="mr-2 text-blue-600" size={20} />
            How We Use Your Information
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Service Provision:</strong> To provide and maintain our image conversion services
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Improvement:</strong> To analyze usage patterns and improve our website and services
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Communication:</strong> To respond to your inquiries and provide customer support
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Security:</strong> To monitor for suspicious activity and protect against abuse
              </p>
            </div>
          </div>
        </Card>

        {/* Data Security */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Lock className="mr-2 text-blue-600" size={20} />
            Data Security
          </h3>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">We implement appropriate technical and organizational measures to protect your personal information:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Client-Side Processing</h4>
                <p className="text-blue-800 text-sm">All image conversions happen in your browser. Your files never leave your device.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">HTTPS Encryption</h4>
                <p className="text-blue-800 text-sm">All data transmission is encrypted using industry-standard SSL/TLS protocols.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">No File Storage</h4>
                <p className="text-blue-800 text-sm">We do not store, cache, or retain any of your uploaded images or converted files.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Regular Updates</h4>
                <p className="text-blue-800 text-sm">We regularly update our security measures and monitor for potential vulnerabilities.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Third-Party Services */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Third-Party Services</h3>

          <p className="text-gray-700 leading-relaxed mb-4">We may use third-party services to help us operate our website and analyze usage:</p>

          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900">Analytics Services</h4>
              <p className="text-gray-700 text-sm">We may use analytics services to understand how our website is used. These services may collect anonymized data about your visits.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900">Content Delivery Networks (CDN)</h4>
              <p className="text-gray-700 text-sm">We use CDNs to deliver our website content efficiently. These services may log basic request information.</p>
            </div>
          </div>
        </Card>

        {/* Your Rights */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Rights</h3>

          <p className="text-gray-700 leading-relaxed mb-4">You have the following rights regarding your personal information:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Access</h4>
              <p className="text-gray-700 text-sm">Request information about what data we have about you</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Correction</h4>
              <p className="text-gray-700 text-sm">Request correction of inaccurate personal information</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Deletion</h4>
              <p className="text-gray-700 text-sm">Request deletion of your personal information</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Portability</h4>
              <p className="text-gray-700 text-sm">Request a copy of your data in a portable format</p>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Mail className="mr-2 text-blue-600" size={20} />
            Contact Us
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="text-gray-600 mr-2" size={16} />
                <span className="font-medium text-gray-900">Email:</span>
                <a href="mailto:cropimage@gmail.com" className="text-blue-600 hover:text-blue-800 ml-2">
                  cropimage@gmail.com
                </a>
              </div>
              <div className="text-sm text-gray-600 ml-6">We will respond to your inquiry within 48 hours.</div>
            </div>
          </div>
        </Card>

        {/* Updates */}
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Policy Updates</h3>

          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on
            this page with a new &quot;Last Updated&quot; date. Your continued use of our service after such changes constitutes acceptance of the updated policy.
          </p>
        </Card>
      </div>
    </>
  );
}
