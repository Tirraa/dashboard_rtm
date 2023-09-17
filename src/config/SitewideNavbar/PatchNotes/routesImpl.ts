import { i18ns } from '@/config/i18n';
import RoutesBase from '@/config/routes';
import { getSlashEnvelope } from '@/lib/str';
import { PatchNotesRoutes, PatchNotesRoutesTitles } from './utils/RoutesMapping';

const BASE = getSlashEnvelope(RoutesBase.PATCH_NOTES);

export const PATCH_NOTES_ROUTES: PatchNotesRoutes = {
  DASHBOARD_PATCH_NOTES_PAGE: BASE + 'dashboard',
  DISCORD_BOT_PATCH_NOTES_PAGE: BASE + 'discord-bot'
};

const navbar = i18ns.navbar;
export const PATCH_NOTES_ROUTES_TITLES: PatchNotesRoutesTitles = {
  DASHBOARD_PATCH_NOTES_PAGE: `${navbar}.dashboard`,
  DISCORD_BOT_PATCH_NOTES_PAGE: `${navbar}.discord-bot`
};

export default PATCH_NOTES_ROUTES;
