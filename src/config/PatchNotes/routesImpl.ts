import RoutesBase from '@/config/routes';
import { sep } from '@/i18n/settings';
import { getSlashEnvelope } from '@/lib/str';
import { i18ns } from '../i18n';
import { PatchNotesRoutes, PatchNotesRoutesTitles } from './utils/RoutesMapping';

const b = getSlashEnvelope(RoutesBase.patchNotes);

export const patchNotesRoutes: PatchNotesRoutes = {
  DASHBOARD_PATCH_NOTES_PAGE: b + 'dashboard',
  DISCORD_BOT_PATCH_NOTES_PAGE: b + 'discord-bot'
};

const navbar = i18ns.navbar;
export const patchNotesRoutesTitles: PatchNotesRoutesTitles = {
  DASHBOARD_PATCH_NOTES_PAGE: `${navbar}${sep}dashboard`,
  DISCORD_BOT_PATCH_NOTES_PAGE: `${navbar}${sep}discord-bot`
};

export default patchNotesRoutes;
