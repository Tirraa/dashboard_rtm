'use client';

import { LayoutMinimalProps } from '@/types/CustomUtilitaryTypes';
import { FunctionComponent } from 'react';
import useLockScreenScrollY from '../_hooks/useLockScreenScrollY';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutClientProps extends LayoutMinimalProps {}

const DashboardLayoutClient: FunctionComponent<DashboardLayoutClientProps> = ({ children }) => {
  useLockScreenScrollY();

  return (
    <div className="flex flex-1 overflow-y-auto flex-col lg:flex-row">
      <DashboardSidebar />
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayoutClient;
