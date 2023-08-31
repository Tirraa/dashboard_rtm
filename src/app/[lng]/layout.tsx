import '@/app/globals.css';
import { dir } from 'i18next';
import { Metadata } from 'next';

import HotFixPhantomComponent from '@/components/misc/HotfixPhantomComponent';
import SitewideNavbar from '@/components/navbar/SitewideNavbar';
import { languages } from '@/i18n/settings';
import i18nTaxonomy from '@/taxonomies/i18n';
import LayoutBaseProps from '@/types/Next';

interface RootLayoutProps extends LayoutBaseProps {}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ [i18nTaxonomy.langFlag]: lng }));
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const lng = params[i18nTaxonomy.langFlag];

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className="flex flex-col min-h-screen">
        <HotFixPhantomComponent />
        <SitewideNavbar {...{ i18nProps: { [i18nTaxonomy.langFlag]: lng } }} />
        {children}
      </body>
    </html>
  );
}
