import type { RoutesDefinition, RoutesTitles } from '@/types/RoutesMapping';

export type SitewideNavbarRoutesKeys = 'HOME_PAGE' | 'DASHBOARD_PAGE' | 'PATCH_NOTES_PAGE' | 'SUPPORT_PAGE';
export type SitewideNavbarRoutes = RoutesDefinition<SitewideNavbarRoutesKeys>;
export type SitewideNavbarRoutesTitles = RoutesTitles<SitewideNavbarRoutesKeys>;
