import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Root layout - delegates to locale-specific layout
export { viewport } from './[locale]/layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <Head>
        <meta name="google-site-verification" content="S18uHqVANxuK6blh-HlRI_xEzlrKZOv0_hsueZQKsB4" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
