import { Metadata } from 'next';
import './globals.css';

import SitewideNavbar from '@/components/navbar/SitewideNavbar';
import { interFont } from '@/fonts';
import LayoutBaseProps from '@/types/Next';

interface RootLayoutProps extends LayoutBaseProps {}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className={`flex flex-col min-h-screen ${interFont.variable}`}>
        <SitewideNavbar />
        {children}
      </body>
    </html>
  );
}
