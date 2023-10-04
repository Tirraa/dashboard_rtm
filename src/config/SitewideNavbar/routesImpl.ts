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
};

const navbar = i18ns.navbar;
const SEO = i18ns.manualSEO;
const blogCategories = i18ns.blogCategories;
export const SITEWIDE_NAVBAR_ROUTES_TITLES: SitewideNavbarRoutesTitles = {
  HOME_PAGE: `${SEO}.homepage.title`,
  DASHBOARD_PAGE: `${blogCategories}.patch-notes.dashboard.title`,
  PATCH_NOTES_PAGE: `${blogCategories}.patch-notes._title`,
  SUPPORT_PAGE: `${navbar}.assistance`
};

export default SITEWIDE_NAVBAR_ROUTES;
