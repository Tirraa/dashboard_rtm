'use client';

import SidebarButton from '@/app/_components/SidebarButton';
import { IconBaseProps } from 'react-icons';
import { RxActivityLog, RxDashboard, RxSketchLogo } from 'react-icons/rx';
import dashboardRoutes from './routesImpl';
import { DashboardRoutes, DashboardRoutesSidebarReactElements } from './utils/RoutesMapping';

const createSidebarComponent = (__SidebarIcon: React.ComponentType<IconBaseProps>, href: string) => <SidebarButton {...{ __SidebarIcon, href }} />;

type DashboardRoutesIcons = {
  [Property in keyof DashboardRoutes]: React.ComponentType<IconBaseProps>;
};

const iconsAssoc: DashboardRoutesIcons = {
  BASE_PAGE: RxSketchLogo,
  FOO_PAGE: RxDashboard,
  BAR_PAGE: RxActivityLog
};

const computedDashboardRoutesSidebarComponents: Partial<DashboardRoutesSidebarReactElements> = {};
Object.entries(iconsAssoc).forEach(([k, icon]) => {
  const href = dashboardRoutes[k as keyof DashboardRoutes];
  computedDashboardRoutesSidebarComponents[k as keyof DashboardRoutesSidebarReactElements] = createSidebarComponent(icon, href);
});

export const dashboardRoutesSidebarComponents: DashboardRoutesSidebarReactElements =
  computedDashboardRoutesSidebarComponents as DashboardRoutesSidebarReactElements;

export default dashboardRoutesSidebarComponents;
