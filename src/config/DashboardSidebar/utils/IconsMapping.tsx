/* v8 ignore start */
import type { IconBaseProps } from 'react-icons';
import type { ComponentType } from 'react';

import DashboardSidebarButton from '@/components/layouts/dashboard/DashboardSidebarButton';
import SIDEBAR_ROUTES_ICONS from '@/config/DashboardSidebar/sidebarRoutesIcons';

import type { DashboardRoutesSidebarReactElements, DashboardRoutesKeys, DashboardRoutes } from './RoutesMapping';

export type DashboardRoutesIcons = Record<keyof DashboardRoutes, ComponentType<IconBaseProps>>;

const createSidebarComponent = (__SidebarIcon: ComponentType<IconBaseProps>) => <DashboardSidebarButton __SidebarIcon={__SidebarIcon} />;

const computedDashboardRoutesSidebarComponents = {} as DashboardRoutesSidebarReactElements;
Object.entries(SIDEBAR_ROUTES_ICONS).forEach(
  ([k, icon]) => (computedDashboardRoutesSidebarComponents[k as DashboardRoutesKeys] = createSidebarComponent(icon))
);

const DASHBOARD_ROUTES_SIDEBAR_COMPONENTS: DashboardRoutesSidebarReactElements = computedDashboardRoutesSidebarComponents;

export default DASHBOARD_ROUTES_SIDEBAR_COMPONENTS;
/* v8 ignore stop */
