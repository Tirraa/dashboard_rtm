import { DashboardRoutes } from '../_config/DashboardSidebar/utils/RoutesMapping';
import { SitewideNavbarRoutes } from '../_config/SitewideNavbar/utils/RoutesMapping';

export type RoutesTypesUnion = DashboardRoutes | SitewideNavbarRoutes;
export type RoutesSumType = (keyof DashboardRoutes | keyof SitewideNavbarRoutes) & string;
export default RoutesTypesUnion;
