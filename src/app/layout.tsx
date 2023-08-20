import type { Metadata } from 'next';
import './globals.css';

import { interFont } from '@/fonts';
import { ReactNode } from 'react';
import SitewideNavbar from './_components/SitewideNavbar';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={`flex flex-col min-h-screen ${interFont.variable}`}>
        <SitewideNavbar />
        {children}
      </body>
    </html>
  );
}
