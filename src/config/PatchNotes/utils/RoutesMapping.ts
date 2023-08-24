import { RoutesDefinition, RoutesTitles } from '@/types/RoutesMapping';

enum EPatchNotesRoutes {
  DASHBOARD_PATCH_NOTES_PAGE,
  DISCORD_BOT_PATCH_NOTES_PAGE
}
export type PatchNotesRoutesKeys = keyof typeof EPatchNotesRoutes;

export type PatchNotesRoutes = RoutesDefinition<PatchNotesRoutesKeys>;
export type PatchNotesRoutesTitles = RoutesTitles<PatchNotesRoutesKeys>;
