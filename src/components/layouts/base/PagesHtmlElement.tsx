'use client';

import BODY_CLS from '@/components/config/styles/body';
import SitewideNavbar from '@/components/shared/navbar/SitewideNavbar';
import PROGRESSBAR_CONFIG from '@/config/progressbar';
import Providers from '@/contexts/Providers';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { FunctionComponent } from 'react';
import NextTopLoader from './NextTopLoader';

interface HtmlElementProps extends LayoutBaseProps {}

const PagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => {
  const locale = params[i18nTaxonomy.LANG_FLAG];
  const className = BODY_CLS;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body {...{ className }}>
        <Providers {...{ locale }}>
          <NextTopLoader {...PROGRESSBAR_CONFIG} />
          <SitewideNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default PagesHtmlElement;
