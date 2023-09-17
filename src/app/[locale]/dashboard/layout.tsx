import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { LayoutBaseProps } from '@/types/Next';
import { Metadata } from 'next';

interface DashboardLayoutProps extends LayoutBaseProps {}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'lorem ipsum dolor sit amet'
};

export default function DashboardLayout({ params, children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <DashboardSidebar {...{ i18nProps: { ...params } }} />
      <main className="flex-1" id="main-box-id">
        {children}
      </main>
    </div>
  );
}
