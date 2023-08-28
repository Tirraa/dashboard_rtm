import { ReactNode } from 'react';
import './globals.css';

type VeryRootLayoutProps = {
  children: ReactNode;
};

export default function VeryRootLayout({ children }: VeryRootLayoutProps) {
  return children;
}
