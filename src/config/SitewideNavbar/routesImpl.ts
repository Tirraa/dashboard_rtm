import DiscordConfig from '@/config/discord';
import { RoutesBase } from '@/config/routes';
import { i18ns } from '../i18n';
import { SitewideNavbarRoutes, SitewideNavbarRoutesTitles } from './utils/RoutesMapping';

const BASE = RoutesBase.SITEWIDE;

export const SITEWIDE_NAVBAR_ROUTES: SitewideNavbarRoutes = {
  HOME_PAGE: BASE,
  DASHBOARD_PAGE: RoutesBase.DASHBOARD,
  PATCH_NOTES_PAGE: RoutesBase.PATCH_NOTES,
  SUPPORT_PAGE: DiscordConfig.SUPPORT_SERVER_INVITE_LINK,
  LOGIN_PAGE: BASE + 'login'
};

const navbar = i18ns.navbar;
export const SITEWIDE_NAVBAR_ROUTES_TITLES: SitewideNavbarRoutesTitles = {
  HOME_PAGE: `${navbar}.home`,
  DASHBOARD_PAGE: `${navbar}.dashboard`,
  PATCH_NOTES_PAGE: `${navbar}.patch-notes`,
  SUPPORT_PAGE: `${navbar}.assistance`,
  LOGIN_PAGE: `${navbar}.login`
};

export default SITEWIDE_NAVBAR_ROUTES;
