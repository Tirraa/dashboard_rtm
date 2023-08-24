import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Sidebar from '../_components/dashboard/Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex">
    <Sidebar />
    <main className="ml-20 flex-1">{children}</main>
  </div>
);

export default DashboardLayout;
