import BODY_CLS from '@/components/config/styles/body';
import { HTML_STYLE } from '@/components/config/styles/html';
import SitewideNavbar from '@/components/ui/navbar/SitewideNavbar';
import PROGRESSBAR_CONFIG from '@/config/progressbar';
import { DEFAULT_VARIANT } from '@/config/themes';
import Providers from '@/contexts/Providers';
import i18nTaxonomy from '@/taxonomies/i18n';
import type { LayoutBaseProps } from '@/types/Next';
import Locale from 'intl-locale-textinfo-polyfill';
import type { FunctionComponent } from 'react';
import NextTopLoader from './NextTopLoader';

interface DocumentRootProps extends LayoutBaseProps {
  withNavbar?: boolean;
  disableTopLoader?: boolean;
}

export const DocumentRoot: FunctionComponent<DocumentRootProps> = ({ children, params, withNavbar, disableTopLoader }) => {
  const locale = params[i18nTaxonomy.LANG_FLAG];
  const { direction: dir } = new Locale(locale).textInfo;

  return (
    <html lang={locale} className={DEFAULT_VARIANT} style={HTML_STYLE} {...{ dir }} suppressHydrationWarning>
      <body className={BODY_CLS}>
        <Providers {...{ locale }}>
          {!Boolean(disableTopLoader) && <NextTopLoader {...PROGRESSBAR_CONFIG} />}
          {withNavbar && <SitewideNavbar />}
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default DocumentRoot;
