/* v8 ignore start */
// Stryker disable all

'use client';

import type { DashboardRoutesSidebarReactElements, DashboardRoutesTitles, DashboardRoutes } from '@/config/DashboardSidebar/utils/RoutesMapping';
import type { LayoutMinimalProps } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import DashboardSidebar from '@/components/layouts/dashboard/DashboardSidebar';
import useLockScreenScrollY from '@/components/hooks/useLockScreenScrollY';
import MAIN_NEXT_UI_CLS from '@/components/config/styles/main';
import useResetScroll from '@/components/hooks/useResetScroll';
import { useSelectedLayoutSegment } from 'next/navigation';
import cn from '@/lib/portable/tailwind/cn';
import { useRef } from 'react';

interface DashboardLayoutClientProps extends LayoutMinimalProps {
  dashboardRoutesSidebarComponents: DashboardRoutesSidebarReactElements;
  dashboardRoutesTitles: DashboardRoutesTitles;
  dashboardRoutes: DashboardRoutes;
}

const DashboardLayoutClient: FunctionComponent<DashboardLayoutClientProps> = ({
  dashboardRoutesSidebarComponents,
  dashboardRoutesTitles,
  dashboardRoutes,
  children
}) => {
  useLockScreenScrollY();

  const mainElementRef = useRef<HTMLDivElement>(null);
  const segment = useSelectedLayoutSegment();

  useResetScroll(mainElementRef, {
    alsoResetWindowScroll: false,
    additionalDep: segment
  });

  return (
    <div className="flex flex-1 flex-col overflow-y-hidden lg:flex-row" data-pagefind-ignore="all">
      <DashboardSidebar
        dashboardRoutesSidebarComponents={dashboardRoutesSidebarComponents}
        dashboardRoutesTitles={dashboardRoutesTitles}
        dashboardRoutes={dashboardRoutes}
      />
      <main className={cn('flex-1 overflow-y-auto px-4 py-7 lg:px-8 lg:py-4', MAIN_NEXT_UI_CLS)} ref={mainElementRef}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayoutClient;

// Stryker restore all
/* v8 ignore stop */
