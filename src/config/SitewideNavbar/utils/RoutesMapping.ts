import type { RoutesDefinition, RoutesTitles } from '@/types/RoutesMapping';

enum ESitewideNavbarRoutes {
  HOME_PAGE,
  DASHBOARD_PAGE,
  PATCH_NOTES_PAGE,
  SUPPORT_PAGE
}

export type SitewideNavbarRoutesKeys = keyof typeof ESitewideNavbarRoutes;
export type SitewideNavbarRoutes = RoutesDefinition<SitewideNavbarRoutesKeys>;
export type SitewideNavbarRoutesTitles = RoutesTitles<SitewideNavbarRoutesKeys>;
