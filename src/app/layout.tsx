import type { Metadata } from 'next';
import './globals.css';

import { interFont } from '@/fonts';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${interFont.variable}`}>{children}</body>
    </html>
  );
}
