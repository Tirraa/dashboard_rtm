'use client';

import SitewideNavbar from '@/components/shared/navbar/SitewideNavbar';
import PROGRESSBAR_CONFIG from '@/config/progressbar';
import { DEFAULT_DARK_VARIANT } from '@/config/themes';
import I18nProvider from '@/contexts/I18nProvider';
import i18nTaxonomy from '@/taxonomies/i18n';
import initializeTheme from '@/themes/initializeTheme';
import { LayoutBaseProps } from '@/types/Next';
import { SessionProvider } from 'next-auth/react';
import { FunctionComponent, useLayoutEffect } from 'react';
import NextTopLoader from './NextTopLoader';

interface HtmlElementProps extends LayoutBaseProps {}

const PagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => {
  useLayoutEffect(() => initializeTheme(), []);

  const locale = params[i18nTaxonomy.LANG_FLAG];
  return (
    <html lang={locale} className={DEFAULT_DARK_VARIANT}>
      <body className="transition-all delay-300 duration-1000 flex flex-col min-h-screen w-full p-0 m-0 bg-slate-50 text-black dark:bg-slate-700 dark:text-white">
        <I18nProvider {...{ locale }}>
          <NextTopLoader {...PROGRESSBAR_CONFIG} />
          <SessionProvider>
            <SitewideNavbar />
            {children}
          </SessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
};

export default PagesHtmlElement;
