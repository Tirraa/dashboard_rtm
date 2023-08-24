import patchNotesRoutes, { patchNotesRoutesTitles } from '@/config/PatchNotes/routesImpl';
import { PatchNotesRoutesKeys } from '@/config/PatchNotes/utils/RoutesMapping';
import { DropdownsConfig } from '@/types/NavData';
import { SitewideNavbarRoutesKeys } from './utils/RoutesMapping';

const PATCH_NOTES_PAGE = Object.keys(patchNotesRoutes).map((k) => {
  const k2 = k as PatchNotesRoutesKeys;
  return { getPath: patchNotesRoutes[k2], getTitle: patchNotesRoutesTitles[k2] };
});

export const sitewideNavbarDropdownsConfig: DropdownsConfig<SitewideNavbarRoutesKeys> = { PATCH_NOTES_PAGE };
export default sitewideNavbarDropdownsConfig;
