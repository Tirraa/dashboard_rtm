import DiscordConfig from '@/config/discord';
import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { SitewideNavbarRoutes, SitewideNavbarRoutesTitles } from './utils/RoutesMapping';

const BASE = ROUTES_ROOTS.WEBSITE;

export const SITEWIDE_NAVBAR_ROUTES: SitewideNavbarRoutes = {
  HOME_PAGE: BASE,
  DASHBOARD_PAGE: ROUTES_ROOTS.DASHBOARD,
  PATCH_NOTES_PAGE: ROUTES_ROOTS.PATCH_NOTES,
  SUPPORT_PAGE: DiscordConfig.SUPPORT_SERVER_INVITE_LINK
};

const navbar = i18ns.navbar;
export const SITEWIDE_NAVBAR_ROUTES_TITLES: SitewideNavbarRoutesTitles = {
  HOME_PAGE: `${navbar}.home`,
  DASHBOARD_PAGE: `${navbar}.dashboard`,
  PATCH_NOTES_PAGE: `${navbar}.patch-notes`,
  SUPPORT_PAGE: `${navbar}.assistance`
};

export default SITEWIDE_NAVBAR_ROUTES;
