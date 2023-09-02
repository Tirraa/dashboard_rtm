import DiscordConfig from '@/config/discord';
import { RoutesBase } from '@/config/routes';
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
  HOME_PAGE: `${navbar}.home`,
  DASHBOARD_PAGE: `${navbar}.dashboard`,
  PATCH_NOTES_PAGE: `${navbar}.patch-notes`,
  SUPPORT_PAGE: `${navbar}.assistance`,
  LOGIN_PAGE: `${navbar}.login`
};

export default sitewideNavbarRoutes;
