import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Sidebar from '../_components/Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-20 flex-1">{children}</div>
    </div>
  );
}
