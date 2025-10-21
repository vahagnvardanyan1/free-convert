import Link from 'next/link';
import { ArrowLeft, Scale, AlertTriangle, CheckCircle, XCircle, Mail } from 'lucide-react';
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
  const t = await getTranslations({ locale, namespace: 'metadata.termsOfUse' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/terms-of-use`,
    },
  };
}

export default function TermsOfServicePage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600">Rules and guidelines for using our service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Scale className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
              <p className="text-gray-600">Effective Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to ImageConvertors! These Terms of Service (&quot;Terms&quot;) govern your use of our website and image conversion services. By accessing or using our service, you agree to be
            bound by Terms.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="text-yellow-600 mr-2" size={20} />
              <span className="font-semibold text-yellow-800">Important Notice</span>
            </div>
            <p className="text-yellow-700 text-sm mt-1">Please read these Terms carefully. By using our service, you agree to these terms and conditions.</p>
          </div>
        </Card>

        {/* Acceptance of Terms */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing, browsing, or using the ImageConvertors website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If
            you do not agree to these Terms, you must not use our service.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-blue-800 text-sm">
              <strong>Age Requirement:</strong> You must be at least 13 years old to use our service. If you are under 18, you must have parental or guardian consent.
            </p>
          </div>
        </Card>

        {/* Description of Service */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">2. Description of Service</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            ImageConvertors provides a free, browser-based image format conversion service that allows users to convert images between various formats including PNG, JPG, WebP, and GIF.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={16} />
              <div>
                <h4 className="font-semibold text-gray-900">What We Provide</h4>
                <ul className="text-gray-700 text-sm mt-1 space-y-1">
                  <li>• Free image format conversion</li>
                  <li>• Client-side processing</li>
                  <li>• Multiple format support</li>
                  <li>• Quality adjustment options</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <XCircle className="text-red-600 mt-1 flex-shrink-0" size={16} />
              <div>
                <h4 className="font-semibold text-gray-900">What We Don&apos;t Provide</h4>
                <ul className="text-gray-700 text-sm mt-1 space-y-1">
                  <li>• File storage or hosting</li>
                  <li>• Guaranteed uptime</li>
                  <li>• Technical support</li>
                  <li>• Advanced editing features</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* User Responsibilities */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">3. User Responsibilities</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3.1 Acceptable Use</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                You agree to use our service only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use complies with all applicable laws and
                regulations.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3.2 Content Responsibility</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                You are solely responsible for the images you upload and convert. You must own the rights to the images or have proper authorization to use them.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3.3 Prohibited Content</h4>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm mb-2">You must not upload or convert images that contain:</p>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Copyrighted material without permission</li>
                  <li>• Illegal, harmful, or offensive content</li>
                  <li>• Personal information of others without consent</li>
                  <li>• Malware, viruses, or malicious code</li>
                  <li>• Content that violates any laws or regulations</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Service Availability */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">4. Service Availability</h3>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We strive to maintain high availability of our service, but we do not guarantee uninterrupted access. Our service may be temporarily unavailable due to:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Planned Maintenance</h4>
                <p className="text-gray-700 text-sm">Scheduled updates and improvements to our service</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Technical Issues</h4>
                <p className="text-gray-700 text-sm">Server problems, network issues, or other technical difficulties</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Force Majeure</h4>
                <p className="text-gray-700 text-sm">Events beyond our control such as natural disasters</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Security Measures</h4>
                <p className="text-gray-700 text-sm">Temporary shutdowns for security updates or threat mitigation</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Intellectual Property */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">5. Intellectual Property</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">5.1 Our Rights</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                All content, features, and functionality of our website and service, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by
                ImageConvertors or its licensors and are protected by copyright and other intellectual property laws.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">5.2 Your Rights</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                You retain all rights to the images you upload and convert using our service. We do not claim ownership of your content and do not store or retain your images after processing.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">5.3 License to Use</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to use our service for personal or commercial purposes, subject to these Terms.
              </p>
            </div>
          </div>
        </Card>

        {/* Privacy and Data */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">6. Privacy and Data</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            Your privacy is important to us. Our data practices are governed by our Privacy Policy, which is incorporated into these Terms by reference.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Key Privacy Features:</h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Client-side processing - your images never leave your device</li>
              <li>• No file storage or retention</li>
              <li>• Minimal data collection</li>
              <li>• Transparent data practices</li>
            </ul>
            <p className="text-green-700 text-sm mt-2">
              <Link href="/privacy-policy" className="underline hover:no-underline">
                Read our full Privacy Policy →
              </Link>
            </p>
          </div>
        </Card>

        {/* Disclaimers */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">7. Disclaimers</h3>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm font-semibold mb-2">IMPORTANT: PLEASE READ THIS SECTION CAREFULLY</p>
            <p className="text-yellow-700 text-sm">Our service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.</p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">7.1 No Warranties</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We make no warranties, express or implied, regarding the accuracy, reliability, or availability of our service. We do not warrant that the service will be error-free or uninterrupted.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">7.2 Quality Disclaimer</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                While we strive to provide high-quality image conversions, we cannot guarantee the quality or accuracy of converted images. Results may vary depending on the original image and
                conversion settings.
              </p>
            </div>
          </div>
        </Card>

        {/* Limitation of Liability */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            To the maximum extent permitted by law, ImageConvertors and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including but not limited to:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="text-gray-700 text-sm space-y-1">
              <li>• Loss of profits or revenue</li>
              <li>• Loss of data or content</li>
              <li>• Business interruption</li>
              <li>• Loss of goodwill</li>
            </ul>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>• Cost of substitute services</li>
              <li>• Personal injury</li>
              <li>• Property damage</li>
              <li>• Any other damages</li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <p className="text-red-800 text-sm">
              <strong>Maximum Liability:</strong> In no event shall our total liability exceed the amount you paid for using our service (which is $0 for our free service).
            </p>
          </div>
        </Card>

        {/* Termination */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">9. Termination</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">9.1 Termination by You</h4>
              <p className="text-gray-700 text-sm leading-relaxed">You may stop using our service at any time. No formal termination process is required.</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">9.2 Termination by Us</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We reserve the right to suspend or terminate your access to our service at any time, with or without notice, for any reason, including violation of these Terms.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">9.3 Effect of Termination</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Upon termination, your right to use our service will cease immediately. Provisions that by their nature should survive termination will remain in effect.
              </p>
            </div>
          </div>
        </Card>

        {/* Changes to Terms */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">10. Changes to Terms</h3>

          <p className="text-gray-700 leading-relaxed mb-4">We reserve the right to modify these Terms at any time. We will notify users of material changes by:</p>

          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <p className="text-gray-700 text-sm">Posting the updated Terms on this page</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <p className="text-gray-700 text-sm">Updating the &quot;Effective Date&quot; at the top of this page</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <p className="text-gray-700 text-sm">Providing reasonable advance notice for significant changes</p>
            </div>
          </div>

          <p className="text-gray-700 text-sm mt-4">Your continued use of our service after changes become effective constitutes acceptance of the new Terms.</p>
        </Card>

        {/* Contact Information */}
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Mail className="mr-2 text-blue-600" size={20} />
            Contact Information
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">If you have questions about these Terms of Service, please contact us:</p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="text-gray-600 mr-2" size={16} />
                <span className="font-medium text-gray-900">Email:</span>
                <a href="mailto:cropimage@gmail.com" className="text-blue-600 hover:text-blue-800 ml-2">
                  cropimage@gmail.com
                </a>
              </div>
              <div className="text-sm text-gray-600 ml-6">Please include &quot;Terms of Service&quot; in your subject line for faster response.</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Legal Jurisdiction:</strong> These Terms are governed by and construed in accordance with applicable laws. Any disputes will be resolved through binding arbitration or in courts
              of competent jurisdiction.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
