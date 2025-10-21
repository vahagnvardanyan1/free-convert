import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { SITE_URL } from '@/config/constants';
import { locales } from '@/i18n/config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { StructuredData } from '@/components/StructuredData';
import { ToastProvider } from '@/components/ui/toast';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const viewport = {
  themeColor: '#ffffff',
};

// Global metadata including favicon configuration
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'icon',
        url: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  },
};

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

const LocaleLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Load messages for the locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ToastProvider>
        <Header />
        <StructuredData />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </ToastProvider>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
