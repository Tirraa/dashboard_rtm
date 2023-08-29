import DiscordConfig from '@/config/discord';
import { i18ns } from '@/config/i18n';
import { RoutesBase } from '@/config/routes';
import { SitewideNavbarRoutes, SitewideNavbarRoutesTitles } from './utils/RoutesMapping';

const b = RoutesBase.sitewide;

export const sitewideNavbarRoutes: SitewideNavbarRoutes = {
  HOME_PAGE: b,
  DASHBOARD_PAGE: RoutesBase.dashboard,
  PATCH_NOTES_PAGE: RoutesBase.patchNotes,
  SUPPORT_PAGE: DiscordConfig.supportServerInviteLink,
  LOGIN_PAGE: b + 'login'
};

const ns = i18ns.navbar;
export const sitewideNavbarRoutesTitles: SitewideNavbarRoutesTitles = {
  HOME_PAGE: { targetKey: 'home', ns },
  DASHBOARD_PAGE: { targetKey: 'dashboard', ns },
  PATCH_NOTES_PAGE: { targetKey: 'patch-notes', ns },
  SUPPORT_PAGE: { targetKey: 'assistance', ns },
  LOGIN_PAGE: { targetKey: 'login', ns }
};

export default sitewideNavbarRoutes;
