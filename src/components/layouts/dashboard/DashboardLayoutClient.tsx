'use client';

import useLockScreenScrollX from '@/components/hooks/useLockScreenScrollX';
import useLockScreenScrollY from '@/components/hooks/useLockScreenScrollY';
import useResetScroll from '@/components/hooks/useResetScroll';
import DashboardSidebar from '@/components/layouts/dashboard/DashboardSidebar';
import { LayoutMinimalProps } from '@/types/CustomUtilitaryTypes';
import { FunctionComponent } from 'react';

interface DashboardLayoutClientProps extends LayoutMinimalProps {}

const DashboardLayoutClient: FunctionComponent<DashboardLayoutClientProps> = ({ children }) => {
  useLockScreenScrollY();
  useLockScreenScrollX();
  useResetScroll();

  return (
    <div className="flex flex-1 overflow-y-auto flex-col lg:flex-row">
      <DashboardSidebar />
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayoutClient;
