/* v8 ignore start */
// Stryker disable all
import type { LayoutBaseProps } from '@/types/Next';
import type { FunctionComponent } from 'react';

import BODY_CLS, { BODY_CONTAINER_CLS } from '@/components/config/styles/body';
import SitewideNavbar from '@/components/ui/navbar/SitewideNavbar';
import { HTML_STYLE } from '@/components/config/styles/html';
import { SpeedInsights } from '@vercel/speed-insights/next';
import PROGRESSBAR_CONFIG from '@/config/progressbar';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import Locale from 'intl-locale-textinfo-polyfill';
import ELEMENTS_ID from '@/config/elementsId';
import Providers from '@/contexts/Providers';
import { cn } from '@/lib/tailwind';
import { fInter } from '@/fonts';
import { fcn } from '@/lib/next';

import NextTopLoader from './NextTopLoader';

interface DocumentRootProps extends LayoutBaseProps {
  disableTopLoader?: boolean;
  withNavbar?: boolean;
}

const DocumentRoot: FunctionComponent<DocumentRootProps> = ({ disableTopLoader, withNavbar, children, params }) => {
  const language = params[I18nTaxonomy.LANGUAGE];
  const { direction: dir } = new Locale(language).textInfo;

  return (
    <html suppressHydrationWarning style={HTML_STYLE} lang={language} dir={dir}>
      <body className={cn(BODY_CLS, fcn(fInter))} style={{ scrollbarGutter: 'stable' }}>
        <div id={ELEMENTS_ID.BODY_CONTAINER} className={BODY_CONTAINER_CLS}>
          <Providers locale={language}>
            {!disableTopLoader && <NextTopLoader {...PROGRESSBAR_CONFIG} />}
            {withNavbar && <SitewideNavbar />}
            {children}
          </Providers>
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default DocumentRoot;
// Stryker restore all
/* v8 ignore stop */
