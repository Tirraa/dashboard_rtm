import getSlashEnvelope from '@/app/_lib/getSlashEnvelope';
import { RoutesBase } from '../routes';
import { SitewideNavbarRoutes, SitewideNavbarRoutesTitles } from './utils/RoutesMapping';

const b = getSlashEnvelope(RoutesBase.sitewide);

// {ToDo} i18n this?
export const sitewideNavbarRoutes: SitewideNavbarRoutes = {
  HOME_PAGE: b,
  DASHBOARD_PAGE: RoutesBase.dashboard,
  PATCH_NOTES_PAGE: RoutesBase.patchNotes,
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
