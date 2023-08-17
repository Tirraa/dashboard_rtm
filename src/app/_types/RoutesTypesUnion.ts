import { SitewideNavbarRoutes } from '../_config/SitewideNavbar/utils/RoutesMapping';
import { DashboardRoutes } from '../dashboard/_config/utils/RoutesMapping';

export type RoutesTypesUnion = DashboardRoutes | SitewideNavbarRoutes;
export default RoutesTypesUnion;
