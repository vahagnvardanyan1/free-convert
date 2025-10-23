'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

const GA_MEASUREMENT_ID = 'G-PK5E4KQX15';

const Analytics = () => {
  const pathname = usePathname();
  useEffect(() => {
    window.gtag?.('event', 'page_view', { page_path: pathname });
  }, [pathname]);
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
};

export default Analytics;
