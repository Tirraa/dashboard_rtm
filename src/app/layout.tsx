import type { Metadata } from 'next';
import './globals.css';

import SitewideNavbar from '@/components/navbar/SitewideNavbar';
import { interFont } from '@/fonts';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="fr">
    <body className={`flex flex-col min-h-screen ${interFont.variable}`}>
      <SitewideNavbar />
      {children}
    </body>
  </html>
);

export default RootLayout;
