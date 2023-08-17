import { RouteDefinition, RouteReactElement, RouteTitles } from '@/app/_types/RoutesMapping';

type DashboardRoutesKeys = 'BASE_PAGE' | 'FOO_PAGE' | 'BAR_PAGE';

export type DashboardRoutes = RouteDefinition<DashboardRoutesKeys>;
export type DashboardRoutesTitles = RouteTitles<keyof DashboardRoutes>;
export type DashboardRoutesSidebarReactElements = RouteReactElement<keyof DashboardRoutes>;
