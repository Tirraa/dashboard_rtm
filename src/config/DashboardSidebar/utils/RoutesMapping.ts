/* v8 ignore start */
import type { StronglyBindedReactElements, RoutesDefinition, RoutesTitles } from '@/types/RoutesMapping';

export type DashboardRoutesKeys = 'MAIN_PAGE' | 'FOO_PAGE' | 'BAR_PAGE';
export type DashboardRoutes = RoutesDefinition<DashboardRoutesKeys>;
export type DashboardRoutesTitles = RoutesTitles<DashboardRoutesKeys>;
export type DashboardRoutesSidebarReactElements = StronglyBindedReactElements<DashboardRoutesKeys>;
/* v8 ignore stop */
