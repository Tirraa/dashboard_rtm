import RoutesBase from '@/app/_config/routes';
import getSlashEnvelope from '@/app/_lib/getSlashEnvelope';
import { PatchNotesRoutes, PatchNotesRoutesTitles } from './utils/RoutesMapping';

const b = getSlashEnvelope(RoutesBase.patchNotes);

// {ToDo} i18n this?
export const patchNotesRoutes: PatchNotesRoutes = {
  DASHBOARD_PATCH_NOTES_PAGE: b + 'dashboard',
  DISCORD_BOT_PATCH_NOTES_PAGE: b + 'discord-bot'
};

// {ToDo} i18n this!
export const patchNotesRoutesTitles: PatchNotesRoutesTitles = {
  DASHBOARD_PATCH_NOTES_PAGE: () => 'Dashboard',
  DISCORD_BOT_PATCH_NOTES_PAGE: () => 'Bot Discord'
};

export default patchNotesRoutes;
