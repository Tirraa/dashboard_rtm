import { NavDataEntities, NavDataEntity } from '@/app/_types/navdata';
import dashboardRoutes, { dashboardRoutesTitles } from '../routes';
import { DashboardRoutes, DashboardRoutesTitles } from './types';

const computedSidebarNavData: NavDataEntities = [];

for (let k in dashboardRoutes) {
  const currentComputedNavData: NavDataEntity = {
    getPath: dashboardRoutes[k as keyof DashboardRoutes],
    getTitle: () => dashboardRoutesTitles[k as keyof DashboardRoutesTitles]()
  };
  computedSidebarNavData.push(currentComputedNavData);
}

export const SidebarNavData = computedSidebarNavData;
export default SidebarNavData;
