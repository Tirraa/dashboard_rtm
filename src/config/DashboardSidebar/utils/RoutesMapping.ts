/* v8 ignore start */
import type { WeaklyBindedReactElements, RoutesDefinition, RoutesTitles } from '@/types/RoutesMapping';

export type DashboardRoutesKeys = 'MAIN_PAGE' | 'FOO_PAGE' | 'BAR_PAGE';
export type DashboardRoutes = RoutesDefinition<DashboardRoutesKeys>;
export type DashboardRoutesTitles = RoutesTitles<DashboardRoutesKeys>;
export type DashboardRoutesSidebarReactElements = WeaklyBindedReactElements<DashboardRoutesKeys>;
/* v8 ignore stop */
