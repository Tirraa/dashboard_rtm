import { IconBaseProps } from 'react-icons';
import { RxActivityLog, RxDashboard, RxSketchLogo } from 'react-icons/rx';
import { DashboardRoutesSidebarReactElements } from './utils/RoutesMapping';

const sidebarIconWrapperProps = { className: 'bg-purple-800 text-white my-4 p-3 rounded-lg inline-block' };
const sidebarIconProps = { size: 20 };

const createSidebarComponent = (__SidebarIcon: React.ComponentType<IconBaseProps>) => (
  <div {...sidebarIconWrapperProps}>
    <__SidebarIcon {...sidebarIconProps} />
  </div>
);

export const dashboardRoutesSidebarComponents: DashboardRoutesSidebarReactElements = {
  BASE_PAGE: createSidebarComponent(RxSketchLogo),
  FOO_PAGE: createSidebarComponent(RxDashboard),
  BAR_PAGE: createSidebarComponent(RxActivityLog)
};

export default dashboardRoutesSidebarComponents;
