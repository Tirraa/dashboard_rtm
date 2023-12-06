import PATCH_NOTES_ROUTES, { PATCH_NOTES_ROUTES_TITLES } from '@/config/SitewideNavbar/PatchNotes/routesImpl';
import type { PatchNotesRoutesKeys } from '@/config/SitewideNavbar/PatchNotes/utils/RoutesMapping';
import type { EmbeddedEntities } from '@/types/NavData';
import type { NavbarDropdownsConfig } from '@/types/WebsiteUtils';

const PATCH_NOTES_PAGE: EmbeddedEntities = Object.keys(PATCH_NOTES_ROUTES).map((k) => {
  const k2 = k as PatchNotesRoutesKeys;
  return { path: PATCH_NOTES_ROUTES[k2], i18nTitle: PATCH_NOTES_ROUTES_TITLES[k2] };
});

const SITEWIDE_NAVBAR_DROPDOWNS_CONFIG: NavbarDropdownsConfig = { PATCH_NOTES_PAGE } as const;
export default SITEWIDE_NAVBAR_DROPDOWNS_CONFIG;
