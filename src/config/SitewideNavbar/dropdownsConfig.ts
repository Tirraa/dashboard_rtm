import PATCH_NOTES_ROUTES, { PATCH_NOTES_ROUTES_TITLES } from '@/config/SitewideNavbar/PatchNotes/routesImpl';
import { PatchNotesRoutesKeys } from '@/config/SitewideNavbar/PatchNotes/utils/RoutesMapping';
import { EmbeddedEntities } from '@/types/NavData';
import { NavbarDropdownsConfig } from '@/types/WebsiteUtils';

const PATCH_NOTES_PAGE: EmbeddedEntities = Object.keys(PATCH_NOTES_ROUTES).map((k) => {
  const k2 = k as PatchNotesRoutesKeys;
  return { path: PATCH_NOTES_ROUTES[k2], i18nTitle: PATCH_NOTES_ROUTES_TITLES[k2] };
});

export const SITEWIDE_NAVBAR_DROPDOWNS_CONFIG: NavbarDropdownsConfig = { PATCH_NOTES_PAGE };
export default SITEWIDE_NAVBAR_DROPDOWNS_CONFIG;
