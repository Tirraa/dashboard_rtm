'use client';

import Link from 'next/link';
import { FunctionComponent, ReactElement } from 'react';
import dashboardRoutesSidebarComponents from '../dashboard/_config/SidebarRoutesComponents';
import dashboardRoutes from '../dashboard/_config/routes';
import { DashboardRoutes, DashboardRoutesSidebarReactElements } from '../dashboard/_config/utils/RoutesMapping';

interface SidebarProps {}

function sidebarBtnsGenerator() {
  const keys = Object.keys(dashboardRoutesSidebarComponents);
  const lastKey = keys[keys.length - 1];
  const sidebarSeparator = <hr className="relative right-0.5 w-10 m-auto" />;

  return keys.map((k): ReactElement => {
    const url = dashboardRoutes[k as keyof DashboardRoutes];
    const component = dashboardRoutesSidebarComponents[k as keyof DashboardRoutesSidebarReactElements];

    return (
      <div key={`sidebar-btn-component-${k}`}>
        <Link href={url}>{component}</Link>
        {k !== lastKey && sidebarSeparator}
      </div>
    );
  });
}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  return <aside className="fixed w-20 h-screen border-r-[1px] p-4 bg-black flex flex-col">{sidebarBtnsGenerator()}</aside>;
};

export default Sidebar;
