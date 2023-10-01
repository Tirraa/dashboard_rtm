import DashboardSidebarButton from '@/components/layouts/dashboard/DashboardSidebarButton';
import { AppPath } from '@/types/Next';
import { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons';
import DASHBOARD_ROUTES from '../routesImpl';
import SIDEBAR_ROUTES_ICONS from '../sidebarRoutesIcons';
import { DashboardRoutes, DashboardRoutesKeys, DashboardRoutesSidebarReactElements } from './RoutesMapping';

export type DashboardRoutesIcons = {
  [_ in keyof DashboardRoutes]: ComponentType<IconBaseProps>;
};

const createSidebarComponent = (__SidebarIcon: ComponentType<IconBaseProps>, href: AppPath) => (
  <DashboardSidebarButton {...{ __SidebarIcon, href }} />
);

const computedDashboardRoutesSidebarComponents: Partial<DashboardRoutesSidebarReactElements> = {};
Object.entries(SIDEBAR_ROUTES_ICONS).forEach(([k, icon]) => {
  const k2 = k as DashboardRoutesKeys;
  const href = DASHBOARD_ROUTES[k2];
  computedDashboardRoutesSidebarComponents[k2] = createSidebarComponent(icon, href);
});

export const DASHBOARD_ROUTES_SIDEBAR_COMPONENTS: DashboardRoutesSidebarReactElements =
  computedDashboardRoutesSidebarComponents as DashboardRoutesSidebarReactElements;

export default DASHBOARD_ROUTES_SIDEBAR_COMPONENTS;
