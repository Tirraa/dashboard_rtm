import type { PatchNotesRoutesTitles, PatchNotesRoutes } from '@/config/SitewideNavbar/PatchNotes/utils/RoutesMapping';

import { getSlashEnvelope } from '@/lib/str';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';

const BASE = getSlashEnvelope(ROUTES_ROOTS.PATCH_NOTES);

const PATCH_NOTES_ROUTES: PatchNotesRoutes = {
  DISCORD_BOT_PATCH_NOTES_PAGE: BASE + 'discord-bot',
  DASHBOARD_PATCH_NOTES_PAGE: BASE + 'dashboard'
} as const;

const { pagesTitles } = i18ns;
export const PATCH_NOTES_ROUTES_TITLES: PatchNotesRoutesTitles = {
  DISCORD_BOT_PATCH_NOTES_PAGE: `${pagesTitles}.discord-bot`,
  DASHBOARD_PATCH_NOTES_PAGE: `${pagesTitles}.dashboard`
} as const;

export default PATCH_NOTES_ROUTES;
