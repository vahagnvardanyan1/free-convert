import { Geist, Geist_Mono } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Root layout - delegates to locale-specific layout
export { viewport, metadata } from './[locale]/layout';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale().catch(() => 'en');

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="S18uHqVANxuK6blh-HlRI_xEzlrKZOv0_hsueZQKsB4" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
