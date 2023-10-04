'use client';

import I18nProvider from '@/contexts/I18nProvider';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { FunctionComponent } from 'react';

interface HtmlElementProps extends LayoutBaseProps {}

const LandingPagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => {
  const locale = params[i18nTaxonomy.LANG_FLAG];

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen w-full p-0 m-0 bg-gradient-to-t from-slate-50 to-slate-50 text-black bg-gradient-to-t from-slate-700 to-slate-700 dark:text-white">
        <main className="m-auto text-center">
          <I18nProvider {...{ locale }}>{children}</I18nProvider>
        </main>
      </body>
    </html>
  );
};

export default LandingPagesHtmlElement;
