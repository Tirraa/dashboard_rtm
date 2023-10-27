'use client';

import BODY_CLS from '@/components/config/styles/body';
import { HTML_STYLE } from '@/components/config/styles/html';
import SitewideNavbar from '@/components/shared/ui/navbar/SitewideNavbar';
import PROGRESSBAR_CONFIG from '@/config/progressbar';
import { DEFAULT_VARIANT } from '@/config/themes';
import Providers from '@/contexts/Providers';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { FunctionComponent } from 'react';
import NextTopLoader from './NextTopLoader';

interface HtmlElementProps extends LayoutBaseProps {}

const PagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => {
  const locale = params[i18nTaxonomy.LANG_FLAG];

  return (
    <html lang={locale} className={DEFAULT_VARIANT} style={HTML_STYLE} suppressHydrationWarning>
      <body className={BODY_CLS}>
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
