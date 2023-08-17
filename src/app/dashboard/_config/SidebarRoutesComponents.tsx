import { RxActivityLog, RxDashboard, RxSketchLogo } from 'react-icons/rx';
import { DashboardRoutesSidebarReactElements } from './utils/types';

const p = { className: 'bg-purple-800 text-white my-4 p-3 rounded-lg inline-block' };
export const dashboardRoutesSidebarComponents: DashboardRoutesSidebarReactElements = {
  BASE_PAGE: (
    <div {...p}>
      <RxSketchLogo size={20} />
    </div>
  ),
  FOO_PAGE: (
    <div {...p}>
      <RxDashboard size={20} />
    </div>
  ),
  BAR_PAGE: (
    <div {...p}>
      <RxActivityLog size={20} />
    </div>
  )
};

export default dashboardRoutesSidebarComponents;
