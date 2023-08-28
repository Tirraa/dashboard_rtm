import { dir } from 'i18next';
import { Metadata } from 'next';
import '../globals.css';

import { languages } from '@/app/i18n/settings';
import HotFixPhantomComponent from '@/components/misc/HotfixPhantomComponent';
import SitewideNavbar from '@/components/navbar/SitewideNavbar';
import i18nTaxonomy from '@/taxonomies/i18n';
import LayoutBaseProps from '@/types/Next';

interface RootLayoutProps extends LayoutBaseProps {}

export async function generateStaticParams() {
  return languages.map((lng) => ({ [i18nTaxonomy.langFlag]: lng }));
}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export default function RootLayout({ children, params }: RootLayoutProps) {
  const lng = params[i18nTaxonomy.langFlag];

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className="flex flex-col min-h-screen">
        <HotFixPhantomComponent />
        <SitewideNavbar />
        {children}
      </body>
    </html>
  );
}
