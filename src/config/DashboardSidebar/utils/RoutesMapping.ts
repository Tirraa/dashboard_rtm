import { RoutesDefinition, RoutesTitles, WeaklyBindedReactElements } from '@/types/RoutesMapping';

enum EDashboardRoutes {
  MAIN_PAGE,
  FOO_PAGE,
  BAR_PAGE
}

export type DashboardRoutesKeys = keyof typeof EDashboardRoutes;
export type DashboardRoutes = RoutesDefinition<DashboardRoutesKeys>;
export type DashboardRoutesTitles = RoutesTitles<DashboardRoutesKeys>;
export type DashboardRoutesSidebarReactElements = WeaklyBindedReactElements<DashboardRoutesKeys>;
