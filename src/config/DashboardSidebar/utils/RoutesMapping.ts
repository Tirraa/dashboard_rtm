import type { RoutesDefinition, RoutesTitles, WeaklyBindedReactElements } from '@/types/RoutesMapping';

export type DashboardRoutesKeys = 'MAIN_PAGE' | 'FOO_PAGE' | 'BAR_PAGE';
export type DashboardRoutes = RoutesDefinition<DashboardRoutesKeys>;
export type DashboardRoutesTitles = RoutesTitles<DashboardRoutesKeys>;
export type DashboardRoutesSidebarReactElements = WeaklyBindedReactElements<DashboardRoutesKeys>;
