import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import LayoutBaseProps from '@/types/Next';
import { Metadata } from 'next';

interface DashboardLayoutProps extends LayoutBaseProps {}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="ml-20 flex-1">{children}</main>
    </div>
  );
}
