import { RoutesDefinition, RoutesTitles } from '@/app/_types/RoutesMapping';

type SitewideNavbarRoutesKeys = 'HOME_PAGE' | 'DASHBOARD_PAGE' | 'PATCH_NOTES_PAGE' | 'SUPPORT_PAGE' | 'LOGIN_PAGE';

export type SitewideNavbarRoutes = RoutesDefinition<SitewideNavbarRoutesKeys>;
export type SitewideNavbarRoutesTitles = RoutesTitles<keyof SitewideNavbarRoutes>;
