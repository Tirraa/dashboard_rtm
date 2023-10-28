'use client';

import MAIN_NEXT_UI_CLS from '@/components/config/styles/next-ui';
import useLockScreenScrollY from '@/components/hooks/useLockScreenScrollY';
import useResetScroll from '@/components/hooks/useResetScroll';
import DashboardSidebar from '@/components/layouts/dashboard/DashboardSidebar';
import { cn } from '@/lib/tailwind';
import { LayoutMinimalProps } from '@/types/Next';
import { useSelectedLayoutSegment } from 'next/navigation';
import { FunctionComponent, useRef } from 'react';

interface DashboardLayoutClientProps extends LayoutMinimalProps {}

export const DashboardLayoutClient: FunctionComponent<DashboardLayoutClientProps> = ({ children }) => {
  useLockScreenScrollY();

  const mainElementRef = useRef<HTMLDivElement>(null);
  const segment = useSelectedLayoutSegment();

  useResetScroll(mainElementRef, {
    alsoResetWindowScroll: true,
    additionalDep: segment
  });

  return (
    <div className="flex flex-1 overflow-y-hidden flex-col lg:flex-row">
      <DashboardSidebar />
      <main ref={mainElementRef} className={cn('flex-1 py-7 px-4 lg:px-8 lg:py-4 overflow-y-auto', MAIN_NEXT_UI_CLS)}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayoutClient;
