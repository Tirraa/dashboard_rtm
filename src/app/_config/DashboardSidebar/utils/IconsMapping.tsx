'use client';

import SidebarButton from '@/app/_components/SidebarButton';
import { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons';
import dashboardRoutes from '../routesImpl';
import sidebarRoutesIcons from '../sidebarRoutesIcons';
import { DashboardRoutes, DashboardRoutesKeys, DashboardRoutesSidebarReactElements } from './RoutesMapping';

export type DashboardRoutesIcons = {
  [Property in keyof DashboardRoutes]: ComponentType<IconBaseProps>;
};

const createSidebarComponent = (__SidebarIcon: ComponentType<IconBaseProps>, href: string) => <SidebarButton {...{ __SidebarIcon, href }} />;

const computedDashboardRoutesSidebarComponents: Partial<DashboardRoutesSidebarReactElements> = {};
Object.entries(sidebarRoutesIcons).forEach(([k, icon]) => {
  const k2 = k as DashboardRoutesKeys;
  const href = dashboardRoutes[k2];
  computedDashboardRoutesSidebarComponents[k2] = createSidebarComponent(icon, href);
});

export const dashboardRoutesSidebarComponents: DashboardRoutesSidebarReactElements =
  computedDashboardRoutesSidebarComponents as DashboardRoutesSidebarReactElements;

export default dashboardRoutesSidebarComponents;
