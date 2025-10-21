'use client';
import { useState, useEffect } from 'react';
import { Cookie, X, Settings, Shield, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      preferences: true,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    const selectedPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('cookie-consent', JSON.stringify(selectedPreferences));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      preferences: false,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('cookie-consent', JSON.stringify(essentialOnly));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled

    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md">
      <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <Cookie className="text-orange-600" size={18} />
              </div>
              <div className="text-sm text-gray-700 leading-relaxed">
                <h3 className="text-base font-semibold text-gray-900">Cookie preferences</h3>
                <p className="mt-1 text-xs text-gray-600">
                  We use cookies to improve ImageConverter. Processing stays <strong>100% on your device</strong>. Pick what you&apos;re okay with:
                </p>
              </div>
            </div>
            <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close cookie consent">
              <X size={18} />
            </button>
          </div>

          {showDetails && (
            <div className="mt-4 space-y-3">
              <div className="border border-green-200 rounded-lg p-3 bg-green-50">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Shield className="text-green-600" size={16} />
                    <span className="font-medium text-green-900 text-sm">Essential cookies</span>
                    <span className="text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded-full uppercase tracking-wide">Required</span>
                  </div>
                  <div className="w-8 h-5 bg-green-500 rounded-full flex items-center justify-end pr-0.5">
                    <div className="w-3.5 h-3.5 bg-white rounded-full" />
                  </div>
                </div>
                <p className="text-green-800 text-xs leading-relaxed">Keep the site secure and working. Always on.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Eye className="text-blue-600" size={16} />
                    <span className="font-medium text-sm text-gray-900">Analytics cookies</span>
                    <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wide">Optional</span>
                  </div>
                  <button
                    onClick={() => togglePreference('analytics')}
                    className={`w-9 h-5 rounded-full flex items-center transition-colors ${preferences.analytics ? 'bg-blue-500 justify-end pr-0.5' : 'bg-gray-300 justify-start pl-0.5'}`}
                  >
                    <div className="w-3.5 h-3.5 bg-white rounded-full" />
                  </button>
                </div>
                <p className="text-gray-700 text-xs leading-relaxed">Help us learn which tools people use so we can improve.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Settings className="text-purple-600" size={16} />
                    <span className="font-medium text-sm text-gray-900">Preference cookies</span>
                    <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wide">Optional</span>
                  </div>
                  <button
                    onClick={() => togglePreference('preferences')}
                    className={`w-9 h-5 rounded-full flex items-center transition-colors ${preferences.preferences ? 'bg-purple-500 justify-end pr-0.5' : 'bg-gray-300 justify-start pl-0.5'}`}
                  >
                    <div className="w-3.5 h-3.5 bg-white rounded-full" />
                  </button>
                </div>
                <p className="text-gray-700 text-xs leading-relaxed">Remember layout, quality, and theme choices for next time.</p>
              </div>
            </div>
          )}

          <button onClick={() => setShowDetails(!showDetails)} className="mt-4 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors">
            {showDetails ? 'Hide details' : 'Customize settings'}
          </button>

          <div className="mt-4 flex flex-col gap-2">
            <Button onClick={handleAcceptAll} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 text-sm font-medium">
              Accept all cookies
            </Button>

            {showDetails && (
              <Button onClick={handleAcceptSelected} variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 py-2 text-sm font-medium">
                Save my preferences
              </Button>
            )}

            <Button onClick={handleRejectAll} variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-2 text-sm font-medium">
              Essential only
            </Button>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-3 text-[11px] text-gray-500">
              <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/cookie-policy" className="hover:text-blue-600 transition-colors">
                Cookie Policy
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/terms-of-use" className="hover:text-blue-600 transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
