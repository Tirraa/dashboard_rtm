import { DashboardRoutes } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { PatchNotesRoutesKeys } from '@/config/PatchNotes/utils/RoutesMapping';
import { SitewideNavbarRoutes } from '@/config/SitewideNavbar/utils/RoutesMapping';

export type RoutesTypesUnion = DashboardRoutes | SitewideNavbarRoutes | PatchNotesRoutesKeys;
export type RoutesTypesUnionKey = keyof RoutesTypesUnion & string;
export default RoutesTypesUnion;
