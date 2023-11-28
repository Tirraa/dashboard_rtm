'use client';

import MAIN_NEXT_UI_CLS from '@/components/config/styles/main';
import useLockScreenScrollY from '@/components/hooks/useLockScreenScrollY';
import useResetScroll from '@/components/hooks/useResetScroll';
import DashboardSidebar from '@/components/layouts/dashboard/DashboardSidebar';
import { cn } from '@/lib/tailwind';
import type { LayoutMinimalProps } from '@rtm/shared-types/src/Next';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { FunctionComponent } from 'react';
import { useRef } from 'react';

interface DashboardLayoutClientProps extends LayoutMinimalProps {}

export const DashboardLayoutClient: FunctionComponent<DashboardLayoutClientProps> = ({ children }) => {
  useLockScreenScrollY();

  const mainElementRef = useRef<HTMLDivElement>(null);
  const segment = useSelectedLayoutSegment();

  useResetScroll(mainElementRef, {
    alsoResetWindowScroll: false,
    additionalDep: segment
  });

  return (
    <div className="flex flex-1 flex-col overflow-y-hidden lg:flex-row">
      <DashboardSidebar />
      <main ref={mainElementRef} className={cn('flex-1 overflow-y-auto px-4 py-7 lg:px-8 lg:py-4', MAIN_NEXT_UI_CLS)}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayoutClient;
