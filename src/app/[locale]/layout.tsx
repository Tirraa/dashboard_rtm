import '@/app/globals.css';
import NextTopLoader from '@/components/misc/NextTopLoader';
import { setStaticParamsLocale } from 'next-international/server';

import SplashScreen from '@/components/misc/SplashScreen';
import SitewideNavbar from '@/components/navbar/SitewideNavbar';
import { ProgressbarConfig } from '@/config/progressbar';
import { getStaticParams } from '@/i18n/server';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { Metadata } from 'next';

interface RootLayoutProps extends LayoutBaseProps {}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export async function generateStaticParams() {
  return getStaticParams();
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(locale);

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <SplashScreen />
        <SitewideNavbar {...{ i18nProps: { [i18nTaxonomy.LANG_FLAG]: locale } }} />
        <NextTopLoader {...{ ...ProgressbarConfig.PROPS }} />
        {children}
      </body>
    </html>
  );
}
