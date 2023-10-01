'use client';

import SplashScreen from '@/components/shared/misc/SplashScreen';
import SitewideNavbar from '@/components/shared/navbar/SitewideNavbar';
import PROGRESSBAR_CONFIG from '@/config/progressbar';
import I18nProvider from '@/contexts/I18nProvider';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { SessionProvider } from 'next-auth/react';
import { FunctionComponent } from 'react';
import NextTopLoader from './NextTopLoader';

interface HtmlElementProps extends LayoutBaseProps {}

const HtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => {
  const locale = params[i18nTaxonomy.LANG_FLAG];
  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen w-full p-0 m-0">
        <I18nProvider {...{ locale }}>
          <SplashScreen />
          <NextTopLoader {...{ ...PROGRESSBAR_CONFIG }} />
          <SessionProvider>
            <SitewideNavbar />
            {children}
          </SessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
};

export default HtmlElement;
