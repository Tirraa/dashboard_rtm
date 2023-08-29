import { i18ns } from '@/config/i18n';
import RoutesBase from '@/config/routes';
import { getSlashEnvelope } from '@/lib/str';
import { PatchNotesRoutes, PatchNotesRoutesTitles } from './utils/RoutesMapping';

const b = getSlashEnvelope(RoutesBase.patchNotes);

export const patchNotesRoutes: PatchNotesRoutes = {
  DASHBOARD_PATCH_NOTES_PAGE: b + 'dashboard',
  DISCORD_BOT_PATCH_NOTES_PAGE: b + 'discord-bot'
};

const ns = i18ns.navbar;
export const patchNotesRoutesTitles: PatchNotesRoutesTitles = {
  DASHBOARD_PATCH_NOTES_PAGE: { targetKey: 'dashboard', ns },
  DISCORD_BOT_PATCH_NOTES_PAGE: { targetKey: 'discord-bot', ns }
};

export default patchNotesRoutes;
