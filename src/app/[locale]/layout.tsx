import '@/app/globals.css';
import NextTopLoader from '@/components/misc/NextTopLoader';

import HotFixPhantomComponent from '@/components/misc/HotFixPhantomComponentProps';
import SitewideNavbar from '@/components/navbar/SitewideNavbar';
import { languages } from '@/i18n/settings';
import i18nTaxonomy from '@/taxonomies/i18n';
import LayoutBaseProps from '@/types/Next';
import { Metadata } from 'next';

interface RootLayoutProps extends LayoutBaseProps {}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ [i18nTaxonomy.langFlag]: lng }));
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params[i18nTaxonomy.langFlag];

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <HotFixPhantomComponent />
        <SitewideNavbar {...{ i18nProps: { [i18nTaxonomy.langFlag]: locale } }} />
        <NextTopLoader color="#1e2529" showSpinner={false} height={5} />
        {children}
      </body>
    </html>
  );
}
