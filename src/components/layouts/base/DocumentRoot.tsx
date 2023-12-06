import I18nTaxonomy from '##/config/taxonomies/i18n';
import BODY_CLS, { BODY_CONTAINER_CLS } from '@/components/config/styles/body';
import { HTML_STYLE } from '@/components/config/styles/html';
import SitewideNavbar from '@/components/ui/navbar/SitewideNavbar';
import ELEMENTS_ID from '@/config/elementsId';
import PROGRESSBAR_CONFIG from '@/config/progressbar';
import Providers from '@/contexts/Providers';
import { fInter } from '@/fonts';
import { fcn } from '@/lib/next';
import { cn } from '@/lib/tailwind';
import type { LayoutBaseProps } from '@/types/Next';
import Locale from 'intl-locale-textinfo-polyfill';
import type { FunctionComponent } from 'react';
import NextTopLoader from './NextTopLoader';

interface DocumentRootProps extends LayoutBaseProps {
  withNavbar?: boolean;
  disableTopLoader?: boolean;
}

const DocumentRoot: FunctionComponent<DocumentRootProps> = ({ children, params, withNavbar, disableTopLoader }) => {
  const language = params[I18nTaxonomy.LANGUAGE];
  const { direction: dir } = new Locale(language).textInfo;

  return (
    <html lang={language} style={HTML_STYLE} dir={dir} suppressHydrationWarning>
      <body className={cn(BODY_CLS, fcn(fInter))} style={{ scrollbarGutter: 'stable' }}>
        <div id={ELEMENTS_ID.BODY_CONTAINER} className={BODY_CONTAINER_CLS}>
          <Providers locale={language}>
            {!disableTopLoader && <NextTopLoader {...PROGRESSBAR_CONFIG} />}
            {withNavbar && <SitewideNavbar />}
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
};

export default DocumentRoot;
