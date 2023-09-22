'use client';

import '@/app/globals.css';
import NextTopLoader from '@/components/misc/NextTopLoader';

import SplashScreen from '@/components/misc/SplashScreen';
import SitewideNavbar from '@/components/navbar/SitewideNavbar';
import { fallbackLocale } from '@/config/i18n';
import { ProgressbarConfig } from '@/config/progressbar';
import { I18nProviderClient, useCurrentLocale } from '@/i18n/client';
import { LayoutBaseProps } from '@/types/Next';

interface RootLayoutProps extends LayoutBaseProps {}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <I18nProviderClient {...fallbackLocale}>
      <html lang={useCurrentLocale()}>
        <body className="flex flex-col h-screen w-full p-0 m-0">
          <SplashScreen />
          <NextTopLoader {...{ ...ProgressbarConfig.PROPS }} />
          <SitewideNavbar />
          {children}
        </body>
      </html>
    </I18nProviderClient>
  );
}
