import Link from 'next/link';
import { ArrowLeft, Cookie, Settings, Eye, Shield, Mail } from 'lucide-react';
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
  const t = await getTranslations({ locale, namespace: 'metadata.cookiePolicy' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/cookie-policy`,
    },
  };
}

export default function CookiePolicyPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Cookie Policy</h1>
              <p className="text-gray-600">How we use cookies and similar technologies</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
              <Cookie className="text-orange-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Cookie Policy</h2>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            This Cookie Policy explains how ImageConvertors uses cookies and similar technologies when you visit our website. It explains what these technologies are, why we use them, and your rights
            to control our use of them.
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center">
              <Cookie className="text-orange-600 mr-2" size={20} />
              <span className="font-semibold text-orange-800">Minimal Cookie Usage</span>
            </div>
            <p className="text-orange-700 text-sm mt-1">We use minimal cookies and prioritize your privacy. Most of our functionality works without cookies.</p>
          </div>
        </Card>

        {/* What Are Cookies */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What Are Cookies?</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit a website. They are widely used to make websites work more efficiently and provide
            information to website owners.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">First-Party Cookies</h4>
              <p className="text-blue-800 text-sm">Cookies set directly by our website. These help us provide basic functionality and remember your preferences.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Third-Party Cookies</h4>
              <p className="text-purple-800 text-sm">Cookies set by external services we use, such as analytics providers or content delivery networks.</p>
            </div>
          </div>
        </Card>

        {/* Types of Cookies We Use */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h3>

          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center mb-2">
                <Shield className="text-green-600 mr-2" size={16} />
                <h4 className="font-semibold text-gray-900">Essential Cookies (Always Active)</h4>
              </div>
              <p className="text-gray-700 text-sm mb-2">These cookies are necessary for our website to function properly. They cannot be disabled.</p>
              <div className="bg-green-50 p-3 rounded">
                <div className="text-sm">
                  <div className="font-medium text-green-800">Purpose:</div>
                  <ul className="text-green-700 mt-1 space-y-1">
                    <li>• Basic website functionality</li>
                    <li>• Security features</li>
                    <li>• Load balancing</li>
                  </ul>
                  <div className="font-medium text-green-800 mt-2">Duration:</div>
                  <p className="text-green-700">Session cookies (deleted when you close your browser)</p>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center mb-2">
                <Eye className="text-blue-600 mr-2" size={16} />
                <h4 className="font-semibold text-gray-900">Analytics Cookies (Optional)</h4>
              </div>
              <p className="text-gray-700 text-sm mb-2">These cookies help us understand how visitors interact with our website by collecting anonymous information.</p>
              <div className="bg-blue-50 p-3 rounded">
                <div className="text-sm">
                  <div className="font-medium text-blue-800">Purpose:</div>
                  <ul className="text-blue-700 mt-1 space-y-1">
                    <li>• Website usage statistics</li>
                    <li>• Performance monitoring</li>
                    <li>• Error tracking</li>
                    <li>• User experience improvement</li>
                  </ul>
                  <div className="font-medium text-blue-800 mt-2">Duration:</div>
                  <p className="text-blue-700">Up to 2 years</p>
                  <div className="font-medium text-blue-800 mt-2">Third Parties:</div>
                  <p className="text-blue-700">Google Analytics (if enabled)</p>
                </div>
              </div>
            </div>

            {/* Preference Cookies */}
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-center mb-2">
                <Settings className="text-purple-600 mr-2" size={16} />
                <h4 className="font-semibold text-gray-900">Preference Cookies (Optional)</h4>
              </div>
              <p className="text-gray-700 text-sm mb-2">These cookies remember your preferences and settings to provide a personalized experience.</p>
              <div className="bg-purple-50 p-3 rounded">
                <div className="text-sm">
                  <div className="font-medium text-purple-800">Purpose:</div>
                  <ul className="text-purple-700 mt-1 space-y-1">
                    <li>• Language preferences</li>
                    <li>• Theme settings</li>
                    <li>• Quality preferences</li>
                    <li>• Cookie consent choices</li>
                  </ul>
                  <div className="font-medium text-purple-800 mt-2">Duration:</div>
                  <p className="text-purple-700">Up to 1 year</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* How We Use Cookies */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How We Use Cookies</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Functionality</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Remember your conversion preferences</li>
                  <li>• Maintain session state</li>
                  <li>• Provide consistent user experience</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Analytics</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Track popular conversion formats</li>
                  <li>• Monitor website performance</li>
                  <li>• Identify technical issues</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Security</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Prevent abuse and spam</li>
                  <li>• Maintain secure connections</li>
                  <li>• Detect suspicious activity</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Optimization</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Improve loading times</li>
                  <li>• Optimize content delivery</li>
                  <li>• Enhance user interface</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Third-Party Services */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Third-Party Services</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            We may use third-party services that set their own cookies. We do not control these cookies, and you should check the relevant third party&apos;s cookie policy for more information.
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Google Analytics (Optional)</h4>
              <p className="text-gray-700 text-sm mb-2">We may use Google Analytics to understand how visitors use our website.</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">Purpose: Website analytics</span>
                <span className="text-gray-600">Duration: Up to 2 years</span>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy →
                </a>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Content Delivery Network (CDN)</h4>
              <p className="text-gray-700 text-sm mb-2">We use CDN services to deliver our website content efficiently.</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">Purpose: Performance optimization</span>
                <span className="text-gray-600">Duration: Session only</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Your Cookie Choices */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Cookie Choices</h3>

          <p className="text-gray-700 leading-relaxed mb-4">You have several options for managing cookies on our website:</p>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Browser Settings</h4>
              <p className="text-blue-800 text-sm mb-3">Most web browsers allow you to control cookies through their settings preferences.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-blue-900">Chrome:</div>
                  <p className="text-blue-700">Settings → Privacy and Security → Cookies</p>
                </div>
                <div>
                  <div className="font-medium text-blue-900">Firefox:</div>
                  <p className="text-blue-700">Options → Privacy & Security → Cookies</p>
                </div>
                <div>
                  <div className="font-medium text-blue-900">Safari:</div>
                  <p className="text-blue-700">Preferences → Privacy → Cookies</p>
                </div>
                <div>
                  <div className="font-medium text-blue-900">Edge:</div>
                  <p className="text-blue-700">Settings → Cookies and Site Permissions</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Opt-Out Options</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-green-800">Block all non-essential cookies in your browser</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-green-800">Use private/incognito browsing mode</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-green-800">
                    Opt out of Google Analytics:
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">
                      Opt-out tool →
                    </a>
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-green-800">Clear existing cookies from your browser</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Impact of Disabling Cookies</h4>
              <p className="text-yellow-800 text-sm">
                <strong>Good news:</strong> Our core image conversion functionality works without cookies! However, disabling cookies may affect:
              </p>
              <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                <li>• Remembering your conversion preferences</li>
                <li>• Website performance optimization</li>
                <li>• Our ability to improve the service</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Cookie Consent */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Cookie Consent</h3>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">We believe in transparent cookie practices. Here&apos;s how we handle consent:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Essential Cookies</h4>
                <p className="text-green-800 text-sm">These are automatically enabled as they&apos;re necessary for the website to function. No consent required.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Optional Cookies</h4>
                <p className="text-blue-800 text-sm">We&apos;ll ask for your consent before enabling analytics or preference cookies. You can change your mind anytime.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Managing Your Preferences</h4>
              <p className="text-gray-700 text-sm">You can update your cookie preferences at any time by:</p>
              <ul className="text-gray-700 text-sm mt-2 space-y-1">
                <li>• Using the cookie settings in your browser</li>
                <li>• Clearing your browser&apos;s cookies and local storage</li>
                <li>• Contacting us directly for assistance</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Updates to This Policy */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Updates to This Policy</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
          </p>

          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <p className="text-gray-700 text-sm">Posting the updated policy on this page</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <p className="text-gray-700 text-sm">Updating the &quot;Last Updated&quot; date</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <p className="text-gray-700 text-sm">Providing notice through our website or email (if applicable)</p>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Mail className="mr-2 text-blue-600" size={20} />
            Contact Us About Cookies
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">If you have questions about our use of cookies or this Cookie Policy, please contact us:</p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="text-gray-600 mr-2" size={16} />
                <span className="font-medium text-gray-900">Email:</span>
                <a href="mailto:cropimage@gmail.com" className="text-blue-600 hover:text-blue-800 ml-2">
                  cropimage@gmail.com
                </a>
              </div>
              <div className="text-sm text-gray-600 ml-6">Please include &quot;Cookie Policy&quot; in your subject line for faster response.</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Related Policies</h4>
            <div className="space-y-1">
              <div>
                <Link href="/privacy-policy" className="text-orange-700 hover:text-orange-900 text-sm underline hover:no-underline">
                  Privacy Policy - Learn about our data practices
                </Link>
              </div>
              <div>
                <Link href="/terms-of-service" className="text-orange-700 hover:text-orange-900 text-sm underline hover:no-underline">
                  Terms of Service - Read our terms and conditions
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
