'use client';

import '@/app/globals.css';
import NextTopLoader from '@/components/misc/NextTopLoader';
import SplashScreen from '@/components/misc/SplashScreen';
import SitewideNavbar from '@/components/navbar/SitewideNavbar';
import { fallbackLocale } from '@/config/i18n';
import { ProgressbarConfig } from '@/config/progressbar';
import SessionProvider from '@/contexts/SessionProvider';
import { I18nProviderClient, useCurrentLocale } from '@/i18n/client';
import { LayoutMinimalProps } from '@/types/CustomUtilitaryTypes';

export default function RootLayout({ children }: LayoutMinimalProps) {
  return (
    <I18nProviderClient fallbackLocale={fallbackLocale}>
      <html lang={useCurrentLocale()}>
        <body className="flex flex-col h-screen w-full p-0 m-0">
          <SplashScreen />
          <NextTopLoader {...{ ...ProgressbarConfig.PROPS }} />
          <SessionProvider>
            <SitewideNavbar />
            {children}
          </SessionProvider>
        </body>
      </html>
    </I18nProviderClient>
  );
}
