import { PatchNotesRoutes, PatchNotesRoutesTitles } from '@/config/SitewideNavbar/PatchNotes/utils/RoutesMapping';
import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getSlashEnvelope } from '@/lib/str';

const BASE = getSlashEnvelope(ROUTES_ROOTS.PATCH_NOTES);

export const PATCH_NOTES_ROUTES: PatchNotesRoutes = {
  DASHBOARD_PATCH_NOTES_PAGE: BASE + 'dashboard',
  DISCORD_BOT_PATCH_NOTES_PAGE: BASE + 'discord-bot'
} as const;

const pagesTitles = i18ns.pagesTitles;
export const PATCH_NOTES_ROUTES_TITLES: PatchNotesRoutesTitles = {
  DASHBOARD_PATCH_NOTES_PAGE: `${pagesTitles}.dashboard`,
  DISCORD_BOT_PATCH_NOTES_PAGE: `${pagesTitles}.discord-bot`
} as const;

export default PATCH_NOTES_ROUTES;
