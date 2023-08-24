import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import LayoutBaseProps from '@/types/Next';
import { Metadata } from 'next';
import { FunctionComponent } from 'react';

interface DashboardLayoutProps extends LayoutBaseProps {}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({ children }) => (
  <div className="flex">
    <DashboardSidebar />
    <main className="ml-20 flex-1">{children}</main>
  </div>
);

export default DashboardLayout;
