import { RoutesDefinition, RoutesReactElements, RoutesTitles } from '@/types/RoutesMapping';

enum ENavbarExtrasRoutes {
  LOGIN
}

export type NavbarExtrasRoutesKeys = keyof typeof ENavbarExtrasRoutes;
export type NavbarExtrasRoutes = RoutesDefinition<NavbarExtrasRoutesKeys>;
export type NavbarExtrasRoutesTitles = RoutesTitles<NavbarExtrasRoutesKeys>;
export type NavbarExtrasRoutesReactElements = RoutesReactElements<NavbarExtrasRoutesKeys>;
