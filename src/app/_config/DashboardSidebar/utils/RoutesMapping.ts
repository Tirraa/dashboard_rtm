import { RoutesDefinition, RoutesReactElement, RoutesTitles } from '@/app/_types/RoutesMapping';

export type DashboardRoutesKeys = 'BASE_PAGE' | 'FOO_PAGE' | 'BAR_PAGE';

export type DashboardRoutes = RoutesDefinition<DashboardRoutesKeys>;
export type DashboardRoutesTitles = RoutesTitles<keyof DashboardRoutes>;
export type DashboardRoutesSidebarReactElements = RoutesReactElement<keyof DashboardRoutes>;
