/* v8 ignore start */
// Stryker disable all

import type { PatchNotesRoutesTitles, PatchNotesRoutes } from '@/config/SitewideNavbar/PatchNotes/utils/RoutesMapping';

import getSlashEnvelope from '@/lib/portable/str/getSlashEnvelope';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';

const BASE = getSlashEnvelope(ROUTES_ROOTS.PATCH_NOTES);

/* eslint-disable perfectionist/sort-objects */
const PATCH_NOTES_ROUTES: PatchNotesRoutes = {
  DASHBOARD_PATCH_NOTES_PAGE: BASE + 'dashboard',
  DISCORD_BOT_PATCH_NOTES_PAGE: BASE + 'discord-bot'
} as const;
/* eslint-enable perfectionist/sort-objects */

const { pagesTitles } = i18ns;
/* eslint-disable perfectionist/sort-objects */
export const PATCH_NOTES_ROUTES_TITLES: PatchNotesRoutesTitles = {
  DASHBOARD_PATCH_NOTES_PAGE: `${pagesTitles}.dashboard`,
  DISCORD_BOT_PATCH_NOTES_PAGE: `${pagesTitles}.discord-bot`
} as const;
/* eslint-enable perfectionist/sort-objects */

export default PATCH_NOTES_ROUTES;

// Stryker restore all
/* v8 ignore stop */
