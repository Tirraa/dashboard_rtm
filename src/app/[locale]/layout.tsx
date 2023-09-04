import '@/app/globals.css';
import NextTopLoader from '@/components/misc/NextTopLoader';

import HotFixPhantomComponent from '@/components/misc/HotFixPhantomComponentProps';
import SitewideNavbar from '@/components/navbar/SitewideNavbar';
import { ProgressbarConfig } from '@/config/progressbar';
import { LANGUAGES } from '@/i18n/settings';
import i18nTaxonomy from '@/taxonomies/i18n';
import LayoutBaseProps from '@/types/Next';
import { Metadata } from 'next';

interface RootLayoutProps extends LayoutBaseProps {}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export async function generateStaticParams() {
  return LANGUAGES.map((lng) => ({ [i18nTaxonomy.LANG_FLAG]: lng }));
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params[i18nTaxonomy.LANG_FLAG];

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <HotFixPhantomComponent />
        <SitewideNavbar {...{ i18nProps: { [i18nTaxonomy.LANG_FLAG]: locale } }} />
        <NextTopLoader {...{ ...ProgressbarConfig.PROPS }} />
        {children}
      </body>
    </html>
  );
}
