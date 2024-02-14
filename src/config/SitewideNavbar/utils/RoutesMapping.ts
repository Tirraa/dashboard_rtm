/* v8 ignore start */
// Stryker disable all

import type { RoutesDefinition, RoutesTitles } from '@/types/RoutesMapping';

export type SitewideNavbarRoutesKeys = 'PATCH_NOTES_PAGE' | 'DASHBOARD_PAGE' | 'SUPPORT_PAGE' | 'HOME_PAGE';
export type SitewideNavbarRoutes = RoutesDefinition<SitewideNavbarRoutesKeys>;
export type SitewideNavbarRoutesTitles = RoutesTitles<SitewideNavbarRoutesKeys>;

// Stryker restore all
/* v8 ignore stop */
