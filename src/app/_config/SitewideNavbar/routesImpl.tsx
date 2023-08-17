import getSlashEnvelope from '@/app/_lib/getSlashEnvelope';
import { dashboardRouteBase } from '@/app/dashboard/_config/routesImpl';
import { SitewideNavbarRoutes, SitewideNavbarRoutesTitles } from './utils/RoutesMapping';

export const sitewideNavbarRouteBase = '/';
const b = getSlashEnvelope(sitewideNavbarRouteBase);

// {ToDo} i18n this?
export const sitewideNavbarRoutes: SitewideNavbarRoutes = {
  HOME_PAGE: b,
  DASHBOARD_PAGE: dashboardRouteBase,
  PATCH_NOTES_PAGE: b + 'patch-notes',
  SUPPORT_PAGE: b + 'support',
  LOGIN_PAGE: b + 'login'
};

// {ToDo} i18n this!
export const sitewideNavbarRoutesTitles: SitewideNavbarRoutesTitles = {
  HOME_PAGE: () => 'Accueil',
  DASHBOARD_PAGE: () => 'Dashboard',
  PATCH_NOTES_PAGE: () => 'Patch notes',
  SUPPORT_PAGE: () => 'Support',
  LOGIN_PAGE: () => 'Connexion'
};

export default sitewideNavbarRoutes;
