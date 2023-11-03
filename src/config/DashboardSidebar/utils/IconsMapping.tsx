import DashboardSidebarButton from '@/components/layouts/dashboard/DashboardSidebarButton';
import SIDEBAR_ROUTES_ICONS from '@/config/DashboardSidebar/sidebarRoutesIcons';
import type { ComponentType } from 'react';
import type { IconBaseProps } from 'react-icons';
import type { DashboardRoutes, DashboardRoutesKeys, DashboardRoutesSidebarReactElements } from './RoutesMapping';

export type DashboardRoutesIcons = {
  [_ in keyof DashboardRoutes]: ComponentType<IconBaseProps>;
};

const createSidebarComponent = (__SidebarIcon: ComponentType<IconBaseProps>) => <DashboardSidebarButton {...{ __SidebarIcon }} />;

const computedDashboardRoutesSidebarComponents = {} as DashboardRoutesSidebarReactElements;
Object.entries(SIDEBAR_ROUTES_ICONS).forEach(
  ([k, icon]) => (computedDashboardRoutesSidebarComponents[k as DashboardRoutesKeys] = createSidebarComponent(icon))
);

export const DASHBOARD_ROUTES_SIDEBAR_COMPONENTS: DashboardRoutesSidebarReactElements =
  computedDashboardRoutesSidebarComponents as DashboardRoutesSidebarReactElements;

export default DASHBOARD_ROUTES_SIDEBAR_COMPONENTS;
