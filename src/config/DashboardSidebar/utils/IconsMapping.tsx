'use client';

import DashboardSidebarButton from '@/components/dashboard/DashboardSidebarButton';
import { AppPath } from '@/types/Next';
import { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons';
import dashboardRoutes from '../routesImpl';
import sidebarRoutesIcons from '../sidebarRoutesIcons';
import { DashboardRoutes, DashboardRoutesKeys, DashboardRoutesSidebarReactElements } from './RoutesMapping';

export type DashboardRoutesIcons = {
  [_ in keyof DashboardRoutes]: ComponentType<IconBaseProps>;
};

const createSidebarComponent = (__SidebarIcon: ComponentType<IconBaseProps>, href: AppPath) => (
  <DashboardSidebarButton {...{ __SidebarIcon, href }} />
);

const computedDashboardRoutesSidebarComponents: Partial<DashboardRoutesSidebarReactElements> = {};
Object.entries(sidebarRoutesIcons).forEach(([k, icon]) => {
  const k2 = k as DashboardRoutesKeys;
  const href = dashboardRoutes[k2];
  computedDashboardRoutesSidebarComponents[k2] = createSidebarComponent(icon, href);
});

export const dashboardRoutesSidebarComponents: DashboardRoutesSidebarReactElements =
  computedDashboardRoutesSidebarComponents as DashboardRoutesSidebarReactElements;

export default dashboardRoutesSidebarComponents;
