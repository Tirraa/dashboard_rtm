'use client';

import useLockScreenScrollY from '@/components/hooks/useLockScreenScrollY';
import useResetScroll from '@/components/hooks/useResetScroll';
import DashboardSidebar from '@/components/layouts/dashboard/DashboardSidebar';
import { LayoutMinimalProps } from '@/types/CustomUtilitaryTypes';
import { useSelectedLayoutSegment } from 'next/navigation';
import { FunctionComponent, useRef } from 'react';

interface DashboardLayoutClientProps extends LayoutMinimalProps {}

const DashboardLayoutClient: FunctionComponent<DashboardLayoutClientProps> = ({ children }) => {
  useLockScreenScrollY();

  const mainElementRef = useRef<HTMLDivElement>(null);
  const segment = useSelectedLayoutSegment();

  useResetScroll(mainElementRef, {
    alsoResetWindowScroll: true,
    additionalDeps: [segment]
  });

  return (
    <div className="flex flex-1 overflow-y-auto flex-col lg:flex-row">
      <DashboardSidebar />
      <main ref={mainElementRef} className="flex-1 px-4 lg:px-8 lg:py-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayoutClient;
