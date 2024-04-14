/* v8 ignore start */
// Stryker disable all

import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { ComponentType } from 'react';

import DashboardSidebarButton from '@/components/layouts/dashboard/DashboardSidebarButton';
import SIDEBAR_ROUTES_ICONS from '@/config/DashboardSidebar/sidebarRoutesIcons';

import type { DashboardRoutesSidebarReactElements, DashboardRoutesKeys, DashboardRoutes } from './RoutesMapping';

export type DashboardRoutesIcons = Record<keyof DashboardRoutes, ComponentType<IconProps>>;

const createSidebarComponent = (__SidebarIcon: ComponentType<IconProps>) => <DashboardSidebarButton __SidebarIcon={__SidebarIcon} />;

const computedDashboardRoutesSidebarComponents = {} as DashboardRoutesSidebarReactElements;

for (const [k, icon] of Object.entries(SIDEBAR_ROUTES_ICONS)) {
  computedDashboardRoutesSidebarComponents[k as DashboardRoutesKeys] = createSidebarComponent(icon);
}

const DASHBOARD_ROUTES_SIDEBAR_COMPONENTS: DashboardRoutesSidebarReactElements = computedDashboardRoutesSidebarComponents;

export default DASHBOARD_ROUTES_SIDEBAR_COMPONENTS;

// Stryker restore all
/* v8 ignore stop */
