/* v8 ignore start */
// Stryker disable all
import type { SitewideNavbarRoutesTitles, SitewideNavbarRoutes } from '@/config/SitewideNavbar/utils/RoutesMapping';

import DISCORD_CONFIG from '@/config/discord';
import { getSlashEnvelope } from '@/lib/str';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';

const BASE = getSlashEnvelope(ROUTES_ROOTS.WEBSITE);

/* eslint-disable perfectionist/sort-objects */
const SITEWIDE_NAVBAR_ROUTES: SitewideNavbarRoutes = {
  HOME_PAGE: BASE,
  DASHBOARD_PAGE: ROUTES_ROOTS.DASHBOARD,
  PATCH_NOTES_PAGE: ROUTES_ROOTS.PATCH_NOTES,
  SUPPORT_PAGE: DISCORD_CONFIG.SUPPORT_SERVER_INVITE_LINK
} as const;
/* eslint-enable perfectionist/sort-objects */

const { pagesTitles, navbar } = i18ns;
/* eslint-disable perfectionist/sort-objects */
export const SITEWIDE_NAVBAR_ROUTES_TITLES: SitewideNavbarRoutesTitles = {
  HOME_PAGE: `${pagesTitles}.homepage`,
  DASHBOARD_PAGE: `${pagesTitles}.dashboard`,
  PATCH_NOTES_PAGE: `${pagesTitles}.patch-notes`,
  SUPPORT_PAGE: `${navbar}.assistance`
} as const;
/* eslint-enable perfectionist/sort-objects */

export default SITEWIDE_NAVBAR_ROUTES;
/* v8 ignore stop */
// Stryker restore all
