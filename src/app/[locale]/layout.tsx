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
// import GoogleAnalytics from '@/components/GoogleAnalytics';

export const viewport = {
  themeColor: '#ffffff',
};

// Global metadata - icons are automatically handled by Next.js file convention
// See: /src/app/favicon.ico, /src/app/icon.png, /src/app/apple-icon.png
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
        {/* <GoogleAnalytics /> */}
      </ToastProvider>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
