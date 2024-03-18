/* v8 ignore start */
// Stryker disable all

import type { LayoutBaseProps } from '@/types/Next';

import { BODY_CONTAINER_CLS } from '@/components/config/styles/body';
import HtmlElement from '@/components/layouts/base/HtmlElement';
import { SpeedInsights } from '@vercel/speed-insights/next';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import ELEMENTS_ID from '@/config/elementsId';
import Providers from '@/contexts/Providers';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  const language = params[I18nTaxonomy.LANGUAGE];

  return (
    <HtmlElement params={params}>
      <div id={ELEMENTS_ID.BODY_CONTAINER} className={BODY_CONTAINER_CLS}>
        <Providers locale={language}>{children}</Providers>
      </div>
      <SpeedInsights />
    </HtmlElement>
  );
}

// Stryker restore all
/* v8 ignore stop */
