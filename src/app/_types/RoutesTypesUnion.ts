import { DashboardRoutes } from '../_config/DashboardSidebar/utils/RoutesMapping';
import { PatchNotesRoutesKeys } from '../_config/PatchNotes/utils/RoutesMapping';
import { SitewideNavbarRoutes } from '../_config/SitewideNavbar/utils/RoutesMapping';

export type RoutesTypesUnion = DashboardRoutes | SitewideNavbarRoutes | PatchNotesRoutesKeys;
export type RoutesSumType = (keyof DashboardRoutes | keyof SitewideNavbarRoutes | keyof PatchNotesRoutesKeys) & string;
export default RoutesTypesUnion;
