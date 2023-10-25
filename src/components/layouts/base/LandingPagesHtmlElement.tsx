'use client';

import BODY_CLS from '@/components/config/styles/body';
import { MAIN_NEXT_UI_CLS } from '@/components/config/styles/next-ui';
import ELEMENTS_ID from '@/config/elementsId';
import Providers from '@/contexts/Providers';
import { cn } from '@/lib/tailwind';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { FunctionComponent } from 'react';

interface HtmlElementProps extends LayoutBaseProps {}

const LandingPagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => {
  const locale = params[i18nTaxonomy.LANG_FLAG];
  const className = BODY_CLS;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body {...{ className }}>
        <Providers {...{ locale }}>
          <main className={cn('flex flex-1 justify-center items-center', MAIN_NEXT_UI_CLS)} id={ELEMENTS_ID.ROOT}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default LandingPagesHtmlElement;
