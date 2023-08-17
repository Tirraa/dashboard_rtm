import getComputedNavData from '@/app/_lib/getComputedNavData';
import dashboardRoutes, { dashboardRoutesTitles } from '../routes';

export const SidebarNavData = getComputedNavData(dashboardRoutes, dashboardRoutesTitles);
export default SidebarNavData;
