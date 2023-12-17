import type { SitewideNavbarRoutesTitles, SitewideNavbarRoutes } from '@/config/SitewideNavbar/utils/RoutesMapping';

import DISCORD_CONFIG from '@/config/discord';
import { getSlashEnvelope } from '@/lib/str';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';

const BASE = getSlashEnvelope(ROUTES_ROOTS.WEBSITE);

const SITEWIDE_NAVBAR_ROUTES: SitewideNavbarRoutes = {
  SUPPORT_PAGE: DISCORD_CONFIG.SUPPORT_SERVER_INVITE_LINK,
  PATCH_NOTES_PAGE: ROUTES_ROOTS.PATCH_NOTES,
  DASHBOARD_PAGE: ROUTES_ROOTS.DASHBOARD,
  HOME_PAGE: BASE
} as const;

const { pagesTitles, navbar } = i18ns;
export const SITEWIDE_NAVBAR_ROUTES_TITLES: SitewideNavbarRoutesTitles = {
  PATCH_NOTES_PAGE: `${pagesTitles}.patch-notes`,
  DASHBOARD_PAGE: `${pagesTitles}.dashboard`,
  HOME_PAGE: `${pagesTitles}.homepage`,
  SUPPORT_PAGE: `${navbar}.assistance`
} as const;

export default SITEWIDE_NAVBAR_ROUTES;
