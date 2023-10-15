import { SitewideNavbarRoutes, SitewideNavbarRoutesTitles } from '@/config/SitewideNavbar/utils/RoutesMapping';
import DISCORD_CONFIG from '@/config/discord';
import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getSlashEnvelope } from '@/lib/str';

const BASE = getSlashEnvelope(ROUTES_ROOTS.WEBSITE);

export const SITEWIDE_NAVBAR_ROUTES: SitewideNavbarRoutes = {
  HOME_PAGE: BASE,
  DASHBOARD_PAGE: ROUTES_ROOTS.DASHBOARD,
  PATCH_NOTES_PAGE: ROUTES_ROOTS.PATCH_NOTES,
  SUPPORT_PAGE: DISCORD_CONFIG.SUPPORT_SERVER_INVITE_LINK
} as const;

const navbar = i18ns.navbar;
const pagesTitles = i18ns.pagesTitles;
export const SITEWIDE_NAVBAR_ROUTES_TITLES: SitewideNavbarRoutesTitles = {
  HOME_PAGE: `${pagesTitles}.homepage`,
  DASHBOARD_PAGE: `${pagesTitles}.dashboard`,
  PATCH_NOTES_PAGE: `${pagesTitles}.patch-notes`,
  SUPPORT_PAGE: `${navbar}.assistance`
} as const;

export default SITEWIDE_NAVBAR_ROUTES;
