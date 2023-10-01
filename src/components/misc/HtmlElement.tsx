'use client';

import PROGRESSBAR_CONFIG from '@/config/progressbar';
import I18nProvider from '@/contexts/I18nProvider';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { SessionProvider } from 'next-auth/react';
import { FunctionComponent } from 'react';
import SitewideNavbar from '../navbar/SitewideNavbar';
import NextTopLoader from './NextTopLoader';
import SplashScreen from './SplashScreen';

interface HtmlElementProps extends LayoutBaseProps {}

const HtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => (
  <html lang={params[i18nTaxonomy.LANG_FLAG]}>
    <body className="flex flex-col min-h-screen w-full p-0 m-0">
      <SplashScreen />
      <NextTopLoader {...{ ...PROGRESSBAR_CONFIG }} />
      <SessionProvider>
        <I18nProvider>
          <SitewideNavbar />
          {children}
        </I18nProvider>
      </SessionProvider>
    </body>
  </html>
);

export default HtmlElement;
