import { DashboardRoutes } from '../_config/DashboardSidebar/utils/RoutesMapping';
import { PatchNotesRoutesKeys } from '../_config/PatchNotes/utils/RoutesMapping';
import { SitewideNavbarRoutes } from '../_config/SitewideNavbar/utils/RoutesMapping';

export type RoutesTypesUnion = DashboardRoutes | SitewideNavbarRoutes | PatchNotesRoutesKeys;
export type RoutesTypesUnionKey = keyof RoutesTypesUnion;
export default RoutesTypesUnion;
