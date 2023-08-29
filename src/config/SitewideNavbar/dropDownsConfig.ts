import patchNotesRoutes, { patchNotesRoutesTitles } from '@/config/PatchNotes/routesImpl';
import { PatchNotesRoutesKeys } from '@/config/PatchNotes/utils/RoutesMapping';
import { DropdownsConfig, EmbeddedEntities } from '@/types/NavData';
import { SitewideNavbarRoutesKeys } from './utils/RoutesMapping';

const PATCH_NOTES_PAGE: EmbeddedEntities = Object.keys(patchNotesRoutes).map((k) => {
  const k2 = k as PatchNotesRoutesKeys;
  return { path: patchNotesRoutes[k2], i18nTitleInfos: patchNotesRoutesTitles[k2] };
});

export const sitewideNavbarDropdownsConfig: DropdownsConfig<SitewideNavbarRoutesKeys> = { PATCH_NOTES_PAGE };
export default sitewideNavbarDropdownsConfig;
