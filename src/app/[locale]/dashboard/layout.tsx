import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { LayoutBaseProps } from '@/types/Next';

interface DashboardLayoutProps extends LayoutBaseProps {}

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
