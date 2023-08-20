import { DropdownsConfig } from '@/app/_types/DropdownConfig';
import patchNotesRoutes, { patchNotesRoutesTitles } from '../PatchNotes/routesImpl';
import { PatchNotesRoutesKeys } from '../PatchNotes/utils/RoutesMapping';
import { SitewideNavbarRoutesKeys } from './utils/RoutesMapping';

const PATCH_NOTES_PAGE = Object.keys(patchNotesRoutes).map((k) => {
  const k2 = k as PatchNotesRoutesKeys;
  return { getPath: patchNotesRoutes[k2], getTitle: patchNotesRoutesTitles[k2] };
});

export const sitewideNavbarDropdownsConfig: DropdownsConfig<SitewideNavbarRoutesKeys> = { PATCH_NOTES_PAGE };
export default sitewideNavbarDropdownsConfig;
