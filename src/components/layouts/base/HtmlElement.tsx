/* v8 ignore start */
// Stryker disable all

import type { LayoutBaseProps } from '@/types/Next';
import type { FunctionComponent } from 'react';

import { HTML_STYLE } from '@/components/config/styles/html';
import BODY_CLS from '@/components/config/styles/body';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import Locale from 'intl-locale-textinfo-polyfill';
import { cn } from '@/lib/tailwind';
import { fInter } from '@/fonts';
import { fcn } from '@/lib/next';

const HtmlElement: FunctionComponent<LayoutBaseProps> = ({ children, params }) => {
  const language = params[I18nTaxonomy.LANGUAGE];
  const { direction: dir } = new Locale(language).textInfo;

  return (
    <html suppressHydrationWarning style={HTML_STYLE} lang={language} dir={dir}>
      <body className={cn(BODY_CLS, fcn(fInter))} style={{ scrollbarGutter: 'stable' }}>
        {children}
      </body>
    </html>
  );
};

export default HtmlElement;

// Stryker restore all
/* v8 ignore stop */
