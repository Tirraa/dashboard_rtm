import BODY_CLS from '@/components/config/styles/body';
import { HTML_STYLE } from '@/components/config/styles/html';
import { MAIN_NEXT_UI_CLS } from '@/components/config/styles/next-ui';
import { DEFAULT_VARIANT } from '@/config/themes';
import Providers from '@/contexts/Providers';
import { cn } from '@/lib/tailwind';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import 'intl-locale-textinfo-polyfill';
import { FunctionComponent } from 'react';

interface HtmlElementProps extends LayoutBaseProps {}

const LandingPagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => {
  const locale = params[i18nTaxonomy.LANG_FLAG];
  const { direction: dir } = new Intl.Locale(locale).textInfo;

  return (
    <html lang={locale} className={DEFAULT_VARIANT} style={HTML_STYLE} {...{ dir }} suppressHydrationWarning>
      <body className={BODY_CLS}>
        <Providers {...{ locale }}>
          <main className={cn('flex flex-1 justify-center items-center', MAIN_NEXT_UI_CLS)}>{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default LandingPagesHtmlElement;
