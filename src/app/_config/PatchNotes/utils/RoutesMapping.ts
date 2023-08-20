import { RoutesDefinition, RoutesTitles } from '@/app/_types/RoutesMapping';

export type PatchNotesRoutesKeys = 'DASHBOARD_PATCH_NOTES_PAGE' | 'DISCORD_BOT_PATCH_NOTES_PAGE';

export type PatchNotesRoutes = RoutesDefinition<PatchNotesRoutesKeys>;
export type PatchNotesRoutesTitles = RoutesTitles<keyof PatchNotesRoutes>;
