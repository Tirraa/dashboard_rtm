import { RoutesDefinition, RoutesReactElements, RoutesTitles } from '@/types/RoutesMapping';

enum EDashboardRoutes {
  BASE_PAGE,
  FOO_PAGE,
  BAR_PAGE
}

export type DashboardRoutesKeys = keyof typeof EDashboardRoutes;
export type DashboardRoutes = RoutesDefinition<DashboardRoutesKeys>;
export type DashboardRoutesTitles = RoutesTitles<DashboardRoutesKeys>;
export type DashboardRoutesSidebarReactElements = RoutesReactElements<DashboardRoutesKeys>;
