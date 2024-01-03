/* v8 ignore start */
// Stryker disable all
'use client';

import type { LayoutMinimalProps } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import DashboardSidebar from '@/components/layouts/dashboard/DashboardSidebar';
import useLockScreenScrollY from '@/components/hooks/useLockScreenScrollY';
import MAIN_NEXT_UI_CLS from '@/components/config/styles/main';
import useResetScroll from '@/components/hooks/useResetScroll';
import { useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/lib/tailwind';
import { useRef } from 'react';

interface DashboardLayoutClientProps extends LayoutMinimalProps {}

const DashboardLayoutClient: FunctionComponent<DashboardLayoutClientProps> = ({ children }) => {
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
      <main className={cn('flex-1 overflow-y-auto px-4 py-7 lg:px-8 lg:py-4', MAIN_NEXT_UI_CLS)} ref={mainElementRef}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayoutClient;
// Stryker restore all
/* v8 ignore stop */
