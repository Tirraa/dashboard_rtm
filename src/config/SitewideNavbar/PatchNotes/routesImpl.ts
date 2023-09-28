import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getSlashEnvelope } from '@/lib/str';
import { PatchNotesRoutes, PatchNotesRoutesTitles } from './utils/RoutesMapping';

const BASE = getSlashEnvelope(ROUTES_ROOTS.PATCH_NOTES);

export const PATCH_NOTES_ROUTES: PatchNotesRoutes = {
  DASHBOARD_PATCH_NOTES_PAGE: BASE + 'dashboard',
  DISCORD_BOT_PATCH_NOTES_PAGE: BASE + 'discord-bot'
};

const blogCategories = i18ns.blogCategories;
export const PATCH_NOTES_ROUTES_TITLES: PatchNotesRoutesTitles = {
  DASHBOARD_PATCH_NOTES_PAGE: `${blogCategories}.patch-notes.dashboard.title`,
  DISCORD_BOT_PATCH_NOTES_PAGE: `${blogCategories}.patch-notes.discord-bot.title`
};

export default PATCH_NOTES_ROUTES;
