import DiscordConfig from '@/config/discord';
import { RoutesBase } from '@/config/routes';
import { sep } from '@/i18n/settings';
import { i18ns } from '../i18n';
import { SitewideNavbarRoutes, SitewideNavbarRoutesTitles } from './utils/RoutesMapping';

const b = RoutesBase.sitewide;

export const sitewideNavbarRoutes: SitewideNavbarRoutes = {
  HOME_PAGE: b,
  DASHBOARD_PAGE: RoutesBase.dashboard,
  PATCH_NOTES_PAGE: RoutesBase.patchNotes,
  SUPPORT_PAGE: DiscordConfig.supportServerInviteLink,
  LOGIN_PAGE: b + 'login'
};

const navbar = i18ns.navbar;
export const sitewideNavbarRoutesTitles: SitewideNavbarRoutesTitles = {
  HOME_PAGE: `${navbar}${sep}home`,
  DASHBOARD_PAGE: `${navbar}${sep}dashboard`,
  PATCH_NOTES_PAGE: `${navbar}${sep}patch-notes`,
  SUPPORT_PAGE: `${navbar}${sep}assistance`,
  LOGIN_PAGE: `${navbar}${sep}login`
};

export default sitewideNavbarRoutes;
