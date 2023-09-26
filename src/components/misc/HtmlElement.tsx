'use client';

import PROGRESSBAR_CONFIG from '@/config/progressbar';
import { useCurrentLocale } from '@/i18n/client';
import { LayoutMinimalProps } from '@/types/CustomUtilitaryTypes';
import { SessionProvider } from 'next-auth/react';
import { FunctionComponent } from 'react';
import SitewideNavbar from '../navbar/SitewideNavbar';
import NextTopLoader from './NextTopLoader';
import SplashScreen from './SplashScreen';

interface HtmlElementProps extends LayoutMinimalProps {}

const HtmlElement: FunctionComponent<HtmlElementProps> = ({ children }) => (
  <html lang={useCurrentLocale()}>
    <body className="flex flex-col min-h-screen w-full p-0 m-0">
      <SplashScreen />
      <NextTopLoader {...{ ...PROGRESSBAR_CONFIG }} />
      <SessionProvider>
        <SitewideNavbar />
        {children}
      </SessionProvider>
    </body>
  </html>
);

export default HtmlElement;
