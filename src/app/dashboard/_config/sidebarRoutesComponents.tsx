import { IconBaseProps } from 'react-icons';
import { RxActivityLog, RxDashboard, RxSketchLogo } from 'react-icons/rx';
import { DashboardRoutesSidebarReactElements } from './utils/RoutesMapping';

const p = { className: 'bg-purple-800 text-white my-4 p-3 rounded-lg inline-block' };
const p2 = { size: 20 };

const createSidebarComponent = (__SidebarIcon: React.ComponentType<IconBaseProps>) => (
  <div {...p}>
    <__SidebarIcon {...p2} />
  </div>
);

export const dashboardRoutesSidebarComponents: DashboardRoutesSidebarReactElements = {
  BASE_PAGE: createSidebarComponent(RxSketchLogo),
  FOO_PAGE: createSidebarComponent(RxDashboard),
  BAR_PAGE: createSidebarComponent(RxActivityLog)
};

export default dashboardRoutesSidebarComponents;
