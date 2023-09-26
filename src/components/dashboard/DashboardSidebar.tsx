'use client';

import DASHBOARD_ROUTES_SIDEBAR_COMPONENTS from '@/config/DashboardSidebar/utils/IconsMapping';
import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { FunctionComponent, ReactElement } from 'react';
import SidebarBtnSeparator from './SidebarBtnsSeparator';

interface DashboardSidebarProps {}

function SidebarBtns() {
  const keys = Object.keys(DASHBOARD_ROUTES_SIDEBAR_COMPONENTS);
  const lastKey = keys[keys.length - 1];

  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const btnComponent = DASHBOARD_ROUTES_SIDEBAR_COMPONENTS[k2];

    return (
      <>
        {btnComponent}
        {k !== lastKey && <SidebarBtnSeparator />}
      </>
    );
  });
}

export const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = () => {
  return (
    <aside className="px-2 bg-black border-r-[1px]">
      <div className="my-4">
        <SidebarBtns />
        <SidebarBtns />
        <SidebarBtns />
        <SidebarBtns />
        <SidebarBtns />
        <SidebarBtns />
        <SidebarBtns />
        <SidebarBtns />
        <SidebarBtns />
        <SidebarBtns />
        <SidebarBtns />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
